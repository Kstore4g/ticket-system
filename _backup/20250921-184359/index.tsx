import React, { useMemo, useState } from "react";
import ProductCard, { type Product } from "../components/ProductCard";
import CartPanel from "../components/CartPanel";

type Item = { product: Product; qty: number };

/** 左カラム：丸アイコンカテゴリ（見た目のみ） */
const CATEGORIES: { id: string; name: string; icon?: string }[] = [
  { id: "set",    name: "セット",  icon: "🍔" },
  { id: "single", name: "単品",    icon: "🍟" },
  { id: "drink",  name: "ドリンク", icon: "🥤" },
];

/** デモ用：カテゴリ＋アレルギー付き */
type CatalogItem = Product & { cat: string };
const ALL_PRODUCTS: CatalogItem[] = [
  { id: "1", name: "ハンバーガー",   price: 500, cat: "set",    allergy: ["小麦","乳"] },
  { id: "2", name: "チーズバーガー", price: 600, cat: "set",    allergy: ["小麦","乳"] },
  { id: "3", name: "ポテト",         price: 300, cat: "single", allergy: [] },
  { id: "4", name: "ドリンク",       price: 200, cat: "drink",  allergy: [] },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0].id);
  const [items, setItems] = useState<Item[]>([]);

  // 選択カテゴリで絞り込み（Product 型で渡す）
  const products = useMemo(() => {
    return ALL_PRODUCTS
      .filter((it) => it.cat === selectedCategory)
      .map(({ cat, ...p }) => p);
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

  // 現在個数を取得するヘルパ
  const getQty = (id: string) => items.find((it) => it.product.id === id)?.qty ?? 0;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f5f5f7]">
      <div className="flex h-full gap-2 p-2">
        {/* 左：丸いカテゴリアイコン（見出し・すべて無し） */}
        <aside className="w-[140px] ios-section p-2 hidden sm:block">
          <div className="grid auto-rows-min gap-3 place-items-center">
            {CATEGORIES.map((c) => {
              const active = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className="flex flex-col items-center gap-1 focus:outline-none"
                >
                  <div className={`ios-round h-12 w-12 flex items-center justify-center text-lg ${active ? "ring-black/20 shadow-md" : ""}`}>
                    {c.icon ?? c.name[0]}
                  </div>
                  <div className={`text-[10px] ${active ? "text-neutral-900" : "text-neutral-600"}`}>
                    {c.name}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* 中央：1行リスト（行全体タップで追加） */}
        <main className="flex-1 overflow-auto">
          <div className="flex flex-col gap-2 pr-1">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                qty={getQty(p.id)}  // ← 現在の注文個数を表示
                onAdd={onAdd}
              />
            ))}
          </div>
        </main>

        {/* 右：注文パネル */}
        <aside className="w-[300px] ios-section p-2">
          <CartPanel items={items} onInc={onInc} onDec={onDec} onConfirm={onConfirm} />
        </aside>
      </div>
    </div>
  );
}
