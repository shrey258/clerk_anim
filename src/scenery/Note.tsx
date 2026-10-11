import { ACCENT, INK, label, MUTED } from '../machines/theme'

export function Note({ title, items, done = [] }: { title: string; items: string[]; done?: number[] }) {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 24 }}>
      <div style={label}>Notes</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: INK, marginTop: 6 }}>{title}</div>
      <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
        {items.map((item, i) => {
          const ticked = done.includes(i)
          return (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: ticked ? MUTED : INK, textDecoration: ticked ? 'line-through' : 'none' }}>
              <span style={{ width: 14, height: 14, borderRadius: 4, flex: 'none', border: `1.5px solid ${ticked ? ACCENT : '#cfcdd4'}`, background: ticked ? ACCENT : 'white' }} />
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}
