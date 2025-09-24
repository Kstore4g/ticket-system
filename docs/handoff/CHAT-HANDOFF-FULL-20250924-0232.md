# ハンドオフ前提（必読・遵守）
あなたは私の開発アシスタントです。出力は最小＆安全な差分パッチとPowerShellコマンドのみ。曖昧質問はせず即時に完全回答で。バックグラウンド作業は禁止。

# 環境（実測）
Node: v22.19.0
npm : 10.9.3
TailwindCSS: 3.4.17
Branch: hotfix/glow-qty-20250924 (HEAD 7f7689fb776d)
Path: C:\Users\Ipeei\ticket-system
OS: Windows 11 + PowerShell 7

# 重要な契約（破るとNG）
- 右カラム＝ 支払い選択 → カート一覧（末尾に合計） → 最下段に独立スライダー
- スライダー：SlideToPay.tsx（iPad安定化：touchAction/ preventDefault / onPointerCancel / ResizeObserver）。旧 SlideToConfirm.tsx は残置・未使用
- 数量バッジ：ProductCard.tsx が qtyActiveVars() で --qty-bg を供給
- テーマ/寸法/Glow：lib/theme.ts（applyTheme）、lib/layout.ts（LAYOUT.*, payVars()/payGroupVars()）、styles/globals.css（.glow-*）

# 直近の検証
Verify: (no log)
（先頭抜粋）
(verify log not found)

# リポジトリ概要（集計 / _backup,_diag除外）
- files: 74, ts/tsx: 18, css: 1, pages: 7, components: 16, lib: 2

## FILE MAP (preview)
.gitignore
README.md
components/CartPanel.tsx
components/CartPanel.tsx.bak
components/CartPanel.tsx.bak.mobile
components/CartPanel.tsx.bak.simple
components/CartPanel.tsx.bak.slide
components/CategoryDock.tsx
components/FullscreenToggle.tsx
components/ProductCard.tsx
components/SlideToConfirm.tsx
components/SlideToConfirm.tsx.bak.elegant
components/SlideToConfirm.tsx.bak.premium
components/SlideToConfirm.tsx.bak.replace
components/SlideToPay.tsx
components/SlideToPay.tsx.bak
components/ThemeProvider.tsx
components/TopBar.tsx
data/catalog.ts
docs/CHECKLIST.md
docs/CONTRACTS.md
docs/HANDOFF-20250923.md
docs/REPO-TREE-20250923.txt
docs/REPO-TREE-20250924.txt
docs/SMOKE-TEST.md
docs/diffs/20250924-013526-glow-qty-start.names.txt
docs/diffs/20250924-013526-glow-qty-start.patch
docs/diffs/20250924-013526-glow-qty-start.status.txt
docs/diffs/20250924-013546-glow-qty-pre-commit.names.txt
docs/diffs/20250924-013546-glow-qty-pre-commit.patch
docs/diffs/20250924-013546-glow-qty-pre-commit.status.txt
docs/diffs/20250924-013927-glow-qty-start.names.txt
docs/diffs/20250924-013927-glow-qty-start.patch
docs/diffs/20250924-013927-glow-qty-start.status.txt
docs/diffs/20250924-013950-glow-qty-pre-commit.names.txt
docs/diffs/20250924-013950-glow-qty-pre-commit.patch
docs/diffs/20250924-013950-glow-qty-pre-commit.status.txt
docs/sessions/20250924-0135-hotfix-glow-qty-20250924.md
docs/sessions/20250924-0139-hotfix-glow-qty-20250924.md
docs/verify/verify-20250924-013526.txt
docs/verify/verify-20250924-013546.txt
docs/verify/verify-20250924-013927.txt
docs/verify/verify-20250924-013950.txt
gh-links.txt
hooks/useClickSound.ts
hooks/useSfxHowler.ts
hooks/useZzfxSfx.ts
lib/layout.ts
lib/theme.ts
next-env.d.ts
package-lock.json
package.json
pages/_app.tsx
pages/_app.tsx.bak
pages/_document.tsx
pages/index.tsx
pages/index.tsx.bak
pages/index.tsx.bak.2
pages/index.tsx.bak.icons
postcss.config.js
prisma/schema.prisma
public/icons/icon-180.png
public/icons/icon-192.png
public/icons/icon-512.png
public/manifest.webmanifest
public/sounds/ui-confirm.mp3
public/sounds/ui-key.mp3
public/sw.js
styles/globals.css
tailwind.config.js
tools/Handoff-Workflow.ps1
tools/Verify-Handoff.ps1
tsconfig.json
tsconfig.tsbuildinfo

## EXPORTED SYMBOLS (preview)
components/CartPanel.tsx: export default function CartPanel({
components/CategoryDock.tsx: export type Category = { id: number; name: string; emoji: string };
components/CategoryDock.tsx: export default function CategoryDock({ categories, selectedId, onSelect }: {
components/FullscreenToggle.tsx: export default function FullscreenToggle() {
components/ProductCard.tsx: export default function ProductCard({ product, qty = 0, onAdd }: ProductCardProps) {
components/SlideToConfirm.tsx: export default function SlideToConfirm({
components/SlideToPay.tsx: export type SlideToPayProps = {
components/SlideToPay.tsx: export const SlideToPay: React.FC<SlideToPayProps> = ({
components/ThemeProvider.tsx: export default function ThemeProvider({ children, theme = "light", customTheme }: Props) {
components/TopBar.tsx: export type Payment = "CARD" | "QR" | "CASH";
components/TopBar.tsx: export const methods: Payment[] = ["CARD", "QR", "CASH"];
components/TopBar.tsx: export default function TopBar({ payment, onChange }: { payment: Payment | null; onChange: (p: Payment) => void; }) {
data/catalog.ts: export type Category = {
data/catalog.ts: export type Product = {
data/catalog.ts: export type DataSet = {
data/catalog.ts: export const categories: Category[] = [
data/catalog.ts: export const products: Product[] = [
data/catalog.ts: export const productsByCategory = (catId: string) =>
hooks/useClickSound.ts: export default function useClickSound(opts: Options | number = {}) {
hooks/useSfxHowler.ts: export default function useSfxHowler() {
hooks/useZzfxSfx.ts: export default function useZzfxSfx() {
lib/layout.ts: export const LAYOUT = {
lib/layout.ts: export const PAY_HL = {
lib/layout.ts: export const payVars = (key?: string) => {
lib/layout.ts: export type PaySkinSpec = {
lib/layout.ts: export const PAY_SKIN: { default: PaySkinSpec; byKey: Record<string, PaySkinSpec> } = {
lib/layout.ts: export const payGroupVars = (key?: string): Record<string,string> => {
lib/layout.ts: export type PayVarsInput = Partial<{
lib/layout.ts: export function payVars(input: PayVarsInput = {}): Record<string,string> {
lib/layout.ts: export function payGroupVars(group: string | number, input: PayVarsInput = {}): Record<string,string> {
lib/theme.ts: export type Theme = {
lib/theme.ts: export const THEME_LIGHT: Theme = {
lib/theme.ts: export const THEME_DARK: Theme = {
lib/theme.ts: export function applyTheme(theme: Theme) {
lib/theme.ts: export type GlowSpec = { color: string; ringWidthPx?: number; blurPx?: number };
lib/theme.ts: export const GLOW_THEME: {
lib/theme.ts: export function paymentGlow(key: string | undefined): Record<string,string> {
lib/theme.ts: export function applyCategoryGlowVars(doc?: Document) {
lib/theme.ts: export const QTY_THEME = { activeBg: 'rgba(34,197,94,.16)' };
lib/theme.ts: export const qtyVars = (active?: boolean) => active ? ({ ['--qty-bg' as any]: QTY_THEME.activeBg } as any) : ({} as any);
lib/theme.ts: export const qtyActiveVars = () => ({ ['--qty-bg' as any]: QTY_THEME.activeBg } as any);
pages/_app.tsx: export default function MyApp({ Component, pageProps }: AppProps) {
pages/_document.tsx: export default function Document() {
pages/index.tsx: export default function HomePage() {

# 依頼（あなた=GPTの出力フォーマット）
1) 最小差分パッチ（PowerShell前提・冪等・安全）
2) 適用手順（コピペ実行可）
3) 検証手順（npm run verifyまで）
4) 影響範囲と撤回手順
5) 次のハンドオフ文（5〜8行）

# 次アクション（今取り組むこと）
- （未設定）
# KEY SNIPPETS (for Chat Handoff) - 2025-09-24 02:32
head:200 / tail:120 / maxChars:40000

## pages/index.tsx
- lines: 112 / sha256: 3E6C2532A5F73E6CB4E5F7E2BD506C9CB5224D5EC827F8F1F39C6210470116B0

````tsx
import React, { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import CartPanel from "../components/CartPanel";
import { LAYOUT } from "../lib/layout";
import { categories, products, type Product as ProductType } from "../data/catalog";
import { GLOW_THEME } from "../lib/theme";
type Item = { product: ProductType; qty: number };
const isUrl = (s?: string) => !!s && /^(https?:)?\/\//.test(s);

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id ?? "");
  const [items, setItems] = useState<Item[]>([]);
  const [selectedPay, setSelectedPay] = useState<string>("cash");

  const visibleProducts = useMemo(() => products.filter(p => p.categoryId === selectedCategory), [selectedCategory]);

  const onAdd = (p: ProductType) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.product.id === p.id);
      if (i >= 0) { const copy = [...prev]; copy[i] = { ...copy[i], qty: copy[i].qty + 1 }; return copy; }
      return [...prev, { product: p, qty: 1 }];
    });
  };
  const onInc = (id: string) => setItems((prev) => prev.map((it) => (it.product.id === id ? { ...it, qty: it.qty + 1 } : it)));
  const onDec = (id: string) =>
  setItems((prev) => {
    const next = prev.map((it) => (it.product.id === id ? { ...it, qty: Math.max(0, it.qty - 1) } : it));
return next.filter((it) => it.qty > 0);
  });
  const onConfirm = () => { alert("決済確定（" + selectedPay + "）"); setItems([]); };
  const getQty = (id: string) => items.find((it) => it.product.id === id)?.qty ?? 0;

  return (
    <div className="h-screen w-screen overflow-hidden" style={{ background: "var(--bg-app)" }}>
      <div
        className="flex h-full"
        style={{
          gap: LAYOUT.columnGapPx,
          paddingTop: LAYOUT.outerPaddingTopPx,
          paddingRight: LAYOUT.outerPaddingRightPx,
          paddingBottom: LAYOUT.outerPaddingBottomPx,
          paddingLeft: LAYOUT.outerPaddingLeftPx
        }}
      >
        {/* 左：カテゴリ */}
        <aside
          className="ios-section p-2 hidden sm:block relative z-10"
          role="radiogroup"
          aria-label="カテゴリ"
          style={{ width: LAYOUT.leftColWidthPx }}
        >
          <div className="grid auto-rows-min place-items-center" style={{ gap: LAYOUT.categoryIconGapPx }}>
            {categories.map((c) => {
              const active = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className="flex flex-col items-center gap-1 ui-focus"
                  role="radio"
                  aria-checked={active}
                  aria-label={"カテゴリ " + c.name}
                  style={{ fontSize: LAYOUT.categoryLabelPx }}
                >
                  <div
                    className={"btn-radio-icon cat-icon " + (active ? "glow-ring border-2 border-transparent" : "border border-transparent") + " transition-shadow"}
                    style={{ ["--glow-color" as any]: GLOW_THEME.category.color, ["--glow-ring-width" as any]: (GLOW_THEME.category.ringWidthPx ?? 2) + "px", ["--glow-blur" as any]: (GLOW_THEME.category.blurPx ?? 12) + "px",  width: LAYOUT.categoryIconPx, height: LAYOUT.categoryIconPx, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {isUrl(c.icon)
                      ? <img src={c.icon!} alt={c.name} style={{
                          width: LAYOUT.categoryIconInnerImagePx, height: LAYOUT.categoryIconInnerImagePx,
                          transform: "translate(" + LAYOUT.categoryIconInnerOffsetXPx + "px," + LAYOUT.categoryIconInnerOffsetYPx + "px)"
                        }} />
                      : <span style={{
                          fontSize: LAYOUT.categoryIconInnerFontPx,
                          transform: "translate(" + LAYOUT.categoryIconInnerOffsetXPx + "px," + LAYOUT.categoryIconInnerOffsetYPx + "px)"
                        }}>{c.icon ?? c.name[0]}</span>
                    }
                  </div>
                  <div className="btn-radio-label" style={{ fontSize: LAYOUT.categoryLabelPx }}>{c.name}</div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* 中央：1行リスト（行全体タップで追加） */}
        <main className="flex-1 overflow-auto relative z-0">
          <div className="flex flex-col pr-1" style={{ gap: LAYOUT.listRowGapPx }}>
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} qty={getQty(p.id)} onAdd={onAdd} />
            ))}
          </div>
        </main>

        {/* 右：注文 */}
        <aside className="ios-section p-2 relative z-10" style={{ width: LAYOUT.rightColWidthPx }}>
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

````

## pages/_app.tsx
- lines: 12 / sha256: 65ADBDC6FDE3B9262CFACC7AC2763F96CB979304F5C55E931C321771175A6586

````tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import ThemeProvider from "../components/ThemeProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={"light"}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

````

## pages/_document.tsx
- lines: 24 / sha256: FD9902AE6E04B4EB518F1BE01437396D1FA2B584795D1B0A1EA94BD913378573

````tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#000000" />
        {/* iOS: ホーム画面追加で全画面にする */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Ticket" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png" />
        {/* notch対策 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

````

## components/CartPanel.tsx
- lines: 142 / sha256: 8624A9462033904185796D9959460C365CBAD3C4A3F8CB2202E762606130AFFB

````tsx
import React from "react";
import { LAYOUT, payVars, payGroupVars } from "../lib/layout";
import type { Product } from "../data/catalog";
import SlideToPay from "./SlideToPay";

type CartItem = { product: Product; qty: number };

type CartPanelProps = {
  items: CartItem[];
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onConfirm: () => void;
  selectedPay: string;
  onChangePay: (id: string) => void;
  paymentMethods?: { id: string; name: string; icon?: string }[];
};

const isUrl = (s?: string) => !!s && /^https?:\/\//.test(s);
const glyphFor = (id: string) => {
  switch(id.toLowerCase()){
    case "cash":   return "現";
    case "card":   return "カ";
    case "paypay": return "Q";
    default:       return "・";
  }
};

export default function CartPanel({
  items,
  onInc,
  onDec,
  onConfirm,
  paymentMethods = [
    { id: "cash",   name: "現金"  },
    { id: "card",   name: "カード" },
    { id: "paypay", name: "PayPay"},
  ],
  selectedPay,
  onChangePay,
}: CartPanelProps) {
  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <div className="h-full flex flex-col gap-3">
      {/* 支払い方法（発光＋背景スキン） */}
      <div
        className={"ios-section p-2 " + (selectedPay ? "glow-box" : "")}
        style={selectedPay ? ({
          ...(payVars(selectedPay) as any),
          ...(payGroupVars(selectedPay) as any),
          backgroundImage: "var(--group-bg-image)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "var(--group-bg-size, cover)",
          backgroundPosition: "var(--group-bg-pos, center center)"
        } as any) : undefined}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center flex-wrap" role="radiogroup" aria-label="支払い方法" style={{ gap: LAYOUT.paymentIconGapPx }}>
            {paymentMethods.map((m) => {
              const active = m.id === selectedPay;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onChangePay(m.id); }}
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  className="flex flex-col items-center gap-1 ui-focus"
                  role="radio"
                  aria-checked={active}
                >
                  <div
                    className={"btn-radio-icon " + (active ? "glow-ring border border-transparent" : "border") + " transition-shadow"}
                    style={{
                      ...(active ? (payVars(m.id) as any) : {}),
                      width: LAYOUT.payIconPx,
                      height: LAYOUT.payIconPx,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: active ? "var(--pay-bg, var(--radio-bg))" : "var(--radio-bg)",
                      borderColor: undefined,
                    }}
                  >
                    {isUrl(m.icon)
                      ? <img src={m.icon!} alt={m.name} style={{ width: LAYOUT.payIconPx * 0.6, height: LAYOUT.payIconPx * 0.6, objectFit: "contain" }} />
                      : <span aria-hidden="true" style={{ fontSize: LAYOUT.payIconPx * 0.5, fontWeight: 700, lineHeight: 1 }}>{glyphFor(m.id)}</span>}
                  </div>
                  <div className="btn-radio-label" style={{ fontSize: LAYOUT.paymentLabelPx }}>{m.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* カート大ブロック（内末尾に合計） */}
      <div className="ios-section flex-1 overflow-auto flex flex-col">
        <div className="flex-1 overflow-auto">
          {items.length === 0 ? (
            <div className="p-3" style={{ color: "var(--text-muted)", fontSize: 12 }}>まだ商品がありません</div>
          ) : (
            <ul>
              {items.map((it, idx) => (
                <li key={it.product.id} className={"px-3 py-2 " + (idx > 0 ? "ios-sep " : "") + "flex items-center gap-2"}>
                  <div className="flex-1 min-w-0">
                    <div className="truncate" style={{ fontSize: LAYOUT.cartItemNamePx }}>{it.product.name}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDec(it.product.id)}
                    className="btn-round-sm"
                    aria-label={it.product.name + " を1つ減らす"}
                    style={{ width: LAYOUT.plusMinusPx, height: LAYOUT.plusMinusPx, fontSize: LAYOUT.plusMinusFontPx }}
                  >−</button>
                  <div className="text-center" style={{ width: LAYOUT.cartQtyWidthPx, fontSize: LAYOUT.cartQtyFontPx }}>{it.qty}</div>
                  <button
                    type="button"
                    onClick={() => onInc(it.product.id)}
                    className="btn-round-sm"
                    aria-label={it.product.name + " を1つ増やす"}
                    style={{ width: LAYOUT.plusMinusPx, height: LAYOUT.plusMinusPx, fontSize: LAYOUT.plusMinusFontPx }}
                  >＋</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 合計（大ブロックの最下部） */}
        <div className="ios-sep px-3 py-2 flex items-center justify-between">
          <span className="text-sm" style={{ fontSize: LAYOUT.totalsLabelPx, color: "var(--text-muted)" }}>合計</span>
          <span className="font-semibold" style={{ fontSize: LAYOUT.totalsValuePx }}>¥{total.toLocaleString()}</span>
        </div>
      </div>

      {/* スライダー（独立ブロック・最下段） */}
      <div className="ios-section px-3 py-3">
        <SlideToPay onConfirm={onConfirm} />
      </div>
    </div>
  );
}
````

## components/SlideToPay.tsx
- lines: 163 / sha256: 41A2C2C7EA72317CE8241ECEC879EF76928997D188A765B133F3A9030408C990

````tsx
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

export type SlideToPayProps = {
  onConfirm: () => void | Promise<void>;
  disabled?: boolean;
  thresholdPct?: number;    // 既定 90
  heightPx?: number;        // 既定 44
  knobPx?: number;          // 既定 32
  label?: string;           // トラック内の案内文
  confirmLabel?: string;    // しきい値到達時の案内文
  className?: string;       // 追加のクラス
  style?: React.CSSProperties;
  resetAfterConfirm?: boolean; // 既定 true（発火後に0%へ戻す）
};

export const SlideToPay: React.FC<SlideToPayProps> = ({
  onConfirm,
  disabled = false,
  thresholdPct = 90,
  heightPx = 44,
  knobPx = 32,
  label = "スライドして決済",
  confirmLabel = "離して確定",
  className = "",
  style,
  resetAfterConfirm = true,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);
  const [pct, setPct] = useState(0);           // 0..100
  const pctRef = useRef(0);
  const dragging = useRef(false);

  const updatePct = (p: number) => { const v = Math.max(0, Math.min(100, p)); pctRef.current = v; setPct(v); };

  // トラック幅を監視（ノブ位置/塗り幅の算出に使用）
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTrackW(el.clientWidth));
    setTrackW(el.clientWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const effectiveWidth = Math.max(0, trackW - knobPx);     // ノブがはみ出さない可動域
  const knobLeftPx = Math.round((pct / 100) * effectiveWidth);
  const fillWidthPx = Math.max(0, knobLeftPx + knobPx);

  const toPctFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return pctRef.current;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left - knobPx / 2;            // ノブ中心基準
    const ratio = x / Math.max(1, rect.width - knobPx);
    return Math.max(0, Math.min(1, ratio)) * 100;
  };

  const endDrag = useCallback(async () => {
    if (!dragging.current) return;
    dragging.current = false;
    const finalPct = pctRef.current;
    if (finalPct >= thresholdPct && !disabled) {
      updatePct(100);
      try { await onConfirm(); } finally {
        if (resetAfterConfirm) updatePct(0);
      }
    } else {
      // しきい値未満は戻す
      updatePct(0);
    }
  }, [onConfirm, thresholdPct, disabled, resetAfterConfirm]);

  const onPointerDown = (e: React.PointerEvent) => {
   e.preventDefault();  e.preventDefault(); if (disabled) return;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    dragging.current = true;
    updatePct(toPctFromClientX(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent) => {
    e.preventDefault(); if (!dragging.current || disabled) return;
    updatePct(toPctFromClientX(e.clientX));
  };
  const onPointerUp = () => endDrag();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "ArrowRight") { e.preventDefault(); updatePct(pctRef.current + 5); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); updatePct(pctRef.current - 5); }
    if (e.key === "Home")       { e.preventDefault(); updatePct(0); }
    if (e.key === "End")        { e.preventDefault(); updatePct(100); }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (pctRef.current >= thresholdPct) { endDrag(); } else { updatePct(thresholdPct); }
    }
  };

  const reached = pct >= thresholdPct;
  const ariaNow = Math.round(pct);

  return (
    <div
      ref={trackRef}
      className={
        "relative rounded-full select-none shadow-sm ios-section " +
        (disabled ? "opacity-60 pointer-events-none " : "ui-focus cursor-pointer ") +
        className
      }
      style={{
        height: heightPx,
        background: "var(--slider-track)",
        touchAction: "none",
        ...style,
      }}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaNow}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    >
      {/* 塗り（進捗） */}
      <div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{
          width: fillWidthPx,
          background: "var(--slider-fill)",
          transition: dragging.current ? "none" : "width .15s ease",
        }}
      />
      {/* ノブ */}
      <div
        className={"absolute top-1/2 rounded-full border " + (reached ? "glow-ring border-2" : "")}
        style={{
          left: knobLeftPx,
          width: knobPx,
          height: knobPx,
          transform: "translateY(-50%)",
          background: "linear-gradient(180deg, var(--knob-start), var(--knob-end))",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-sm)",
          transition: dragging.current ? "none" : "left .15s ease",
          // 発光の色（既定は --accent。paymentGlow を使う場合は外から --glow-color を上書き可能）
          ["--glow-color" as any]: "var(--accent)",
        }}
      />
      {/* ラベル */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className="text-[13px] text-[color:var(--chip-text)]">
          {reached ? confirmLabel : label}
        </span>
      </div>
    </div>
  );
};

export default SlideToPay;
````

## components/ProductCard.tsx
- lines: 98 / sha256: AFC989FC26F13FE705FB26129FD08B9B5A7AC817FA016BFA65F3465F023DCDFF

````tsx
import React from "react";
import { type Product } from "../data/catalog";
import { LAYOUT } from "../lib/layout";
import { qtyActiveVars } from "../lib/theme";

type ProductCardProps = {
  product: Product;
  qty?: number;
  onAdd: (p: Product) => void;
};

export default function ProductCard({ product, qty = 0, onAdd }: ProductCardProps) {
  const onActivate = () => onAdd(product);
  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.currentTarget !== document.activeElement) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onAdd(product); }
  };

  return (
    <button
      data-role="product-card"
      type="button"
      onClick={onActivate}
      onKeyDown={onKeyDown}
      className="row-card ui-tap ui-focus" style={{ position: "relative" }}
      aria-label={product.name + " を追加"}
    >
      <div className="flex items-center gap-3">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="rounded-xl object-cover"
            style={{ width: LAYOUT.productImagePx, height: LAYOUT.productImagePx, border: "1px solid var(--border)" }}
          />
        ) : (
          <div
            className="rounded-xl"
            style={{ width: LAYOUT.productImagePx, height: LAYOUT.productImagePx, background: "var(--surface-elev)", border: "1px solid var(--border)" }}
          />
        )}

        <div className="flex-1 min-w-0">
          <div
            className="truncate font-semibold leading-tight"
            style={{ fontSize: LAYOUT.productNamePx, transform: "translate(" + LAYOUT.productNameOffsetXPx + "px," + LAYOUT.productNameOffsetYPx + "px)" }}
          >
            {product.name}
          </div>
          <div
            className="leading-tight"
            style={{
              fontSize: LAYOUT.productPricePx,
              color: "var(--text-muted)",
              transform: "translate(" + LAYOUT.productPriceOffsetXPx + "px," + LAYOUT.productPriceOffsetYPx + "px)"
            }}
          >
            ¥{product.price.toLocaleString()}
          </div>
          {product.allergy?.length ? (
            <div
              className="flex flex-wrap gap-1 mt-1"
              style={{ transform: "translate(" + LAYOUT.allergyOffsetXPx + "px," + LAYOUT.allergyOffsetYPx + "px)" }}
            >
              {product.allergy.slice(0, 8).map((al) => (
                <span key={al} className="ios-chip" style={{ fontSize: LAYOUT.allergyChipFontPx }}>{al}</span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="shrink-0" style={{ position: "absolute", top: LAYOUT.qtyBadgeOffsetTopPx, right: LAYOUT.qtyBadgeOffsetRightPx, zIndex: LAYOUT.qtyBadgeZIndex, pointerEvents: "none" }}>
          <div 
            className="flex items-center justify-center qty-badge"
            style={{ ...qtyActiveVars(), 
              color: "var(--badge-text)",
              minWidth: LAYOUT.qtyBadgeMinWidthPx,
              height: LAYOUT.qtyBadgeHeightPx,
              paddingInline: LAYOUT.qtyBadgePaddingInlinePx,
              fontSize: LAYOUT.qtyTextPx,
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
              // 四隅の角丸を個別指定
              borderTopLeftRadius: LAYOUT.qtyBadgeRadiusTopLeftPx,
              borderTopRightRadius: LAYOUT.qtyBadgeRadiusTopRightPx,
              borderBottomRightRadius: LAYOUT.qtyBadgeRadiusBottomRightPx,
              borderBottomLeftRadius: LAYOUT.qtyBadgeRadiusBottomLeftPx,
            }}
           data-qty={qty}>{qty}</div>
        </div>
      </div>
    </button>
  );
}



````

## components/ThemeProvider.tsx
- lines: 23 / sha256: F4B99285968D1277F558E1DC06225FA9C41B3E7F3C3A6082A141AC78F55796B2

````tsx
import React, { useEffect } from "react";
import { THEME_LIGHT, THEME_DARK, type Theme, applyTheme } from "../lib/theme";

type Props = {
  children: React.ReactNode;
  theme?: "light" | "dark";
  customTheme?: Partial<Theme>;
};

export default function ThemeProvider({ children, theme = "light", customTheme }: Props) {
  useEffect(() => {
    const base = theme === "dark" ? THEME_DARK : THEME_LIGHT;
    const merged: Theme = {
      ...base,
      ...(customTheme as any ?? {}),
      colors: { ...base.colors, ...(customTheme?.colors ?? {}) },
      shadows: { ...base.shadows, ...(customTheme?.shadows ?? {}) },
    };
    applyTheme(merged);
  }, [theme, customTheme]);
  return <>{children}</>;
}

````

## lib/layout.ts
- lines: 167 / sha256: EC2AE99BB425125A1FA1BDD94B17D9949EDBA3A2A43C580F44ABD92048AD91ED

````ts
/**
 * レイアウト数値の一元管理（UI 全体で参照）
 * 位置調整は transform: translate(X, Y) で適用
 */
export const LAYOUT = {
  /* === フレーム（画面の最外余白 4辺）=== */
  outerPaddingTopPx:    20,  // pages/index.tsx …… 画面最外の上余白
  outerPaddingRightPx:  1,   // 右余白
  outerPaddingBottomPx: 1,   // 下余白
  outerPaddingLeftPx:   1,   // 左余白
  columnGapPx:          1,   // 左・中央・右カラム間の隙間

  /* === カラム幅 === */
  leftColWidthPx:   80,      // 左カラム（カテゴリ）
  rightColWidthPx:  300,     // 右カラム（注文）

  /* === カテゴリ（左カラム） === */
  categoryIconPx:           60, // 丸アイコン直径
  categoryIconGapPx:        12, // アイコン間隔
  categoryLabelPx:          13, // ラベル文字サイズ
  // アイコン内コンテンツ（画像/絵文字/文字）の大きさ・位置
  categoryIconInnerFontPx:  34, // 絵文字/文字のフォントサイズ
  categoryIconInnerImagePx: 36, // 画像を使う場合の内側画像サイズ
  categoryIconInnerOffsetXPx: 0, // 内側コンテンツの X 方向オフセット
  categoryIconInnerOffsetYPx: 0, // 内側コンテンツの Y 方向オフセット

  /* === 中央リスト === */
  listRowGapPx:        1,    // 1行ごとの間隔
  productNamePx:      18,    // 商品名 文字サイズ
  productPricePx:     18,    // 価格 文字サイズ
  allergyChipFontPx:  14,    // アレルギータグ 文字サイズ
  productImagePx:    100,    // 商品画像の縦横

  // 中央リスト内の各表示位置（px 単位のオフセット）
  productNameOffsetXPx:   0,
  productNameOffsetYPx:   -5,
  productPriceOffsetXPx:  0,
  productPriceOffsetYPx:  3,
  allergyOffsetXPx:       0,
  allergyOffsetYPx:       9,

  /* === 数量バッジ（中央リスト右端） === */
  qtyBadgeMinWidthPx: 60,
  qtyBadgeHeightPx: 118,
  qtyTextPx: 30,

  qtyBadgeOffsetTopPx: -1,
  qtyBadgeOffsetRightPx: 0,
  qtyBadgeZIndex: 2,

  qtyBadgePaddingInlinePx: 0,
  qtyBadgeOverflowRightPx: 0,

  // 角丸（数量バッジ）
  qtyBadgeRadiusTopLeftPx: 0,
  qtyBadgeRadiusTopRightPx: 15,
  qtyBadgeRadiusBottomRightPx: 15,
  qtyBadgeRadiusBottomLeftPx: 0,

/* === 支払い方法（右カラム上部） === */
  payIconPx:           45,   // 丸アイコン直径
  paymentIconGapPx:     7,   // アイコン間隔
  paymentLabelPx:      12,   // ラベル文字サイズ
  selectedLabelPx:     15,   // 「選択中」表示の文字
  // アイコン内コンテンツ（画像/絵文字/文字）の大きさ・位置
  payIconInnerFontPx:  24,   // 絵文字/文字のフォントサイズ
  payIconInnerImagePx: 26,   // 画像の場合のサイズ
  payIconInnerOffsetXPx: 0,  // X 方向オフセット
  payIconInnerOffsetYPx: 0,  // Y 方向オフセット

  /* === 注文リスト（右カラム中部） === */
  cartItemNamePx:   17,      // 注文名 文字サイズ
  cartItemPricePx:  15,      // 単価 文字サイズ
  plusMinusPx:      24,      // ±ボタン径
  plusMinusFontPx:  14,      // ±アイコン文字サイズ
  cartQtyWidthPx:   22,      // ±の間の数量表示の幅
  cartQtyFontPx:    21,      // ±の間の数量文字サイズ

  /* === 合計行（右カラム下部） === */
  totalsLabelPx:    18,
  totalsValuePx:    18,

  /* === スライダー（決済） === */
  slideKnobPx:        42,    // ノブ直径
  slideConfirmAt:     0.90,  // 確定閾値（0..1）
  slideInsetStartPx:  1,     // 左端からの開始インセット
  slideInsetEndPx:    6,     // 右端からの終了インセット
  slideLabelPx:       16,    // ラベル文字サイズ
} as const;



//
// === payment highlight (tint & glow) ===
export const PAY_HL = {
  ringWidthPx: 2,
  blurPx: 12,
  default: { color: 'rgba(56,189,248,.85)', bg: 'rgba(56,189,248,.10)' },
  byKey: {
    cash:   { color: 'rgba(245,158,11,.90)', bg: 'rgba(245,158,11,.12)' },
    card:   { color: 'rgba(34,197,94,.90)',  bg: 'rgba(34,197,94,.12)'  },
    paypay: { color: 'rgba(239,68,68,.90)',  bg: 'rgba(239,68,68,.12)'  },
  }
} as const;

export const payVars = (key?: string) => {
  const k = (key ?? '').toLowerCase();
  const spec = (PAY_HL as any).byKey?.[k] ?? (PAY_HL as any).default;
  return {
    ['--glow-color' as any]: spec.color,
    ['--glow-ring-width' as any]: ((PAY_HL as any).ringWidthPx ?? 2) + 'px',
    ['--glow-blur' as any]: ((PAY_HL as any).blurPx ?? 12) + 'px',
    ['--pay-bg' as any]: spec.bg ?? 'transparent',
  } as any;
};

/** ── payment group (親ブロック) の背景スキン設定 ───────────────── */
export type PaySkinSpec = {
  groupBgImage?: string;   // 画像パス（/public 配下）
  groupBgSize?: string;    // CSS background-size 値
  groupBgPos?: string;     // CSS background-position 値
};
export const PAY_SKIN: { default: PaySkinSpec; byKey: Record<string, PaySkinSpec> } = {
  // 既定（弱めに右側へ）
  default: { groupBgImage: "/icons/icon-192.png", groupBgSize: "auto 72%", groupBgPos: "right 12px center" },
  byKey: {
    cash:   { groupBgImage: "/icons/icon-180.png", groupBgSize: "auto 78%", groupBgPos: "right 12px center" },
    card:   { groupBgImage: "/icons/icon-192.png" },
    paypay: { groupBgImage: "/icons/icon-512.png", groupBgSize: "auto 70%" },
  }
};
/** 親ブロック用の CSS 変数（背景画像など）を返す */
export const payGroupVars = (key?: string): Record<string,string> => {
  const k = (key ?? "").toLowerCase();
  const spec = (k && PAY_SKIN.byKey[k]) || PAY_SKIN.default;
  const out: any = {};
  if (spec.groupBgImage) out["--group-bg-image"] = `url('${spec.groupBgImage}')`;
  if (spec.groupBgSize)  out["--group-bg-size"]  = spec.groupBgSize!;
  if (spec.groupBgPos)   out["--group-bg-pos"]   = spec.groupBgPos!;
  return out as Record<string,string>;
};
\n// --- handoff shim begin (safe to remove when real impl exists) ---
export type PayVarsInput = Partial<{
  tone: string;
  active: boolean;
  emphasis: number;
  skin: string;
}>;

export function payVars(input: PayVarsInput = {}): Record<string,string> {
  const tone = input.tone ?? "default";
  const active = input.active ?? true;
  const emphasis = input.emphasis ?? 0.6;
  const skin = input.skin ?? "solid";
  return {
    "--pay-bg":   `var(--pay-${tone}-bg, rgba(34,197,94,${active ? 0.18 : 0.08}))`,
    "--pay-ring": `var(--pay-${tone}-ring, rgba(34,197,94,${active ? 0.70 : 0.35}))`,
    "--pay-emphasis": String(emphasis),
    "--pay-skin": skin,
  };
}

export function payGroupVars(group: string | number, input: PayVarsInput = {}): Record<string,string> {
  return { ...payVars(input), "--pay-group-id": String(group) };
}
// --- handoff shim end ---

````

## lib/theme.ts
- lines: 246 / sha256: 2F28A8CBD255130E09B101BEAA148E9B158FC7430F2ADE93E24D3BFAF8036E57

````ts
/**
 * lib/theme.ts
 * ─────────────────────────────────────────────────────────────
 * 「色・背景・影・文字色」を一括管理し、CSS 変数として :root に適用します。
 * 変更の仕方：
 *   1) THEME_LIGHT.colors の値を変える   → すぐ UI に反映（ThemeProvider 経由）
 *   2) 必要なら THEME_DARK も用意して、<ThemeProvider theme="dark"> で切替
 *   3) さらに細かく変えたい場合は、applyTheme() の CSS 変数割当を増やす
 *
 * どこに効く？
 *   - Body 背景色              : appBg → --bg-app（globals.css の body 背景）
 *   - 基本文字色/サブ文字色    : text / textMuted → --text / --text-muted
 *   - 面の色/境界/影           : surface / border / shadows → .ios-section / .row-card / .btn-round-sm など
 *   - Chip                     : chipBg / chipBorder / chipText → .ios-chip
 *   - ラジオ風丸（カテゴリ/決済）: radioBg / radioActive → .btn-radio-icon / .btn-radio-active
 *   - 小ボタン（±など）        : buttonBg / buttonBorder / buttonText → .btn-round-sm
 *   - 個数バッジ               : badgeBg / badgeText → ProductCard の数量表示
 *   - スライダー               : sliderTrack / sliderFill / knobStart / knobEnd → SlideToConfirm
 *   - スクロールバー           : scrollbarThumb → すべてのスクロールバー
 */

export type Theme = {
  name: string;

  /** 色系（＝CSS変数にマップされ UI 各所で参照） */
  colors: {
    appBg: string;        // Body 背景（--bg-app）: 画面全体の地色

    text: string;         // 通常の文字色（--text）
    textMuted: string;    // 補助テキスト（--text-muted）: 価格・サブ情報・ラベルなど

    surface: string;          // 面の地色（--surface）: .ios-section / .row-card / 小ボタンのベース
    surfaceElevated: string;  // やや持ち上がった面（--surface-elev）: 画像プレースホルダ、スライダートラックのグラデ等
    border: string;           // 枠線（--border）: 面/丸/ボタン/区切り線の境界色

    chipBg: string;       // チップ背景（--chip-bg）: アレルギータグ等
    chipBorder: string;   // チップ枠線（--chip-border）
    chipText?: string;    // チップ文字（--chip-text）: 未指定なら --text-muted を使用

    radioBg: string;      // 丸アイコンの地（--radio-bg）: カテゴリ/支払いアイコンの内側
    radioActive: string;  // アクティブ装飾（--accent）: 選択リングや focus リング

    buttonBg: string;     // 小ボタン背景（--btn-bg）: ±ボタンなど
    buttonBorder: string; // 小ボタン枠線（--btn-border）
    buttonText?: string;  // 小ボタン文字（--btn-text）

    badgeBg: string;      // 数量バッジ背景（--badge-bg）
    badgeText?: string;   // 数量バッジ文字（--badge-text）

    sliderTrack: string;  // スライダートラックの薄い塗り（--slider-track）
    sliderFill: string;   // スライダーフィル（--slider-fill）
    knobStart: string;    // ノブ上側グラデ起点（--knob-start）
    knobEnd: string;      // ノブ下側グラデ終点（--knob-end）

    scrollbarThumb: string; // スクロールバーつまみ（--scrollbar-thumb）
  };

  /** 影系（＝CSS変数にマップされ UI 各所で参照） */
  shadows: {
    sm: string;           // --shadow-sm : 面やボタンの基本シャドウ
    lg: string;           // --shadow-lg : 大きめの持ち上げ（カード等）
  };
};

/** ライトテーマ（既定）: iOS ライクな清潔感 */
export const THEME_LIGHT: Theme = {
  name: "light",
  colors: {
    appBg: "#f5f5f7",            // Body 背景

    text: "#111827",             // 文字（濃いグレー）
    textMuted: "#6b7280",        // 補助文字（薄いグレー）

    surface: "#ffffff",          // 面（白）
    surfaceElevated: "#f3f4f6",  // やや持ち上げ面（薄グレー）
    border: "rgba(0,0,0,0.08)",  // 枠線（ごく薄い黒）

    chipBg: "#f3f4f6",           // チップ背景
    chipBorder: "rgba(0,0,0,0.10)",
    chipText: "#374151",

    radioBg: "#ffffff",          // 丸アイコンの地
    radioActive: "rgba(0,0,0,0.25)", // 選択リング/フォーカスのアクセント

    buttonBg: "#ffffff",         // 小ボタン（±）
    buttonBorder: "rgba(0,0,0,0.10)",
    buttonText: "#111827",

    badgeBg: "#ffffff",          // 数量バッジ
    badgeText: "#111827",

    sliderTrack: "rgba(0,0,0,0.05)", // トラック地
    sliderFill: "rgba(0,0,0,0.08)",  // 進捗の塗り
    knobStart: "#ffffff",            // ノブ上グラデ
    knobEnd: "#e5e7eb",              // ノブ下グラデ

    scrollbarThumb: "rgba(0,0,0,0.10)",
  },
  shadows: {
    sm: "0 1px 1px rgba(0,0,0,0.04)",
    lg: "0 10px 30px rgba(0,0,0,0.06)",
  },
};

/** ダークテーマ（雛形）: 必要に応じて値を調整して使ってください */
export const THEME_DARK: Theme = {
  ...THEME_LIGHT,
  name: "dark",
  colors: {
    ...THEME_LIGHT.colors,
    appBg: "#0b0b0c",
    text: "#f3f4f6",
    textMuted: "#9ca3af",
    surface: "#151517",
    surfaceElevated: "#1b1c1f",
    border: "rgba(255,255,255,0.12)",
    chipBg: "#1f2023",
    chipBorder: "rgba(255,255,255,0.16)",
    radioBg: "#1b1c1f",
    buttonBg: "#1b1c1f",
    badgeBg: "#1b1c1f",
    sliderTrack: "rgba(255,255,255,0.08)",
    sliderFill: "rgba(255,255,255,0.14)",
    knobStart: "#2a2b2f",
    knobEnd: "#1b1c1f",
    scrollbarThumb: "rgba(255,255,255,0.16)",
    radioActive: "rgba(255,255,255,0.35)",
  },
  shadows: {
    sm: "0 1px 1px rgba(0,0,0,0.6)",
    lg: "0 10px 30px rgba(0,0,0,0.55)",
  },
};

/**
 * applyTheme(theme)
 * ─────────────────────────────────────────────────────────────
 * Theme.colors / shadows を CSS 変数へセットします。
 * 変数名と利用先（抜粋）：
 *   --bg-app         : globals.css body 背景
 *   --text           : ベース文字色
 *   --text-muted     : 価格/ラベルなど補助色
 *   --surface        : .ios-section / .row-card / .btn-round-sm 背景
 *   --surface-elev   : 画像プレースホルダ/スライダー背景のグラデ下側
 *   --border         : 面/丸/ボタンの枠線、区切り .ios-sep
 *   --chip-bg/…      : .ios-chip
 *   --radio-bg       : .btn-radio-icon の内側
 *   --accent         : .btn-radio-active のリング、.ui-focus の focus-outline
 *   --btn-bg/…       : .btn-round-sm（±ボタン）
 *   --badge-bg/…     : 数量バッジ（ProductCard）
 *   --slider-*       : SlideToConfirm のトラック/フィル/ノブ
 *   --scrollbar-thumb: 全体スクロールバー
 *   --shadow-sm/lg   : 面/ボタンの影
 */
export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return; // SSR では何もしない
  const r = document.documentElement.style;
  const c = theme.colors, s = theme.shadows;

  // ベース配色
  r.setProperty("--bg-app", c.appBg);
  r.setProperty("--text", c.text);
  r.setProperty("--text-muted", c.textMuted);

  // 面・境界
  r.setProperty("--surface", c.surface);
  r.setProperty("--surface-elev", c.surfaceElevated);
  r.setProperty("--border", c.border);

  // チップ
  r.setProperty("--chip-bg", c.chipBg);
  r.setProperty("--chip-border", c.chipBorder);
  if (c.chipText) r.setProperty("--chip-text", c.chipText);

  // ラジオ丸（カテゴリ/支払い）
  r.setProperty("--radio-bg", c.radioBg);
  r.setProperty("--accent", c.radioActive);

  // 小ボタン（±）
  r.setProperty("--btn-bg", c.buttonBg);
  r.setProperty("--btn-border", c.buttonBorder);
  if (c.buttonText) r.setProperty("--btn-text", c.buttonText);

  // 数量バッジ
  r.setProperty("--badge-bg", c.badgeBg);
  if (c.badgeText) r.setProperty("--badge-text", c.badgeText);

  // スライダー
  r.setProperty("--slider-track", c.sliderTrack);
  r.setProperty("--slider-fill", c.sliderFill);
  r.setProperty("--knob-start", c.knobStart);
  r.setProperty("--knob-end", c.knobEnd);

  // スクロールバー
  r.setProperty("--scrollbar-thumb", c.scrollbarThumb);

  // 影
  r.setProperty("--shadow-sm", s.sm);
  r.setProperty("--shadow-lg", s.lg);
}
/* === glow theming (categories & payments) === */
export type GlowSpec = { color: string; ringWidthPx?: number; blurPx?: number };

export const GLOW_THEME: {
  category: GlowSpec;
  payments: { default: GlowSpec; byKey: Record<string, GlowSpec> };
} = {
  category: { color: "rgba(56,189,0,.9)", ringWidthPx: 1, blurPx: 12 }, // カテゴリ一括
  payments: {
    default: { color: "rgba(56,189,248,.9)", ringWidthPx: 2, blurPx: 12 }, // 既定
    byKey: {
       "cash":   { color: "rgba(245,158,11,.95)", blurPx: 16 },
       "card":   { color: "rgba(34,197,94,.95)" },
       "paypay": { color: "rgba(239,68,68,.95)", ringWidthPx: 3 },
    }
  }
};

/** 支払いアイコン: キーから色/強さを割当。未定義は default */
export function paymentGlow(key: string | undefined): Record<string,string> {
  const k = (key ?? "").toString().trim().toLowerCase();
  const spec = (k && GLOW_THEME.payments.byKey[k]) || GLOW_THEME.payments.default;
  return {
    ["--pay-glow-color" as any]: spec.color,
    ["--pay-glow-width" as any]: (spec.ringWidthPx ?? 2) + "px",
    ["--pay-glow-blur" as any]: (spec.blurPx ?? 12) + "px",
    // btn-radio-icon で --glow-* にもフォールバック
    ["--glow-color" as any]: spec.color,
    ["--glow-ring-width" as any]: (spec.ringWidthPx ?? 2) + "px",
    ["--glow-blur" as any]: (spec.blurPx ?? 12) + "px",
  };
}

/** 任意: カテゴリ用変数を :root に適用 */
export function applyCategoryGlowVars(doc?: Document) {
  const d = doc ?? (typeof document !== "undefined" ? document : undefined);
  if(!d) return;
  const r = d.documentElement;
  r.style.setProperty("--cat-glow-color", GLOW_THEME.category.color);
  r.style.setProperty("--cat-glow-width", (GLOW_THEME.category.ringWidthPx ?? 2) + "px");
  r.style.setProperty("--cat-glow-blur", (GLOW_THEME.category.blurPx ?? 12) + "px");
}
export const QTY_THEME = { activeBg: 'rgba(34,197,94,.16)' };
export const qtyVars = (active?: boolean) => active ? ({ ['--qty-bg' as any]: QTY_THEME.activeBg } as any) : ({} as any);
export const qtyActiveVars = () => ({ ['--qty-bg' as any]: QTY_THEME.activeBg } as any);

````

## styles/globals.css
- lines: 163 / sha256: 45EF426AB47938961826CDE8C527CA08F0CD94285386FFFF5589E24EED7325E4

````css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ===== font stacks (英/日 一括) ===== */
:root{
  --font-en: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  --font-ja: "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "YuGothic", Meiryo, "Noto Sans JP";

  /* colors (ThemeProvider が上書き) */
  --bg-app: #f5f5f7;
  --text: #111827;
  --text-muted: #6b7280;

  --surface: #ffffff;
  --surface-elev: #f3f4f6;
  --border: rgba(0,0,0,0.08);

  --chip-bg: #f3f4f6;
  --chip-border: rgba(0,0,0,0.10);
  --chip-text: #374151;

  --radio-bg: #ffffff;
  --accent: rgba(0,0,0,0.25);

  --btn-bg: #ffffff;
  --btn-border: rgba(0,0,0,0.10);
  --btn-text: #111827;

  --badge-bg: #ffffff;
  --badge-text: #111827;

  --slider-track: rgba(0,0,0,0.05);
  --slider-fill: rgba(0,0,0,0.08);
  --knob-start: #ffffff;
  --knob-end: #e5e7eb;

  --scrollbar-thumb: rgba(0,0,0,0.10);

  --shadow-sm: 0 1px 1px rgba(0,0,0,0.04);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.06);
 --qty-bg: rgba(34,197,94,.20);}

html, body, #__next { height: 100%; }
body {
  -webkit-tap-highlight-color: transparent;
  font-family: var(--font-en), var(--font-ja), system-ui, sans-serif;
  background: var(--bg-app);
  color: var(--text);
}

/* ===== tokens (CSS 変数に寄せる) ===== */
@layer components {
  .ios-surface {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: var(--shadow-sm), var(--shadow-lg);
  }
  .ios-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
  }
  .ios-chip {
    background: var(--chip-bg);
    border: 1px solid var(--chip-border);
    color: var(--chip-text, var(--text-muted));
    border-radius: 9999px;
    padding: 2px 8px;
  }
  .ios-round {
    border-radius: 9999px;
    background: var(--radio-bg);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }
  .ios-sep { border-top: 1px solid var(--border); }

  .ui-tap { transition: transform .1s; }
  .ui-tap:active { transform: scale(.98); }
  .ui-focus:focus{box-shadow:none; outline:0;} .ui-focus:focus{box-shadow:none; outline:0;}

  .btn-round-sm {
    border-radius: 9999px;
    background: var(--btn-bg);
    border: 1px solid var(--btn-border);
    color: var(--btn-text, inherit);
    box-shadow: var(--shadow-sm);
  }

  .btn-radio-icon {
    background: var(--radio-bg);
    border: 1px solid var(--border);
    border-radius: 9999px;
    box-shadow: var(--shadow-sm);
   cursor: pointer;  pointer-events: auto;  position: relative; overflow: visible;}
  .btn-radio-active {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--accent) inset, var(--shadow-sm);
  }

  .btn-radio-label { color: var(--text-muted); }

  .row-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
    text-align: left;
    padding: .5rem;
  }
}

/* scrollbars */
*::-webkit-scrollbar { width: 10px; height: 10px; }
*::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 9999px; }
*::-webkit-scrollbar-track { background: transparent; }

/* === glow ring (category/payments) === */
.glow-ring{ position:relative; z-index:0; }
.glow-ring::after{
  content:"";
  position:absolute;
  inset: calc(-1 * var(--glow-ring-width,2px));
  border-radius:9999px;
  pointer-events:none;
  z-index:1;
  box-shadow:
    0 0 0 var(--glow-ring-width,2px) var(--glow-color,rgba(56,189,248,.9)),
    0 0 var(--glow-blur,12px) var(--glow-color,rgba(56,189,248,.9));
  animation:ring-glow 1.6s ease-in-out infinite;
}
@keyframes ring-glow{
  0%,100%{
    box-shadow:
      0 0 0 var(--glow-ring-width,2px) var(--glow-color,rgba(56,189,248,.9)),
      0 0 calc(var(--glow-blur,12px)*0.85) var(--glow-color,rgba(56,189,248,.9));
  }
  50%{
    box-shadow:
      0 0 0 var(--glow-ring-width,2px) var(--glow-color,rgba(56,189,248,.9)),
      0 0 calc(var(--glow-blur,12px)*1.2) var(--glow-color,rgba(56,189,248,.9));
  }
}

/* rectangle glow (inherit radius) */
.glow-box{ position: relative; overflow: visible; }
.glow-box::after{
  content:"";
  position:absolute;
  inset: calc(-1 * var(--glow-ring-width,2px));
  border-radius: inherit;
  pointer-events:none;
  box-shadow:
    0 0 0 var(--glow-ring-width,2px) var(--glow-color, rgba(56,189,248,.9)),
    0 0 var(--glow-blur,12px) var(--glow-color, rgba(56,189,248,.9));
  animation: ring-glow 1.6s ease-in-out infinite;
}  
/* qty badge (ProductCard) */
.qty-badge{min-width:22px;height:22px;line-height:22px;text-align:center;border-radius:9999px;border:1px solid var(--border);background:var(--badge-bg);color:var(--badge-text);box-shadow:var(--shadow-sm)}
.qty-badge[data-qty]:not([data-qty="0"]){ background: var(--qty-bg, rgba(34,197,94,.20)); }
````

## data/catalog.ts
- lines: 70 / sha256: EDD1C35780C65E923CBF64E06B2DF31A31259FDEAA60FD90BF0FF2B927A5EF95

````ts
/**
 * データと型の一元管理。
 * 将来的に Excel から読み込む場合は、ここに取り込みロジックを実装。
 */

export type Category = {
  id: string;
  name: string;
  icon?: string;     // 絵文字 or 画像URL
  themeColor?: string;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  cost?: number;
  allergy?: string[];   // ["小麦", "乳"] など
  imageUrl?: string;
  themeColor?: string;
  description?: string;
};

export type DataSet = {
  categories: Category[];
  products: Product[];
};

/** ひな型データ（ここを書き換えれば UI に即反映） */
export const categories: Category[] = [
  { id: "Burger", name: "バーガー",    icon: "🍔" },
  { id: "RiceBurger", name: "ライスバーガー",    icon: "🍔" },
  { id: "drink",  name: "ドリンク", icon: "🥤" },
  { id: "side",    name: "サイド",  icon: "🍟" },
];

export const products: Product[] = [
  { id: "1", categoryId: "set",    name: "Aセット",   price: 1500, cost: 200, allergy: ["小麦","乳"] },
  { id: "2", categoryId: "set",    name: "Bセット", price: 1600, cost: 250, allergy: ["小麦","乳"] },
  { id: "3", categoryId: "side", name: "ポテト",         price: 300, cost: 80  },
  { id: "4", categoryId: "drink",  name: "ドリンク",       price: 200, cost: 50  },
  { id: "5", categoryId: "Burger", name: "ハンバーガー",         price: 300, cost: 80 , allergy: ["小麦","乳"] },
  { id: "6", categoryId: "Burger",  name: "チーズバーガー",       price: 200, cost: 50 , allergy: ["小麦","乳"]},
  { id: "7", categoryId: "RiceBurger", name: "ライスバーガー",         price: 300, cost: 80 , allergy: ["小麦","乳"] },
  { id: "8", categoryId: "RiceBurger",  name: "ライスチーズバーガー",       price: 200, cost: 50 , allergy: ["小麦","乳"]},
];

/** 補助関数 */
export const productsByCategory = (catId: string) =>
  products.filter(p => p.categoryId === catId);

/**
 * 将来の Excel ローダ（XLSX -> DataSet）
 * - 実装時は `npm i xlsx` して、ArrayBuffer を parse
 * - 列例: categoryId, name, price, cost, allergy(カンマ区切り), imageUrl, themeColor, description
 */
export async function loadFromXlsx(_wb: ArrayBuffer): Promise<DataSet> {
  // import("xlsx") を使って実装予定。
  // 例:
  // const XLSX = await import("xlsx");
  // const wb = XLSX.read(_wb, { type: "array" });
  // const sheet = wb.Sheets[wb.SheetNames[0]];
  // const rows = XLSX.utils.sheet_to_json<any>(sheet, { defval: "" });
  // const categories: Category[] = ...
  // const products: Product[] = ...
  // return { categories, products };
  throw new Error("XLSX loader is not implemented yet.");
}

````

## tailwind.config.js
- lines: 10 / sha256: C4E7D9A1DF18C95BF50F7A4BBED470256F5915F3DF816F49C49CC92DF02F32F6

````js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: { extend: {} },
  plugins: [require("twglow")]
};
````

## postcss.config.js
- lines: 6 / sha256: 70D80474092959D6192FAF6931843AB7C6F4EFEA62C8EC1CA1DFB0305758B960

````js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
````


