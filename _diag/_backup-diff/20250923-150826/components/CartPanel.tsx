import React from "react";
import { LAYOUT, payVars, payGroupVars } from "../lib/layout";
import type { Product } from "../data/catalog";
import SlideToConfirm from "./SlideToConfirm";

type CartItem = { product: Product; qty: number };

type CartPanelProps = {
  items: CartItem[];
  onInc: (e: React.MouseEvent, id: string) => void;
  onDec: (e: React.MouseEvent, id: string) => void;
  onConfirm: () => void;
  selectedPay: string;
  onChangePay: (id: string) => void;
  paymentMethods?: { id: string; name: string; icon?: string }[];
};

const isUrl = (s?: string) => !!s && /^https?:\/\//.test(s);
const glyphFor = (id: string) => {
  switch(id.toLowerCase()){
    case "cash":   return "現";
    case "card":   return "カ";
    case "paypay": return "Q";
    default:       return "・";
  }
};

export default function CartPanel({
  items,
  onInc,
  onDec,
  onConfirm,
  paymentMethods = [
    { id: "cash",   name: "現金"  },
    { id: "card",   name: "カード" },
    { id: "paypay", name: "PayPay"},
  ],
  selectedPay,
  onChangePay,
}: CartPanelProps) {
  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <div className="h-full flex flex-col gap-3">
      {/* 親ブロック：選択ごとに発光＋背景カバー */}
      <div
        className={"ios-section p-2 " + (selectedPay ? "glow-box" : "")}
        style={selectedPay ? ({
          ...(payVars(selectedPay) as any),
          ...(payGroupVars(selectedPay) as any),
          backgroundImage: 'var(--group-bg-image)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'var(--group-bg-size, cover)',
          backgroundPosition: 'var(--group-bg-pos, center center)'
        } as any) : undefined}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center flex-wrap" role="radiogroup" aria-label="支払い方法" style={{ gap: LAYOUT.paymentIconGapPx }}>
            {paymentMethods.map((m) => {
              const active = m.id === selectedPay;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onChangePay(m.id); }}
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  className="flex flex-col items-center gap-1 ui-focus"
                  role="radio"
                  aria-checked={active}
                >
                  {/* 円形アイコン：外側の発光のみ（内側の色付き枠は消す） */}
                  <div
                    className={"btn-radio-icon " + (active ? "glow-ring border border-transparent" : "border") + " transition-shadow"}
                    style={{
                      ...(active ? (payVars(m.id) as any) : {}),
                      width: LAYOUT.payIconPx,
                      height: LAYOUT.payIconPx,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: active ? "var(--pay-bg, var(--radio-bg))" : "var(--radio-bg)",
                      // 内側枠は付けない
                      borderColor: undefined,
                    }}
                  >
                    {isUrl(m.icon)
                      ? <img src={m.icon!} alt={m.name} style={{ width: LAYOUT.payIconPx * 0.6, height: LAYOUT.payIconPx * 0.6, objectFit: "contain" }} />
                      : <span aria-hidden="true" style={{ fontSize: LAYOUT.payIconPx * 0.5, fontWeight: 700, lineHeight: 1 }}>{glyphFor(m.id)}</span>}
                  </div>
                  <div className="btn-radio-label" style={{ fontSize: LAYOUT.paymentLabelPx }}>{m.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* カート一覧 */}
      <div className="ios-section flex-1 overflow-auto">
        {items.length === 0 ? (
          <div className="p-3" style={{ color: "var(--text-muted)", fontSize: 12 }}>まだ商品がありません</div>
        ) : (
          <ul>
            {items.map((it, idx) => (
              <li key={it.product.id} className={"px-3 py-2 " + (idx > 0 ? "ios-sep " : "") + "flex items-center gap-2"}>
                <div className="flex-1 min-w-0">
                  <div className="truncate" style={{ fontSize: LAYOUT.cartItemNamePx }}>{it.product.name}</div>
                </div>
                <button
                  type="button"
                  onClick={(e) => onDec(e, it.product.id)}
                  className="btn-round-sm"
                  aria-label={it.product.name + " を1つ減らす"}
                  style={{ width: LAYOUT.plusMinusPx, height: LAYOUT.plusMinusPx, fontSize: LAYOUT.plusMinusFontPx }}
                >−</button>
                <div className="text-center" style={{ width: LAYOUT.cartQtyWidthPx, fontSize: LAYOUT.cartQtyFontPx }}>{it.qty}</div>
                <button
                  type="button"
                  onClick={(e) => onInc(e, it.product.id)}
                  className="btn-round-sm"
                  aria-label={it.product.name + " を1つ増やす"}
                  style={{ width: LAYOUT.plusMinusPx, height: LAYOUT.plusMinusPx, fontSize: LAYOUT.plusMinusFontPx }}
                >＋</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 合計 & スライド決済 */}
      <div className="ios-section px-3 py-2 flex flex-col gap-2">
        <span className="font-semibold" style={{ fontSize: LAYOUT.totalsValuePx }}>¥{total.toLocaleString()}</span>
        <SlideToConfirm onConfirm={onConfirm} />
      </div>
    </div>
  );
}