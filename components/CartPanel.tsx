export default function CartPanel({
  lines, onInc, onDec
}: {
  lines: { id: string; name: string; price: number; qty: number }[];
  onInc: (id: string)=>void;
  onDec: (id: string)=>void;
}) {
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  return (
    <aside className="w-80 h-full border-l flex flex-col">
      <div className="px-4 py-3 border-b font-semibold">注文</div>
      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2">
        {lines.map(l => (
          <div key={l.id} className="flex items-center justify-between border rounded-xl p-2">
            <div>
              <div className="font-medium">{l.name}</div>
              <div className="text-sm text-gray-500">¥{l.price.toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 border rounded-lg" onClick={()=>onDec(l.id)}>-</button>
              <div>{l.qty}</div>
              <button className="px-2 border rounded-lg" onClick={()=>onInc(l.id)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 p-3 border-t bg-white">
        <div className="flex items-center justify-between font-semibold">
          <span>合計</span><span>¥{total.toLocaleString()}</span>
        </div>
      </div>
    </aside>
  );
}
