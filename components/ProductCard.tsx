"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import useSfxHowler from "../hooks/useSfxHowler";

export type Product = {
  id: number;
  name: string;
  price: number;
  allergens: string[];
  emoji?: string;
};

const yen = (n: number) => `¥${n.toLocaleString()}`;

export default function ProductCard({
  product,
  qty,
  onAdd,
}: {
  product: Product;
  qty: number;
  onAdd: () => void;
}) {
  const cardCtrl = useAnimation();
  const plusCtrl = useAnimation();
  const qtyCtrl  = useAnimation();
  const { playKey } = useSfxHowler();

  const handleAdd = async () => {
    playKey("high"); // ← iPhone通常キー寄り
    cardCtrl.start({ scale: [1, 0.985, 1.01, 1], transition: { duration: 0.26, ease: "easeOut" } });
    plusCtrl.start({ scale: [1, 0.86, 1.08, 1], rotate: [0, -2, 0, 0], transition: { duration: 0.30, ease: "easeOut" } });
    qtyCtrl.start({  scale: [1, 1.15, 1], transition: { duration: 0.22, ease: "easeOut" } });
    onAdd();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <motion.div animate={cardCtrl} className="flex items-stretch p-4 bg-white rounded-2xl shadow-lg overflow-hidden h-28 md:h-32">
      <div className="self-center w-24 h-24 md:w-28 md:h-28 rounded-xl bg-gray-200 flex items-center justify-center text-4xl md:text-5xl shrink-0">
        <span aria-hidden>{product.emoji ?? "🍽️"}</span>
      </div>

      <div className="flex-1 min-w-0 px-4 py-1">
        <div className="text-xl md:text-2xl font-semibold truncate">{product.name}</div>
        <div className="text-lg md:text-xl text-gray-700 mt-0.5">{yen(product.price)}</div>
        <div className="flex flex-wrap gap-2 mt-2">
          {product.allergens.map((a) => (
            <span key={a} className="text-xs md:text-sm px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-gray-700">
              {a}
            </span>
          ))}
        </div>
      </div>

      <div className="relative w-40 md:w-52">
        <div className="absolute inset-y-3 left-0 w-px bg-gray-200 pointer-events-none" aria-hidden />
        <motion.button
          type="button"
          onClick={handleAdd}
          onKeyDown={onKey}
          whileTap={{ scale: 0.98 }}
          className="h-full w-full cursor-pointer select-none flex flex-col items-center justify-center outline-none rounded-none"
          aria-label={`${product.name} を追加`}
          title="右側をタップで追加"
        >
          <motion.div animate={plusCtrl} className="text-emerald-600 text-5xl md:text-6xl leading-none font-extrabold">＋</motion.div>
          <motion.div animate={qtyCtrl}  className="mt-1 text-emerald-700 text-base md:text-lg font-semibold tabular-nums">× {qty}</motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}
