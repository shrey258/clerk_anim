import { ACCENT, INK, MUTED } from './theme'

const RAIN = [
  [173, 211, 22, 0.42],
  [229, 263, 18, 0.62],
  [281, 307, 14, 0.85],
]

const DROPS_PER_TILE = 7

const drops = (w: number, h: number, len: number) => {
  const lines = Array.from({ length: DROPS_PER_TILE }, (_, i) => {
    const x = Math.round(((i * 0.618 + w / 1000) % 1) * w)
    const y = Math.round(((i * 0.382 + h / 997) % 1) * (h - len))
    return `%3Cline x1='${x}' y1='${y}' x2='${x}' y2='${y + len}' stroke='%23a9a6b2'/%3E`
  }).join('')
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'%3E${lines}%3C/svg%3E")`
}

const css = `
${RAIN.map(([, h]) => `@keyframes rain-fall-${h} { to { transform: translateY(${h}px) } }`).join('\n')}
@keyframes rain-ripple { from { transform: scale(0.2); opacity: 1 } to { transform: scale(1.6); opacity: 0 } }
@keyframes rain-flicker { 0%, 100% { opacity: 1 } 50% { opacity: 0.35 } }
`

const BUILDINGS = [[0, 54, 120], [58, 40, 86], [102, 70, 150], [176, 46, 104], [226, 62, 132], [292, 38, 72], [334, 76, 164], [414, 50, 96], [468, 64, 140], [536, 44, 90], [584, 70, 176], [658, 62, 118]]
const GROUND = 470

const pick = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453
  return x - Math.floor(x)
}

export function Rain() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <style>{css}</style>

      <div style={{ position: 'absolute', left: 24, top: 22 }}>
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

      <div style={{ position: 'absolute', left: -60, top: 0, width: 840, height: GROUND, overflow: 'hidden', transform: 'skewX(-10deg)' }}>
        {RAIN.map(([w, h, len, seconds]) => (
          <div key={w} style={{
            position: 'absolute', left: 0, right: 0, top: -h, bottom: 0,
            backgroundImage: drops(w, h, len), backgroundSize: `${w}px ${h}px`,
            animation: `rain-fall-${h} ${seconds}s linear infinite`,
          }} />
        ))}
      </div>

      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} style={{
          position: 'absolute', left: 20 + pick(i + 50) * 680, top: GROUND + 6 + pick(i + 60) * 22, width: 36, height: 8, marginLeft: -18,
          borderRadius: '50%', border: '1px solid #bdbac4', animation: `rain-ripple 1.6s ease-out ${-pick(i + 70) * 1.6}s infinite`,
        }} />
      ))}
    </div>
  )
}
