import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Hero } from '../sections/Hero'
import { Showcase } from '../sections/Showcase'
import { Directions } from '../sections/Directions'
import { Cases } from '../sections/Cases'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n'
import { metrics, projects } from '../data'


export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const still = useReducedMotion()
  return (
    <motion.div
      initial={still ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({
  eyebrow,
  title,
  accent,
  lead,
  level = 2,
}: {
  eyebrow?: string
  title: string
  accent?: string
  lead?: string
  level?: 1 | 2
}) {
  // На внутренних страницах заголовок страницы обязан быть h1, иначе документ начинается со второго уровня
  const H = level === 1 ? 'h1' : 'h2'
  return (
    <header className="mb-10">
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <H className="max-w-[20ch] text-[clamp(1.7rem,4vw,2.9rem)] leading-[1.1] font-extralight tracking-[-0.03em]">
          {title}
          {accent && <span className="font-serif text-[1.08em] font-light italic tracking-normal">&nbsp;{accent}</span>}
        </H>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[58ch] text-lead text-soft">{lead}</p>
        </Reveal>
      )}
    </header>
  )
}

/** Одинаковый финал на каждой странице: ни одна страница не должна обрываться в пустоту. */
export function FinalCall() {
  const { t } = useLang()
  return (
    <div className="relative mt-24 overflow-hidden border-t border-line pt-24 pb-10 text-center">
      {/* Сайт открывается по центру — пусть так же и закрывается, со своим светом */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[320px]"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at 50% 62%, rgba(216,179,132,0.10), transparent 72%), radial-gradient(ellipse 38% 55% at 50% 45%, rgba(150,175,215,0.09), transparent 70%)',
        }}
      />
      <div className="relative">
        <Reveal>
          <h2 className="mx-auto max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.1] font-extralight tracking-[-0.03em]">
            {t.home.final.title}
            <span className="font-serif text-[1.08em] font-light italic tracking-normal">&nbsp;{t.home.final.titleAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-[52ch] text-body text-soft">{t.home.final.text}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <Link
            to="/contact"
            className="mt-10 inline-flex rounded-full border border-white/28 px-8 py-4 font-mono text-label uppercase transition-[background-color,border-color,transform] duration-300 hover:border-white/60 hover:bg-white/[0.08] active:scale-[0.98]"
          >
            {t.home.final.cta}
          </Link>
        </Reveal>
      </div>
    </div>
  )
}

export default function Home() {
  const { t, lang } = useLang()
  const shown = projects.slice(0, 3)

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-[1180px] px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-24">
        <SectionHead
          eyebrow={t.home.services.eyebrow}
          title={t.home.services.title}
          accent={t.home.services.titleAccent}
          lead={t.home.services.lead}
        />
        <Directions />
      </section>

      <section className="mx-auto max-w-[1180px] px-5 pb-20 sm:px-8 sm:pb-24">
        <SectionHead
          eyebrow={t.home.work.eyebrow}
          title={t.home.work.title}
          accent={t.home.work.titleAccent}
          lead={t.home.work.lead}
        />
        <Showcase projects={shown} />
        <Reveal delay={0.1}>
          <Link
            to="/work"
            className="mt-12 inline-block border-b border-white/30 pb-1 font-mono text-label text-soft uppercase transition-colors hover:border-white/70 hover:text-fg"
          >
            {t.nav.work}
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 pb-20 sm:px-8 sm:pb-24">
        <SectionHead
          eyebrow={t.home.numbers.eyebrow}
          title={t.home.numbers.title}
          accent={t.home.numbers.titleAccent}
          lead={t.home.numbers.lead}
        />
        <dl className="grid gap-x-10 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={Math.min(i * 0.07, 0.28)}>
              <dt className="font-serif text-[clamp(2.4rem,6vw,4rem)] leading-none font-light text-fg italic tabular-nums">
                {lang === 'ru' ? m.value : m.valueEn}
              </dt>
              <dd className="mt-4 text-[14px] leading-snug text-soft">{lang === 'ru' ? m.label : m.labelEn}</dd>
              <dd className="mt-2 font-mono text-micro leading-relaxed text-faint">
                {lang === 'ru' ? m.sub : m.subEn}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 pb-20 sm:px-8 sm:pb-24">
        <SectionHead
          eyebrow={t.home.cases.eyebrow}
          title={t.home.cases.title}
          accent={t.home.cases.titleAccent}
          lead={t.home.cases.lead}
        />
        <Cases />
      </section>

      <section className="mx-auto max-w-[1180px] px-5 pb-24 sm:px-8">
        <FinalCall />
      </section>
    </>
  )
}
