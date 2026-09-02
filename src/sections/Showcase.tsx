import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { WorkCard } from '../components/WorkCard'
import type { Project } from '../data'

const TOP = 72

/**
 * Витрина стопкой: следующая карточка наезжает на предыдущую, а та слегка ужимается.
 * Прогресс меряется по неподвижной обёртке — липкий элемент сам себя измерить не может,
 * его положение относительно экрана почти не меняется.
 */
export function Showcase({ projects }: { projects: Project[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })

  // Липнуть можно, только если карточка целиком влезает в экран — иначе её верх уедет
  // и часть содержимого станет недостижимой. Порог не угадываем, а меряем по факту.
  const [canStick, setCanStick] = useState(false)
  useEffect(() => {
    const check = () => {
      const el = wrap.current
      if (!el) return
      const tallest = Math.max(
        ...[...el.children].map((c) => (c.firstElementChild ?? c).getBoundingClientRect().height),
      )
      setCanStick(window.innerWidth >= 768 && tallest + TOP <= window.innerHeight)
    }
    check()
    const ro = new ResizeObserver(check)
    if (wrap.current) ro.observe(wrap.current)
    window.addEventListener('resize', check, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', check)
    }
  }, [projects.length])

  return (
    <div ref={wrap}>
      {projects.map((p, i) => (
        <StackItem key={p.n} index={i} total={projects.length} progress={scrollYProgress} stick={canStick}>
          <WorkCard project={p} index={i} compact />
        </StackItem>
      ))}
    </div>
  )
}

function StackItem({
  children,
  index,
  total,
  progress,
  stick,
}: {
  children: React.ReactNode
  index: number
  total: number
  progress: MotionValue<number>
  stick: boolean
}) {
  const still = useReducedMotion()
  const covered = index < total - 1
  // Каждая карточка ужимается на своём отрезке общей прокрутки — пока её накрывает следующая
  const from = index / total
  const to = (index + 1) / total
  const scale = useTransform(progress, [from, to], [1, 1 - 0.04])

  return (
    <div
      className={stick ? '' : 'mb-14 last:mb-0'}
      style={stick ? { position: 'sticky', top: TOP, zIndex: index + 1 } : { zIndex: index + 1 }}
    >
      <motion.div
        style={still || !covered || !stick ? undefined : { scale, transformOrigin: 'top center' }}
        /* Фон нужен именно стопке: без него карточки просвечивали бы одна сквозь другую */
        className={stick ? 'rounded-2xl bg-ground pb-6' : ''}
      >
        {children}
      </motion.div>
    </div>
  )
}
