import { ACCENT } from '../machines/theme'

export function Chip({ text }: { text: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px', fontSize: 11.5, color: '#3d3b44' }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, background: ACCENT }} />{text}
    </div>
  )
}
