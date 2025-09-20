import { useState } from "react";
import TopBar from "../components/TopBar";
import CategoryDock from "../components/CategoryDock";
import ProductCard from "../components/ProductCard";
import CartPanel from "../components/CartPanel";
import SlideToConfirm from "../components/SlideToConfirm";

const payments = [
  { id: "cash", label: "現金" },
  { id: "card", label: "カード" },
  { id: "code", label: "QR" },
];

const categories = [
  { id: "set", name: "セットメニュー" },
  { id: "single", name: "単品" },
  { id: "drink", name: "ドリンク" },
];

const products = [
  { id: "p1", name: "チーズバーガー", price: 680, cat: "single" },
  { id: "p2", name: "ダブルバーガー", price: 880, cat: "single" },
  { id: "p3", name: "ポテトM", price: 290, cat: "single" },
  { id: "p4", name: "コーラ", price: 200, cat: "drink" },
  { id: "p5", name: "セットA", price: 980, cat: "set" },
];

export default function Home() {
  const [payment, setPayment] = useState<string | null>(null);
  const [cat, setCat] = useState<string | null>(null);
  const [lines, setLines] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);

  const visible = products.filter(p => !cat || p.cat === cat);

  function add(id: string) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    setLines(prev => {
      const i = prev.findIndex(l => l.id === id);
      if (i >= 0) {
        const next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + 1 }; return next;
      }
      return [...prev, { id, name: p.name, price: p.price, qty: 1 }];
    });
  }

  function inc(id: string) { setLines(prev => prev.map(l => l.id===id ? { ...l, qty: l.qty+1 } : l)); }
  function dec(id: string) { setLines(prev => prev.map(l => l.id===id ? { ...l, qty: Math.max(0, l.qty-1) } : l).filter(l => l.qty>0)); }

  // 支払い/カテゴリ未選択時：中央に大きいアイコン横並び（簡易）
  if (!payment || !cat) {
    return (
      <div className="h-screen flex flex-col">
        <TopBar payments={payments} onSelect={setPayment} />
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <div className="flex gap-4">
            {(!payment ? payments : categories).map((x: any) => (
              <button
                key={x.id}
                className="text-2xl px-6 py-10 border rounded-3xl hover:shadow"
                onClick={() => payment ? setCat(x.id) : setPayment(x.id)}
              >
                {"label" in x ? x.label : x.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3カラム安定（左：カテゴリ / 中央：商品 / 右：注文）
  return (
    <div className="h-screen flex flex-col">
      <TopBar payments={payments} onSelect={setPayment} />
      <div className="flex-1 min-h-0 flex">
        {/* 左：カテゴリ（縦スクロール） */}
        <CategoryDock categories={categories} selectedId={cat} onSelect={setCat} />

        {/* 中央：商品リスト（flex-1 min-h-0 overflow-y-auto） */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4 grid grid-cols-2 gap-3">
          {visible.map(p => (
            <ProductCard key={p.id} name={p.name} price={p.price} onAdd={()=>add(p.id)}
              qty={lines.find(l => l.id===p.id)?.qty} />
          ))}
        </main>

        {/* 右：注文（縦スクロール + 下部 sticky 合計） */}
        <CartPanel lines={lines} onInc={inc} onDec={dec} />
      </div>

      {/* 右下固定のスライドボタン（簡易） */}
      <SlideToConfirm onConfirm={()=>console.log("confirmed")} />
    </div>
  );
}
