import { motion, useReducedMotion } from 'framer-motion'
import { CountUp } from '../components/CountUp'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n'
import { metrics } from '../data'

/**
 * Цифры строками, а не сеткой из четырёх колонок: сетка — заезженный приём,
 * в ней число живёт мелко. Здесь каждое число во всю строку, и цифра сама себе заголовок.
 */
export function Numbers() {
  const { lang } = useLang()
  const still = useReducedMotion()

  return (
    <dl className="border-t border-line">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={still ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: Math.min(i * 0.06, 0.24), ease: EASE }}
          className="group grid items-baseline gap-x-12 gap-y-3 border-b border-line py-9 md:grid-cols-[clamp(240px,26vw,380px)_minmax(0,1fr)]"
        >
          <dt className="relative">
            <span
              className="block bg-clip-text font-serif text-[clamp(3.4rem,11vw,8rem)] leading-[0.86] font-light text-transparent italic tabular-nums transition-[filter] duration-700 group-hover:brightness-110"
              style={{ backgroundImage: 'linear-gradient(96deg, #ffffff 8%, #f0e3d2 46%, #d8b384 100%)' }}
            >
              <CountUp value={lang === 'ru' ? m.value : m.valueEn} />
            </span>
            {/* тонкая тень под числом — цифра должна стоять на поверхности, а не висеть */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-2 left-0 h-px w-full max-w-[18ch] bg-gradient-to-r from-sand/45 via-white/10 to-transparent"
            />
          </dt>

          <dd className="md:pb-3">
            <p className="max-w-[34ch] text-[clamp(1rem,1.6vw,1.15rem)] leading-snug text-fg">
              {lang === 'ru' ? m.label : m.labelEn}
            </p>
            <p className="mt-3 max-w-[42ch] font-mono text-micro leading-relaxed text-faint">
              {lang === 'ru' ? m.sub : m.subEn}
            </p>
          </dd>
        </motion.div>
      ))}
    </dl>
  )
}
