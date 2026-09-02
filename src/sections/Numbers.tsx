import { motion, useReducedMotion } from 'framer-motion'
import { CountUp } from '../components/CountUp'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n'
import { metrics } from '../data'

/**
 * Цифры строками, а не сеткой из четырёх колонок: сетка — заезженный приём,
 * в ней число живёт мелко. Здесь каждое число во всю строку, и цифра сама себе заголовок.
 * Подпись стоит ПОД числом по левому краю: в колонке справа она вставала к середине полосы
 * и висела в воздухе, не имея под собой опоры.
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
          /* Последнюю линию не рисуем: раздел закрывает верхняя кромка финального блока,
             две одинаковые линии в 128px друг от друга читались как недоделка */
          className="group border-b border-line py-9 last:border-b-0 sm:py-10"
        >
          <dt>
            <span
              className="sheen block bg-clip-text font-serif text-[clamp(3.4rem,11vw,8rem)] leading-[0.86] font-light text-transparent italic tabular-nums transition-[filter] duration-700 group-hover:brightness-110"
              style={{
                backgroundImage:
                  'linear-gradient(96deg, #ffffff 4%, #f0e3d2 28%, #ffffff 44%, #f0e3d2 62%, #d8b384 100%)',
                backgroundSize: '220% 100%',
              }}
            >
              <CountUp value={lang === 'ru' ? m.value : m.valueEn} />
            </span>
          </dt>

          {/* Волоска под числом больше нет: фиксированная длина совпадала с шириной цифры
              только случайно — под «~1000» обрывалась, под «4» уезжала далеко вправо. */}
          <dd className="mt-3">
            <p className="max-w-[38ch] text-[clamp(1rem,1.6vw,1.15rem)] leading-snug text-fg">
              {lang === 'ru' ? m.label : m.labelEn}
            </p>
          </dd>
        </motion.div>
      ))}
    </dl>
  )
}
