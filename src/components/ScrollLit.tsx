import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

/** Одно слово: гаснет, пока прокрутка до него не дошла, и разгорается, когда доходит. */
function Word({
  children,
  progress,
  from,
  to,
}: {
  children: string
  progress: MotionValue<number>
  from: number
  to: number
}) {
  const opacity = useTransform(progress, [from, to], [0.16, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
      {' '}
    </motion.span>
  )
}

/**
 * Текст, который белеет по мере прокрутки: слова загораются одно за другим.
 * Читателя ведёт по строке сам скролл — приём стоит того, чтобы фраза была одна и сильная.
 */
export function ScrollLit({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.32'] })
  const words = text.split(' ')

  if (still) return <p className={className}>{text}</p>

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={`${w}-${i}`} progress={scrollYProgress} from={i / words.length} to={(i + 1) / words.length}>
          {w}
        </Word>
      ))}
    </p>
  )
}
