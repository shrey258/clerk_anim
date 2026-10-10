import { ACCENT } from './theme'

// 360 x 394. An audio waveform. Only the top ~70 is in the frame, so it sits at the top.

const css = `@keyframes wave-bar { 0%, 100% { transform: scaleY(0.25) } 50% { transform: scaleY(1) } }`

const BARS = 40
const PLAYED = 14 // bars already played, drawn in the accent colour

export function Wave() {
  return (
    <div style={{ position: 'absolute', left: 20, right: 20, top: 18, height: 34, display: 'flex', alignItems: 'center', gap: 3 }}>
      <style>{css}</style>
      {Array.from({ length: BARS }, (_, i) => (
        <span key={i} style={{
          flex: 1, height: 34, borderRadius: 2, background: i < PLAYED ? ACCENT : '#dcd9e2',
          animation: `wave-bar ${0.7 + (i % 5) * 0.12}s ease-in-out ${i * -0.07}s infinite`,
        }} />
      ))}
    </div>
  )
}
