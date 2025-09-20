import { useCallback } from "react";

let ctx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  // @ts-ignore Safari
  const AC = window.AudioContext || (window as any).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

type Variant = "appleTap" | "click" | "lineTap";
type Options = {
  volume?: number;
  variant?: Variant;
};

/**
 * クリック音フック
 * - appleTap: 高域サイン＋微ノイズの軽いタップ
 * - click   : ハイパスノイズのみ（汎用クリック）
 * - lineTap : LINE風のポコッ（高→低の2音＋ピッチダウン、短い残響）
 */
export default function useClickSound(opts: Options | number = {}) {
  const options: Options =
    typeof opts === "number" ? { volume: opts, variant: "lineTap" } : { variant: "lineTap", ...opts };
  const { volume = 0.22, variant = "lineTap" } = options;

  return useCallback(() => {
    const ac = getCtx();
    if (!ac) return;

    if (variant === "lineTap") {
      // 全体 65〜85ms 程度で軽く
      const now = ac.currentTime;
      const dur = 0.075 + (Math.random() - 0.5) * 0.01;
      const end = now + dur;

      // 2つの短いトーン（高→低）：柔らかい矩形/三角の中間っぽさにするため「triangle」
      const osc1 = ac.createOscillator();
      const osc2 = ac.createOscillator();
      osc1.type = "triangle";
      osc2.type = "triangle";

      // ちょい高め→低め（LINEのポコッ感）
      const f1 = 1300 + Math.random() * 120; // 1.3〜1.42kHz
      const f2 = 850 + Math.random() * 90;   // 0.85〜0.94kHz
      osc1.frequency.setValueAtTime(f1, now);
      osc2.frequency.setValueAtTime(f2, now + 0.018); // 18msくらい遅らせて二音目

      const g1 = ac.createGain();
      const g2 = ac.createGain();
      g1.gain.value = 0.0001;
      g2.gain.value = 0.0001;

      // 短いADエンベロープ＋ピッチダウン（軽い“ポコ”）
      g1.gain.exponentialRampToValueAtTime(volume * 0.35, now + 0.01);
      g1.gain.exponentialRampToValueAtTime(0.0001, end);

      g2.gain.exponentialRampToValueAtTime(volume * 0.25, now + 0.03);
      g2.gain.exponentialRampToValueAtTime(0.0001, end);

      // 1音目は少しだけピッチを下げる（ぽこ）
      osc1.frequency.exponentialRampToValueAtTime(f1 * 0.86, end - 0.01);
      // 2音目も軽く下げる
      osc2.frequency.exponentialRampToValueAtTime(f2 * 0.9, end - 0.01);

      // アタック用の微ノイズ（高域だけ極小）
      const noiseDur = dur;
      const nbuf = ac.createBuffer(1, Math.floor(noiseDur * ac.sampleRate), ac.sampleRate);
      const data = nbuf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const t = i / ac.sampleRate;
        data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 120); // すぐ消える
      }
      const nsrc = ac.createBufferSource();
      nsrc.buffer = nbuf;
      const hp = ac.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1200;
      const gn = ac.createGain();
      gn.gain.value = volume * 0.08;

      // ごく薄い残響（コーラスっぽい広がり）：2~3msの超ショートディレイ
      const delay = ac.createDelay();
      delay.delayTime.value = 0.0025 + Math.random() * 0.0008;
      const gd = ac.createGain();
      gd.gain.value = volume * 0.12;

      // ルーティング
      osc1.connect(g1).connect(ac.destination);
      osc2.connect(g2).connect(ac.destination);
      nsrc.connect(hp).connect(gn).connect(ac.destination);

      // 2音目を軽くディレイに回して厚みを出す
      osc2.connect(g2);
      g2.connect(delay).connect(gd).connect(ac.destination);

      // 再生
      osc1.start(now);
      osc2.start(now + 0.018);
      nsrc.start(now);
      osc1.stop(end);
      osc2.stop(end);
    } else if (variant === "appleTap") {
      const dur = 0.045 + (Math.random() - 0.5) * 0.006;
      const end = ac.currentTime + dur;
      const osc = ac.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 2100 + Math.random() * 300;
      const gTone = ac.createGain();
      gTone.gain.setValueAtTime(0.0001, ac.currentTime);
      gTone.gain.exponentialRampToValueAtTime(volume * 0.28, ac.currentTime + 0.004);
      gTone.gain.exponentialRampToValueAtTime(0.0001, end);
      const buf = ac.createBuffer(1, Math.floor(dur * ac.sampleRate), ac.sampleRate);
      const ch = buf.getChannelData(0);
      for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
      const src = ac.createBufferSource();
      src.buffer = buf;
      const hp = ac.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1500;
      const gNoise = ac.createGain();
      gNoise.gain.value = volume * 0.12;
      osc.connect(gTone).connect(ac.destination);
      src.connect(hp).connect(gNoise).connect(ac.destination);
      osc.start();
      src.start();
      osc.stop(end);
    } else {
      const dur = 0.05;
      const end = ac.currentTime + dur;
      const buf = ac.createBuffer(1, Math.floor(dur * ac.sampleRate), ac.sampleRate);
      const ch = buf.getChannelData(0);
      for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * Math.exp(-(i / ac.sampleRate) * 70);
      const src = ac.createBufferSource();
      src.buffer = buf;
      const hp = ac.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1200;
      const g = ac.createGain();
      g.gain.value = volume;
      src.connect(hp).connect(g).connect(ac.destination);
      src.start();
    }
  }, [volume, variant]);
}
