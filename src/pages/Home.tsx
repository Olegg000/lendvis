import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Hero } from '../sections/Hero'
import { Showcase } from '../sections/Showcase'
import { Directions } from '../sections/Directions'
import { useLang } from '../lib/i18n'
import { projects } from '../data'

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
}: {
  eyebrow?: string
  title: string
  accent?: string
  lead?: string
}) {
  return (
    <header className="mb-10">
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className="max-w-[20ch] text-[clamp(1.7rem,4vw,2.9rem)] leading-[1.1] font-extralight tracking-[-0.03em]">
          {title}
          {accent && <span className="font-serif text-[1.08em] font-light italic tracking-normal"> {accent}</span>}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-soft">{lead}</p>
        </Reveal>
      )}
    </header>
  )
}

export default function Home() {
  const { t } = useLang()
  const shown = projects.slice(0, 3)

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24">
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
            className="mt-12 inline-block border-b border-white/30 pb-1 font-mono text-[10.5px] tracking-[0.16em] text-soft uppercase transition-colors hover:border-white/70 hover:text-fg"
          >
            {t.nav.work}
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="border-t border-line pt-14">
          <Reveal>
            <h2 className="max-w-[18ch] text-[clamp(1.7rem,4vw,2.9rem)] leading-[1.1] font-extralight tracking-[-0.03em]">
              {t.home.final.title}
              <span className="font-serif text-[1.08em] font-light italic tracking-normal"> {t.home.final.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <Link
              to="/contact"
              data-cursor={t.nav.cta}
              className="mt-9 inline-flex rounded-full border border-white/28 px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:border-white/60 hover:bg-white/[0.06]"
            >
              {t.home.final.cta}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
