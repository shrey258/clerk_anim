import { useRef, useState } from 'react'
import { ACCENT, INK, LINE, MUTED } from './theme'

const STATIONS = [
  { freq: 89.4, name: 'Radio Nova', show: 'City pop hour', short: 'Nova' },
  { freq: 93.2, name: 'Rain FM', show: 'Tokyo, light rain', short: 'Rain' },
  { freq: 97.8, name: 'Shipping Forecast', show: 'Viking, North Utsire, SW 5', short: 'Sea' },
  { freq: 103.6, name: 'Night Train', show: 'Ambient until 6am', short: 'Night' },
]
const LO = 88
const HI = 108
const PX = 26
const NEEDLE = 164

const css = `
@keyframes radio-bar { 0%, 100% { transform: scaleY(0.25) } 50% { transform: scaleY(1) } }
@keyframes radio-hiss { 0%, 100% { transform: scaleY(0.12) } 50% { transform: scaleY(0.3) } }
@keyframes radio-pulse { from { transform: scale(0.5); opacity: 0.6 } to { transform: scale(1.5); opacity: 0 } }
`

export function Radio() {
  const [freq, setFreq] = useState(89.4)
  const [dragging, setDragging] = useState(false)
  const start = useRef({ x: 0, freq: 0 })

  const tune = (f: number) => setFreq(Math.min(HI, Math.max(LO, Math.round(f * 10) / 10)))
  const station = STATIONS.find(s => Math.abs(s.freq - freq) < 0.25)

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: 16, color: INK }}>
      <style>{css}</style>

      <div style={{
        position: 'relative', height: 196, borderRadius: 12, overflow: 'hidden', display: 'grid', placeItems: 'center',
        backgroundColor: '#f6f5f8', backgroundImage: 'radial-gradient(circle, #d6d3dd 1.6px, transparent 2px)', backgroundSize: '10px 10px',
      }}>
        {station && [0, 0.6].map(delay => (
          <span key={delay} style={{
            position: 'absolute', width: 120, height: 120, borderRadius: '50%', border: `1.5px solid ${ACCENT}`,
            animation: `radio-pulse 1.2s ease-out ${delay}s infinite`,
          }} />
        ))}
        <span style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, background: station ? ACCENT : '#cfcdd4', boxShadow: station ? `0 0 8px ${ACCENT}` : 'none' }} />
      </div>

      <div style={{ padding: '18px 8px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 54, fontWeight: 650, letterSpacing: '-0.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{freq.toFixed(1)}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: MUTED }}>FM</span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'flex-end', gap: 3, height: 26 }}>
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
              <span key={i} style={{
                width: 4, height: 26, borderRadius: 1, transformOrigin: 'bottom',
                background: station ? ACCENT : '#cfcdd4',
                animation: station ? `radio-bar ${0.5 + (i % 3) * 0.17}s ease-in-out ${i * -0.13}s infinite` : `radio-hiss 0.12s steps(2) ${i * -0.05}s infinite`,
              }} />
            ))}
          </span>
        </div>
        <div style={{ height: 40, marginTop: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: station ? INK : MUTED }}>{station ? station.name : 'Static'}</div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{station ? station.show : 'Keep turning'}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 'auto' }}>
        {STATIONS.map(s => {
          const on = s === station
          return (
            <button key={s.freq} onClick={() => setFreq(s.freq)} aria-pressed={on} style={{
              height: 44, borderRadius: 10, border: `1px solid ${on ? ACCENT : LINE}`, background: on ? '#f2effe' : 'white',
              color: on ? ACCENT : INK, font: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', lineHeight: 1.2,
            }}>
              {s.short}
              <div style={{ fontSize: 11, fontWeight: 500, color: on ? ACCENT : MUTED, fontVariantNumeric: 'tabular-nums' }}>{s.freq}</div>
            </button>
          )
        })}
      </div>

      <div
        role="slider" tabIndex={0} aria-label="Tuning" aria-valuemin={LO} aria-valuemax={HI} aria-valuenow={freq}
        aria-valuetext={`${freq.toFixed(1)} FM${station ? `, ${station.name}` : ''}`}
        onPointerDown={e => { start.current = { x: e.clientX, freq }; setDragging(true); e.currentTarget.setPointerCapture(e.pointerId) }}
        onPointerMove={e => dragging && tune(start.current.freq - (e.clientX - start.current.x) / PX)}
        onPointerUp={() => setDragging(false)}
        onKeyDown={e => {
          const step = e.shiftKey ? 1 : 0.1
          if (e.key === 'ArrowRight') { e.preventDefault(); tune(freq + step) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); tune(freq - step) }
        }}
        style={{
          position: 'relative', height: 78, marginTop: 8, borderRadius: 12, background: '#f6f5f8', overflow: 'hidden',
          cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none', userSelect: 'none',
          maskImage: 'linear-gradient(90deg, transparent, #000 20%, #000 80%, transparent)',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, transform: `translateX(${NEEDLE - (freq - LO) * PX}px)`,
          transition: dragging ? 'none' : 'transform 500ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}>
          {Array.from({ length: (HI - LO) * 5 + 1 }, (_, i) => {
            const mhz = LO + i / 5
            const major = i % 5 === 0
            return (
              <span key={i} style={{ position: 'absolute', left: (i / 5) * PX, top: 20, width: 1, height: major ? 22 : 10, background: major ? MUTED : '#cfcdd4' }}>
                {major && mhz % 2 === 0 && (
                  <span style={{ position: 'absolute', top: 30, left: -8, width: 16, textAlign: 'center', fontSize: 11, color: MUTED, fontVariantNumeric: 'tabular-nums' }}>{mhz}</span>
                )}
              </span>
            )
          })}
          {STATIONS.map(s => (
            <span key={s.freq} style={{ position: 'absolute', left: (s.freq - LO) * PX - 2.5, top: 8, width: 5, height: 5, borderRadius: 3, background: ACCENT }} />
          ))}
        </div>
        <span style={{ position: 'absolute', left: NEEDLE - 1, top: 6, bottom: 6, width: 2, borderRadius: 1, background: ACCENT }} />
      </div>
    </div>
  )
}
