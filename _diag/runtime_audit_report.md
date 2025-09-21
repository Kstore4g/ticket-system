# Runtime Audit Report

- RepoRoot: C:/Users/Ipeei/ticket-system
- next version: (unknown)
- has app/ : False
- has pages/ : True
- route candidates present:
  - pages/index.tsx


## tsconfig paths
null

## Key targets (hash & head lines)

### components/ProductCard.tsx
- MD5: b5b1d51b517a8963a9799859ab3df90d
- FirstLines:
```
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
    // 自身にフォーカスがある場合のみ有効
    if (e.currentTarget !== document.activeElement) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onAdd(product);
    }
  };

  return (
    <button
      type="button"
```


### components/CartPanel.tsx
- MD5: f3aa07614ca63886fdaa7a13311f4a66
- FirstLines:
```
import React, { useState } from "react";
import SlideToConfirm from "./SlideToConfirm";
import type { Product } from "./ProductCard";

type CartItem = { product: Product; qty: number };

type CartPanelProps = {
  items: CartItem[];
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onConfirm: () => void;
  paymentMethods?: { id: string; name: string; icon?: string }[];
};

export default function CartPanel({
  items,
  onInc,
  onDec,
  onConfirm,
  paymentMethods = [
    { id: "cash", name: "現金" },
    { id: "card", name: "カード" },
    { id: "qr",  name: "QR"    },
  ],
}: CartPanelProps) {
  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  // 選択中の支払い方法（初期は先頭）
  const [selectedPay, setSelectedPay] = useState<string>(paymentMethods[0]?.id ?? "");
  const selectedPayName = paymentMethods.find(m => m.id === selectedPay)?.name ?? "—";
```


### components/SlideToConfirm.tsx
- MD5: 9caa94339ab7a669dd3c49ba0df80ad2
- FirstLines:
```
import React, { useRef, useState, useEffect } from "react";

type SlideToConfirmProps = {
  onConfirm: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export default function SlideToConfirm({
  onConfirm,
  disabled = false,
  label = "スライドして決済",
  className = "",
}: SlideToConfirmProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState(0); // 0..1
  const knobPx = 32;
  const confirmAt = 0.9;

  useEffect(() => {
    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging || !trackRef.current) return;
      // タッチスクロール抑止
      if ((e as TouchEvent).touches) {
        (e as TouchEvent).preventDefault();
      }
      const rect = trackRef.current.getBoundingClientRect();
      const clientX =
```


### pages/index.tsx
- MD5: 52c6b1613d369b0ec11a7ddb00d531af
- FirstLines:
```
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

  const products = useMemo(() => {
    return ALL_PRODUCTS.filter((it) => it.cat === selectedCategory).map(({ cat, ...p }) => p);
  }, [selectedCategory]);

  const onAdd = (p: Product) => {
    setItems((prev) => {
```


### pages/_app.tsx
- MD5: 6f5487f29d82b559df8f79a77ac364a5
- FirstLines:
```
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}


```


## Duplicate-named components (anywhere)

### ProductCard
- C:\Users\Ipeei\ticket-system\_backup\20250921-181721\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182235\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182919\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-183554\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-183818\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184359\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184902\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\components\ProductCard.tsx


### CartPanel
- C:\Users\Ipeei\ticket-system\_backup\20250921-181721\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182235\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182919\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184132\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184359\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184902\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\components\CartPanel.tsx


### SlideToConfirm
- C:\Users\Ipeei\ticket-system\_backup\20250921-181721\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182235\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182919\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184359\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184902\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\components\SlideToConfirm.tsx


## Potential global handlers (document/window addEventListener)
- C:\Users\Ipeei\ticket-system\_backup\20250921-181721\_app.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-181721\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182235\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182919\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184359\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184902\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\.next\server\pages\index.js
- C:\Users\Ipeei\ticket-system\.next\static\chunks\pages\index.js
- C:\Users\Ipeei\ticket-system\.next\static\chunks\main.js
- C:\Users\Ipeei\ticket-system\.next\static\chunks\polyfills.js
- C:\Users\Ipeei\ticket-system\components\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\public\sw.js

## Files containing onClick={ ... } (first match per file)
- C:\Users\Ipeei\ticket-system\_backup\20250921-181721\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-181721\index.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-181721\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182235\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182235\index.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182235\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182919\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182919\index.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-182919\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-183224\index.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-183554\index.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-183554\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-183818\index.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-183818\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184132\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184359\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184359\index.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184359\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184902\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-184902\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\components\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\components\CategoryDock.tsx
- C:\Users\Ipeei\ticket-system\components\FullscreenToggle.tsx
- C:\Users\Ipeei\ticket-system\components\ProductCard.tsx
- C:\Users\Ipeei\ticket-system\components\TopBar.tsx
- C:\Users\Ipeei\ticket-system\pages\index.tsx

## Files mentioning pointerdown (first match per file)
- C:\Users\Ipeei\ticket-system\_backup\20250921-181721\CartPanel.tsx
- C:\Users\Ipeei\ticket-system\_backup\20250921-181721\SlideToConfirm.tsx
- C:\Users\Ipeei\ticket-system\.next\static\chunks\main.js

## pages/index.tsx imports
  import React, { useMemo, useState } from "react";
  import ProductCard, { type Product } from "../components/ProductCard";
  import CartPanel from "../components/CartPanel";
