import { ACCENT, INK, MUTED } from './theme'

const css = `@keyframes wave-bar { 0%, 100% { transform: scaleY(0.3) } 50% { transform: scaleY(1) } }`

const BARS = 36
const PLAYED = 13

export function Wave() {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', flexDirection: 'column' }}>
      <style>{css}</style>
      <div style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTED }}>Voice memo</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: INK, marginTop: 6 }}>Shibuya crossing, 8:02pm</div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
        {Array.from({ length: BARS }, (_, i) => (
          <span key={i} style={{
            flex: 1, height: 40 + ((i * 37) % 80), borderRadius: 2, background: i < PLAYED ? ACCENT : '#dcd9e2',
            animation: `wave-bar ${0.7 + (i % 5) * 0.12}s ease-in-out ${i * -0.07}s infinite`,
          }} />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: MUTED, fontVariantNumeric: 'tabular-nums' }}>
        <span>0:14</span><span>0:41</span>
      </div>
    </div>
  )
}
