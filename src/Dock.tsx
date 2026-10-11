import type { ReactNode } from 'react'
import { ACCENT, LINE } from './machines/theme'

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const ICONS: Record<string, ReactNode> = {
  Radio: <><rect x="3" y="7" width="18" height="13" rx="2.5" {...line} /><circle cx="9" cy="13.5" r="3" {...line} /><path d="M15 11.5h3M15 15.5h3M7 7l8-4" {...line} /></>,
  Train: <><path d="M4 16V9a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" {...line} /><path d="M4 11h16M8 21l2-3M16 21l-2-3" {...line} /></>,
  Rain: <><path d="M7 15a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 8a3.5 3.5 0 0 1 0 7Z" {...line} /><path d="M8 18l-1 2.5M12 18l-1 2.5M16 18l-1 2.5" {...line} /></>,
  'Record player': <><circle cx="12" cy="12" r="8.5" {...line} /><circle cx="12" cy="12" r="2.5" {...line} /></>,
  Clocks: <><circle cx="12" cy="12" r="8.5" {...line} /><path d="M12 7.5V12l3 2" {...line} /></>,
  Departures: <path d="M3 19h18M5.5 13.5 4 9l2-.5 2 2.5 4.5-1.5L10 4l2.5-.5 5 5 3-1a1.5 1.5 0 0 1 .8 2.9L7 14.5Z" {...line} />,
  'Voice memo': <path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2" {...line} />,
}

type Item = { name: string; slot: number }

export function Dock({ items, focused, onPick }: { items: Item[]; focused: number; onPick: (slot: number) => void }) {
  return (
    <nav
      aria-label="Widgets"
      style={{
        position: 'absolute', left: '50%', bottom: 16, transform: 'translateX(-50%)', display: 'flex', gap: 2, padding: 4,
        borderRadius: 16, border: `1px solid ${LINE}`, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04), 0 10px 30px -10px rgba(0, 0, 0, 0.16)',
      }}
    >
      {items.map(item => {
        const on = item.slot === focused
        return (
          <button
            key={item.slot}
            className="dock-item"
            aria-label={item.name}
            aria-current={on || undefined}
            onClick={() => onPick(item.slot)}
            style={{
              position: 'relative', width: 44, height: 44, borderRadius: 12, border: 0, cursor: 'pointer', display: 'grid', placeItems: 'center',
              background: on ? '#f2effe' : 'transparent', color: on ? ACCENT : '#5b5866',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">{ICONS[item.name]}</svg>
          </button>
        )
      })}
    </nav>
  )
}
