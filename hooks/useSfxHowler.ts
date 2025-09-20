"use client";
import { useMemo, useCallback } from "react";
import { Howl } from "howler";

type KeyVariant = "high" | "mid" | "low";

export default function useSfxHowler() {
  // SSR回避：ブラウザのみHowlを作成
  const sounds = useMemo(() => {
    if (typeof window === "undefined") return null;

    const mk = (src: string, vol = 0.22) =>
      new Howl({
        src: [src],
        preload: true,   // 事前デコードで遅延低減
        html5: false,    // WebAudio優先（低遅延）
        volume: vol,
        rate: 1.0,
      });

    return {
      high: mk("/sounds/ui-key-high.wav"),
      mid:  mk("/sounds/ui-key-mid.wav"),
      low:  mk("/sounds/ui-key-low.wav"),
      confirm: mk("/sounds/ui-confirm.wav", 0.24),
    };
  }, []);

  const playKey = useCallback((v: KeyVariant = "high") => {
    if (!sounds) return;
    const s = sounds[v];
    // 自然さのために ±2% のピッチ揺らぎ＆±0.01 の音量揺らぎ
    s.rate(0.99 + Math.random() * 0.02);
    s.volume(0.21 + Math.random() * 0.02);
    s.play();
  }, [sounds]);

  const playConfirm = useCallback(() => {
    if (!sounds) return;
    const s = sounds.confirm;
    s.rate(1.0);
    s.volume(0.24);
    s.play();
  }, [sounds]);

  return { playKey, playConfirm };
}
