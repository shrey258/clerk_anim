import { ACCENT, INK, label, MUTED } from '../machines/theme'

const FIRST_WEEKDAY = 3
const DAYS = 31
const TRIP = [16, 27]

export function Calendar() {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 24 }}>
      <div style={label}>October 2026</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: INK, marginTop: 6 }}>Tokyo, 11 days</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 6, marginTop: 18, textAlign: 'center', fontSize: 12.5, fontVariantNumeric: 'tabular-nums' }}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} style={{ color: MUTED, paddingBottom: 4 }}>{d}</span>)}
        {Array.from({ length: FIRST_WEEKDAY }, (_, i) => <span key={`blank${i}`} />)}
        {Array.from({ length: DAYS }, (_, i) => {
          const day = i + 1
          const inTrip = day >= TRIP[0] && day <= TRIP[1]
          const end = TRIP.includes(day)
          return (
            <span key={day} style={{
              height: 32, display: 'grid', placeItems: 'center', borderRadius: end ? 16 : 0,
              background: end ? ACCENT : inTrip ? '#f2effe' : 'transparent', color: end ? 'white' : inTrip ? ACCENT : INK, fontWeight: inTrip ? 600 : 400,
            }}>{day}</span>
          )
        })}
      </div>
    </div>
  )
}
