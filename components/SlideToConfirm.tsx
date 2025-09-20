"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import useSfxHowler from "../hooks/useSfxHowler";

export default function SlideToConfirm({
  onConfirm,
  disabled,
}: {
  onConfirm: () => void;
  disabled?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [confirming, setConfirming] = useState(false);
  const { playConfirm } = useSfxHowler();

  const handleEnd = () => {
    const track = trackRef.current;
    const knob = knobRef.current;
    if (!track || !knob) return;

    const padding = 8;
    const max = track.clientWidth - knob.clientWidth - padding * 2;
    const current = x.get();
    const reached = current > max * 0.7;

    if (reached && !disabled) {
      setConfirming(true);
      animate(x, max, { type: "spring", stiffness: 400, damping: 35 });
      setTimeout(() => {
        playConfirm();     // ← 確定音
        onConfirm();
        setConfirming(false);
        animate(x, 0, { type: "spring", stiffness: 400, damping: 35 });
      }, 120);
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 35 });
    }
  };

  return (
    <div className="mt-3">
      <div
        ref={trackRef}
        className={`relative w-full h-16 rounded-full ${
          disabled ? "bg-gray-200" : "bg-gray-100"
        } border border-gray-200 overflow-hidden p-2`}
      >
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-gray-600 text-base">
          {disabled ? "カートが空です" : "スライドして注文を確定"}
        </div>
        <motion.div
          ref={knobRef}
          className={`absolute top-2 left-2 h-12 w-12 rounded-full flex items-center justify-center text-2xl ${
            disabled ? "bg-gray-400 text-white" : "bg-green-500 text-white"
          } shadow`}
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0}
          style={{ x }}
          onDragEnd={handleEnd}
          whileTap={{ scale: 0.98 }}
        >
          ▶
        </motion.div>
      </div>
    </div>
  );
}
