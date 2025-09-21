import { useEffect } from 'react';
import { useMemo, useState } from "react";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import TopBar, { Payment, methods } from "../components/TopBar";
import CategoryDock, { Category } from "../components/CategoryDock";
import ProductCard, { Product } from "../components/ProductCard";
import CartPanel from "../components/CartPanel";
import useClickSound from "../hooks/useClickSound";

const icons: Record<Payment, string> = { CARD: "💳", QR: "📱", CASH: "💴" };

const categories: Category[] = [
  { id: 1, name: "セットメニュー", emoji: "🍱" },
  { id: 2, name: "単品",         emoji: "🍔" },
  { id: 3, name: "ドリンク",     emoji: "🥤" },
];

// ダミー商品
const productsByCategory: Record<number, Product[]> = {
  1: [
    { id: 101, name: "Aセット（バーガー＋ポテト＋ドリンク）", price: 850, allergens: ["小麦", "乳"], emoji: "🍔" },
    { id: 102, name: "Bセット（チキン＋サラダ＋ドリンク）",   price: 920, allergens: ["卵"],       emoji: "🍗" },
  ],
  2: [
    { id: 201, name: "チーズバーガー", price: 380, allergens: ["小麦", "乳"], emoji: "🧀" },
    { id: 202, name: "フライドポテト", price: 260, allergens: [],             emoji: "🍟" },
    { id: 203, name: "からあげ",       price: 320, allergens: ["小麦"],       emoji: "🍗" },
  ],
  3: [
    { id: 301, name: "コーラ",     price: 200, allergens: [], emoji: "🥤" },
    { id: 302, name: "オレンジ",   price: 200, allergens: [], emoji: "🧃" },
    { id: 303, name: "ホットコーヒー", price: 250, allergens: [], emoji: "☕" },
  ],
};

function getCirclePosition(index: number, total: number, radius: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}

const SPRING = { type: "spring", mass: 0.7, stiffness: 300, damping: 22, restDelta: 0.001 };
const ENTER_SPRING = { type: "spring", stiffness: 160, damping: 18, mass: 0.8 };

export default function Home() {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<Record<number, number>>({});
  const playClick = useClickSound(0.22); // ← クリック音

  const allProductsMap = useMemo(() => {
    const m = new Map<number, Product>();
    Object.values(productsByCategory).flat().forEach(p => m.set(p.id, p));
    return m;
  }, []);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([, q]) => q > 0)
      .map(([id, q]) => ({ product: allProductsMap.get(Number(id))!, qty: q }));
  }, [cart, allProductsMap]);

    // Responsive radius to fit on any device (iPad/iPhone/desktop)
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  useEffect(() => {
    const onResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const ICON = 96;   // 1個のカテゴリボタンの直径(px)に合わせて調整
  const MARGIN = 24; // 画面端との安全マージン(px)
  const radius = Math.max(72, Math.min(vw, vh) / 2 - ICON / 2 - MARGIN);

  const inc = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const dec = (id: number) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) - 1) }));

  const onConfirm = () => {
    const total = cartItems.reduce((s, it) => s + it.product.price * it.qty, 0);
    alert(`注文を確定しました。\n支払い方法：${payment ?? "未選択"}\n合計：¥${total.toLocaleString()}\n→ 精算へ進みます`);
    // TODO: 精算ページへ遷移 / API 呼び出し
  };

  return (
    <LayoutGroup>
      <div className="min-h-[100svh] bg-gray-100 px-4 py-3">

        {/* 支払い選択（初回のみ中央） */}
        <AnimatePresence>
          {payment === null && (
            <motion.div
              key="center-pay"
              className="min-h-[40vh] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-8">
                {methods.map((m) => (
                  <motion.button
                    key={m}
                    layoutId={`pay-${m}`}
                    transition={SPRING}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => { playClick(); setPayment(m); }}  // ← 音＋選択
                    className="w-20 h-20 rounded-full bg-white text-black text-2xl shadow-lg border border-gray-300 focus:outline-none"
                    title={m}
                  >
                    {icons[m]}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* カテゴリ未選択：中央に円（ズレ防止） */}
        {payment !== null && selectedCategory === null && (
          <div className="mt-2 flex justify-center">
            <motion.div
              key="circle"
              className="relative w-[520px] h-[520px]"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={ENTER_SPRING}
            >
              {categories.map((cat, i, arr) => {
                const { x, y } = getCirclePosition(i, arr.length, 170);
                return (
                  <div
                    key={cat.id}
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                    }}
                  >
                    <motion.button
                      layoutId={`cat-${cat.id}`} // 左ドックへ移動
                      onClick={() => setSelectedCategory(cat.id)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-28 h-28 rounded-full bg-white text-black shadow-lg border border-gray-200 font-semibold text-lg"
                    >
                      <div className="text-4xl">{cat.emoji}</div>
                      <div className="text-xs mt-1 text-gray-700">{cat.name}</div>
                    </motion.button>
                  </div>
                );
              })}
            </motion.div>
          </div>
        )}

        {/* カテゴリ選択後：3カラム（左ドック／中央リスト／右：支払いバー＋注文） */}
        {payment !== null && selectedCategory !== null && (
          <div className="grid grid-cols-[100px,1fr,400px] gap-8 mt-2">
            {/* 左：ドック（上詰め） */}
            <div className="pt-1">
              <CategoryDock
                categories={categories}
                selectedId={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            {/* 中央：商品リスト（上詰め、タブレット大きめ） */}
            <div className="space-y-4">
              {(productsByCategory[selectedCategory] ?? []).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  qty={cart[p.id] ?? 0}
                  onAdd={() => inc(p.id)}
                />
              ))}
            </div>

            {/* 右：支払いバー（上）＋ 注文パネル（下） */}
            <div className="pt-1 space-y-3">
              <TopBar payment={payment} onChange={setPayment} />
              <CartPanel
                items={cartItems}
                onInc={(id) => inc(id)}
                onDec={(id) => dec(id)}
                onConfirm={onConfirm}
              />
            </div>
          </div>
        )}
      </div>
    </LayoutGroup>
  );
}




