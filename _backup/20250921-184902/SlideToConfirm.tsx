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
      const rect = trackRef.current.getBoundingClientRect();
      const clientX =
        (e as TouchEvent).touches?.[0]?.clientX ??
        (e as MouseEvent).clientX;
      const rel = Math.min(Math.max(clientX - rect.left, 0), rect.width - knobPx);
      const p = rel / (rect.width - knobPx);
      setPos(p);
    }
    function onUp() {
      if (!dragging) return;
      setDragging(false);
      if (pos >= confirmAt && !disabled) {
        setPos(1);
        onConfirm();
      } else {
        setPos(0);
      }
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove as any);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, pos, disabled, onConfirm]);

  return (
    <div className={`w-full select-none ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}>
      <div
        ref={trackRef}
        className="relative h-11 w-full rounded-full bg-gradient-to-b from-white to-neutral-100 ring-1 ring-black/10 shadow-sm overflow-hidden"
        aria-label={label}
      >
        {/* ラベル */}
        <div className="absolute inset-0 flex items-center justify-center text-[13px] font-medium text-neutral-600 pointer-events-none">
          {label}
        </div>

        {/* 進捗 */}
        <div
          className="absolute top-0 left-0 h-full bg-neutral-200/50"
          style={{ width: `${Math.max(pos * 100, knobPx / (trackRef.current?.clientWidth || knobPx) * 100)}%` }}
        />

        {/* ノブ（button化して挙動統一） */}
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gradient-to-b from-white to-neutral-200 shadow ring-1 ring-black/10 ui-tap ui-focus"
          style={{ left: `calc(${pos * 100}% - ${knobPx / 2}px)` }}
          onMouseDown={() => setDragging(true)}
          onTouchStart={() => setDragging(true)}
          aria-label={label}
        />
      </div>
    </div>
  );
}
