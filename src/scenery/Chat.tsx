import { ACCENT, INK, LINE, MUTED } from '../machines/theme'

type Message = { me?: boolean; text: string }

export function Chat({ name, status, messages }: { name: string; status: string; messages: Message[] }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px', borderBottom: `1px solid ${LINE}` }}>
        <span style={{ width: 32, height: 32, borderRadius: 16, background: '#e8e4f7', color: ACCENT, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600 }}>{name[0]}</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{name}</div>
          <div style={{ fontSize: 12, color: MUTED }}>{status}</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 6, padding: 20 }}>
        {messages.map((m, i) => (
          <span key={i} style={{
            alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '78%', padding: '8px 12px', borderRadius: 16, fontSize: 13.5, lineHeight: 1.35,
            background: m.me ? ACCENT : '#f0eff3', color: m.me ? 'white' : INK,
          }}>{m.text}</span>
        ))}
      </div>
    </div>
  )
}
