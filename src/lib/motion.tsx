import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

const EASE = [0.25, 0.1, 0.25, 1] as const

/** Появление при попадании в кадр. Одно правило на весь сайт, чтобы ритм был общим. */
export function FadeIn({
  children,
  delay = 0,
  y = 28,
  x = 0,
  duration = 0.7,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  x?: number
  duration?: number
  className?: string
}) {
  const still = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={still ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-40px', amount: 0.1 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Абзац проявляется по словам по мере прокрутки. */
export function RevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  if (still) return <p className={className}>{text}</p>

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1.6) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  )
}

/** Элемент тянется к курсору — только на устройствах с мышью. */
export function Magnet({
  children,
  strength = 4,
  radius = 110,
  className,
}: {
  children: ReactNode
  strength?: number
  radius?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (still || !window.matchMedia('(hover: hover)').matches) return
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const near = Math.abs(dx) < r.width / 2 + radius && Math.abs(dy) < r.height / 2 + radius
      setActive(near)
      setOffset(near ? { x: dx / strength, y: dy / strength } : { x: 0, y: 0 })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [radius, still, strength])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: active ? 'transform .25s ease-out' : 'transform .6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
