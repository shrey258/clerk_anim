import { ACCENT, INK, label, MUTED } from '../machines/theme'

const DAYS: [string, string, number, number][] = [
  ['Sat', 'Rain', 14, 17], ['Sun', 'Cloudy', 13, 19], ['Mon', 'Clear', 12, 21], ['Tue', 'Clear', 13, 22], ['Wed', 'Rain', 15, 18],
]
const MIN = 10
const MAX = 24

export function Weather() {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={label}>Tokyo · next 5 days</div>
      <div style={{ display: 'grid', gap: 14, fontSize: 13.5, fontVariantNumeric: 'tabular-nums' }}>
        {DAYS.map(([day, sky, lo, hi]) => (
          <div key={day} style={{ display: 'grid', gridTemplateColumns: '40px 56px 26px 1fr 26px', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, color: INK }}>{day}</span>
            <span style={{ color: MUTED }}>{sky}</span>
            <span style={{ color: MUTED, textAlign: 'right' }}>{lo}°</span>
            <span style={{ position: 'relative', height: 4, borderRadius: 2, background: '#f0eff3' }}>
              <span style={{ position: 'absolute', top: 0, bottom: 0, borderRadius: 2, background: ACCENT, left: `${((lo - MIN) / (MAX - MIN)) * 100}%`, right: `${((MAX - hi) / (MAX - MIN)) * 100}%` }} />
            </span>
            <span style={{ color: INK }}>{hi}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}
