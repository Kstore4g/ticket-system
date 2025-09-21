import React from "react";
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
    { id: "qr", name: "QR" },
  ],
}: CartPanelProps) {
  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <div className="h-full flex flex-col gap-2">
      {/* 支払い方法：丸アイコン（36px） */}
      <div className="flex items-center gap-3 px-1">
        {paymentMethods.map((m) => (
          <div key={m.id} className="flex flex-col items-center gap-1">
            <div className="h-9 w-9 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[11px]">
              {m.icon ? <span>{m.icon}</span> : <span>{m.name[0]}</span>}
            </div>
            <div className="text-[10px] text-neutral-600 dark:text-neutral-400 leading-none">{m.name}</div>
          </div>
        ))}
      </div>

      {/* 注文リスト */}
      <div className="flex-1 overflow-auto rounded-md border border-neutral-300 dark:border-neutral-700 p-2">
        {items.length === 0 ? (
          <div className="text-[12px] text-neutral-500">まだ商品がありません</div>
        ) : (
          <ul className="space-y-1.5">
            {items.map((it) => (
              <li key={it.product.id} className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm leading-tight">{it.product.name}</div>
                  <div className="text-[11px] text-neutral-500 leading-tight">¥{it.product.price.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onDec(it.product.id)}
                    className="h-5 w-5 text-[11px] rounded-full border border-neutral-300 dark:border-neutral-700"
                    aria-label="decrease"
                  >
                    −
                  </button>
                  <div className="w-6 text-center text-xs">{it.qty}</div>
                  <button
                    onClick={() => onInc(it.product.id)}
                    className="h-5 w-5 text-[11px] rounded-full border border-neutral-300 dark:border-neutral-700"
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
      <div className="flex items-center justify-between text-[13px] px-1">
        <span>合計</span>
        <span className="font-semibold">¥{total.toLocaleString()}</span>
      </div>

      {/* スライドして決済（常に下部） */}
      <div className="pb-1">
        <SlideToConfirm onConfirm={onConfirm} />
      </div>
    </div>
  );
}
