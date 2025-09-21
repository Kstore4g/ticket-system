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
  const knobRef = useRef<HTMLButtonElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState(0); // 0..1
  const [pointerId, setPointerId] = useState<number | null>(null);
  const knobPx = 32;
  const confirmAt = 0.9;

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const updateByClientX = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const rel = clamp(clientX - rect.left, 0, rect.width - knobPx);
    const p = rel / (rect.width - knobPx);
    setPos(p);
  };

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      e.preventDefault();
      e.stopPropagation();
      updateByClientX(e.clientX);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      e.preventDefault();
      e.stopPropagation();
      if (pointerId !== null && knobRef.current?.hasPointerCapture(pointerId)) {
        knobRef.current.releasePointerCapture(pointerId);
      }
      setDragging(false);
      if (pos >= confirmAt && !disabled) {
        setPos(1);
        onConfirm();
      } else {
        setPos(0);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp, { passive: false });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragging, pos, disabled, onConfirm, pointerId]);

  const startDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    setPointerId(e.pointerId);
    knobRef.current?.setPointerCapture(e.pointerId);
    updateByClientX(e.clientX);
  };

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

        {/* ノブ（Pointer Events） */}
        <button
          ref={knobRef}
          type="button"
          className="absolute top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gradient-to-b from-white to-neutral-200 shadow ring-1 ring-black/10 ui-tap ui-focus"
          style={{ left: `calc(${pos * 100}% - ${knobPx / 2}px)` }}
          onPointerDown={startDrag}
          aria-label={label}
        />
      </div>
    </div>
  );
}
