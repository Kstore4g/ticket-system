import React, { useState } from "react";
import SlideToConfirm from "./SlideToConfirm";
import type { Product } from "./ProductCard";

type CartItem = { product: Product; qty: number };

type CartPanelProps = {
  items: CartItem[];
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onConfirm: () => void;
  paymentMethods?: { id: string; name: string; icon?: string }[];
};

export default function CartPanel({
  items,
  onInc,
  onDec,
  onConfirm,
  paymentMethods = [
    { id: "cash", name: "現金" },
    { id: "card", name: "カード" },
    { id: "qr",  name: "QR"    },
  ],
}: CartPanelProps) {
  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  // 選択中の支払い方法（初期は先頭）
  const [selectedPay, setSelectedPay] = useState<string>(paymentMethods[0]?.id ?? "");
  const selectedPayName = paymentMethods.find(m => m.id === selectedPay)?.name ?? "—";

  return (
    <div className="h-full flex flex-col gap-3">
      {/* 支払い方法：左に変更UI、右に現在選択中 */}
      <div className="ios-section p-2">
        <div className="flex items-center justify-between gap-2">
          {/* 変更UI（アイコン＋ラベル） */}
          <div className="flex items-center gap-4 flex-wrap">
            {paymentMethods.map((m) => {
              const active = m.id === selectedPay;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedPay(m.id)}
                  className="flex flex-col items-center gap-1 focus:outline-none"
                  role="radio"
                  aria-checked={active}
                  aria-label={`支払い方法 ${m.name}`}
                >
                  <div className={`ios-round h-9 w-9 flex items-center justify-center text-[11px] ${active ? "ring-black/20 shadow-md" : ""}`}>
                    {m.icon ? <span>{m.icon}</span> : <span>{m.name[0]}</span>}
                  </div>
                  <div className={`text-[10px] ${active ? "text-neutral-900" : "text-neutral-600"}`}>{m.name}</div>
                </button>
              );
            })}
          </div>

          {/* 右側：現在選択中 */}
          <div className="shrink-0 flex items-center gap-2 text-[12px] text-neutral-600">
            <span>選択中</span>
            <span className="ios-chip">{selectedPayName}</span>
          </div>
        </div>
      </div>

      {/* 注文リスト */}
      <div className="ios-section flex-1 overflow-auto">
        {items.length === 0 ? (
          <div className="p-3 text-[12px] text-neutral-500">まだ商品がありません</div>
        ) : (
          <ul>
            {items.map((it, idx) => (
              <li key={it.product.id} className={`px-3 py-2 ${idx>0 ? "ios-sep" : ""} flex items-center gap-2`}>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-[13px]">{it.product.name}</div>
                  <div className="text-[11px] text-neutral-500">¥{it.product.price.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onDec(it.product.id)}
                    className="ios-btn-round"
                    aria-label="decrease"
                  >
                    −
                  </button>
                  <div className="w-6 text-center text-xs">{it.qty}</div>
                  <button
                    onClick={() => onInc(it.product.id)}
                    className="ios-btn-round"
                    aria-label="increase"
                  >
                    ＋
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 合計 */}
      <div className="ios-section px-3 py-2 flex items-center justify-between">
        <span className="text-[13px]">合計</span>
        <span className="text-[15px] font-semibold">¥{total.toLocaleString()}</span>
      </div>

      {/* スライドして決済 */}
      <SlideToConfirm onConfirm={onConfirm} />
    </div>
  );
}
