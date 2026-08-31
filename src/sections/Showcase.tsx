import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { WorkCard } from '../components/WorkCard'
import type { Project } from '../data'

/**
 * Витрина стопкой: следующая карточка наезжает на предыдущую, а та слегка ужимается.
 * Прогресс меряется по неподвижной обёртке — липкий элемент сам себя измерить не может,
 * его положение относительно экрана почти не меняется.
 */
export function Showcase({ projects }: { projects: Project[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })

  return (
    <div ref={wrap}>
      {projects.map((p, i) => (
        <StackItem key={p.n} index={i} total={projects.length} progress={scrollYProgress}>
          <WorkCard project={p} index={i} />
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
}: {
  children: React.ReactNode
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const still = useReducedMotion()
  const covered = index < total - 1
  // Каждая карточка ужимается на своём отрезке общей прокрутки — пока её накрывает следующая
  const from = index / total
  const to = (index + 1) / total
  const scale = useTransform(progress, [from, to], [1, 1 - 0.04])

  return (
    <div className="top-24 [@media(min-width:768px)_and_(min-height:820px)]:sticky" style={{ zIndex: index + 1 }}>
      <motion.div
        style={still || !covered ? undefined : { scale, transformOrigin: 'top center' }}
        className="rounded-2xl border border-line bg-ground px-5 py-8 sm:px-8 sm:py-10"
      >
        {children}
      </motion.div>
    </div>
  )
}
