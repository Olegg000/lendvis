import { useRef, useState } from 'react'
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
  index,
  headingLevel = 3,
  compact = false,
}: {
  project: Project
  index: number
  headingLevel?: 2 | 3
  /** На главной карточка знакомит, а не рассказывает: описание в три строки. */
  compact?: boolean
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
  const phoneFrame = 'h-[clamp(195px,32vh,420px)] md:h-auto md:aspect-[16/10] md:max-h-[380px]'

  /** Строй телефонов на подсвеченной сцене — общий для обоих режимов. */
  const phoneStage = (
    <>
      {/* Подсветка из самого снимка: размытие заливает поле панели и заодно прячет апскейл */}
      <img
        src={project.shots[0]}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-[0.28] blur-[60px] saturate-[.55] brightness-90"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 78% 70% at 50% 46%, transparent 26%, rgba(8,9,12,0.72) 100%)',
        }}
      />
      <div className="relative flex h-full items-center justify-start gap-4 overflow-x-auto px-6 py-7 snap-x snap-mandatory sm:justify-center sm:gap-7 md:gap-20 md:overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {project.shots.slice(0, 3).map((src, i) => (
          <Phone
            key={src}
            src={src}
            /* Снимки всего 144x320: выше ~220px начинается каша, поэтому корпуса под высоту панели
               не тянем — строй стоит по центру освещённой сцены, а поле закрывают подсветка и виньетка. */
            className={`h-full max-h-[217px] w-auto shrink-0 origin-bottom snap-center ${
              i === 0 ? 'md:-rotate-6' : i === 2 ? 'md:rotate-6' : ''
            }`}
          />
        ))}
      </div>
    </>
  )

  /* ── Главная: карточка = корпус ноутбука ─────────────────────────────────────
     Плашки под карточкой больше нет — её роль взял на себя сам корпус.
     Требование стопки: силуэт обязан быть непрозрачным во всю ширину, иначе сквозь
     наехавшую карточку виден сосед. Поэтому имя переехало с воздуха над кадром
     на подбородок крышки — туда, где на настоящей машине стоит марка. */
  if (compact) {
    return (
      <motion.article
        initial={still ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="group relative"
      >
        {/* Клик в любое место корпуса ведёт к проектам */}
        <Link to="/work" aria-label={name} className="absolute inset-0 z-10 rounded-[18px]" />

        {/* крышка: рамка, экран, подбородок */}
        <div
          className="relative rounded-t-[18px] border border-b-0 border-white/14 p-[10px] pb-0 transition-colors duration-500 group-hover:border-white/28 sm:p-[13px] sm:pb-0"
          /* Свет сцены падает слева сверху: верхняя кромка корпуса ловит блик, низ уходит в тень.
             Без внутренней светлой линии по верху рамка читается рисованным прямоугольником. */
          style={{
            background: 'linear-gradient(163deg, #2f353d 0%, #1b1f25 38%, #0d1015 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.13), 0 60px 120px -55px rgba(0,0,0,1), 0 24px 50px -30px rgba(0,0,0,0.9), 0 46px 110px -70px rgba(216,179,132,0.12)',
          }}
        >
          {/* глазок камеры в верхней кромке */}
          <span
            aria-hidden="true"
            className="absolute top-[4px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-black/70 sm:top-[6px]"
          />
          <div className="relative overflow-hidden rounded-[9px] bg-[#0d0f13] ring-1 ring-black/70 ring-inset sm:rounded-[11px]">
            {project.phone ? (
              <div className={`relative w-full ${phoneFrame}`}>{phoneStage}</div>
            ) : (
              <>
                <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-white/12" />
                  <span className="h-2 w-2 rounded-full bg-white/12" />
                  <span className="h-2 w-2 rounded-full bg-white/12" />
                  <span className="mx-auto flex min-w-0 items-center gap-2 truncate rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[9.5px] text-faint">
                    {(project.demo ?? project.repo).replace(/^https?:\/\//, '')}
                  </span>
                </div>
                <img
                  src={project.shots[0]}
                  alt=""
                  loading="lazy"
                  className={`block w-full object-cover object-top opacity-90 transition-all duration-[900ms] group-hover:opacity-100 motion-safe:group-hover:scale-[1.015] ${frameRatio}`}
                />
              </>
            )}
            {/* Косой блик по матрице — экран должен отражать свет сцены, а не быть дыркой */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_8px_rgba(3,4,6,0.26)]"
              style={{
                background:
                  'linear-gradient(104deg, rgba(255,255,255,0.055) 0%, transparent 34%, transparent 72%, rgba(255,255,255,0.03) 100%)',
              }}
            />
          </div>

          {/* Тёплый край слева, холодный справа — ровно та подсветка, что горит на фотоподложке.
              Без этого корпус живёт отдельно от сцены, на которой стоит. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-t-[18px]"
            style={{
              background:
                'linear-gradient(100deg, rgba(216,179,132,0.055) 0%, transparent 34%, transparent 66%, rgba(150,175,215,0.05) 100%)',
            }}
          />

          {/* подбородок: имя выгравировано на корпусе */}
          <div className="flex items-center justify-between gap-5 px-1.5 py-3.5 sm:px-2 sm:py-4">
            <Heading className="truncate text-[clamp(1.05rem,1.7vw,1.45rem)] leading-tight font-light tracking-[-0.02em]">
              {name}
            </Heading>
            {/* На узкой машине вид проекта съедал имя до «AutoChe…» — на подбородке остаётся только имя */}
            <span className="hidden shrink-0 font-mono text-micro text-faint uppercase sm:inline">{kind}</span>
          </div>
        </div>

        {/* основание с выемкой под палец */}
        {/* Кромку корпуса ведём и по основанию: на крышке border, а на основании его не было —
            силуэт размыкался ровно на стыке, и на фотоподложке этот разрыв видно.
            Низ уходит в тень: подсветка снизу читалась бы неоновой полосой, а не металлом. */}
        <div
          className="relative h-[14px] rounded-b-[18px] border-x border-b border-white/14 transition-colors duration-500 group-hover:border-white/28 sm:h-[18px]"
          style={{
            background: 'linear-gradient(to bottom, #171b20 0%, #2b3037 45%, #14171b 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
        >
          {/* выемка под палец */}
          <span className="absolute top-0 left-1/2 h-[3px] w-16 -translate-x-1/2 rounded-b-full bg-black/55 sm:w-28" />
        </div>
        {/* Контактная тень пятном, а не полоской: на фотоподложке она гаснет в сцену.
            Стоит вне потока (top-full) — в высоту карточки не входит и не сбивает
            замер, по которому витрина решает, влезает ли машина в экран. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[6%] top-full h-9"
          style={{
            background:
              'radial-gradient(ellipse 60% 58% at 50% 0%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 46%, rgba(0,0,0,0) 78%)',
          }}
        />
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={still ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="group relative"
    >
      <div className="mb-5 flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <span className="font-mono text-label text-white/30 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <Heading className="text-[clamp(1.4rem,3vw,2.1rem)] leading-tight font-extralight tracking-[-0.03em]">
          {name}
        </Heading>
        <span className="font-mono text-micro text-faint uppercase">{kind}</span>
      </div>

      <p className="mb-7 max-w-[62ch] text-body text-soft">{lede}</p>

      {project.phone ? (
        // w-full обязателен: без явной ширины aspect-ratio с max-height ужимает блок по бокам.
        // Панель при этом не тянем под веб-кадр: на полной высоте строй занимал 17% поля —
        // 45px разницы в ритме глаз не ловит, а 400px пустоты ловит.
        <div
          className={`relative w-full overflow-hidden rounded-xl border border-line bg-[#0d0f13] ${phoneFrame}`}
        >
          {phoneStage}
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
            <div className={`relative w-full ${frameRatio}`}>
              <img
                src={project.shots[0]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-top opacity-35 blur-[2px]"
              />
              <iframe
                src={project.demo}
                title={name}
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
                className={`block w-full object-cover object-top opacity-90 transition-all duration-[900ms] group-hover:scale-[1.015] group-hover:opacity-100 ${frameRatio}`}
              />
              {project.demo && (
                <button
                  type="button"
                  onClick={() => setLive(true)}
                  /* Кнопка живёт в углу кадра, а не по центру: по центру она садилась
                     поверх самого интерфейса и читалась как наклейка на скриншоте */
                  className="group/play absolute inset-x-0 bottom-0 flex items-end justify-start p-4 sm:p-5"
                >
                  <span className="rounded-full border border-white/40 bg-black/70 px-6 py-2.5 font-mono text-label uppercase shadow-[0_10px_30px_-12px_rgba(0,0,0,1)] backdrop-blur-sm transition-[background-color,border-color,transform] duration-300 group-hover/play:border-white/70 group-hover/play:bg-black/85 group-active/play:scale-[0.97]">
                    {label.play}
                  </span>
                </button>
              )}
            </div>
          )}
        </motion.div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        {/* Стек — только на странице проектов: на главной карточка знакомит именем и кадром */}
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
