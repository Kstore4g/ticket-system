import React, { useMemo, useState } from "react";
import ProductCard, { type Product } from "../components/ProductCard";
import CartPanel from "../components/CartPanel";

type Item = { product: Product; qty: number };

const ALL_PRODUCTS: Product[] = [
  { id: "1", name: "ハンバーガー", price: 500 },
  { id: "2", name: "チーズバーガー", price: 600 },
  { id: "3", name: "ポテト", price: 300 },
  { id: "4", name: "ドリンク", price: 200 },
];

const CATEGORIES = [
  { id: "set", name: "セット" },
  { id: "single", name: "単品" },
  { id: "drink", name: "ドリンク" },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  const products = useMemo(() => {
    return ALL_PRODUCTS;
  }, [selectedCategory]);

  const onAdd = (p: Product) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.product.id === p.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [...prev, { product: p, qty: 1 }];
    });
  };
  const onInc = (id: string) =>
    setItems((prev) => prev.map((it) => (it.product.id === id ? { ...it, qty: it.qty + 1 } : it)));
  const onDec = (id: string) =>
    setItems((prev) =>
      prev
        .map((it) => (it.product.id === id ? { ...it, qty: Math.max(0, it.qty - 1) } : it))
        .filter((it) => it.qty > 0)
    );
  const onConfirm = () => {
    alert("決済確定");
    setItems([]);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full">
        {/* 左カラム（固定幅：140px） */}
        <aside className="w-[140px] border-r border-neutral-300 dark:border-neutral-700 p-2 hidden sm:block">
          <div className="text-[12px] font-semibold mb-2">カテゴリ</div>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left text-[13px] px-2 py-1 rounded ${selectedCategory===null ? "bg-neutral-200 dark:bg-neutral-800" : "hover:bg-neutral-100 dark:hover:bg-neutral-900"}`}
              >
                すべて
              </button>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setSelectedCategory(c.id)}
                  className={`w-full text-left text-[13px] px-2 py-1 rounded ${selectedCategory===c.id ? "bg-neutral-200 dark:bg-neutral-800" : "hover:bg-neutral-100 dark:hover:bg-neutral-900"}`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* 中央カラム（可変）：余白最小、密度重視 */}
        <main className="flex-1 p-2 overflow-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={onAdd} />
            ))}
          </div>
        </main>

        {/* 右カラム（固定幅：300px） */}
        <aside className="w-[300px] border-l border-neutral-300 dark:border-neutral-700 p-2">
          <CartPanel items={items} onInc={onInc} onDec={onDec} onConfirm={onConfirm} />
        </aside>
      </div>
    </div>
  );
}
