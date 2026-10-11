import { ACCENT, INK, label, MUTED } from '../machines/theme'

const WEEK = [160.1, 160.8, 160.4, 161.5, 161.2, 162.0, 162.4]

export function Currency() {
  const lo = Math.min(...WEEK), hi = Math.max(...WEEK)
  const points = WEEK.map((v, i) => `${(i / (WEEK.length - 1)) * 304},${44 - ((v - lo) / (hi - lo)) * 40}`).join(' ')
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', flexDirection: 'column' }}>
      <div style={label}>EUR → JPY</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10, fontVariantNumeric: 'tabular-nums' }}>
        <span style={{ fontSize: 13.5, color: MUTED }}>€1 =</span>
        <span style={{ fontSize: 32, fontWeight: 650, color: INK, letterSpacing: '-0.02em' }}>¥162.40</span>
      </div>
      <div style={{ fontSize: 12.5, color: ACCENT, marginTop: 2 }}>+1.4% this week</div>
      <svg width="304" height="48" style={{ marginTop: 'auto' }} aria-hidden="true">
        <polyline points={points} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  )
}
