/**
 * レイアウト数値の一元管理（UI 全体で参照）
 * 位置調整は transform: translate(X, Y) で適用
 */
export const LAYOUT = {
  outerPaddingTopPx:    20,
  outerPaddingRightPx:  1,
  outerPaddingBottomPx: 1,
  outerPaddingLeftPx:   1,
  columnGapPx:          1,

  leftColWidthPx:   80,
  rightColWidthPx:  300,

  categoryIconPx:           60,
  categoryIconGapPx:        12,
  categoryLabelPx:          13,
  categoryIconInnerFontPx:  34,
  categoryIconInnerImagePx: 36,
  categoryIconInnerOffsetXPx: 0,
  categoryIconInnerOffsetYPx: 0,

  listRowGapPx:        1,
  productNamePx:      18,
  productPricePx:     18,
  allergyChipFontPx:  14,
  productImagePx:    100,

  productNameOffsetXPx:   0,
  productNameOffsetYPx:   -5,
  productPriceOffsetXPx:  0,
  productPriceOffsetYPx:  3,
  allergyOffsetXPx:       0,
  allergyOffsetYPx:       9,

  qtyBadgeMinWidthPx: 60,
  qtyBadgeHeightPx: 118,
  qtyTextPx: 30,

  qtyBadgeOffsetTopPx: -1,
  qtyBadgeOffsetRightPx: 0,
  qtyBadgeZIndex: 2,

  qtyBadgePaddingInlinePx: 0,
  qtyBadgeOverflowRightPx: 0,

  qtyBadgeRadiusTopLeftPx: 0,
  qtyBadgeRadiusTopRightPx: 15,
  qtyBadgeRadiusBottomRightPx: 15,
  qtyBadgeRadiusBottomLeftPx: 0,

  payIconPx:           45,
  paymentIconGapPx:     7,
  paymentLabelPx:      12,
  selectedLabelPx:     15,
  payIconInnerFontPx:  24,
  payIconInnerImagePx: 26,
  payIconInnerOffsetXPx: 0,
  payIconInnerOffsetYPx: 0,

  cartItemNamePx:   17,
  cartItemPricePx:  15,
  plusMinusPx:      24,
  plusMinusFontPx:  14,
  cartQtyWidthPx:   22,
  cartQtyFontPx:    21,

  totalsLabelPx:    18,
  totalsValuePx:    18,

  slideKnobPx:        42,
  slideConfirmAt:     0.90,
  slideInsetStartPx:  1,
  slideInsetEndPx:    6,
  slideLabelPx:       16,
} as const;

/** === payment highlight (tint & glow) === */
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
  groupBgImage?: string;
  groupBgSize?: string;
  groupBgPos?: string;
};
export const PAY_SKIN: { default: PaySkinSpec; byKey: Record<string, PaySkinSpec> } = {
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
  const out: Record<string,string> = {};
  if (spec.groupBgImage) out["--group-bg-image"] = `url('${spec.groupBgImage}')`;
  if (spec.groupBgSize)  out["--group-bg-size"]  = spec.groupBgSize!;
  if (spec.groupBgPos)   out["--group-bg-pos"]   = spec.groupBgPos!;
  return out;
};