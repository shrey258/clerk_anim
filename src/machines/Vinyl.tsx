import { ACCENT, INK, MUTED } from './theme'

// 352 x 428. A record player. Only the top ~290 is in the frame.

const css = `
@keyframes vinyl-spin { to { transform: rotate(360deg) } }
@keyframes vinyl-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }
`

const SONG_SECONDS = 474 // 7:54

export function Vinyl() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <style>{css}</style>

      {/* Platter, then the record spinning on it */}
      <div style={{ position: 'absolute', left: 22, top: 18, width: 226, height: 226, borderRadius: '50%', background: '#ebe9ef' }} />
      <div style={{
        position: 'absolute', left: 30, top: 26, width: 210, height: 210, borderRadius: '50%',
        background: 'repeating-radial-gradient(circle, #1c1b20 0 2px, #2a2930 2px 3px)', animation: 'vinyl-spin 1.8s linear infinite',
      }}>
        <div style={{ position: 'absolute', inset: 72, borderRadius: '50%', background: ACCENT, display: 'grid', placeItems: 'center' }}>
          <span style={{ position: 'absolute', top: 11, fontSize: 7, letterSpacing: '0.12em', color: 'white' }}>SIDE A</span>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: 'white' }} />
        </div>
      </div>
      {/* Light catching the grooves. It doesn't spin, which is what makes the record look like it does. */}
      <div style={{
        position: 'absolute', left: 30, top: 26, width: 210, height: 210, borderRadius: '50%', pointerEvents: 'none',
        background: 'conic-gradient(from 20deg, transparent 0 8%, rgba(255,255,255,0.14) 13%, transparent 18% 58%, rgba(255,255,255,0.14) 63%, transparent 68%)',
      }} />

      {/* Tonearm */}
      <div style={{ position: 'absolute', left: 276, top: 24, width: 22, height: 22, borderRadius: 11, background: '#dcd9e2', border: '1px solid #cfcdd4' }} />
      <div style={{ position: 'absolute', left: 285, top: 34, width: 4, height: 150, borderRadius: 2, background: '#bdbac4', transformOrigin: 'top', transform: 'rotate(26deg)' }}>
        <span style={{ position: 'absolute', left: -5, bottom: -6, width: 14, height: 20, borderRadius: 3, background: '#a9a6b2' }} />
      </div>

      <div style={{ position: 'absolute', left: 30, right: 30, top: 256 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>Plastic Love</span>
          <span style={{ fontSize: 12, color: MUTED }}>33⅓ rpm</span>
        </div>
        <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>Mariya Takeuchi</div>
        <div style={{ height: 3, borderRadius: 2, background: '#ebe9ef', marginTop: 12, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: ACCENT, transformOrigin: 'left', animation: `vinyl-progress ${SONG_SECONDS}s linear -161s infinite` }} />
        </div>
      </div>
    </div>
  )
}
