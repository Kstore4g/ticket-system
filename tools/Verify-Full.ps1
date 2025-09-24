param([string]$OutDir = ".\docs\verify")
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
New-Item -Force -ItemType Directory $OutDir | Out-Null
$ts   = Get-Date -Format "yyyyMMdd-HHmmss"
$path = Join-Path $OutDir "verify-$ts-full.log"

$env:FORCE_COLOR="0"; $env:NO_COLOR="1"; $env:DEBUG_COLORS="0"
"== VERIFY-FULL START $ts ==" | Out-File -FilePath $path -Encoding UTF8

# 段階実行（全部ログへ落とす）
"--- git status ---" | Out-File $path -Append -Encoding UTF8
git status -uno *>&1 | Out-File $path -Append -Encoding UTF8

"--- tsc ---"       | Out-File $path -Append -Encoding UTF8
npx tsc -noEmit *>&1 | Out-File $path -Append -Encoding UTF8

"--- build ---"     | Out-File $path -Append -Encoding UTF8
npm run build *>&1   | Out-File $path -Append -Encoding UTF8

"--- verify ---"    | Out-File $path -Append -Encoding UTF8
npm run verify *>&1  | Out-File $path -Append -Encoding UTF8

Write-Host "📄 Full log: $path"
Get-Content $path -Tail 300