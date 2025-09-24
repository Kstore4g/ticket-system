Param()

$ErrorActionPreference = "Stop"

$fail = @()

# --- Check A: tailwind.config.js に twglow が混入していない ---
$tailwind = Get-Content -Raw -Encoding UTF8 ".\tailwind.config.js"
if ($tailwind -match 'twglow') {
  $fail += "tailwind.config.js: twglow が含まれています。"
}

# --- Check B: lib/layout.ts の支払い用ユーティリティが契約どおり ---
$layout = Get-Content -Raw -Encoding UTF8 ".\lib\layout.ts"

# 期待：payVars(key?: string) と payGroupVars(key?: string) のみ
if ($layout -notmatch 'export\s+const\s+payVars\s*=\s*\(key\?\:\s*string\)') {
  $fail += "lib/layout.ts: export const payVars = (key?: string) が見つかりません。"
}
if ($layout -notmatch 'export\s+const\s+payGroupVars\s*=\s*\(key\?\:\s*string\)') {
  $fail += "lib/layout.ts: export const payGroupVars = (key?: string) が見つかりません。"
}
# 期待外：handoff shim / PayVarsInput が存在しない
if ($layout -match 'handoff\s*shim|PayVarsInput') {
  $fail += "lib/layout.ts: handoff shim/PayVarsInput の残骸が見つかりました。"
}

# レポート
if ($fail.Count -eq 0) {
  Write-Host "== VERIFY: PASS ==" -ForegroundColor Green
  exit 0
} else {
  Write-Host "== VERIFY: FAIL ==" -ForegroundColor Red
  $fail | ForEach-Object { Write-Host " - $_" }
  exit 1
}