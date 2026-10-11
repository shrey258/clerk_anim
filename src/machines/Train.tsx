import type { ReactNode } from 'react'
import { ACCENT, INK, MUTED } from './theme'

const css = `
@keyframes train-hills { to { transform: translateX(720px) } }
@keyframes train-poles { to { transform: translateX(90px) } }
@keyframes train-sleepers { to { transform: translateX(24px) } }
@keyframes train-bob { 50% { transform: translateY(-1px) } }
`

const HILLS = 'M0 372 C 90 340, 170 350, 250 362 S 420 326, 520 348 S 660 380, 720 372 V506 H0 Z'

function Layer({ animation, children }: { animation?: string; children: ReactNode }) {
  return (
    <div style={{ position: 'absolute', inset: 0, animation }}>
      <svg viewBox="0 0 720 506" width="720" height="506" overflow="visible" aria-hidden="true" style={{ display: 'block' }}>
        {children}
      </svg>
    </div>
  )
}

export function Train() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <style>{css}</style>

      <Layer>
        <circle cx="560" cy="140" r="26" fill="#f2effe" />
        <path d="M280 372 L398 246 Q416 230 434 246 L552 372 Z" fill="#eeecf2" />
        <path d="M376 270 L398 246 Q416 230 434 246 L456 270 L440 263 L426 274 L412 262 L396 274 Z" fill="white" />
        <line x1="0" x2="720" y1="318" y2="318" stroke="#d6d3dd" />
        <line x1="0" x2="720" y1="438" y2="438" stroke={MUTED} strokeWidth="2" />
      </Layer>

      <Layer animation="train-hills 14s linear infinite">
        <path d={HILLS} fill="#f4f3f6" />
        <path d={HILLS} fill="#f4f3f6" transform="translate(-720 0)" />
      </Layer>

      <Layer animation="train-poles 0.45s linear infinite">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={-90 + i * 90} x2={-90 + i * 90} y1="306" y2="436" stroke="#cfcdd4" strokeWidth="2" />
        ))}
      </Layer>

      <Layer animation="train-bob 0.4s ease-in-out infinite">
        <path d="M240 382 H740 V432 H170 C 146 432, 140 420, 152 410 C 172 393, 204 382, 240 382 Z" fill="white" stroke="#bdbac4" />
        <path d="M182 400 C 194 392, 210 388, 230 388 V402 H182 Z" fill="#dcd9e2" />
        {Array.from({ length: 22 }, (_, i) => (
          <rect key={i} x={254 + i * 22} y="394" width="12" height="9" rx="2" fill="#dcd9e2" />
        ))}
        <rect x="162" y="418" width="578" height="4" fill={ACCENT} />
      </Layer>

      <Layer animation="train-sleepers 0.12s linear infinite">
        {Array.from({ length: 32 }, (_, i) => (
          <rect key={i} x={-24 + i * 24} y="440" width="10" height="4" fill="#dcd9e2" />
        ))}
      </Layer>

      <div style={{ position: 'absolute', left: 24, top: 22 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>Nozomi 21</div>
        <div style={{ fontSize: 12.5, color: MUTED, marginTop: 3 }}>Tokyo → Kyoto · 285 km/h</div>
      </div>
    </div>
  )
}
