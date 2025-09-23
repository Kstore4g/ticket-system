param([switch]$Quiet)
$ErrorActionPreference = "Stop"
$errs = New-Object System.Collections.Generic.List[string]

function Test-Pattern($Path, $Pattern, $Why){
  if (!(Test-Path $Path)) { $errs.Add("MISS: $Path — $Why"); return }
  $t = Get-Content $Path -Raw
  if ($t -notmatch $Pattern) { $errs.Add("MISMATCH: $Path — $Why") }
}

function Test-NotPattern($Path, $Pattern, $Why){
  if (!(Test-Path $Path)) { return }
  $t = Get-Content $Path -Raw
  if ($t -match $Pattern) { $errs.Add("UNEXPECTED: $Path — $Why") }
}

# 環境チェック（存在だけ/バージョンは参考）
$nodeV = (& node -v) 2>$null
$npmV  = (& npm -v)  2>$null
if (-not $nodeV) { $errs.Add("ENV: node が見つかりません（要求: v22.19.0 付近）") }
if (-not $npmV)  { $errs.Add("ENV: npm が見つかりません（要求: v10.9.3 付近）") }

# 契約チェック
Test-Pattern     "components/CartPanel.tsx" "SlideToPay"           "CartPanel が新スライダーを使用している"
Test-NotPattern  "components/CartPanel.tsx" "SlideToConfirm"       "CartPanel が旧スライダーへ依存していない"
Test-Pattern     "components/ProductCard.tsx" "qtyActiveVars"       "ProductCard が qtyActiveVars() を呼ぶ"

Test-Pattern     "styles/globals.css" '\.qty-badge\[data-qty\]:not\(\[data-qty="0"\]\)\s*\{[^}]*background:' "数量バッジの背景色ルール"
Test-Pattern     "lib/theme.ts"       'applyTheme\s*\('          "applyTheme() が存在"
Test-Pattern     "lib/theme.ts"       'qtyActiveVars'            "qtyActiveVars() が存在"
Test-Pattern     "lib/layout.ts"      'LAYOUT'                   "寸法トークン LAYOUT.* が存在"
Test-Pattern     "lib/layout.ts"      'pay(Vars|GroupVars)\s*\(' "支払い用の発光/スキン変数ユーティリティ"

Test-Pattern     "tailwind.config.js" 'twglow'                   "Tailwind に twglow プラグインが登録済み"
Test-Pattern     "postcss.config.js"  'tailwindcss'              "PostCSS が Tailwind を通過"
if (Test-Path "pages/_app.tsx") {
  Test-Pattern   "pages/_app.tsx"     'globals\.css'             "_app で globals.css を読み込む"
}

# 目視で役立つリスト（初回のみ更新）
$treePath = "docs/REPO-TREE-$(Get-Date -Format yyyyMMdd).txt"
if (!(Test-Path $treePath)) {
  $files = (& git ls-files) 2>$null
  if ($files) { $files | Set-Content -Path $treePath -Encoding UTF8 }
}

# 結果表示
if ($errs.Count -gt 0) {
  if (-not $Quiet) {
    Write-Host "== VERIFY: FAIL ==" -ForegroundColor Red
    $errs | ForEach-Object { Write-Host " - $_" }
  }
  exit 1
} else {
  if (-not $Quiet) { Write-Host "== VERIFY: PASS ==" -ForegroundColor Green }
  exit 0
}
