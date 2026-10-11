import { INK, label, MUTED } from '../machines/theme'

const STAMPS: [string, string, string, number][] = [
  ['渋谷', 'Shibuya', '#e0583a', -8], ['新宿', 'Shinjuku', '#2f8f6b', 6], ['原宿', 'Harajuku', '#6c47ff', -3],
  ['上野', 'Ueno', '#2a6fbf', 10], ['東京', 'Tokyo', '#e0583a', -12], ['京都', 'Kyoto', '#6c47ff', 4],
]
const SLOTS = 10

export function StampBook() {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 24 }}>
      <div style={label}>Eki stamps</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: INK, marginTop: 6 }}>{STAMPS.length} of 30 collected</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, marginTop: 30, justifyItems: 'center' }}>
        {Array.from({ length: SLOTS }, (_, i) => {
          const stamp = STAMPS[i]
          if (!stamp) return <span key={i} style={{ width: 104, height: 104, borderRadius: '50%', border: '1.5px dashed #dcd9e2' }} />
          const [kanji, name, ink, tilt] = stamp
          return (
            <span key={i} style={{
              width: 104, height: 104, borderRadius: '50%', border: `2.5px solid ${ink}`, color: ink, display: 'grid', placeContent: 'center', textAlign: 'center',
              transform: `rotate(${tilt}deg)`, opacity: 0.85,
            }}>
              <span style={{ fontSize: 24, fontWeight: 700 }}>{kanji}</span>
              <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: ink, marginTop: 2 }}>{name}</span>
            </span>
          )
        })}
      </div>
      <div style={{ position: 'absolute', left: 24, bottom: 22, fontSize: 12.5, color: MUTED }}>Next: Akihabara, Shinagawa</div>
    </div>
  )
}
