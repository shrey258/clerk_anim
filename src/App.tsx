const GAP = 16 


const slots = [
  // main card: centred
  { left: 37, top: 34, w: 26, h: 32 },

  { left: 0, top: 0, w: 12, h: 20 },
  { left: 0, top: 20, w: 12, h: 25 },
  { left: 0, top: 45, w: 12, h: 17 },
  { left: 0, top: 62, w: 12, h: 20 },
  { left: 0, top: 82, w: 12, h: 18 },
  { left: 12, top: 0, w: 13, h: 14 },
  { left: 12, top: 14, w: 13, h: 24 },
  { left: 12, top: 38, w: 13, h: 20 },
  { left: 12, top: 58, w: 13, h: 22 },
  { left: 12, top: 80, w: 13, h: 20 },
  { left: 25, top: 0, w: 12, h: 18 },
  { left: 25, top: 18, w: 12, h: 16 },
  { left: 25, top: 34, w: 12, h: 32 },
  { left: 25, top: 66, w: 12, h: 18 },
  { left: 25, top: 84, w: 12, h: 16 },
  { left: 63, top: 0, w: 12, h: 16 },
  { left: 63, top: 16, w: 12, h: 18 },
  { left: 63, top: 34, w: 12, h: 32 },
  { left: 63, top: 66, w: 12, h: 19 },
  { left: 63, top: 85, w: 12, h: 15 },
  { left: 75, top: 0, w: 13, h: 24 },
  { left: 75, top: 24, w: 13, h: 22 },
  { left: 75, top: 46, w: 13, h: 22 },
  { left: 75, top: 68, w: 13, h: 32 },
  { left: 88, top: 0, w: 12, h: 12 },
  { left: 88, top: 12, w: 12, h: 26 },
  { left: 88, top: 38, w: 12, h: 22 },
  { left: 88, top: 60, w: 12, h: 22 },
  { left: 88, top: 82, w: 12, h: 18 },
  { left: 37, top: 0, w: 15, h: 16 },
  { left: 52, top: 0, w: 11, h: 16 },
  { left: 37, top: 16, w: 10, h: 18 },
  { left: 47, top: 16, w: 16, h: 18 },
  { left: 37, top: 66, w: 18, h: 18 },
  { left: 55, top: 66, w: 8, h: 18 },
  { left: 37, top: 84, w: 11, h: 16 },
  { left: 48, top: 84, w: 15, h: 16 },
]

// The card sits inside its slot, pulled in by half the gap on every side.
// Two neighbouring cards each give up half, so they end up exactly GAP apart.
const cardStyle = {
  position: 'absolute',
  inset: GAP / 2,
  backgroundColor: 'white',
  borderRadius: 16,
  border: '1px solid #e5e4e7',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.06), 0px 14px 44px -10px rgba(108, 71, 255, 0.14)',
} as const

const dimmedStyle = { ...cardStyle, opacity: 0.5, boxShadow: 'none' } as const


const FOCUSED = 0

function App() {
  return <>

  <section
    id="app"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100dvh',
      width: '100%',
    }}
  >
    {/* The peephole: a smaller, visible frame. overflow: hidden + a radius cuts the canvas to its shape. */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: 'min(1100px, calc(100% - 48px))',
        height: '70dvh',
        border: '1px solid #e5e4e7',
        borderRadius: 24,
      }}
    >
      {/* The canvas: 150% of the peephole, so it spills out on every side and gets cut off */}
      <div
        style={{
          position: 'relative',
          flex: 'none',
          width: '150%',
          height: '150%',
        }}
      >
        {slots.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.w}%`,
              height: `${s.h}%`,
            }}
          >
            <div style={i === FOCUSED ? cardStyle : dimmedStyle} />
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="app2" className="h-dvh w-full">
    <div className="flex items-center justify-center h-full w-full bg-linear-to-tr from-red-500 to-blue-500">
    </div>
  </section>

  </>
}

export default App
