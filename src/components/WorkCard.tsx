import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '../data'
import { useLang } from '../lib/i18n'

/**
 * Карточка работы в строгой подаче: сначала название и мета, потом кадр.
 * Если у проекта есть живое демо — оно открывается прямо здесь, в рамке,
 * и с ним можно повозиться, не уходя с сайта.
 */
export function WorkCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useLang()
  const still = useReducedMotion()
  const [live, setLive] = useState(false)

  const label = {
    ru: { play: 'Запустить прямо здесь', open: 'Открыть отдельно', code: 'Код', running: 'Работает вживую' },
    en: { play: 'Run it right here', open: 'Open separately', code: 'Code', running: 'Running live' },
  }[lang]

  return (
    <motion.article
      initial={still ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: Math.min(index * 0.06, 0.24), ease: [0.22, 0.61, 0.24, 1] }}
      className="border-t border-line py-12 first:border-t-0 first:pt-0"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h3 className="text-[clamp(1.4rem,3vw,2rem)] leading-tight font-light tracking-[-0.025em]">{project.name}</h3>
        <span className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">{project.kind}</span>
      </div>

      <p className="mt-4 max-w-[62ch] text-[14.5px] leading-relaxed text-soft">{project.summary}</p>

      <p className="mt-4 font-mono text-[11px] text-faint">{project.stack.join(' · ')}</p>

      <div className="relative mt-8 overflow-hidden rounded-lg border border-line bg-panel">
        {live && project.demo ? (
          <>
            <div className="flex items-center gap-2 border-b border-line px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5ec08a]" />
              <span className="font-mono text-[9.5px] tracking-[0.14em] text-faint uppercase">{label.running}</span>
              <span className="ml-auto font-mono text-[9.5px] text-faint">{project.demo.replace('https://', '')}</span>
            </div>
            <iframe
              src={project.demo}
              title={project.name}
              loading="lazy"
              className="block h-[420px] w-full bg-white sm:h-[520px]"
            />
          </>
        ) : (
          <div className="relative">
            <img src={project.shots[0]} alt="" loading="lazy" className="block w-full object-cover object-top" />
            {project.demo && (
              <button
                type="button"
                onClick={() => setLive(true)}
                data-cursor={lang === 'ru' ? 'запустить' : 'run'}
                className="absolute inset-0 flex items-center justify-center bg-ground/55 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100"
              >
                <span className="rounded-full border border-white/45 bg-ground/70 px-6 py-3 font-mono text-[11px] tracking-[0.16em] uppercase">
                  {label.play}
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
        {project.demo && (
          <a
            href={project.demo}
            className="rounded-full border border-white/25 px-5 py-2.5 font-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors hover:border-white/60"
          >
            {label.open}
          </a>
        )}
        <a
          href={project.repo}
          className="border-b border-white/30 pb-1 font-mono text-[10.5px] tracking-[0.16em] text-soft uppercase transition-colors hover:border-white/70 hover:text-fg"
        >
          {label.code}
        </a>
      </div>
    </motion.article>
  )
}
