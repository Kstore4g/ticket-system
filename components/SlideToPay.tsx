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
   e.preventDefault(); if (disabled) return;
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