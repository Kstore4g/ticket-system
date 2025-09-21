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
    <div className="h-screen w-screen overflow-hidden bg-[#f5f5f7]">
      <div className="flex h-full gap-2 p-2">
        {/* 左カラム（iOS風サイドセクション） */}
        <aside className="w-[140px] ios-section p-2 hidden sm:block">
          <div className="text-[12px] font-semibold mb-2">カテゴリ</div>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left text-[13px] px-2 py-1 rounded-xl ring-1 ring-black/5 ${
                  selectedCategory===null ? "bg-neutral-100" : "hover:bg-neutral-50"
                }`}
              >
                すべて
              </button>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setSelectedCategory(c.id)}
                  className={`w-full text-left text-[13px] px-2 py-1 rounded-xl ring-1 ring-black/5 ${
                    selectedCategory===c.id ? "bg-neutral-100" : "hover:bg-neutral-50"
                  }`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* 中央（可変）：白カードのグリッド */}
        <main className="flex-1 overflow-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 pr-1">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={onAdd} />
            ))}
          </div>
        </main>

        {/* 右カラム（注文） */}
        <aside className="w-[300px] ios-section p-2">
          <CartPanel items={items} onInc={onInc} onDec={onDec} onConfirm={onConfirm} />
        </aside>
      </div>
    </div>
  );
}
