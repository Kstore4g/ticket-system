import React, { useMemo, useState } from "react";
import ProductCard, { type Product } from "../components/ProductCard";
import CartPanel from "../components/CartPanel";

type Item = { product: Product; qty: number };

const CATEGORIES: { id: string; name: string; icon?: string }[] = [
  { id: "set",    name: "セット",  icon: "🍔" },
  { id: "single", name: "単品",    icon: "🍟" },
  { id: "drink",  name: "ドリンク", icon: "🥤" },
];

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
  const [selectedPay, setSelectedPay] = useState<string>("cash"); // ← 親にリフト

  const products = useMemo(() => {
    return ALL_PRODUCTS.filter((it) => it.cat === selectedCategory).map(({ cat, ...p }) => p);
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

  const getQty = (id: string) => items.find((it) => it.product.id === id)?.qty ?? 0;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f5f5f7]">
      <div className="flex h-full gap-2 p-2">
        {/* 左：カテゴリ（ラジオ風）— 中央への誤伝播を遮断 */}
        <aside
          className="w-[140px] ios-section p-2 hidden sm:block relative z-10"
          role="radiogroup"
          aria-label="カテゴリ"
          onClickCapture={(e) => e.stopPropagation()}
        >
          <div className="grid auto-rows-min gap-3 place-items-center">
            {CATEGORIES.map((c) => {
              const active = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className="flex flex-col items-center gap-1 ui-focus"
                  role="radio"
                  aria-checked={active}
                  aria-label={`カテゴリ ${c.name}`}
                >
                  <div className={`btn-radio-icon ${active ? "btn-radio-active" : ""}`}>
                    {c.icon ?? c.name[0]}
                  </div>
                  <div className={`btn-radio-label ${active ? "text-neutral-900" : ""}`}>{c.name}</div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* 中央：1行リスト（行全体タップで追加のみ） */}
        <main className="flex-1 overflow-auto relative z-0">
          <div className="flex flex-col gap-2 pr-1">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                qty={getQty(p.id)}
                onAdd={onAdd}
              />
            ))}
          </div>
        </main>

        {/* 右：注文パネル — 中央への誤伝播を遮断 */}
        <aside
          className="w-[300px] ios-section p-2 relative z-10"
          onClickCapture={(e) => e.stopPropagation()}
        >
          <CartPanel
            items={items}
            onInc={onInc}
            onDec={onDec}
            onConfirm={onConfirm}
            selectedPay={selectedPay}
            onChangePay={setSelectedPay}
          />
        </aside>
      </div>
    </div>
  );
}
