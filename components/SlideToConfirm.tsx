import { useSfxHowler } from "../hooks/useSfxHowler";
import { useRef, useState } from "react";

export default function SlideToConfirm({ onConfirm }: { onConfirm: ()=>void }) {
  const sfx = useSfxHowler({ enableConfirm: true });
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed right-4 bottom-4">
      <button
        disabled={done}
        onClick={() => { sfx.playConfirm(); setDone(true); onConfirm(); }}
        className="px-6 py-3 rounded-2xl bg-black text-white shadow disabled:opacity-60"
      >
        {done ? "送信済み" : "スライドして注文（簡易）"}
      </button>
    </div>
  );
}
