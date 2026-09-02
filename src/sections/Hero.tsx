import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { LightField } from '../components/Atmosphere'
import { Dust } from '../components/Dust'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n'


/** Заголовок собирается из размытия по словам — как наводка резкости в кадре. */
function FocusIn({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const still = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={still ? false : { opacity: 0, filter: 'blur(14px)', y: 14 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.15, delay: delay + i * 0.09, ease: EASE }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  )
}

export function Hero() {
  const { t, lang } = useLang()
  const still = useReducedMotion()
  const h = t.home.hero
  const ref = useRef<HTMLElement>(null)

  // Уходя вверх, кадр гаснет и чуть уезжает — плавная склейка со следующей сценой
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const lift = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section ref={ref} className="relative flex min-h-[94svh] items-center justify-center overflow-hidden px-5 sm:px-8">
      <LightField />
      <Dust />
      {/* Свет обрывался ровной линией на нижней кромке секции — видно было, где кончается
          холст. Гасим его в фон страницы, чтобы границы не читалось. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-ground) 92%)' }}
      />

      <motion.div
        style={still ? undefined : { opacity, scale, y: lift }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Имя студии в кадре: без него первый экран говорил только «разработка ПО» */}
        <motion.p
          initial={still ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
          /* Разрядка в полбуквы и кегль 15px съедали рисунок Piazzolla — имя читалось
             набором расставленных капителей, а не знаком студии. Кегль крупный, разрядка почти нулевая. */
          className="wordmark mb-4 text-[clamp(1.35rem,2.6vw,1.95rem)] leading-none tracking-[0.005em] text-fg"
        >
          {lang === 'ru' ? 'Лендвис' : 'Lendvis'}
        </motion.p>
        <motion.p
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.55 }}
          className="mb-8 font-mono text-micro tracking-[0.34em] text-faint uppercase"
        >
          {t.home.hero.tagline}
        </motion.p>

        <h1 className="max-w-[15ch] text-[clamp(2.1rem,6.6vw,4.6rem)] leading-[1.04] font-extralight tracking-[-0.04em] text-fg">
          <FocusIn text={h.titleBefore} />{' '}
          {/* Это слово — крупнейший элемент первого экрана: чем позже оно сядет, тем хуже LCP */}
          <motion.span
            className="font-serif text-[1.08em] font-light italic tracking-normal"
            initial={still ? false : { opacity: 0, filter: 'blur(16px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, delay: 0.42, ease: EASE }}
          >
            {h.titleItalic}
          </motion.span>{' '}
          <FocusIn text={h.titleAfter} delay={0.62} />
        </h1>

        <motion.p
          initial={still ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease: EASE }}
          className="mt-7 max-w-[48ch] text-lead text-soft"
        >
          {h.subtitle}
        </motion.p>

        <motion.div
          initial={still ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4"
        >
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full border border-white/25 px-8 py-3.5 font-mono text-label text-fg uppercase transition-[background-color,border-color,transform] duration-300 ease-out hover:border-white/70 hover:bg-white/[0.12] active:scale-[0.98]"
          >
            {h.ctaPrimary}
          </Link>
        </motion.div>
      </motion.div>

      {/* Тонкая линия света, стекающая вниз — вместо слова «прокрутите».
          Гаснет вместе со сценой: подсказка «прокрутите» не нужна тому, кто уже прокрутил. */}
      <motion.div
        style={still ? undefined : { opacity }}
        className="absolute bottom-9 left-1/2 z-10 -translate-x-1/2"
      >
      <motion.div
        initial={still ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.9 }}
        className="relative h-12 w-px overflow-hidden bg-white/12"
      >
        <motion.span
          className="absolute inset-x-0 top-0 block h-5 bg-gradient-to-b from-transparent via-white/85 to-transparent"
          animate={still ? undefined : { y: ['-100%', '340%'] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
        />
      </motion.div>
      </motion.div>
    </section>
  )
}
