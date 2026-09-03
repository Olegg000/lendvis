import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Цифра набегает, когда блок попадает в кадр. Значение разбираем на части,
 * чтобы «~1000» и «80K+» сохранили приставку и хвост, а считалась только середина.
 *
 * Момент запуска ловим опросом позиции по кадрам, а не IntersectionObserver
 * и не событием скролла: и то и другое подводило — цифры навсегда застревали на нуле.
 * Опрос идёт только до старта анимации, поэтому ничего не стоит.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const still = useReducedMotion()
  const [shown, setShown] = useState(0)

  const parsed = value.match(/^(\D*)(\d+)(.*)$/)
  const target = parsed ? Number(parsed[2]) : 0

  useEffect(() => {
    if (!target || still) return
    let raf = 0
    let cancelled = false

    const animate = () => {
      const from = performance.now()
      const dur = 1100
      const tick = (now: number) => {
        if (cancelled) return
        const p = Math.min((now - from) / dur, 1)
        // та же кривая, что у остальной анимации: быстрый старт, долгая посадка
        setShown(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    // Ждём, пока число окажется в кадре
    const waitForView = () => {
      if (cancelled) return
      const el = ref.current
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (el && vh > 0) {
        const r = el.getBoundingClientRect()
        const visible = r.top < vh - 40 && r.bottom > 40
        if (visible) {
          animate()
          return
        }
      }
      raf = requestAnimationFrame(waitForView)
    }

    raf = requestAnimationFrame(waitForView)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [target, still])

  // Без разбора или при отключённом движении цифра просто стоит на месте
  if (!parsed || still) return <span ref={ref}>{value}</span>

  return (
    <span ref={ref}>
      {parsed[1]}
      {shown}
      {parsed[3]}
    </span>
  )
}
