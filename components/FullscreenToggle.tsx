export default function FullscreenToggle() {
  async function go() {
    const el = document.documentElement as any;
    if (el.requestFullscreen) await el.requestFullscreen();
    // 可能なら横向きにロック（対応端末のみ）
    try { await (screen as any).orientation?.lock?.("landscape"); } catch {}
  }
  return (
    <button onClick={go} className="px-4 py-2 rounded-xl border">
      全画面表示にする
    </button>
  );
}
