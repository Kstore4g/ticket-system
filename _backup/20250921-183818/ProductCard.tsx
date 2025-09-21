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
  onAdd: (p: Product) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
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

        {/* 追加ボタン（行全体がボタンなので視覚上のピル。押しても追加） */}
        <span
          onClick={() => onAdd(product)}
          className="px-3 py-1 rounded-full bg-black text-white text-[12px] shadow active:scale-95"
        >
          追加
        </span>
      </div>
    </button>
  );
}
