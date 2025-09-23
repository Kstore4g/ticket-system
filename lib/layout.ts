/**
 * レイアウト数値の一元管理（UI 全体で参照）
 * 位置調整は transform: translate(X, Y) で適用
 */
export const LAYOUT = {
  /* === フレーム（画面の最外余白 4辺）=== */
  outerPaddingTopPx:    20,  // pages/index.tsx …… 画面最外の上余白
  outerPaddingRightPx:  1,   // 右余白
  outerPaddingBottomPx: 1,   // 下余白
  outerPaddingLeftPx:   1,   // 左余白
  columnGapPx:          1,   // 左・中央・右カラム間の隙間

  /* === カラム幅 === */
  leftColWidthPx:   80,      // 左カラム（カテゴリ）
  rightColWidthPx:  300,     // 右カラム（注文）

  /* === カテゴリ（左カラム） === */
  categoryIconPx:           60, // 丸アイコン直径
  categoryIconGapPx:        12, // アイコン間隔
  categoryLabelPx:          13, // ラベル文字サイズ
  // アイコン内コンテンツ（画像/絵文字/文字）の大きさ・位置
  categoryIconInnerFontPx:  34, // 絵文字/文字のフォントサイズ
  categoryIconInnerImagePx: 36, // 画像を使う場合の内側画像サイズ
  categoryIconInnerOffsetXPx: 0, // 内側コンテンツの X 方向オフセット
  categoryIconInnerOffsetYPx: 0, // 内側コンテンツの Y 方向オフセット

  /* === 中央リスト === */
  listRowGapPx:        1,    // 1行ごとの間隔
  productNamePx:      18,    // 商品名 文字サイズ
  productPricePx:     18,    // 価格 文字サイズ
  allergyChipFontPx:  14,    // アレルギータグ 文字サイズ
  productImagePx:    100,    // 商品画像の縦横

  // 中央リスト内の各表示位置（px 単位のオフセット）
  productNameOffsetXPx:   0,
  productNameOffsetYPx:   -5,
  productPriceOffsetXPx:  0,
  productPriceOffsetYPx:  3,
  allergyOffsetXPx:       0,
  allergyOffsetYPx:       9,

  /* === 数量バッジ（中央リスト右端） === */
  qtyBadgeMinWidthPx: 60,
  qtyBadgeHeightPx: 118,
  qtyTextPx: 30,

  qtyBadgeOffsetTopPx: -1,
  qtyBadgeOffsetRightPx: 0,
  qtyBadgeZIndex: 2,

  qtyBadgePaddingInlinePx: 0,
  qtyBadgeOverflowRightPx: 0,

  // 角丸（数量バッジ）
  qtyBadgeRadiusTopLeftPx: 0,
  qtyBadgeRadiusTopRightPx: 15,
  qtyBadgeRadiusBottomRightPx: 15,
  qtyBadgeRadiusBottomLeftPx: 0,

/* === 支払い方法（右カラム上部） === *//* === 支払い方法（右カラム上部） === */
  payIconPx:           45,   // 丸アイコン直径
  paymentIconGapPx:     7,   // アイコン間隔
  paymentLabelPx:      12,   // ラベル文字サイズ
  selectedLabelPx:     15,   // 「選択中」表示の文字
  // アイコン内コンテンツ（画像/絵文字/文字）の大きさ・位置
  payIconInnerFontPx:  24,   // 絵文字/文字のフォントサイズ
  payIconInnerImagePx: 26,   // 画像の場合のサイズ
  payIconInnerOffsetXPx: 0,  // X 方向オフセット
  payIconInnerOffsetYPx: 0,  // Y 方向オフセット

  /* === 注文リスト（右カラム中部） === */
  cartItemNamePx:   17,      // 注文名 文字サイズ
  cartItemPricePx:  15,      // 単価 文字サイズ
  plusMinusPx:      24,      // ±ボタン径
  plusMinusFontPx:  14,      // ±アイコン文字サイズ
  cartQtyWidthPx:   22,      // ±の間の数量表示の幅
  cartQtyFontPx:    21,      // ±の間の数量文字サイズ

  /* === 合計行（右カラム下部） === */
  totalsLabelPx:    18,
  totalsValuePx:    18,

  /* === スライダー（決済） === */
  slideKnobPx:        42,    // ノブ直径
  slideConfirmAt:     0.90,  // 確定閾値（0..1）
  slideInsetStartPx:  1,     // 左端からの開始インセット
  slideInsetEndPx:    6,     // 右端からの終了インセット
  slideLabelPx:       16,    // ラベル文字サイズ
} as const;



//
// === payment highlight (tint & glow) ===
export const PAY_HL = {
  ringWidthPx: 2,
  blurPx: 12,
  default: { color: 'rgba(56,189,248,.85)', bg: 'rgba(56,189,248,.10)' },
  byKey: {
    cash:   { color: 'rgba(245,158,11,.90)', bg: 'rgba(245,158,11,.12)' },
    card:   { color: 'rgba(34,197,94,.90)',  bg: 'rgba(34,197,94,.12)'  },
    paypay: { color: 'rgba(239,68,68,.90)',  bg: 'rgba(239,68,68,.12)'  },
  }
} as const;

export const payVars = (key?: string) => {
  const k = (key ?? '').toLowerCase();
  const spec = (PAY_HL as any).byKey?.[k] ?? (PAY_HL as any).default;
  return {
    ['--glow-color' as any]: spec.color,
    ['--glow-ring-width' as any]: ((PAY_HL as any).ringWidthPx ?? 2) + 'px',
    ['--glow-blur' as any]: ((PAY_HL as any).blurPx ?? 12) + 'px',
    ['--pay-bg' as any]: spec.bg ?? 'transparent',
  } as any;
};

/** ── payment group (親ブロック) の背景スキン設定 ───────────────── */
export type PaySkinSpec = {
  groupBgImage?: string;   // 画像パス（/public 配下）
  groupBgSize?: string;    // CSS background-size 値
  groupBgPos?: string;     // CSS background-position 値
};
export const PAY_SKIN: { default: PaySkinSpec; byKey: Record<string, PaySkinSpec> } = {
  // 既定（弱めに右側へ）
  default: { groupBgImage: "/icons/icon-192.png", groupBgSize: "auto 72%", groupBgPos: "right 12px center" },
  byKey: {
    cash:   { groupBgImage: "/icons/icon-180.png", groupBgSize: "auto 78%", groupBgPos: "right 12px center" },
    card:   { groupBgImage: "/icons/icon-192.png" },
    paypay: { groupBgImage: "/icons/icon-512.png", groupBgSize: "auto 70%" },
  }
};
/** 親ブロック用の CSS 変数（背景画像など）を返す */
export const payGroupVars = (key?: string): Record<string,string> => {
  const k = (key ?? "").toLowerCase();
  const spec = (k && PAY_SKIN.byKey[k]) || PAY_SKIN.default;
  const out: any = {};
  if (spec.groupBgImage) out["--group-bg-image"] = `url('${spec.groupBgImage}')`;
  if (spec.groupBgSize)  out["--group-bg-size"]  = spec.groupBgSize!;
  if (spec.groupBgPos)   out["--group-bg-pos"]   = spec.groupBgPos!;
  return out as Record<string,string>;
};
