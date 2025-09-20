import { Howl } from "howler";
import { useMemo, useRef } from "react";

type SfxMap = {
  key?: Howl;       // 通常クリック
  confirm?: Howl;   // 確定
};

export function useSfxHowler(options?: { enableKey?: boolean; enableConfirm?: boolean }) {
  const { enableKey = false, enableConfirm = true } = options ?? {};
  const sounds = useRef<SfxMap | null>(null);

  sounds.current ??= {
    key: new Howl({ src: ["/sounds/ui-key.mp3"], volume: 0.6 }),
    confirm: new Howl({ src: ["/sounds/ui-confirm.mp3"], volume: 0.9 })
  };

  return useMemo(() => ({
    playKey() { if (enableKey) sounds.current?.key?.play(); },
    playConfirm() { if (enableConfirm) sounds.current?.confirm?.play(); }
  }), [enableKey, enableConfirm]);
}
