import React from "react";
import SlideToConfirm from "./SlideToConfirm";
import type { Product } from "./ProductCard";

const yen = (n: number) => `¥${n.toLocaleString()}`;

export default function CartPanel({
  items,
  onInc,
  onDec,
  onConfirm,
}: {
  items: { product: Product; qty: number }[];
  onInc: (id: number) => void;
  onDec: (id: number) => void;
  onConfirm: () => void;
}) {
  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <div className="bg-white rounded-xl shadow p-3 sticky top-4 max-h-[calc(100vh-5rem)] flex flex-col">
      <div className="font-semibold mb-2">注文</div>

      {/* 上詰めのスクロール領域 */}
      <div className="flex-1 overflow-auto space-y-2 pr-1">
        {items.length === 0 && (
          <div className="text-gray-500 text-sm">選択した商品はまだありません</div>
        )}
        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-xl">
              <span aria-hidden>{product.emoji ?? "🍽️"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate">{product.name}</div>
              <div className="text-xs text-gray-500">{yen(product.price)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onDec(product.id)}
                className="w-7 h-7 rounded-full border bg-white hover:bg-gray-50"
                aria-label="数量を減らす"
              >
                –
              </button>
              <div className="w-6 text-center tabular-nums">{qty}</div>
              <button
                onClick={() => onInc(product.id)}
                className="w-7 h-7 rounded-full border bg-white hover:bg-gray-50"
                aria-label="数量を増やす"
              >
                ＋
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 合計＋スライド確定（常に下に見える） */}
      <div className="mt-2 border-t pt-2">
        <div className="flex justify-between font-semibold">
          <span>合計</span>
          <span>{yen(total)}</span>
        </div>
        <SlideToConfirm onConfirm={onConfirm} disabled={items.length === 0} />
      </div>
    </div>
  );
}
