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
      className="w-full text-left rounded-lg border border-neutral-300 dark:border-neutral-700 p-2 hover:bg-neutral-50 active:bg-neutral-100 dark:hover:bg-neutral-900 transition focus:outline-none focus:ring-2 focus:ring-black/10"
    >
      <div className="flex items-center gap-2">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.name} className="h-10 w-10 rounded-md object-cover" />
        ) : (
          <div className="h-10 w-10 rounded-md bg-neutral-200 dark:bg-neutral-800" />
        )}
        <div className="flex-1 min-w-0">
          <div className="truncate text-[13px] font-medium leading-tight">{product.name}</div>
          <div className="text-[11px] text-neutral-500 leading-tight">¥{product.price.toLocaleString()}</div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 whitespace-nowrap">
          追加
        </span>
      </div>
    </button>
  );
}
