import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { marquee } from '../data'

/** Две ленты работ, расходящиеся навстречу друг другу по мере прокрутки. */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const still = useReducedMotion()

  useEffect(() => {
    if (still) return
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - top + window.innerHeight) * 0.16)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [still])

  const rowA = [...marquee, ...marquee, ...marquee]
  const rowB = [...marquee.slice().reverse(), ...marquee.slice().reverse(), ...marquee.slice().reverse()]

  return (
    <div ref={ref} className="overflow-hidden py-16 sm:py-24" aria-hidden="true">
      <Row items={rowA} x={offset - 260} />
      <div className="h-3" />
      <Row items={rowB} x={-(offset - 260)} />
    </div>
  )
}

function Row({ items, x }: { items: string[]; x: number }) {
  return (
    <div className="flex gap-3" style={{ transform: `translate3d(${x}px,0,0)`, willChange: 'transform' }}>
      {items.map((src, i) => (
        <div
          key={i}
          className="h-[150px] w-[240px] shrink-0 overflow-hidden rounded-xl border border-hair bg-panel sm:h-[190px] sm:w-[300px]"
        >
          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-left-top opacity-70" />
        </div>
      ))}
    </div>
  )
}
