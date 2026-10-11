import { ACCENT, INK, MUTED } from './theme'

const css = `
@keyframes ticker-scroll { to { transform: translateX(-50%) } }
@keyframes ticker-blink { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }
`

const TEXT = 'NOW BOARDING · AT 812 TO TOKYO HANEDA · GATE B14 · GROUP 2 · '

export function Ticker() {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
      <style>{css}</style>
      <div style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTED }}>Departures · Lisbon T1</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12, fontSize: 14, color: INK, fontVariantNumeric: 'tabular-nums' }}>
        <span style={{ fontWeight: 600 }}>07:40</span>
        <span>Tokyo HND</span>
        <span style={{ color: MUTED }}>B14</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: ACCENT, animation: 'ticker-blink 1.4s ease-in-out infinite' }}>Boarding</span>
      </div>
      <div style={{ marginTop: 'auto', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.08em', color: '#3d3b44' }}>
        <div style={{ display: 'inline-block', animation: 'ticker-scroll 16s linear infinite' }}>{TEXT.repeat(4)}</div>
      </div>
    </div>
  )
}
