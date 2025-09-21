import React from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  allergy?: string[];
};

type ProductCardProps = {
  product: Product;
  qty?: number;
  onAdd: (p: Product) => void;
};

export default function ProductCard({ product, qty = 0, onAdd }: ProductCardProps) {
  const handleActivate = () => onAdd(product);
  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.currentTarget !== document.activeElement) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onAdd(product);
    }
  };

  return (
    <button
      data-role="product-card"
      type="button"
      onClick={handleActivate}
      onKeyDown={onKeyDown}
      className="row-card"
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

        <div className="shrink-0">
          <div className="min-w-[28px] h-7 px-2 rounded-full bg-white ring-1 ring-black/10 shadow flex items-center justify-center text-[12px]">
            {qty}
          </div>
        </div>
      </div>
    </button>
  );
}
