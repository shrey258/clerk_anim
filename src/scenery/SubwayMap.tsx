import { ACCENT, INK, label, MUTED } from '../machines/theme'

const LOOP = 'M 200 120 H 520 A 90 90 0 0 1 610 210 V 330 A 90 90 0 0 1 520 420 H 200 A 90 90 0 0 1 110 330 V 210 A 90 90 0 0 1 200 120 Z'
const STATIONS: [string, number, number][] = [
  ['Ikebukuro', 200, 120], ['Ueno', 520, 120], ['Akihabara', 610, 230], ['Tokyo', 610, 320],
  ['Shinagawa', 520, 420], ['Shibuya', 200, 420], ['Shinjuku', 110, 270],
]
const css = `@keyframes subway-loop { to { offset-distance: 100% } }`

export function SubwayMap() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <style>{css}</style>
      <div style={{ position: 'absolute', left: 24, top: 22 }}>
        <div style={label}>Yamanote line</div>
        <div style={{ fontSize: 13.5, color: MUTED, marginTop: 4 }}>30 stations · 59 min loop</div>
      </div>
      <svg viewBox="0 0 720 506" width="720" height="506" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        <path d={LOOP} fill="none" stroke="#9acd32" strokeWidth="8" strokeLinejoin="round" />
        {STATIONS.map(([name, x, y]) => (
          <g key={name}>
            <circle cx={x} cy={y} r="7" fill="white" stroke={INK} strokeWidth="2" />
            <text x={x} y={y < 200 ? y - 18 : y > 400 ? y + 28 : y + 4} dx={y > 200 && y < 400 ? (x > 300 ? 18 : -18) : 0}
              textAnchor={y > 200 && y < 400 ? (x > 300 ? 'start' : 'end') : 'middle'} fontSize="13" fill={INK}>{name}</text>
          </g>
        ))}
      </svg>
      <span style={{
        position: 'absolute', left: 0, top: 0, width: 16, height: 10, borderRadius: 3, background: ACCENT,
        offsetPath: `path('${LOOP}')`, animation: 'subway-loop 18s linear infinite',
      }} />
    </div>
  )
}
