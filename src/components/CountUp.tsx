import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Цифра набегает, когда блок попадает в кадр. Значение разбираем на части,
 * чтобы «~1000» и «80K+» сохранили приставку и хвост, а считалась только середина.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const still = useReducedMotion()
  const [shown, setShown] = useState(0)

  const parsed = value.match(/^(\D*)(\d+)(.*)$/)
  const target = parsed ? Number(parsed[2]) : 0

  useEffect(() => {
    if (!inView || !target) return
    let raf = 0
    const from = performance.now()
    const dur = 1100
    const tick = (now: number) => {
      const p = Math.min((now - from) / dur, 1)
      // та же кривая, что у остальной анимации: быстрый старт, долгая посадка
      setShown(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

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
