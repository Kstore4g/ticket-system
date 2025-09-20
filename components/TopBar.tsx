"use client";
import React from "react";
import { motion } from "framer-motion";
import useSfxHowler from "../hooks/useSfxHowler";

export type Payment = "CARD" | "QR" | "CASH";
export const methods: Payment[] = ["CARD", "QR", "CASH"];
const icons: Record<Payment, string> = { CARD: "💳", QR: "📱", CASH: "💴" };
const labels: Record<Payment, string> = { CARD: "カード", QR: "QR", CASH: "現金" };

const SPRING = { type: "spring", mass: 0.6, stiffness: 320, damping: 24, restDelta: 0.001 };

export default function TopBar({
  payment,
  onChange,
}: {
  payment: Payment | null;
  onChange: (p: Payment) => void;
}) {
  if (payment === null) return null;
  const { playKey } = useSfxHowler();

  return (
    <div className="w-full px-2 pb-2 flex items-center gap-4">
      <div className="flex items-center gap-3">
        {methods.map((m) => (
          <motion.button
            key={m}
            layoutId={`pay-${m}`}
            transition={SPRING}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => { playKey("mid"); onChange(m); }}
            aria-pressed={payment === m}
            title={m}
            className={`w-16 h-16 rounded-full flex items-center justify-center border text-2xl transition-colors ${
              payment === m
                ? "bg-yellow-400 text-black border-yellow-500 ring-2 ring-yellow-300"
                : "bg-white text-black border-gray-300 hover:bg-gray-50"
            }`}
          >
            {icons[m]}
          </motion.button>
        ))}
      </div>
      <div className="pl-2 text-gray-900 text-base">
        <span className="opacity-80">現在の支払い方法：</span>
        <span className="font-semibold">{labels[payment]}</span>
      </div>
    </div>
  );
}
