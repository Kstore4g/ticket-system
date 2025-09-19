import { useState } from 'react';

const categories = [
  { id: 1, name: 'セットメニュー' },
  { id: 2, name: '単品' },
  { id: 3, name: 'ドリンク' },
  // ここに追加カテゴリを入れると自動で円形に並ぶ
];

function getCirclePosition(index: number, total: number, radius: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // 上からスタート
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return { x, y };
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const radius = 150; // 中央からの距離

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 relative">
      {categories.map((cat, i) => {
        const { x, y } = getCirclePosition(i, categories.length, radius);
        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`absolute w-24 h-24 rounded-full flex items-center justify-center font-bold shadow-lg text-center transition-colors ${
              selectedCategory === cat.id ? 'bg-blue-500 text-white' : 'bg-white text-black'
            }`}
            style={{
              transform: `translate(${x}px, ${y}px)`,
              padding: 0,
            }}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
