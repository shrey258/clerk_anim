const GAP = 16 // px between neighbouring cards

// Each box is a slot, in % of the canvas. The slots touch each other with no space between.
const slots = [
  // main card: centred in the peephole (30 + 40/2 = 50, 25.5 + 49/2 = 50)
  { left: 30, top: 25.5, w: 40, h: 49 },
  // left strip
  { left: 10, top: 10, w: 20, h: 30 },
  { left: 10, top: 40, w: 20, h: 22 },
  { left: 10, top: 62, w: 20, h: 28 },
  // right strip
  { left: 70, top: 10, w: 20, h: 38 },
  { left: 70, top: 48, w: 20, h: 42 },
  // above the main card
  { left: 30, top: 10, w: 17, h: 15.5 },
  { left: 47, top: 10, w: 23, h: 15.5 },
  // below the main card
  { left: 30, top: 74.5, w: 25, h: 15.5 },
  { left: 55, top: 74.5, w: 15, h: 15.5 },
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
            <div style={cardStyle} />
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
