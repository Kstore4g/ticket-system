"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * 高級感のある「スライドして決済」
 *  - ノブ: 32px、枠の内側に完全フィット（はみ出し無し）
 *  - トラック: 薄い縁取り＋微シャドウ、中央ラベル
 *  - プログレス: ノブ中心まで淡く塗りつぶし
 *  - 90% 到達で確定、確定後は自動で戻る
 *  - 純React（pointer events）で軽量＆モバイル安定
 */
export default function SlideToConfirm({
  onConfirm,
  disabled = false,
  label = "スライドして決済",
  labelEmpty = "カートが空です",
}: {
  onConfirm: () => void;
  disabled?: boolean;
  label?: string;
  labelEmpty?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [trackW, setTrackW] = useState(0);
  const [posPx, setPosPx] = useState(0); // 0..maxX（左端基準）

  // デザイン調整
  const KNOB = 32; // ノブ直径
  const PAD  = 10; // トラック左右の余白
  const maxX = Math.max(0, trackW - KNOB - PAD * 2); // 枠内で収まる最大値
  const pct  = maxX === 0 ? 0 : posPx / maxX;

  useEffect(() => {
    const resize = () => setTrackW(trackRef.current?.getBoundingClientRect().width ?? 0);
    resize(); window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => { if (disabled) setPosPx(0); }, [disabled]);

  const clamp = (v:number,min:number,max:number)=>Math.max(min,Math.min(v,max));

  const onPointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || disabled) return;
    const rect = trackRef.current?.getBoundingClientRect(); if (!rect) return;
    let x = e.clientX - rect.left - PAD - KNOB/2;      // ノブ中心をドラッグ
    setPosPx(clamp(x, 0, maxX));
  };
  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    if (!disabled && pct >= 0.9) {
      setPosPx(maxX); setTimeout(() => { try { onConfirm(); } finally { setPosPx(0); } }, 120);
    } else {
      setPosPx(0);
    }
  };

  // キーボード操作（a11y）
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "ArrowRight") setPosPx(p => clamp(p + maxX*0.1, 0, maxX));
    if (e.key === "ArrowLeft")  setPosPx(p => clamp(p - maxX*0.1, 0, maxX));
    if (e.key === "Enter" && pct >= 0.9) { onConfirm(); setPosPx(0); }
  };

  const knobLeft = PAD + posPx;
  const progWidth = posPx + KNOB/2;

  return (
    <div className="mt-1" data-slide-version="elegant-v1">
      <div
        ref={trackRef}
        className={\`relative h-12 rounded-full bg-white/80 border border-gray-200 shadow-sm backdrop-blur \${disabled ? "opacity-60" : ""}\`}
        role="slider"
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct*100)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* プログレス（淡い塗り） */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[10px] h-8 rounded-full bg-black/[0.06]"
             style={{ width: Math.max(0, progWidth) }} />

        {/* ラベル */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none text-sm text-gray-700 font-medium">
          {disabled ? labelEmpty : label}
        </div>

        {/* ノブ（グラデ＋光沢、枠内フィット） */}
        <div
          onPointerDown={onPointerDown}
          className={\`absolute top-1/2 -translate-y-1/2 rounded-full select-none touch-none ring-1 ring-black/10 \${disabled ? "bg-neutral-500" : "bg-gradient-to-b from-neutral-900 to-neutral-800"}\`}
          style={{ width: KNOB, height: KNOB, left: knobLeft, transition: dragging ? "none" : "left 160ms ease",
                   boxShadow: "0 4px 10px rgba(0,0,0,0.15)" }}
          aria-label="slide knob"
        >
          <div className="absolute inset-0 rounded-full pointer-events-none"
               style={{ background: "radial-gradient(120% 100% at 50% 0%, rgba(255,255,255,0.25), rgba(255,255,255,0) 55%)" }} />
          <div className="w-full h-full grid place-items-center text-white text-base">›</div>
        </div>
      </div>
    </div>
  );
}
