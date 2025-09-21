import React, { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  useUiForcePatch();
  return <Component {...pageProps} />;
}

// 既存のSW登録は維持
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  });
}

function useUiForcePatch() {
  useEffect(() => {
    // --- inject style (強制スタイル) ---
    const sid = "ui-force-style";
    if (!document.getElementById(sid)) {
      const s = document.createElement("style");
      s.id = sid;
      s.textContent = `
.three-pane{gap:2px !important}
.pane-right .payment-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.pane-right .payment-row :where(button,[role="button"],a){width:36px;height:36px;border-radius:9999px;display:grid;place-items:center;padding:0}
.pane-right .payment-row :where(svg,img){width:18px;height:18px}
.make-qty-abs{position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;font-weight:600;font-size:1.25rem;color:#16a34a}
.no-dividers :where([class*='border-l'],[class*='divide-x']){border-left:0!important;border-left-width:0!important;border-right-width:0!important}
.grid>* , .flex>* {min-width:0}
`;
      document.head.appendChild(s);
    }

    const force = () => {
      // ---- 列ギャップを2pxに（親グリッドへ直接設定） ----
      const aside = document.querySelector("aside");
      const main  = document.querySelector("main");
      const sect  = document.querySelector("section");
      const parent = (aside?.parentElement) || (main?.parentElement) || (sect?.parentElement);
if (parent instanceof HTMLElement) {
  const LEFT = 65;  // 左カラム固定幅(px) ここを調整可
  const RIGHT = 380;
  const LEFT_PAD = 10;
  const TOP_PAD = 2;  // 画面上端の余白(px)  // 画面左端の余白(px): 好みで調整  // 右カラム固定幅(px) ここを調整可
  parent.style.display = "grid";
  parent.style.gridTemplateColumns = LEFT + "px minmax(0,1fr) " + RIGHT + "px"; // 中央のみ可変
  parent.style.gap = "2px";
  parent.style.paddingLeft = LEFT_PAD + "px";
  parent.style.paddingTop = `calc(var(--safe-top, 0px) + ${TOP_PAD}px)`;
  if (aside instanceof HTMLElement) { aside.style.width = LEFT + "px"; }
  if (sect  instanceof HTMLElement) { sect.style.width  = RIGHT + "px"; }
}

      // ---- 右：支払いアイコンを44x44の丸に（ボタン/リンクを直接スタイル）----
      const right = sect || document.querySelector("section");
      if (right) {
        right.querySelectorAll("button,[role='button'],a").forEach((el) => {
          const e = el as HTMLElement;
          e.style.width = "44px"; e.style.height = "44px"; e.style.borderRadius = "9999px";
          e.style.display = "grid"; (e.style as any).placeItems = "center"; e.style.padding = "0";
          const icon = e.querySelector("svg, img") as HTMLElement | null;
          if (icon) { icon.style.width = "22px"; icon.style.height = "22px"; }
        });
      }

      // ---- 中央：プラス/仕切り除去 & 数量を右肩固定 ----
      const center = main || document.querySelector("main");
      if (center) {
        // 仕切り（border-left）除去
        center.querySelectorAll("*").forEach((n) => {
          const el = n as HTMLElement;
          const cs = getComputedStyle(el);
          if (cs.borderLeftWidth && cs.borderLeftWidth !== "0px") { el.style.borderLeft = "0"; }
        });

        // プラス表示を広めに検出して消す（ボタン以外も対象）
        center.querySelectorAll("*").forEach((n) => {
          const el = n as HTMLElement;
          const t = (el.textContent || "").trim();
          const aria = (el.getAttribute("aria-label") || "") + " " + (el.getAttribute("title") || "");
          if (t === "+" || t === "＋" || /\b(add|追加)\b/i.test(aria)) {
            el.style.display = "none";
          }
        });

        // 各商品行の数量「× N」を右肩に固定
        const rows = center.querySelectorAll("li,.product-row,.card,[data-product],article,div");
        rows.forEach((row) => {
          const host = row as HTMLElement;
          // 行らしい見た目のものだけを対象（高さと子要素数）
          if (host.clientHeight < 40 || host.children.length < 2) return;
          if (getComputedStyle(host).position === "static") host.style.position = "relative";
          // 「× N」を探す
          const qtyNode = Array.from(host.querySelectorAll("*")).find(n => {
            const t = (n.textContent || "").trim();
            return /^×\s*\d+$/.test(t);
          }) as HTMLElement | undefined;
          if (qtyNode) qtyNode.classList.add("make-qty-abs");
        });
      }
    };

    // 初回 + 遅延2回（描画タイミング差分を吸収）
    force(); setTimeout(force, 50); setTimeout(force, 300);

    // 変化を監視して再適用
    const mo = new MutationObserver(() => force());
    mo.observe(document.body, { subtree:true, childList:true });
    return () => mo.disconnect();
  }, []);
}

