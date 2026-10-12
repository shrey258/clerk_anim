import { useRef, type PointerEvent } from 'react'

const HREF = 'mailto:gshrey258@gmail.com?subject=Engineering%20role'
const R = 170
const FOLLOW = 0.22

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

function Note({ className, href }: { className: string; href?: string }) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag className={`hire-note ${className}`} href={href}>
      <span className="hire-line">Open to engineering roles</span>
      <span className="hire-sub">say hi → gshrey258@gmail.com</span>
    </Tag>
  )
}

export function HireMe() {
  const torch = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 })

  const draw = () => {
    torch.current!.style.translate = `${pos.current.x - R}px ${pos.current.y - R}px`
    inner.current!.style.translate = `${R - pos.current.x}px ${R - pos.current.y}px`
  }

  const follow = () => {
    const p = pos.current
    p.x += (p.tx - p.x) * FOLLOW
    p.y += (p.ty - p.y) * FOLLOW
    draw()
    p.raf = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.3 ? requestAnimationFrame(follow) : 0
  }

  const aim = (e: PointerEvent<HTMLElement>, jump = false) => {
    const box = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - box.left
    const y = e.clientY - box.top
    if (jump) {
      inner.current!.style.width = `${box.width}px`
      inner.current!.style.height = `${box.height}px`
      Object.assign(pos.current, { x, y, tx: x, ty: y })
      draw()
    } else {
      Object.assign(pos.current, { tx: x, ty: y })
      if (!pos.current.raf) pos.current.raf = requestAnimationFrame(follow)
    }
  }

  const show = (on: boolean) =>
    torch.current!.animate([{ opacity: on ? 1 : 0 }], { duration: on ? 300 : 450, easing: on ? 'ease-out' : 'ease-in', fill: 'forwards' })

  return (
    <section
      className="hire"
      onPointerEnter={e => { if (e.pointerType === 'mouse' && !reducedMotion()) { aim(e, true); show(true) } }}
      onPointerMove={e => { if (e.pointerType === 'mouse' && !reducedMotion()) aim(e) }}
      onPointerLeave={e => { if (e.pointerType === 'mouse') show(false) }}
      onPointerDown={e => {
        if (e.pointerType === 'mouse' || reducedMotion()) return
        aim(e, true)
        show(true).onfinish = () => setTimeout(() => show(false), 2200)
      }}
    >
      <div className="hire-dark" aria-hidden="true" />
      <div ref={torch} className="hire-torch" style={{ width: R * 2, height: R * 2 }} aria-hidden="true">
        <div ref={inner} className="hire-inner">
          <Note className="hire-lit" />
        </div>
      </div>
      <Note className="hire-real" href={HREF} />
    </section>
  )
}
