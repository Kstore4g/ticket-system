# ============================
# _diag/patch_tools.ps1
# 安全・差分・事前読取パッチ関数
# ============================
$script:Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
function Write-NoBom($Path,$Content){ [IO.File]::WriteAllText($Path,$Content,$script:Utf8NoBom) }
function Ensure-Dir($p){ $d = Split-Path -Parent $p; if($d -and !(Test-Path $d)){ New-Item -ItemType Directory -Force -Path $d | Out-Null } }

function Apply-RegexPatch {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory)][string]$Path,
    [Parameter(Mandatory)][string]$Pattern,
    [Parameter(Mandatory)][AllowEmptyString()][string]$Replacement,
    [string[]]$MustContain,
    [string[]]$MustNotContain,
    [int]$MaxCount = 0,          # 0=全置換 / >0=最大回数
    [switch]$Preview,            # 事前プラン表示のみ
    [switch]$Silent              # ログ抑制
  )
  if(!(Test-Path $Path)){ if(-not $Silent){ Write-Host "SKIP  : $Path (not found)"; }; return @{ status="skip"; reason="notfound"; path=$Path } }

  $orig = Get-Content -Raw -LiteralPath $Path

  # 事前条件: MustContain / MustNotContain
  foreach($mc in ($MustContain|Where-Object{$_})){
    if(-not [regex]::IsMatch($orig,$mc,[System.Text.RegularExpressions.RegexOptions]::Singleline)){
      if(-not $Silent){ Write-Host "SKIP  : $Path (missing MustContain pattern) -> $mc" -ForegroundColor Yellow }
      return @{ status="skip"; reason="mustcontain_miss"; path=$Path; pattern=$mc }
    }
  }
  foreach($mn in ($MustNotContain|Where-Object{$_})){
    if([regex]::IsMatch($orig,$mn,[System.Text.RegularExpressions.RegexOptions]::Singleline)){
      if(-not $Silent){ Write-Host "SKIP  : $Path (found MustNotContain pattern; already applied?) -> $mn" -ForegroundColor Yellow }
      return @{ status="skip"; reason="mustnotcontain_hit"; path=$Path; pattern=$mn }
    }
  }

  $rxOpt = [System.Text.RegularExpressions.RegexOptions]::Singleline
  $matches = [regex]::Matches($orig,$Pattern,$rxOpt)
  $hit = $matches.Count
  if($hit -eq 0){
    if(-not $Silent){ Write-Host "NOOP : $Path (pattern not found)" }
    return @{ status="noop"; reason="pattern_not_found"; path=$Path }
  }

  # 置換（MaxCount 指定時は手動で段階置換）
  $new = $orig
  if($MaxCount -gt 0){
    $replaced = 0
    $new = [regex]::Replace($orig,$Pattern,{
      param($m)
      if($script:replaced -ge $using:MaxCount){ return $m.Value }
      $script:replaced++
      return $ExecutionContext.InvokeCommand.ExpandString($using:Replacement)
    }, $rxOpt)
    $hit = $script:replaced
    Remove-Variable -Name replaced -Scope Script -ErrorAction SilentlyContinue
  } else {
    $new = [regex]::Replace($orig,$Pattern,$Replacement,$rxOpt)
  }

  if($Preview){
    Write-Host "PLAN : $Path -> will replace $hit occurrence(s)" -ForegroundColor Cyan
    # スニペット（最初の一致だけ前後40文字）
    $m0 = [regex]::Match($orig,$Pattern,$rxOpt)
    if($m0.Success){
      $start=[Math]::Max(0,$m0.Index-40); $len=[Math]::Min(80,$orig.Length-$start)
      $before = $orig.Substring($start,$len).Replace("`r","").Replace("`n","⏎")
      $tmp = [regex]::Replace($m0.Value,$Pattern,$Replacement,$rxOpt)
      $afterPreview = $tmp
      Write-Host "  before: …$before…" -ForegroundColor DarkGray
      Write-Host "  after : …$afterPreview…" -ForegroundColor DarkGreen
    }
    return @{ status="plan"; path=$Path; hits=$hit }
  }

  if($new -eq $orig){
    if(-not $Silent){ Write-Host "NOOP : $Path (replacement produced identical text)" }
    return @{ status="noop"; reason="identical"; path=$Path }
  }

  # バックアップ
  $bakRoot = "_diag\_backup-diff\" + (Get-Date -Format "yyyyMMdd-HHmmss")
  $bakPath = Join-Path $bakRoot $Path
  Ensure-Dir $bakPath
  Copy-Item -LiteralPath $Path -Destination $bakPath -Force

  # 書き込み（UTF-8N）
  Ensure-Dir $Path
  Write-NoBom $Path $new
  Write-Host "PATCH: $Path (replaced $hit)  backup: $bakPath" -ForegroundColor Green
  return @{ status="patched"; path=$Path; hits=$hit; backup=$bakPath }
}

function Preview-RegexPatch {
  [CmdletBinding()]param(
    [Parameter(Mandatory)][string]$Path,
    [Parameter(Mandatory)][string]$Pattern,
    [Parameter(Mandatory)][AllowEmptyString()][string]$Replacement,
    [string[]]$MustContain,
    [string[]]$MustNotContain,
    [int]$MaxCount = 0
  )
  Apply-RegexPatch -Path $Path -Pattern $Pattern -Replacement $Replacement -MustContain $MustContain -MustNotContain $MustNotContain -MaxCount $MaxCount -Preview
}
# === result wrappers (OK/NG last line) ===
function Preview-RegexPatchSafe {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory=$true)][string]$Path,
    [Parameter(Mandatory=$true)][string]$Pattern,
    [Parameter(Mandatory=$true)][AllowEmptyString()][string]$Replacement,
    [string[]]$MustContain,
    [string[]]$MustNotContain,
    [int]$MaxCount = 0
  )
  if(-not (Get-Command Apply-RegexPatch -ErrorAction SilentlyContinue)){ Write-Host 'RESULT: NG - Apply-RegexPatch missing'; return }
  $r = Apply-RegexPatch -Path $Path -Pattern $Pattern -Replacement $Replacement -MustContain $MustContain -MustNotContain $MustNotContain -MaxCount $MaxCount -Preview -Silent
  if($r.status -eq 'plan'){ Write-Host 'RESULT: OK' } else { Write-Host ('RESULT: NG - ' + ($r.reason ?? $r.status)) }
  return $r
}
function Apply-RegexPatchSafe {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory=$true)][string]$Path,
    [Parameter(Mandatory=$true)][string]$Pattern,
    [Parameter(Mandatory=$true)][AllowEmptyString()][string]$Replacement,
    [string[]]$MustContain,
    [string[]]$MustNotContain,
    [int]$MaxCount = 0
  )
  if(-not (Get-Command Apply-RegexPatch -ErrorAction SilentlyContinue)){ Write-Host 'RESULT: NG - Apply-RegexPatch missing'; return }
  $r = Apply-RegexPatch -Path $Path -Pattern $Pattern -Replacement $Replacement -MustContain $MustContain -MustNotContain $MustNotContain -MaxCount $MaxCount -Silent
  switch($r.status){
    'patched' { Write-Host 'RESULT: OK - PATCHED' }
    'noop'    { Write-Host ('RESULT: OK - ' + ($r.reason ?? 'NOCHANGE')) }
    'skip'    {
      if($r.reason -eq 'mustnotcontain_hit'){ Write-Host 'RESULT: OK - ALREADY' }
      else { Write-Host ('RESULT: NG - ' + ($r.reason ?? 'SKIPPED')) }
    }
    default   { Write-Host ('RESULT: NG - ' + $r.status) }
  }
  return $r
}