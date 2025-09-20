import { useSfxHowler } from "../hooks/useSfxHowler";

type Payment = { id: string; label: string; icon?: React.ReactNode };
export default function TopBar({ payments, onSelect }: { payments: Payment[]; onSelect: (id: string)=>void }) {
  const sfx = useSfxHowler();
  return (
    <div className="w-full h-20 px-4 flex items-center gap-3 border-b bg-white">
      {payments.map(p => (
        <button
          key={p.id}
          onClick={() => { sfx.playKey(); onSelect(p.id); }}
          className="flex items-center gap-2 rounded-2xl px-4 py-2 border hover:shadow transition"
        >
          {p.icon}<span className="text-lg font-medium">{p.label}</span>
        </button>
      ))}
    </div>
  );
}
