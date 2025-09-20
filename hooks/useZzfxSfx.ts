import { useCallback, useMemo } from "react";

// ---- ZzFX プリセット（高級クリック／確定音） ------------------
// ※数値は好みに合わせて後から微調整できます
//   [vol,rand, freq, attack, sustain, release, shape, shapeCurve, tremolo,
//    slide, deltaSlide, pitchJump, repeatTime, noise, mod, bitCrush, delay,
//    sustainVol, decay, comp, resonance]

const CLICK_DELUXE: number[] = [
  0.35, 0.02, 1800, 0.004, 0.020, 0.045, 2, 0, 0, -0.25, 0, 0, 0, 0.02, 0, 0, 0, 0.85, 0, 0, 0.5
]; // ほんの少しピッチダウン＋薄ノイズ＝上品な“コチッ”

const CONFIRM_SLIDE: number[] = [
  0.40, 0.00, 900, 0.005, 0.085, 0.060, 0, 0, 0, 0.22, 0, 0, 0, 0.00, 0, 0, 0.015, 0.90, 0, 0, 0.5
]; // 高→低に軽くスライド、“ポコン”寄りの確定音（短め）

// ---------------------------------------------------------------

/** SSR安全な ZzFX 呼び出し */
async function loadZzfx(): Promise<(...params: number[]) => void> {
  if (typeof window === "undefined") return () => {};
  const mod = await import("zzfx"); // dynamic import でSSR回避
  // zzfx は AudioContext を内部で自動管理
  return (mod as any).zzfx as (...params: number[]) => void;
}

export default function useZzfxSfx() {
  // モジュールは初回呼び出し時に読み込み
  const api = useMemo(() => {
    let fn: ((...p: number[]) => void) | null = null;
    return {
      play: async (arr: number[]) => {
        if (!fn) fn = await loadZzfx();
        fn!(...arr);
      },
    };
  }, []);

  const playClick = useCallback(() => { api.play(CLICK_DELUXE); }, [api]);
  const playConfirm = useCallback(() => { api.play(CONFIRM_SLIDE); }, [api]);

  // パラメータも外へ公開（調整用）
  return { playClick, playConfirm, CLICK_DELUXE, CONFIRM_SLIDE };
}
