import React from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  allergy?: string[]; // アレルギー表示用
};

type ProductCardProps = {
  product: Product;
  qty?: number;               // 現在の注文個数を受け取る
  onAdd: (p: Product) => void;
};

export default function ProductCard({ product, qty = 0, onAdd }: ProductCardProps) {
  return (
    <button
      onClick={() => onAdd(product)}
      className="ios-surface w-full p-2 hover:shadow-md active:scale-[0.99] transition focus:outline-none focus:ring-2 focus:ring-black/10 text-left"
      aria-label={`${product.name} を追加`}
    >
      <div className="flex items-center gap-3">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-12 w-12 rounded-xl object-cover ring-1 ring-black/10"
          />
        ) : (
          <div className="h-12 w-12 rounded-xl bg-neutral-100 ring-1 ring-black/10" />
        )}

        {/* 商品名・価格・アレルギー */}
        <div className="flex-1 min-w-0">
          <div className="truncate text-[14px] font-semibold leading-tight">{product.name}</div>
          <div className="text-[12px] text-neutral-600 leading-tight">¥{product.price.toLocaleString()}</div>
          {product.allergy?.length ? (
            <div className="flex flex-wrap gap-1 mt-1">
              {product.allergy.slice(0, 6).map((al) => (
                <span key={al} className="ios-chip">{al}</span>
              ))}
            </div>
          ) : null}
        </div>

        {/* 現在の注文個数（ピル型バッジ） */}
        <div className="shrink-0">
          <div className="min-w-[28px] h-7 px-2 rounded-full bg-white ring-1 ring-black/10 shadow flex items-center justify-center text-[12px]">
            {qty}
          </div>
        </div>
      </div>
    </button>
  );
}
