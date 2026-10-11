import { MUTED } from '../machines/theme'

const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace'
const rule = <div style={{ borderTop: '1px dashed #cfcdd4', margin: '12px 0' }} />

export function Receipt({ store, place, items, total, when }: { store: string; place: string; items: [string, string][]; total: string; when: string }) {
  const row = (a: string, b: string, bold = false) => (
    <div key={a} style={{ display: 'flex', justifyContent: 'space-between', fontWeight: bold ? 700 : 400 }}><span>{a}</span><span>{b}</span></div>
  )
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '26px 28px', fontFamily: mono, fontSize: 12, lineHeight: 1.7, color: '#2a2930' }}>
      <div style={{ textAlign: 'center', fontWeight: 700 }}>{store}</div>
      <div style={{ textAlign: 'center', color: MUTED }}>{place}</div>
      {rule}
      {items.map(([a, b]) => row(a, b))}
      {rule}
      {row('TOTAL', total, true)}
      <div style={{ color: MUTED, marginTop: 8 }}>{when}</div>
    </div>
  )
}
