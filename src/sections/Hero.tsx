import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { LightField } from '../components/Atmosphere'
import { useLang } from '../lib/i18n'

const EASE = [0.22, 0.61, 0.24, 1] as const

/**
 * Первый экран: всё по центру, максимум воздуха, один дышащий источник света.
 * Регалий здесь намеренно нет — только суть и приглашение к разговору.
 */
export function Hero() {
  const { t } = useLang()
  const still = useReducedMotion()
  const h = t.home.hero

  const rise = (delay: number) => ({
    initial: still ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: EASE },
  })

  return (
    <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden px-5 py-28 sm:px-8">
      <LightField />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          {...rise(0.05)}
          className="max-w-[16ch] text-[clamp(2rem,6.2vw,4.4rem)] leading-[1.06] font-extralight tracking-[-0.035em] text-fg"
        >
          {h.titleBefore}{' '}
          <span className="font-serif text-[1.06em] font-light italic tracking-normal">{h.titleItalic}</span>{' '}
          {h.titleAfter}
        </motion.h1>

        <motion.p {...rise(0.28)} className="mt-7 max-w-[46ch] text-[15px] leading-relaxed text-soft sm:text-base">
          {h.subtitle}
        </motion.p>

        <motion.div {...rise(0.46)}>
          <Link
            to="/contact"
            data-cursor="написать"
            className="mt-9 inline-flex items-center rounded-full border border-white/28 px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] text-fg uppercase transition-colors hover:border-white/60 hover:bg-white/[0.06]"
          >
            {h.ctaPrimary}
          </Link>
        </motion.div>
      </div>

      <motion.span
        initial={still ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[9.5px] tracking-[0.3em] text-faint uppercase"
      >
        {h.scroll}
      </motion.span>
    </section>
  )
}
