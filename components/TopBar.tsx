import React from 'react';

type Payment = 'CARD' | 'QR' | 'CASH';
const icons: Record<Payment, string> = { CARD: '💳', QR: '📱', CASH: '💴' };

export default function TopBar({
  payment,
  onChange,
}: {
  payment: Payment | null;
  onChange: (p: Payment) => void;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-70">選択中</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-400 text-black text-xl">
            {payment ? icons[payment] : '—'}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {(['CARD', 'QR', 'CASH'] as Payment[]).map((m) => (
            <button
              key={m}
              onClick={() => onChange(m)}
              className={`px-4 py-2 rounded-md font-semibold ${
                payment === m ? 'bg-yellow-400 text-black' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <span className="mr-2 text-lg">{icons[m]}</span>
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
