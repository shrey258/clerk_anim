import { ACCENT, INK, label, LINE, MUTED } from '../machines/theme'

export function Ticket({ line, from, to, details, price }: { line: string; from: string; to: string; details: string; price: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 24px 16px' }}>
        <div style={{ ...label, color: ACCENT }}>{line}</div>
        <div style={{ fontSize: 24, fontWeight: 650, color: INK, letterSpacing: '-0.01em', marginTop: 8 }}>{from} → {to}</div>
        <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>{details}</div>
      </div>
      <div style={{ marginTop: 'auto', borderTop: `1.5px dashed ${LINE}`, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', fontSize: 13.5, fontVariantNumeric: 'tabular-nums' }}>
        <span style={{ color: MUTED }}>Adult · one way</span>
        <span style={{ fontWeight: 600, color: INK }}>{price}</span>
      </div>
    </div>
  )
}
