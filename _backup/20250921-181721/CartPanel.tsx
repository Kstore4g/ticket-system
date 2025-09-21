import React, { useEffect, useMemo, useRef, useState } from "react";

type Product = { id: number; name: string; price: number; emoji?: string; image?: string | null };
type CartItem = { product: Product; qty: number };

type Props = {
  items: CartItem[];
  onInc: (id: number) => void;
  onDec: (id: number) => void;
  onConfirm: () => void;
  getCategoryIcon?: (id: number) => string;   // 互換用
  getProductIcon?: (p: Product) => React.ReactNode;
};

export default function CartPanel({ items, onInc, onDec, onConfirm, getCategoryIcon, getProductIcon }: Props) {
  console.debug("CartPanel loaded: mobile-v4");
  const total = useMemo(() => items.reduce((s, it) => s + it.product.price * it.qty, 0), [items]);

  return (
    <div className="rounded-2xl bg-white shadow p-3 flex flex-col gap-3" data-cartpanel="mobile-v4">
      <div className="font-semibold">注文</div>

      {items.length === 0 ? (
        <p className="text-sm opacity-70">選択した商品はまだありません</p>
      ) : (
        <ul className="space-y-2">
          {items.map(({ product, qty }) => {
            const iconNode =
              (getProductIcon && getProductIcon(product)) ||
              (product.image ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" /> : null);

            return (
              <li key={product.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-gray-100 grid place-items-center text-lg shrink-0 overflow-hidden">
                    {iconNode ? iconNode : <span>{product.emoji ?? (getCategoryIcon?.(product.id) ?? "🛍️")}</span>}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate">{product.name}</div>
                    <div className="text-xs opacity-70">¥{product.price.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button aria-label="dec" onClick={() => onDec(product.id)}
                          className="w-6 h-6 rounded-full bg-gray-200 grid place-items-center text-xs leading-none select-none active:scale-95">−</button>
                  <span className="w-6 text-center tabular-nums">{qty}</span>
                  <button aria-label="inc" onClick={() => onInc(product.id)}
                          className="w-6 h-6 rounded-full bg-gray-200 grid place-items-center text-xs leading-none select-none active:scale-95">＋</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex items-center justify-between">
        <div className="font-semibold">合計</div>
        <div>¥{total.toLocaleString()}</div>
      </div>

      <SlideToPay
        disabled={items.length === 0}
        label={items.length === 0 ? "カートが空です" : "スライドして決済"}
        onConfirm={onConfirm}
      />
    </div>
  );
}

function SlideToPay({ disabled, label, onConfirm }: { disabled: boolean; label: string; onConfirm: () => void; }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);
  const [dragging, setDragging] = useState(false);

  const KNOB = 40;  // ノブ直径
  const PAD  = 12;  // トラック左右余白

  useEffect(() => { if (disabled) setPos(0); }, [disabled]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const track = trackRef.current; if (!track) return;
    const rect = track.getBoundingClientRect();
    const usable = rect.width - KNOB - PAD*2;
    if (usable <= 0) return;
    let x = e.clientX - rect.left - PAD - KNOB/2; // ノブ中心をドラッグ
    x = Math.max(0, Math.min(x, usable));
    setPos(x/usable);
  };
  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    if (pos >= 0.9) { setPos(1); onConfirm(); setTimeout(() => setPos(0), 200); }
    else { setPos(0); }
  };

  const left = "calc(" + (pos*100).toFixed(1) + "% - " + (KNOB/2) + "px)";

  return (
    <div className="mt-1">
      <div
        ref={trackRef}
        className={`relative h-12 rounded-full ${disabled ? "bg-gray-200 opacity-60" : "bg-gray-100"}`}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="slider" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos*100)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "ArrowRight") setPos(p => Math.min(1, p+0.1));
          if (e.key === "ArrowLeft")  setPos(p => Math.max(0, p-0.1));
          if (e.key === "Enter" && pos >= 0.9) { onConfirm(); setPos(0); }
        }}
      >
        <div className="absolute inset-0 grid place-items-center pointer-events-none text-sm text-gray-700">{label}</div>
        <div
          onPointerDown={onPointerDown}
          className={`absolute top-1/2 -translate-y-1/2 rounded-full shadow grid place-items-center text-white select-none touch-none ${disabled ? "bg-gray-500" : "bg-black"}`}
          style={{ width: KNOB, height: KNOB, left, transition: dragging ? "none" : "left 160ms ease" }}
        >▶</div>
      </div>
    </div>
  );
}
