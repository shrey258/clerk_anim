import { INK, label, MUTED } from '../machines/theme'

export function Phrase({ jp, romaji, en }: { jp: string; romaji: string; en: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '18px 20px' }}>
      <div style={label}>Phrasebook</div>
      <div style={{ fontSize: 26, fontWeight: 600, color: INK, marginTop: 10 }}>{jp}</div>
      <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>{romaji} · {en}</div>
    </div>
  )
}
