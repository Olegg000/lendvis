import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { DirectionCover } from '../components/DirectionCover'
import { useLang } from '../lib/i18n'

/**
 * Направления идут лентой сами и замирают, когда на них наводят.
 * Список рендерится дважды: когда первая половина уходит влево ровно на свою ширину,
 * смещение сбрасывается — шва не видно, лента бесконечная.
 */

/** Лёгкий сбив по вертикали, чтобы строка не выглядела линейкой. Фиксированный, не случайный. */
const DRIFT = [0, 16, 6, 22, 10, 18]

/* Быстрее прежнего в два с половиной раза. Выше — имена перестают читаться,
   и раздел из содержательного становится чисто декоративным. */
const SPEED = 0.082 // пикселей на миллисекунду

export function Directions() {
  const { t } = useLang()
  const still = useReducedMotion()
  const top = useRef<HTMLDivElement>(null)
  const bottom = useRef<HTMLDivElement>(null)
  const paused = useRef(false)
  const shift = useRef(0)

  useEffect(() => {
    if (still) return
    let raf = 0
    let last = performance.now()

    const step = (now: number) => {
      const dt = Math.min(now - last, 64) // после возврата на вкладку не прыгаем
      last = now
      if (!paused.current) {
        shift.current += dt * SPEED
        for (const el of [top.current, bottom.current]) {
          if (!el) continue
          const half = el.scrollWidth / 2
          if (half <= 0) continue
          const x = shift.current % half
          // нижняя лента идёт навстречу верхней
          el.style.transform =
            el === top.current
              ? `translate3d(${-x}px, 0, 0)`
              : `translate3d(${x - half}px, 0, 0)`
        }
      }
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [still])

  const hold = () => {
    paused.current = true
  }
  const release = () => {
    paused.current = false
  }

  /* Вторая лента начинается с середины списка — иначе две строки шли бы близнецами */
  const order = t.services.items
  const shifted = [...order.slice(3), ...order.slice(0, 3)]

  const Belt = ({ list, innerRef }: { list: typeof order; innerRef: React.RefObject<HTMLDivElement | null> }) => (
    <div ref={innerRef} className="flex w-max gap-10 will-change-transform sm:gap-16">
      {[...list, ...list].map((s, i) => (
        <div
          key={`${s.number}-${i}`}
          className="w-[290px] shrink-0 sm:w-[400px]"
          style={{ marginTop: DRIFT[i % DRIFT.length] }}
        >
          <Link
            to="/services"
            aria-hidden={i >= list.length}
            tabIndex={i >= list.length ? -1 : undefined}
            data-cursor={t.nav.services.toLowerCase()}
            className="group block overflow-hidden rounded-xl border border-line bg-panel transition-colors duration-500 hover:border-white/30"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0d0f13]">
              <DirectionCover n={s.number} />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-panel via-panel/70 to-transparent" />
            </div>
            {/* Только имя: описание переехало в лид раздела, на карточках оно дробило ритм */}
            <div className="px-5 pt-3.5 pb-5">
              <h3 className="text-[16.5px] leading-snug font-light">{s.name}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )

  return (
    <div className="relative">
      <div
        className="-mx-5 space-y-10 overflow-hidden px-5 sm:-mx-8 sm:space-y-14 sm:px-8"
        /* по краям ленты тают, иначе бесконечность читается как обрезка */
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
        }}
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocusCapture={hold}
        onBlurCapture={release}
        onTouchStart={hold}
        onTouchEnd={release}
      >
        <Belt list={order} innerRef={top} />
        <Belt list={shifted} innerRef={bottom} />
      </div>

      <div className="mt-5 flex items-center justify-end">
        <Link
          to="/services"
          className="border-b border-white/30 pb-1 font-mono text-label text-soft uppercase transition-colors hover:border-white/70 hover:text-fg"
        >
          {t.home.services.more} · {t.services.items.length}
        </Link>
      </div>
    </div>
  )
}
