# tools/Handoff-Workflow.ps1  —— 作業を常に引き継げる形で自動記録する最小セット
$ErrorActionPreference = "Stop"

function _Now(){ Get-Date -Format "yyyyMMdd-HHmmss" }
function _Date(){ Get-Date -Format "yyyyMMdd" }
function _Safe([string]$s){ if([string]::IsNullOrWhiteSpace($s)){return "noname"}; return ($s -replace "[^\w\-]+","-").ToLower() }
function _Write([string]$path,[string]$text,[switch]$Append){ if($Append){ Add-Content -Path $path -Value $text -Encoding UTF8 } else { Set-Content -Path $path -Value $text -Encoding UTF8 } }

function Get-EnvSnapshot{
  $node  = (& node -v) 2>$null
  $npm   = (& npm -v) 2>$null
  $tw    = (& node -pe "try{require('tailwindcss/package.json').version}catch(e){'N/A'}") 2>$null
  $branch= (& git rev-parse --abbrev-ref HEAD) 2>$null
  $commit= (& git rev-parse --short=12 HEAD) 2>$null
  return @"
date      : $(Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz")
node      : $node
npm       : $npm
tailwind  : $tw
branch    : $branch
commit    : $commit
"@
}

function Start-Session{
  param(
    [string]$Title = "work",
    [string]$Plan  = ""
  )
  $ts = Get-Date
  $name = "{0}-{1}" -f ($ts.ToString('yyyyMMdd-HHmm')), (_Safe $Title)
  $path = "docs/sessions/$name.md"
  if(Test-Path $path){ return $path }
  $envSnap = Get-EnvSnapshot
  $body = @"
# Session: $Title
`$fileVersion: 1
$envSnap
## Plan
$Plan

## Commands (append as you run)
\`\`\`powershell
# (ここに実行したワンライナを追記)
\`\`\`

## Notes / Decisions
- 

"@
  _Write $path $body
  Write-Host "Created $path"
  return $path
}

function Add-Decision{
  param([Parameter(Mandatory)][string]$Text)
  $path = "docs/DECISIONS.md"
  $line = ("- {0} — {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm"), $Text)
  if(!(Test-Path $path)){
    _Write $path "# Decisions`r`n"
  }
  _Write $path $line -Append
  Write-Host "Appended decision."
}

function Add-Todo{
  param([Parameter(Mandatory)][string]$Text)
  $path = "docs/TODO.md"
  $line = ("- [ ] {0} — added {1}" -f $Text, (Get-Date -Format "yyyy-MM-dd HH:mm"))
  if(!(Test-Path $path)){
    _Write $path "# TODO`r`n"
  }
  _Write $path $line -Append
  Write-Host "Appended TODO."
}

function Save-Tree{
  param([switch]$Force)
  $path = "docs/REPO-TREE-$((Get-Date).ToString('yyyyMMdd')).txt"
  if ((Test-Path $path) -and (-not $Force)){ return $path }
  $files = (& git ls-files) 2>$null
  if($files){ $files | Set-Content -Path $path -Encoding UTF8 }
  Write-Host "Wrote $path"
  return $path
}

function Save-Diff{
  param([string]$Label = "snapshot")
  $ts = _Now
  $label = _Safe $Label
  $p1 = "docs/diffs/$ts-$label.patch"
  $p2 = "docs/diffs/$ts-$label.names.txt"
  $p3 = "docs/diffs/$ts-$label.status.txt"
  (& git diff) | Set-Content -Path $p1 -Encoding UTF8
  (& git diff --name-only) | Set-Content -Path $p2 -Encoding UTF8
  (& git status -sb) | Set-Content -Path $p3 -Encoding UTF8
  Write-Host "Saved diffs: $p1"
  return $p1
}

function Run-Verify{
  $out = "docs/verify/verify-$(_Now).txt"
  if(Test-Path "./tools/Verify-Handoff-Local.ps1"){
    try{
      pwsh ./tools/Verify-Handoff-Local.ps1 *>&1 | Tee-Object -FilePath $out | Out-Host
    } catch {
      $_ | Out-String | Tee-Object -FilePath $out | Out-Host
    }
  } else {
    "Verify script not found." | Set-Content -Path $out -Encoding UTF8
  }
  return $out
}

function New-WorkBranch{
  param([string]$Prefix = "hotfix", [string]$Name = "work")
  $branch = "{0}/{1}-{2}" -f $Prefix, (_Safe $Name), (Get-Date -Format 'yyyyMMdd')
  $exists = (& git rev-parse --verify $branch 2>$null)
  if($LASTEXITCODE -eq 0){ & git checkout $branch | Out-Null }
  else { & git checkout -b $branch | Out-Null }
  Write-Host "On branch $branch"
  return $branch
}

function Commit-Changes{
  param(
    [string]$Type="fix",
    [string]$Scope="ui",
    [Parameter(Mandatory)][string]$Subject,
    [string]$Body = ""
  )
  # 安全に scripts.verify を補強（冪等）
  if(Test-Path 'package.json'){
    $pkg = Get-Content package.json -Raw | ConvertFrom-Json -AsHashtable
    if(-not $pkg.ContainsKey('scripts')){ $pkg['scripts'] = @{} }
    if(-not $pkg['scripts'].ContainsKey('verify')){ $pkg['scripts']['verify'] = 'pwsh ./tools/Verify-Handoff-Local.ps1' }
    $pkg | ConvertTo-Json -Depth 100 | Set-Content -Path package.json -Encoding UTF8
    git add package.json | Out-Null
  }
  git add -A
  $head = "{0}({1}): {2}" -f $Type,$Scope,$Subject
  $msg = if([string]::IsNullOrWhiteSpace($Body)) { $head } else { "$head`r`n`r`n$Body" }
  $tmp = New-TemporaryFile
  Set-Content -Path $tmp -Value $msg -Encoding UTF8
  & git commit -F $tmp
  Remove-Item $tmp -Force
  Write-Host "Committed: $head"
}

function Create-HandoffPack{
  param([string]$Label = "handoff")
  $stamp = Get-Date -Format 'yyyyMMdd-HHmm'
  $folder = "docs/handoff/HANDOFF-$stamp-$(( _Safe $Label))"
  New-Item -ItemType Directory -Force -Path $folder | Out-Null
  # 収集
  Save-Tree | Out-Null
  Copy-Item docs/REPO-TREE-*.txt $folder -ErrorAction SilentlyContinue
  Copy-Item docs/*.md $folder -ErrorAction SilentlyContinue
  Copy-Item docs/sessions/*.md $folder -ErrorAction SilentlyContinue
  Copy-Item docs/diffs/*.patch $folder -ErrorAction SilentlyContinue
  Copy-Item docs/diffs/*.txt $folder -ErrorAction SilentlyContinue
  Copy-Item docs/verify/*.txt $folder -ErrorAction SilentlyContinue
  if(Test-Path "docs/HANDOFF-*.md"){ Copy-Item docs/HANDOFF-*.md $folder -ErrorAction SilentlyContinue }
  # 参照情報
  (Get-EnvSnapshot) | Set-Content -Path "$folder/ENV.txt" -Encoding UTF8
  (& git log -1 --pretty=fuller) | Set-Content -Path "$folder/LAST-COMMIT.txt" -Encoding UTF8
  (& git status -sb) | Set-Content -Path "$folder/STATUS.txt" -Encoding UTF8
  Write-Host "Handoff collected at $folder"
  return $folder
}

function Show-Status{
  Write-Host "===== SESSION STATUS ====="
  Get-EnvSnapshot | Out-Host
  & git status -sb | Out-Host
  Write-Host "=========================="
}


