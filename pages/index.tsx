import { useState } from "react";
import TopBar from "../components/TopBar";

type Payment = "CARD" | "QR" | "CASH";

const categories = [
  { id: 1, name: "セットメニュー" },
  { id: 2, name: "単品" },
  { id: 3, name: "ドリンク" },
  // ここに増やすと自動で円形に均等配置されます
];

function getCirclePosition(index: number, total: number, radius: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // 上から開始
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const radius = 150; // 中央からの距離(px)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 上部タスクバー（いつでも支払い方法変更可） */}
      <TopBar payment={payment} onChange={setPayment} />

      {/* 本文。TopBar が fixed なので上に余白を入れる */}
      <main className="relative flex items-center justify-center pt-24 h-[calc(100vh-6rem)]">
        <div className="relative w-[420px] h-[420px]">
          {categories.map((cat, i) => {
            const { x, y } = getCirclePosition(i, categories.length, radius);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`absolute w-24 h-24 rounded-full flex items-center justify-center font-bold shadow-lg text-center transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(${x}px, ${y}px)`,
                  padding: 0,
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
