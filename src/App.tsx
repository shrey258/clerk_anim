import { memo, useState, type ComponentType } from 'react'
import { Dock } from './Dock'
import layout from './layout.json'
import { Clocks } from './machines/Clocks'
import { Radio } from './machines/Radio'
import { Rain } from './machines/Rain'
import { LINE } from './machines/theme'
import { Ticker } from './machines/Ticker'
import { Train } from './machines/Train'
import { Vinyl } from './machines/Vinyl'
import { Wave } from './machines/Wave'
import { Scenery } from './scenery/Scenery'

type Slot = { left: number; top: number; w: number; h: number }

const slots: Slot[] = layout.slots

const widgets: { name: string; slot: number; Machine: ComponentType }[] = [
  { name: 'Radio', slot: 0, Machine: Radio },
  { name: 'Train', slot: 8, Machine: Train },
  { name: 'Rain', slot: 39, Machine: Rain },
  { name: 'Record player', slot: 12, Machine: Vinyl },
  { name: 'Clocks', slot: 40, Machine: Clocks },
  { name: 'Departures', slot: 43, Machine: Ticker },
  { name: 'Voice memo', slot: 26, Machine: Wave },
]

const cardStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  borderRadius: 16,
  overflow: 'hidden',
  border: `1px solid ${LINE}`,
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.06), 0px 14px 44px -10px rgba(108, 71, 255, 0.14)',
} as const

const backCardStyle = { ...cardStyle, boxShadow: 'none', opacity: 0.6 } as const

function place(slot: Slot) {
  return { left: `${slot.left}%`, top: `${slot.top}%`, width: `${slot.w}%`, height: `${slot.h}%` }
}

function centreOn(slot: Slot) {
  return `scale(var(--scale)) translate(${50 - (slot.left + slot.w / 2)}%, ${50 - (slot.top + slot.h / 2)}%)`
}

const BackCards = memo(function BackCards() {
  return slots.map((slot, i) => {
    const widget = widgets.find(w => w.slot === i)
    return (
      <div key={i} style={{ ...backCardStyle, ...place(slot) }}>
        {widget ? <widget.Machine /> : <Scenery slot={i} />}
      </div>
    )
  })
})

const Widget = memo(function Widget({ Machine }: { Machine: ComponentType }) {
  return <Machine />
})

function FrontCard({ slot, Machine, on }: { slot: number; Machine: ComponentType; on: boolean }) {
  return (
    <div className="front-card" data-on={on || undefined} inert={!on} style={{ ...cardStyle, ...place(slots[slot]) }}>
      <Widget Machine={Machine} />
    </div>
  )
}

function Peephole() {
  const [focused, setFocused] = useState(0)
  const transform = centreOn(slots[focused])

  return (
    <div className="peephole">
      <div className="peephole-back" inert>
        <div className="sheet" style={{ transform }}>
          <BackCards />
        </div>
      </div>

      <div className="peephole-fade" />

      <div className="peephole-front">
        <div className="sheet" style={{ transform }}>
          {widgets.map(w => (
            <FrontCard key={w.slot} slot={w.slot} Machine={w.Machine} on={w.slot === focused} />
          ))}
        </div>
      </div>

      <Dock items={widgets} focused={focused} onPick={setFocused} />
    </div>
  )
}

function App() {
  return (
    <>
      <section id="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh', width: '100%' }}>
        <Peephole />
      </section>

      <section id="app2" className="h-dvh w-full">
        <div className="flex items-center justify-center h-full w-full bg-linear-to-tr from-red-500 to-blue-500" />
      </section>
    </>
  )
}

export default App
