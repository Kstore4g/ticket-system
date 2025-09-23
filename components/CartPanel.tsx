import React from "react";
import { LAYOUT, payVars, payGroupVars } from "../lib/layout";
import type { Product } from "../data/catalog";
import SlideToPay from "./SlideToPay";

type CartItem = { product: Product; qty: number };

type CartPanelProps = {
  items: CartItem[];
  onInc: (id: string) => void;
  onDec: (id: string) => void;
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
      {/* 支払い方法（発光＋背景スキン） */}
      <div
        className={"ios-section p-2 " + (selectedPay ? "glow-box" : "")}
        style={selectedPay ? ({
          ...(payVars(selectedPay) as any),
          ...(payGroupVars(selectedPay) as any),
          backgroundImage: "var(--group-bg-image)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "var(--group-bg-size, cover)",
          backgroundPosition: "var(--group-bg-pos, center center)"
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

      {/* カート大ブロック（内末尾に合計） */}
      <div className="ios-section flex-1 overflow-auto flex flex-col">
        <div className="flex-1 overflow-auto">
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
                    onClick={() => onDec(it.product.id)}
                    className="btn-round-sm"
                    aria-label={it.product.name + " を1つ減らす"}
                    style={{ width: LAYOUT.plusMinusPx, height: LAYOUT.plusMinusPx, fontSize: LAYOUT.plusMinusFontPx }}
                  >−</button>
                  <div className="text-center" style={{ width: LAYOUT.cartQtyWidthPx, fontSize: LAYOUT.cartQtyFontPx }}>{it.qty}</div>
                  <button
                    type="button"
                    onClick={() => onInc(it.product.id)}
                    className="btn-round-sm"
                    aria-label={it.product.name + " を1つ増やす"}
                    style={{ width: LAYOUT.plusMinusPx, height: LAYOUT.plusMinusPx, fontSize: LAYOUT.plusMinusFontPx }}
                  >＋</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 合計（大ブロックの最下部） */}
        <div className="ios-sep px-3 py-2 flex items-center justify-between">
          <span className="text-sm" style={{ fontSize: LAYOUT.totalsLabelPx, color: "var(--text-muted)" }}>合計</span>
          <span className="font-semibold" style={{ fontSize: LAYOUT.totalsValuePx }}>¥{total.toLocaleString()}</span>
        </div>
      </div>

      {/* スライダー（独立ブロック・最下段） */}
      <div className="ios-section px-3 py-3">
        <SlideToPay onConfirm={onConfirm} />
      </div>
    </div>
  );
}