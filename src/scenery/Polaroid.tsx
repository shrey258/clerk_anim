import type { ReactNode } from 'react'
import { INK, MUTED } from '../machines/theme'

const SCENES: Record<string, ReactNode> = {
  pumpkin: <>
    <rect width="200" height="200" fill="#dbeaf3" />
    <rect y="120" width="200" height="80" fill="#a9c9dc" />
    <rect x="30" y="138" width="140" height="10" fill="#8a8792" />
    {[64, 82, 100, 118, 136].map(x => <ellipse key={x} cx={x} cy="112" rx="22" ry="28" fill="#f5c400" />)}
    {[[64, 100], [82, 118], [100, 98], [118, 120], [136, 104], [72, 124], [128, 92], [100, 126], [90, 104], [110, 108]].map(([x, y]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#16151a" />
    ))}
    <rect x="96" y="80" width="8" height="10" rx="2" fill="#2f4a2a" />
  </>,
  torii: <>
    <rect width="200" height="200" fill="#e7efe1" />
    <path d="M0 150 C 60 130, 140 130, 200 150 V200 H0Z" fill="#c9d9bd" />
    <rect x="58" y="70" width="12" height="100" fill="#e0583a" />
    <rect x="130" y="70" width="12" height="100" fill="#e0583a" />
    <rect x="50" y="86" width="100" height="9" fill="#e0583a" />
    <path d="M36 62 Q100 52 164 62 L160 72 Q100 64 40 72Z" fill="#16151a" />
  </>,
}

export function Polaroid({ scene, caption, date, tilt = -2 }: { scene: string; caption: string; date: string; tilt?: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
      <figure style={{ margin: 0, width: 240, padding: '14px 14px 18px', background: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 10px 24px -8px rgba(0,0,0,0.18)', transform: `rotate(${tilt}deg)` }}>
        <svg viewBox="0 0 200 200" width="212" height="212" role="img" aria-label={caption} style={{ display: 'block' }}>{SCENES[scene]}</svg>
        <figcaption style={{ marginTop: 12, fontFamily: '"Bradley Hand", "Segoe Print", cursive', fontSize: 17, color: INK }}>
          {caption} <span style={{ fontSize: 13, color: MUTED }}>{date}</span>
        </figcaption>
      </figure>
    </div>
  )
}
