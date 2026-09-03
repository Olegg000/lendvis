import { useRef } from 'react'
import { Link } from 'react-router-dom'
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
  headingLevel = 3,
  compact = false,
}: {
  project: Project
  headingLevel?: 2 | 3
  /** На главной карточка знакомит, а не рассказывает: описание в три строки. */
  compact?: boolean
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const { lang } = useLang()
  const still = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [22, -22])

  const label = {
    ru: {
      open: 'Открыть',
      code: 'Код',
    },
    en: {
      open: 'Open',
      code: 'Code',
    },
  }[lang]

  // Якорь для перехода с главной прямо к проекту: последний сегмент адреса репозитория
  const slug = project.repo.replace(/\/+$/, '').split('/').pop() ?? ''
  const name = lang === 'ru' ? project.name : project.nameEn
  const kind = lang === 'ru' ? project.kind : project.kindEn
  const summary = lang === 'ru' ? project.summary : project.summaryEn
  const lede = summary
  /* Соотношение снимка (1440x900) — чтобы не резать кадр. Потолок по высоте обязателен:
     без него карточка выросла до 916px при полезной высоте экрана 786 и не влезала ни в один ноутбук.
     На узкой колонке соотношение дало бы кадр НИЖЕ прежнего, поэтому там держим прежнюю высоту. */
  /* 252 = 72 (липкая шапка) + 142 (хром корпуса: панель, подбородок, рамка, основание, тень)
     + 24 (шаг между машинами) + запас 14px. Числа замерены, а не выведены: при -280 карточка
     вставала в 828 из 900, то есть полсотни пикселей резали кадр без всякой нужды. */
  const frameRatio =
    'h-[clamp(195px,32vh,420px)] md:h-auto md:aspect-[16/10] md:max-h-[calc(100svh-252px)]'
  /* У панели телефонов свой потолок: два одинаковых md:max-h в одной строке классов
     спорят между собой непредсказуемо, поэтому собираем её класс отдельно.
     Ниже соседей она стоит намеренно — три корпуса по 106px не заполняют широкое поле,
     и растянутая панель читается пустой. */
  /* Телефоны крупные, в ряд, по высоте панели — раньше стояли крошечными внизу
     широкого кадра, и половина карточки была пустой. Скриншоты 440x978, тянутся
     без каши. Центральный чуть впереди — витринный акцент, а не плоский строй. */
  const phoneStage = (
    <div className="relative flex items-end justify-start md:justify-center gap-5 overflow-x-auto px-4 py-8 sm:gap-8 md:gap-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {project.shots.slice(0, 3).map((src, i) => (
        <Phone
          key={src}
          src={src}
          className={`h-[clamp(360px,58vh,600px)] w-auto shrink-0 snap-center ${
            i === 1 ? 'md:-translate-y-3 md:scale-[1.04]' : 'md:opacity-95'
          }`}
        />
      ))}
    </div>
  )

  /* ── Главная: карточка = ноутбук ────────────────────────────────────────────
     Намеренно плоско: ни градиентов, ни размытых теней, ни накладок поверх экрана.
     Каждый такой слой в липкой стопке перерисовывается на каждом кадре прокрутки —
     на замере медиана кадра стояла 50мс, то есть 20 кадров в секунду.
     Осталось три плоские заливки и серая окантовка: корпус, экран, основание.

     Силуэт непрозрачен во всю ширину — иначе сквозь наехавшую карточку виден сосед.
     Поэтому имя стоит на подбородке корпуса, а не в воздухе над кадром. */
  if (compact) {
    /* Имя + вид проекта под кадром — общая подпись для обоих видов карточки */
    const caption = (
      <div className="flex items-center justify-between gap-5 px-1 py-3 sm:px-1.5 sm:py-3.5">
        <Heading className="truncate text-[clamp(1.05rem,1.7vw,1.45rem)] leading-tight font-light tracking-[-0.02em]">
          {name}
        </Heading>
        <span className="hidden shrink-0 font-mono text-micro text-faint uppercase sm:inline">{kind}</span>
      </div>
    )

    // Мобильный проект: чистая сцена с телефонами, без рамки ноутбука
    if (project.phone) {
      return (
        <motion.article
          initial={still ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="group relative"
        >
          <Link to={`/work#${slug}`} aria-label={name} className="absolute inset-0 z-10 rounded-2xl" />
          {/* Фон непрозрачный: в липкой стопке сквозь карточку не должно быть видно соседа */}
          <div className="overflow-hidden rounded-2xl border border-[#3b414a] bg-[#0d0f13] px-2 pb-1 transition-colors duration-300 group-hover:border-[#565e69]">
            <div className="relative overflow-hidden rounded-xl">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 72% 64% at 50% 40%, rgba(70,78,96,0.22) 0%, rgba(13,15,19,0.72) 62%, rgba(8,9,12,0.92) 100%)',
                }}
              />
              {phoneStage}
            </div>
            {caption}
          </div>
        </motion.article>
      )
    }

    // Веб-проект: корпус ноутбука
    return (
      <motion.article
        initial={still ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="group relative"
      >
        <Link to={`/work#${slug}`} aria-label={name} className="absolute inset-0 z-10 rounded-xl" />
        <div className="rounded-t-xl border border-b-0 border-[#3b414a] bg-[#181c22] p-2 pb-0 transition-colors duration-300 group-hover:border-[#565e69] sm:p-2.5 sm:pb-0">
          <div className="overflow-hidden rounded-md border border-[#23272e] bg-[#0d0f13]">
            <div className="flex items-center gap-2 border-b border-[#23272e] bg-[#12151a] px-3.5 py-2.5">
              <span className="h-[11px] w-[11px] rounded-full bg-[#e0443e]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#dea123]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#1aab29]" />
              <span className="mx-auto min-w-0 truncate rounded bg-white/[0.05] px-3 py-1 font-mono text-[9.5px] text-faint">
                {(project.demo ?? project.repo).replace(/^https?:\/\//, '')}
              </span>
            </div>
            <img
              src={project.shots[0]}
              alt=""
              loading="lazy"
              className={`block w-full object-cover object-top ${frameRatio}`}
            />
          </div>
          {caption}
        </div>
        <div className="relative h-3 rounded-b-xl border-x border-b border-[#3b414a] bg-[#22262d] transition-colors duration-300 group-hover:border-[#565e69] sm:h-[15px]">
          <span className="absolute top-0 left-1/2 h-[3px] w-20 -translate-x-1/2 rounded-b-full bg-[#0d0f13] sm:w-28" />
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      id={slug}
      initial={still ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="group relative"
    >
      <div className="mb-5">
        <Heading className="text-[clamp(1.4rem,3vw,2.1rem)] leading-tight font-extralight tracking-[-0.03em]">
          {name}
        </Heading>
      </div>

      <p className="mb-7 max-w-[82ch] text-body text-soft">{lede}</p>

      {project.phone ? (
        // Высота панели задаётся самими телефонами, а не фиксированным кадром — пустоты нет
        <div className="relative w-full overflow-hidden rounded-xl border border-line bg-[#0d0f13]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 62% at 50% 42%, rgba(70,78,96,0.22) 0%, rgba(13,15,19,0.7) 62%, rgba(8,9,12,0.9) 100%)',
            }}
          />
          {phoneStage}
        </div>
      ) : (
        <motion.div
          ref={ref}
          style={still ? undefined : { y }}
          className="overflow-hidden rounded-xl border border-white/12 bg-[#0d0f13] shadow-[0_50px_120px_-60px_rgba(0,0,0,1)] transition-colors duration-500 group-hover:border-white/25"
        >
          {/* Шапка окна браузера с адресом проекта */}
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-white/12" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
            <span className="mx-auto min-w-0 truncate rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[9.5px] text-faint">
              {(project.demo ?? project.repo).replace(/^https?:\/\//, '')}
            </span>
          </div>
          <div className="relative">
            <img
              src={project.shots[0]}
              alt=""
              loading="lazy"
              className={`block w-full object-cover object-top opacity-90 transition-all duration-[900ms] group-hover:scale-[1.015] group-hover:opacity-100 ${frameRatio}`}
            />
          </div>
        </motion.div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        {/* Стек снизу убран — описание уже несёт суть; остаются заметные действия */}
        <div className="flex flex-wrap items-center gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-sand/60 bg-sand/10 px-5 py-2 font-mono text-micro text-fg uppercase transition-colors hover:bg-sand/20"
            >
              {label.open}
            </a>
          )}
          <a
            href={project.repo}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2 font-mono text-micro text-soft uppercase transition-colors hover:border-white/60 hover:text-fg"
          >
            <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            {label.code}
          </a>
        </div>
      </div>
    </motion.article>
  )
}
