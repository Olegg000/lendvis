import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/**
 * Полоса прогресса поверх шапки. На длинной одностраничнике это единственный
 * честный ответ на вопрос «сколько ещё осталось».
 */
export function Progress() {
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll()
  // пружина убирает рывки на инерционной прокрутке
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 })
  if (still) return null
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: width }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-px origin-left bg-gradient-to-r from-transparent via-sand to-white/80"
    />
  )
}
