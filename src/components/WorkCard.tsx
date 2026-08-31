import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Phone } from './Device'
import type { Project } from '../data'
import { useLang } from '../lib/i18n'

const EASE = [0.22, 0.61, 0.24, 1] as const

/**
 * Работа в кадре: номер, название, короткое описание и экран.
 * Веб-проекты живут в окне браузера и по клику оживают настоящим демо,
 * мобильные — в корпусах телефонов, потому что вертикальный экран
 * в десктопной раме выглядит как ошибка.
 */
export function WorkCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useLang()
  const still = useReducedMotion()
  const [live, setLive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [22, -22])

  const label = {
    ru: { play: 'Запустить', close: 'Закрыть демо', open: 'Открыть', code: 'Код', running: 'работает вживую' },
    en: { play: 'Run it', close: 'Close demo', open: 'Open', code: 'Code', running: 'running live' },
  }[lang]

  const kind = lang === 'ru' ? project.kind : project.kindEn
  const summary = lang === 'ru' ? project.summary : project.summaryEn
  const frameHeight = 'h-[clamp(240px,46vh,520px)]'

  return (
    <motion.article
      initial={still ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="group relative"
    >
      <div className="mb-5 flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <span className="font-mono text-label text-white/30 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="text-[clamp(1.4rem,3vw,2.1rem)] leading-tight font-extralight tracking-[-0.03em]">
          {project.name}
        </h3>
        <span className="font-mono text-micro text-faint uppercase">{kind}</span>
      </div>

      <p className="mb-7 max-w-[62ch] text-body text-soft">{summary}</p>

      {project.phone ? (
        <div className={`flex items-center justify-center gap-4 overflow-hidden rounded-xl border border-line bg-[#0d0f13] px-6 sm:gap-7 ${frameHeight}`}>
          {project.shots.slice(0, 3).map((src) => (
            <Phone key={src} src={src} className="w-[104px] shrink-0 sm:w-[128px]" />
          ))}
        </div>
      ) : (
        <motion.div
          ref={ref}
          style={still ? undefined : { y }}
          className="overflow-hidden rounded-xl border border-white/12 bg-[#0d0f13] shadow-[0_50px_120px_-60px_rgba(0,0,0,1)] transition-colors duration-500 group-hover:border-white/25"
        >
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-white/12" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
            <span className="mx-auto flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[9.5px] text-faint">
              {live && <span className="h-1.5 w-1.5 rounded-full bg-[#5ec08a]" />}
              {live ? label.running : (project.demo ?? project.repo).replace(/^https?:\/\//, '').slice(0, 42)}
            </span>
            {live && (
              <button
                type="button"
                onClick={() => setLive(false)}
                className="font-mono text-[9.5px] tracking-[0.14em] text-faint uppercase transition-colors hover:text-fg"
              >
                {label.close}
              </button>
            )}
          </div>

          {live && project.demo ? (
            <iframe src={project.demo} title={project.name} loading="lazy" className={`block w-full bg-white ${frameHeight}`} />
          ) : (
            <div className="relative">
              <img
                src={project.shots[0]}
                alt=""
                loading="lazy"
                className={`block w-full object-cover object-top opacity-90 transition-all duration-[900ms] group-hover:scale-[1.015] group-hover:opacity-100 ${frameHeight}`}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0d0f13] to-transparent" />
              {project.demo && (
                <button
                  type="button"
                  onClick={() => setLive(true)}
                  className="absolute inset-0 flex items-end justify-center pb-6 transition-opacity duration-500 md:items-center md:pb-0 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                >
                  <span className="rounded-full border border-white/40 bg-black/55 px-7 py-3 font-mono text-label uppercase backdrop-blur-sm">
                    {label.play}
                  </span>
                </button>
              )}
            </div>
          )}
        </motion.div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-micro text-faint">{project.stack.slice(0, 4).join(' · ')}</p>
        <div className="flex items-center gap-6">
          {project.demo && (
            <a
              href={project.demo}
              className="border-b border-white/30 pb-1 font-mono text-micro text-soft uppercase transition-colors hover:border-white/70 hover:text-fg"
            >
              {label.open}
            </a>
          )}
          <a
            href={project.repo}
            className="border-b border-white/30 pb-1 font-mono text-micro text-soft uppercase transition-colors hover:border-white/70 hover:text-fg"
          >
            {label.code}
          </a>
        </div>
      </div>
    </motion.article>
  )
}
