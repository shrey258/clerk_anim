import layout from './layout.json'

type Slot = { left: number; top: number; w: number; h: number }

const cardStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  borderRadius: 16,
  border: '1px solid #e5e4e7',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.06), 0px 14px 44px -10px rgba(108, 71, 255, 0.14)',
} as const

const dimmedStyle = { ...cardStyle, opacity: 0.5, boxShadow: 'none' } as const

const FOCUSED = 0

// The peephole and its cards
function Peephole({ slots }: { slots: Slot[] }) {
  

  const main = slots[FOCUSED]
  const centre = `translate(${50 - (main.left + main.w / 2)}%, ${50 - (main.top + main.h / 2)}%)`

  return (

    <div
      className="peephole"
      style={{
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #e5e4e7',
        borderRadius: 'calc(1rem + 0.5px)', 
      }}
    >

      <div style={{ position: 'absolute', inset: 0, margin: 'auto', width: 720, height: 602, transform: `scale(var(--scale)) ${centre}` }}>
        {slots.map((s, i) => (
          <div key={i} style={{ ...(i === FOCUSED ? cardStyle : dimmedStyle), left: `${s.left}%`, top: `${s.top}%`, width: `${s.w}%`, height: `${s.h}%` }} />
        ))}
      </div>
    </div>
  )
}

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
    <Peephole slots={layout.slots} />
  </section>

  <section id="app2" className="h-dvh w-full">
    <div className="flex items-center justify-center h-full w-full bg-linear-to-tr from-red-500 to-blue-500">
    </div>
  </section>

  </>
}

export default App
