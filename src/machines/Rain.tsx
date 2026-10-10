import { ACCENT, INK, MUTED } from './theme'

// 720 x 506. Rain over a Tokyo street at night-ish. Only the bottom-left ~400 x 280 is in the frame.

const css = `
@keyframes rain-fall { from { transform: translateY(0) } to { transform: translateY(300px) } }
@keyframes rain-ripple { from { transform: scale(0.2); opacity: 1 } to { transform: scale(1.6); opacity: 0 } }
@keyframes rain-flicker { 0%, 100% { opacity: 1 } 50% { opacity: 0.35 } }
`

// [x, width, height] of each building, left to right.
const BUILDINGS = [[0, 54, 120], [58, 40, 86], [102, 70, 150], [176, 46, 104], [226, 62, 132], [292, 38, 72], [334, 76, 164], [414, 50, 96]]
const GROUND = 470

// Same "random" every render, so the picture never jumps.
const pick = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453
  return x - Math.floor(x)
}

export function Rain() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <style>{css}</style>

      <div style={{ position: 'absolute', left: 24, top: 248 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>Tokyo · 17°</div>
        <div style={{ fontSize: 12.5, color: MUTED, marginTop: 3 }}>Light rain until 14:00</div>
      </div>

      {BUILDINGS.map(([x, w, h], b) => (
        <div key={b} style={{ position: 'absolute', left: x, top: GROUND - h, width: w, height: h, background: '#ebe9ef', borderRadius: '3px 3px 0 0' }}>
          {Array.from({ length: Math.floor(h / 18) * Math.floor(w / 14) }, (_, i) => {
            const cols = Math.floor(w / 14)
            const lit = pick(b * 31 + i) > 0.72
            return (
              <span key={i} style={{
                position: 'absolute', left: 6 + (i % cols) * 14, top: 8 + Math.floor(i / cols) * 18, width: 6, height: 8, borderRadius: 1,
                background: lit ? (i % 5 ? '#ffd98a' : ACCENT) : '#dcd9e2',
                animation: lit && i % 7 === 0 ? `rain-flicker ${2 + (i % 3)}s ease-in-out infinite` : undefined,
              }} />
            )
          })}
        </div>
      ))}
      <div style={{ position: 'absolute', left: 0, right: 0, top: GROUND, borderTop: '1.5px solid #cfcdd4' }} />

      {/* Slanted rain in front of the buildings */}
      <div style={{ position: 'absolute', left: -40, top: 170, width: 520, height: 300, overflow: 'hidden', transform: 'skewX(-10deg)' }}>
        {Array.from({ length: 56 }, (_, i) => (
          <span key={i} style={{
            position: 'absolute', left: Math.round(pick(i) * 520), top: -30, width: 1, height: 14 + pick(i + 99) * 14, background: '#a9a6b2',
            animation: `rain-fall ${0.55 + pick(i + 7) * 0.35}s linear ${-pick(i + 3)}s infinite`,
          }} />
        ))}
      </div>

      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} style={{
          position: 'absolute', left: 20 + pick(i + 50) * 380, top: GROUND + 6 + pick(i + 60) * 22, width: 36, height: 8, marginLeft: -18,
          borderRadius: '50%', border: '1px solid #bdbac4', animation: `rain-ripple 1.6s ease-out ${-pick(i + 70) * 1.6}s infinite`,
        }} />
      ))}
    </div>
  )
}
