import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Project } from '../data'
import { useLang } from '../lib/i18n'

const EASE = [0.22, 0.61, 0.24, 1] as const

/**
 * Работа в кадре: крупный номер, короткая подпись и экран в окне браузера.
 * По клику окно оживает — внутри крутится настоящее демо.
 */
export function WorkCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useLang()
  const still = useReducedMotion()
  const [live, setLive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [26, -26])

  const label = {
    ru: { play: 'Запустить', open: 'Открыть', code: 'Код', running: 'работает вживую' },
    en: { play: 'Run it', open: 'Open', code: 'Code', running: 'running live' },
  }[lang]

  return (
    <motion.article
      initial={still ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="group relative py-16 first:pt-0"
    >
      <div className="mb-6 flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <span className="font-mono text-[11px] text-white/25 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="text-[clamp(1.5rem,3.4vw,2.3rem)] leading-tight font-extralight tracking-[-0.03em]">
          {project.name}
        </h3>
        <span className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">{project.kind}</span>
      </div>

      {/* Окно браузера: кадру нужна рама, иначе скриншот висит в воздухе */}
      <motion.div
        ref={ref}
        style={still ? undefined : { y }}
        className="overflow-hidden rounded-xl border border-white/12 bg-[#0d0f13] shadow-[0_50px_120px_-60px_rgba(0,0,0,1)] transition-colors duration-500 group-hover:border-white/25"
      >
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="mx-auto flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[9.5px] text-white/40">
            {live && <span className="h-1.5 w-1.5 rounded-full bg-[#5ec08a]" />}
            {live ? label.running : (project.demo ?? project.repo).replace(/^https?:\/\//, '').slice(0, 42)}
          </span>
        </div>

        {live && project.demo ? (
          <iframe
            src={project.demo}
            title={project.name}
            loading="lazy"
            className="block h-[440px] w-full bg-white sm:h-[560px]"
          />
        ) : (
          <div className="relative">
            <img
              src={project.shots[0]}
              alt=""
              loading="lazy"
              className="block aspect-[16/10] w-full object-cover object-top opacity-90 transition-all duration-[900ms] group-hover:scale-[1.015] group-hover:opacity-100"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0f13] to-transparent" />
            {project.demo && (
              <button
                type="button"
                onClick={() => setLive(true)}
                data-cursor={label.play.toLowerCase()}
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 focus-visible:opacity-100"
              >
                <span className="rounded-full border border-white/40 bg-black/45 px-7 py-3 font-mono text-[10.5px] tracking-[0.2em] uppercase backdrop-blur-sm">
                  {label.play}
                </span>
              </button>
            )}
          </div>
        )}
      </motion.div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[10.5px] text-faint">{project.stack.slice(0, 4).join(' · ')}</p>
        <div className="flex items-center gap-6">
          {project.demo && (
            <a
              href={project.demo}
              className="border-b border-white/25 pb-1 font-mono text-[10px] tracking-[0.18em] text-soft uppercase transition-colors hover:border-white/70 hover:text-fg"
            >
              {label.open}
            </a>
          )}
          <a
            href={project.repo}
            className="border-b border-white/25 pb-1 font-mono text-[10px] tracking-[0.18em] text-soft uppercase transition-colors hover:border-white/70 hover:text-fg"
          >
            {label.code}
          </a>
        </div>
      </div>
    </motion.article>
  )
}
