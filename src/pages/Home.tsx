import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Hero } from '../sections/Hero'
import { Showcase } from '../sections/Showcase'
import { Directions } from '../sections/Directions'
import { useLang } from '../lib/i18n'
import { cases, metrics, projects } from '../data'

const EASE = [0.22, 0.61, 0.24, 1] as const

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
          {accent && <span className="font-serif text-[1.08em] font-light italic tracking-normal"> {accent}</span>}
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
    <div className="mt-24 border-t border-line pt-14">
      <Reveal>
        <h2 className="max-w-[18ch] text-[clamp(1.7rem,4vw,2.9rem)] leading-[1.1] font-extralight tracking-[-0.03em]">
          {t.home.final.title}
          <span className="font-serif text-[1.08em] font-light italic tracking-normal"> {t.home.final.titleAccent}</span>
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-6 max-w-[52ch] text-body text-soft">{t.home.final.text}</p>
      </Reveal>
      <Reveal delay={0.16}>
        <Link
          to="/contact"
          className="mt-9 inline-flex rounded-full border border-white/28 px-7 py-3.5 font-mono text-label uppercase transition-[background-color,border-color,transform] duration-300 hover:border-white/60 hover:bg-white/[0.08] active:scale-[0.98]"
        >
          {t.home.final.cta}
        </Link>
      </Reveal>
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
        />
        <Directions />
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHead
          eyebrow={t.home.work.eyebrow}
          title={t.home.work.title}
          accent={t.home.work.titleAccent}
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
        <SectionHead eyebrow={t.home.numbers.eyebrow} title={t.home.numbers.title} accent={t.home.numbers.titleAccent} />
        <dl className="grid gap-x-10 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={Math.min(i * 0.07, 0.28)}>
              <dt className="font-serif text-[clamp(1.9rem,4vw,2.6rem)] leading-none font-light text-fg italic tabular-nums">
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
        {cases.map((c, i) => (
          <Reveal key={c.name} delay={Math.min(i * 0.07, 0.24)}>
            <article className="grid gap-x-12 gap-y-4 border-t border-line py-10 md:grid-cols-[210px_1fr]">
              <div>
                <h3 className="text-[18px] font-light">{c.name}</h3>
                <p className="mt-1.5 font-mono text-micro text-faint uppercase">
                  {lang === 'ru' ? c.kind : c.kindEn}
                </p>
                <p className="mt-5 font-serif text-[26px] leading-none font-light text-fg italic tabular-nums">
                  {c.metric}
                </p>
                <p className="mt-1.5 font-mono text-micro text-faint">{c.metricLabel}</p>
              </div>
              <p className="max-w-[62ch] text-body text-soft">{lang === 'ru' ? c.text : c.textEn}</p>
            </article>
          </Reveal>
        ))}
      </section>

    </>
  )
}
