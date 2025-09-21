import React from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

type ProductCardProps = {
  product: Product;
  onAdd: (p: Product) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <button
      onClick={() => onAdd(product)}
      className="ios-surface w-full text-left p-3 hover:shadow-md active:scale-[0.99] transition focus:outline-none focus:ring-2 focus:ring-black/10"
    >
      <div className="flex items-center gap-3">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.name} className="h-12 w-12 rounded-xl object-cover ring-1 ring-black/10" />
        ) : (
          <div className="h-12 w-12 rounded-xl bg-neutral-100 ring-1 ring-black/10" />
        )}
        <div className="flex-1 min-w-0">
          <div className="truncate text-[13px] font-semibold leading-tight">{product.name}</div>
          <div className="text-[11px] text-neutral-500 leading-tight">¥{product.price.toLocaleString()}</div>
        </div>
        <span className="ios-chip whitespace-nowrap">追加</span>
      </div>
    </button>
  );
}
