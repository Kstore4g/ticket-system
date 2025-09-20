"use client";
import { useMemo, useCallback } from "react";
import { Howl, Howler } from "howler";

/** HowlerベースのSE（ui-key / ui-confirm の2種） */
export default function useSfxHowler() {
  const sounds = useMemo(() => {
    if (typeof window === "undefined") return null;

    const mk = (src: string, vol = 0.22) => {
      const h = new Howl({
        src: [src],        // MP3
        preload: true,     // 事前デコード
        html5: false,      // WebAudio 優先（低遅延）
        volume: vol,
        rate: 1.0,
      });
      h.on("load", () => console.debug("[SFX] loaded:", src));
      h.on("loaderror", (_id, err) => console.warn("[SFX] loaderror:", src, err));
      h.on("playerror", (_id, err) => {
        console.warn("[SFX] playerror:", src, err, "-> resume()");
        try { const ctx = (Howler as any).ctx; if (ctx?.state === "suspended") ctx.resume(); h.play(); } catch {}
      });
      return h;
    };

    return {
      key:      mk("/sounds/ui-key.mp3", 0.22),
      confirm:  mk("/sounds/ui-confirm.mp3", 0.24),
    };
  }, []);

  /** 初回タップ時のアンロック（どのクリック前でもOK） */
  const unlock = useCallback(() => {
    try {
      const ctx = (Howler as any).ctx;
      if (ctx && ctx.state === "suspended") { ctx.resume(); console.debug("[SFX] AudioContext resumed"); }
    } catch {}
  }, []);

  const playKey = useCallback(() => {
    if (!sounds) return;
    const s = sounds.key;
    // 自然さ ±2% ピッチ & ±0.01 音量
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

  return { unlock, playKey, playConfirm };
}
