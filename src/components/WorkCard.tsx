import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Phone } from './Device'
import type { Project } from '../data'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n'


/**
 * Работа в кадре: номер, название, короткое описание и экран.
 * Веб-проекты живут в окне браузера и по клику оживают настоящим демо,
 * мобильные — в корпусах телефонов, потому что вертикальный экран
 * в десктопной раме выглядит как ошибка.
 */
export function WorkCard({
  project,
  index,
  headingLevel = 3,
}: {
  project: Project
  index: number
  headingLevel?: 2 | 3
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const { lang } = useLang()
  const still = useReducedMotion()
  const [live, setLive] = useState(false)
  const [ready, setReady] = useState(false)
  // Пока управление не взято, кадр не перехватывает колесо — иначе прокрутка страницы встаёт
  const [grab, setGrab] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [22, -22])

  const label = {
    ru: {
      play: 'Запустить',
      close: 'Закрыть демо',
      open: 'Открыть',
      code: 'Код',
      running: 'работает вживую',
      grab: 'Взять управление',
      release: 'Вернуть прокрутку',
    },
    en: {
      play: 'Run it',
      close: 'Close demo',
      open: 'Open',
      code: 'Code',
      running: 'running live',
      grab: 'Take control',
      release: 'Give scroll back',
    },
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
        <Heading className="text-[clamp(1.4rem,3vw,2.1rem)] leading-tight font-extralight tracking-[-0.03em]">
          {lang === 'ru' ? project.name : project.nameEn}
        </Heading>
        <span className="font-mono text-micro text-faint uppercase">{kind}</span>
      </div>

      <p className="mb-7 max-w-[62ch] text-body text-soft">{summary}</p>

      {project.phone ? (
        <div className={`flex items-center justify-start gap-4 overflow-x-auto rounded-xl border border-line bg-[#0d0f13] px-6 py-7 snap-x snap-mandatory sm:justify-center sm:gap-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${frameHeight}`}>
          {project.shots.slice(0, 3).map((src) => (
            <Phone key={src} src={src} className="h-full w-auto shrink-0 snap-center" />
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
            <span className="mx-auto flex min-w-0 items-center gap-2 truncate rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[9.5px] text-faint">
              {live && (
                <span
                  className={`h-1.5 w-1.5 rounded-full ${ready ? 'bg-[#5ec08a]' : 'animate-pulse bg-white/45'}`}
                />
              )}
              {live && ready ? label.running : (project.demo ?? project.repo).replace(/^https?:\/\//, '')}
            </span>
            {live && (
              <button
                type="button"
                onClick={() => {
                  setLive(false)
                  setReady(false)
                }}
                className="shrink-0 font-mono text-[9.5px] tracking-[0.14em] text-faint uppercase transition-colors hover:text-fg"
              >
                {label.close}
              </button>
            )}
          </div>

          {live && project.demo ? (
            <div className={`relative ${frameHeight}`}>
              <img
                src={project.shots[0]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-top opacity-35 blur-[2px]"
              />
              <iframe
                src={project.demo}
                title={lang === "ru" ? project.name : project.nameEn}
                onLoad={() => setReady(true)}
                className={`absolute inset-0 h-full w-full bg-white transition-opacity duration-700 ${
                  ready ? 'opacity-100' : 'opacity-0'
                } ${grab ? '' : 'pointer-events-none'}`}
              />
              {ready && (
                <button
                  type="button"
                  onClick={() => setGrab((g) => !g)}
                  className="absolute right-3 bottom-3 rounded-full border border-white/30 bg-black/70 px-4 py-2 font-mono text-[9.5px] tracking-[0.14em] uppercase backdrop-blur-sm transition-colors hover:border-white/60"
                >
                  {grab ? label.release : label.grab}
                </button>
              )}
            </div>
          ) : (
            <div className="relative">
              <img
                src={project.shots[0]}
                alt=""
                loading="lazy"
                className={`block w-full object-cover object-top opacity-90 transition-all duration-[900ms] group-hover:scale-[1.015] group-hover:opacity-100 ${frameHeight}`}
              />
              {/* Кадр обрезается по высоте рамки: без растворения нижняя строка выглядит как сбой отрисовки */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0f13] via-[#0d0f13]/80 to-transparent" />
              {project.demo && (
                <button
                  type="button"
                  onClick={() => setLive(true)}
                  className="group/play absolute inset-0 flex items-end justify-center pb-6 transition-opacity duration-500 md:items-center md:pb-0 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                >
                  <span className="rounded-full border border-white/40 bg-black/55 px-7 py-3 font-mono text-label uppercase backdrop-blur-sm transition-[background-color,border-color,transform] duration-300 group-hover/play:border-white/70 group-hover/play:bg-black/75 group-active/play:scale-[0.97]">
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
