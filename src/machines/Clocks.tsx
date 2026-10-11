import { useEffect, useState } from 'react'
import { ACCENT, INK, LINE, MUTED } from './theme'

function timeIn(timeZone: string, now: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23' }).formatToParts(now)
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value)
  return { h: get('hour'), m: get('minute'), s: get('second') }
}

function Hand({ deg, length, width, color }: { deg: number; length: number; width: number; color: string }) {
  return (
    <span style={{
      position: 'absolute', left: '50%', bottom: '50%', width, height: length, marginLeft: -width / 2, borderRadius: width,
      background: color, transformOrigin: 'bottom', transform: `rotate(${deg}deg)`,
    }} />
  )
}

function Clock({ city, timeZone, now }: { city: string; timeZone: string; now: Date }) {
  const { h, m, s } = timeIn(timeZone, now)
  const night = h < 6 || h >= 19
  const ink = night ? 'white' : INK
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 128, height: 128, borderRadius: '50%', border: `1px solid ${night ? '#2a2930' : LINE}`, background: night ? '#1c1b20' : '#fbfafc', transition: 'background 600ms ease' }}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} style={{ position: 'absolute', left: 63, top: 6, width: 2, height: i % 3 ? 4 : 8, background: night ? '#4a4852' : '#cfcdd4', transformOrigin: '1px 58px', transform: `rotate(${i * 30}deg)` }} />
        ))}
        <Hand deg={(h % 12) * 30 + m / 2} length={32} width={4} color={ink} />
        <Hand deg={m * 6} length={46} width={3} color={ink} />
        <Hand deg={s * 6} length={52} width={1.5} color={ACCENT} />
        <span style={{ position: 'absolute', left: 61, top: 61, width: 6, height: 6, borderRadius: 3, background: ACCENT }} />
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 12, color: INK }}>{city}</div>
      <div style={{ fontSize: 12.5, color: MUTED, fontVariantNumeric: 'tabular-nums' }}>
        {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')} · {night ? 'night' : 'day'}
      </div>
    </div>
  )
}

export function Clocks() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const ahead = (timeIn('Asia/Tokyo', now).h - timeIn('Europe/Lisbon', now).h + 24) % 24

  return (
    <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTED }}>Two time zones</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 26, padding: '0 6px' }}>
        <Clock city="Lisbon" timeZone="Europe/Lisbon" now={now} />
        <Clock city="Tokyo" timeZone="Asia/Tokyo" now={now} />
      </div>
      <div style={{ marginTop: 'auto', fontSize: 13, color: MUTED }}>Tokyo is <span style={{ color: INK, fontWeight: 600 }}>{ahead} hours</span> ahead</div>
    </div>
  )
}
