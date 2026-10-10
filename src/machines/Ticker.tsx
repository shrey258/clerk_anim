// 360 x 330. A departures ticker. Only the bottom ~70 is in the frame, so it sits at the bottom.

const css = `@keyframes ticker-scroll { to { transform: translateX(-50%) } }`

const TEXT = 'NOW BOARDING · AT 812 TO TOKYO HANEDA · GATE B14 · GROUP 2 · '

export function Ticker() {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 22, overflow: 'hidden', whiteSpace: 'nowrap', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: '#3d3b44' }}>
      <style>{css}</style>
      {/* The text is doubled, so sliding it half its width loops without a jump */}
      <div style={{ display: 'inline-block', animation: 'ticker-scroll 16s linear infinite' }}>{TEXT.repeat(4)}</div>
    </div>
  )
}
