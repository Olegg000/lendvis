import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { WorkCard } from '../components/WorkCard'
import type { Project } from '../data'

/**
 * Витрина стопкой: следующая карточка наезжает на предыдущую,
 * а та слегка ужимается и уходит в тень.
 */
export function Showcase({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map((p, i) => (
        <StackItem key={p.n} index={i} total={projects.length}>
          <WorkCard project={p} index={i} />
        </StackItem>
      ))}
    </div>
  )
}

function StackItem({ children, index, total }: { children: React.ReactNode; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.18', 'end 0.1'] })
  // Только масштаб: затухание делало карточку полупрозрачной ещё в момент чтения,
  // и сквозь неё просвечивала предыдущая — стопка теряла плотность.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.014])
  const covered = index < total - 1

  return (
    <div ref={ref} className="sticky top-20 md:top-24" style={{ zIndex: index + 1 }}>
      <motion.div
        style={still || !covered ? undefined : { scale, transformOrigin: 'top center' }}
        className="rounded-2xl border border-line bg-ground px-5 py-8 sm:px-8 sm:py-10"
      >
        {children}
      </motion.div>
    </div>
  )
}
