import { ACCENT, INK, label, MUTED } from '../machines/theme'

const STEPS = 18204
const GOAL = 20000
const R = 58
const LENGTH = 2 * Math.PI * R

export function Steps() {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', flexDirection: 'column' }}>
      <div style={label}>Today</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 'auto', marginBottom: 'auto' }}>
        <svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="70" cy="70" r={R} fill="none" stroke="#f0eff3" strokeWidth="12" />
          <circle cx="70" cy="70" r={R} fill="none" stroke={ACCENT} strokeWidth="12" strokeLinecap="round" strokeDasharray={LENGTH} strokeDashoffset={LENGTH * (1 - STEPS / GOAL)} />
        </svg>
        <div>
          <div style={{ fontSize: 28, fontWeight: 650, color: INK, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>{STEPS.toLocaleString('en')}</div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>steps of {GOAL.toLocaleString('en')}</div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 10 }}>Shibuya → Harajuku<br />on foot</div>
        </div>
      </div>
    </div>
  )
}
