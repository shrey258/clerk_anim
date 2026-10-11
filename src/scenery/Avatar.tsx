export function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: color, color: 'white', fontSize: 9, fontWeight: 600 }}>{initials}</div>
  )
}
