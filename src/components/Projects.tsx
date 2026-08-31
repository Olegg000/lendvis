import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../data'

/** Карточки проектов складываются стопкой: предыдущая ужимается под следующей. */
export function Projects() {
  return (
    <div className="mt-14">
      {projects.map((p, i) => (
        <Card key={p.n} project={p} index={i} total={projects.length} />
      ))}
    </div>
  )
}

function Card({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const target = 1 - (total - 1 - index) * 0.025
  const scale = useTransform(scrollYProgress, [0, 1], [1, target])

  return (
    <div ref={ref} className="sticky top-16 md:top-20" style={{ paddingTop: index * 16 }}>
      <motion.article
        style={still ? undefined : { scale, transformOrigin: 'top center' }}
        className="mb-6 overflow-hidden rounded-3xl border border-hair bg-panel p-5 sm:p-7 md:rounded-[36px] md:p-9"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4 sm:gap-6">
            <span className="font-display text-3xl leading-none font-bold text-gold sm:text-5xl">{project.n}</span>
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">{project.kind}</p>
              <h3 className="mt-2 font-display text-xl leading-tight font-bold sm:text-3xl">{project.name}</h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.demo && (
              <a
                href={project.demo}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-mono text-xs tracking-[0.12em] text-ground uppercase transition hover:brightness-110"
              >
                Живое демо <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
            )}
            <a
              href={project.repo}
              className="inline-flex items-center gap-2 rounded-full border border-hair px-5 py-2.5 font-mono text-xs tracking-[0.12em] text-muted uppercase transition hover:border-fg/40 hover:text-fg"
            >
              Код <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-md bg-raised px-2.5 py-1 font-mono text-[11px] text-muted">
              {s}
            </span>
          ))}
        </div>

        {project.phone ? <PhoneRow shots={project.shots} /> : <ShotRow shots={project.shots} />}
      </motion.article>
    </div>
  )
}

function ShotRow({ shots }: { shots: string[] }) {
  return (
    <div className={`mt-7 grid gap-3 ${shots.length > 1 ? 'sm:grid-cols-2' : ''}`}>
      {shots.map((src) => (
        <div key={src} className="overflow-hidden rounded-2xl border border-hair bg-ground">
          <img src={src} alt="" loading="lazy" className="w-full object-cover object-top" />
        </div>
      ))}
    </div>
  )
}

function PhoneRow({ shots }: { shots: string[] }) {
  return (
    <div className="mt-7 flex flex-wrap justify-center gap-5 sm:gap-8">
      {shots.map((src) => (
        <div
          key={src}
          className="w-[150px] rounded-[26px] border-[6px] border-raised bg-raised shadow-[0_20px_60px_-30px_rgba(0,0,0,.9)] sm:w-[178px]"
        >
          <div className="relative overflow-hidden rounded-[20px] bg-ground">
            <div className="absolute top-1.5 left-1/2 z-10 h-1 w-12 -translate-x-1/2 rounded-full bg-white/25" />
            <img src={src} alt="" loading="lazy" className="w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
