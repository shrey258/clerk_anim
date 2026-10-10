import { ACCENT, MUTED } from './theme'

// 720 x 506. A shinkansen passing Mt Fuji. The train stays put; hills, poles and sleepers slide past.
// Only the bottom-right ~400 x 390 is inside the frame, so everything sits there.

const css = `
@keyframes train-hills { from { transform: translateX(0) } to { transform: translateX(720px) } }
@keyframes train-poles { from { transform: translateX(0) } to { transform: translateX(90px) } }
@keyframes train-sleepers { from { transform: translateX(0) } to { transform: translateX(24px) } }
@keyframes train-bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-1px) } }
`

// One period of the hills; drawn twice so the loop has no seam.
const HILLS = 'M0 372 C 90 340, 170 350, 250 362 S 420 326, 520 348 S 660 380, 720 372 V506 H0 Z'

export function Train() {
  return (
    <svg viewBox="0 0 720 506" width="720" height="506" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
      <style>{css}</style>

      <circle cx="470" cy="196" r="26" fill="#f2effe" />

      {/* Fuji, too far away to move */}
      <path d="M430 372 L548 246 Q566 230 584 246 L702 372 Z" fill="#eeecf2" />
      <path d="M526 270 L548 246 Q566 230 584 246 L606 270 L590 263 L576 274 L562 262 L546 274 Z" fill="white" />

      <g style={{ animation: 'train-hills 14s linear infinite' }}>
        <path d={HILLS} fill="#f4f3f6" />
        <path d={HILLS} fill="#f4f3f6" transform="translate(-720 0)" />
      </g>

      {/* Overhead wire and its poles */}
      <line x1="0" x2="720" y1="318" y2="318" stroke="#d6d3dd" />
      <g style={{ animation: 'train-poles 0.45s linear infinite' }}>
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={-90 + i * 90} x2={-90 + i * 90} y1="306" y2="440" stroke="#cfcdd4" strokeWidth="2" />
        ))}
      </g>

      {/* The train, nose first, heading left */}
      <g style={{ animation: 'train-bob 0.4s ease-in-out infinite' }}>
        <path d="M430 382 H740 V432 H360 C 336 432, 330 420, 342 410 C 362 393, 394 382, 430 382 Z" fill="white" stroke="#bdbac4" />
        <path d="M372 400 C 384 392, 400 388, 420 388 V402 H372 Z" fill="#dcd9e2" />
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={444 + i * 22} y="394" width="12" height="9" rx="2" fill="#dcd9e2" />
        ))}
        <rect x="352" y="418" width="388" height="4" fill={ACCENT} />
      </g>

      {/* Track */}
      <g style={{ animation: 'train-sleepers 0.12s linear infinite' }}>
        {Array.from({ length: 32 }, (_, i) => (
          <rect key={i} x={-24 + i * 24} y="440" width="10" height="4" fill="#dcd9e2" />
        ))}
      </g>
      <line x1="0" x2="720" y1="438" y2="438" stroke={MUTED} strokeWidth="2" />

      <text x="696" y="482" textAnchor="end" fontSize="12" fill={MUTED}>Nozomi 21 · Tokyo → Kyoto · 285 km/h</text>
    </svg>
  )
}
