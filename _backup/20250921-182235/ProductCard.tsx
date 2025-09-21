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
      className="w-full text-left rounded-xl border border-neutral-200 dark:border-neutral-800 p-3 hover:bg-neutral-50 active:bg-neutral-100 dark:hover:bg-neutral-900 transition focus:outline-none focus:ring-2 focus:ring-black/20"
    >
      <div className="flex items-center gap-3">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-12 w-12 rounded-md object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-md bg-neutral-200 dark:bg-neutral-800" />
        )}
        <div className="flex-1 min-w-0">
          <div className="truncate text-sm font-medium">{product.name}</div>
          <div className="text-xs text-neutral-500">¥{product.price.toLocaleString()}</div>
        </div>
        <div className="text-xs px-2 py-1 rounded-full border border-neutral-300 dark:border-neutral-700">
          追加
        </div>
      </div>
    </button>
  );
}
