import React from "react";

type Payment = "CARD" | "QR" | "CASH";
const icons: Record<Payment, string> = { CARD: "💳", QR: "📱", CASH: "💴" };

export default function TopBar({
  payment,
  onChange,
}: {
  payment: Payment | null;
  onChange: (p: Payment) => void;
}) {
  const all: Payment[] = ["CARD", "QR", "CASH"];
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-center gap-3">
        {all.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChange(m)}
            aria-pressed={payment === m}
            className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 border transition ${
              payment === m
                ? "bg-yellow-400 text-black border-yellow-500 ring-2 ring-yellow-300"
                : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            }`}
            title={m}
          >
            <span className="text-lg">{icons[m]}</span>
            <span className="tracking-wide">{m}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
