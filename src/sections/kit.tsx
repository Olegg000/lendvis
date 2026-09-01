import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n'

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
    <div className="relative mt-24 overflow-hidden rounded-3xl border border-line pt-28 pb-24 text-center">
      {/* Закрывающий кадр: снимок сильно притемнён и уведён в палитру — он держит
          настроение, но не спорит с текстом поверх. */}
      <img
        src={`${import.meta.env.BASE_URL}shots/final-bg.webp`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'grayscale(0.55) brightness(0.42) contrast(1.05)' }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(rgba(5,5,7,0.72), rgba(5,5,7,0.82)), radial-gradient(ellipse 60% 70% at 50% 50%, rgba(216,179,132,0.12), transparent 72%)',
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
