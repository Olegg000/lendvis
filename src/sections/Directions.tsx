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

const SPEED = 0.032 // пикселей на миллисекунду

export function Directions() {
  const { t } = useLang()
  const still = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const paused = useRef(false)
  const shift = useRef(0)

  useEffect(() => {
    if (still) return
    let raf = 0
    let last = performance.now()

    const step = (now: number) => {
      const dt = Math.min(now - last, 64) // после возврата на вкладку не прыгаем
      last = now
      const el = track.current
      if (el && !paused.current) {
        const half = el.scrollWidth / 2
        shift.current += dt * SPEED
        if (half > 0 && shift.current >= half) shift.current -= half
        el.style.transform = `translate3d(${-shift.current}px, 0, 0)`
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

  const items = [...t.services.items, ...t.services.items]

  return (
    <div className="relative">
      <div
        className="-mx-5 overflow-hidden px-5 sm:-mx-8 sm:px-8"
        /* по краям лента тает, иначе бесконечная лента читается как обрезанная */
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
        <div ref={track} className="flex w-max gap-5 pb-4 will-change-transform">
          {items.map((s, i) => (
            <div
              key={`${s.number}-${i}`}
              className="w-[300px] shrink-0 sm:w-[420px]"
              style={{ marginTop: DRIFT[i % DRIFT.length] }}
            >
              <Link
                to="/services"
                aria-hidden={i >= t.services.items.length}
                tabIndex={i >= t.services.items.length ? -1 : undefined}
                data-cursor={t.nav.services.toLowerCase()}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel transition-colors duration-500 hover:border-white/30"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#0d0f13]">
                  <DirectionCover n={s.number} />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-panel via-panel/70 to-transparent" />
                </div>

                <div className="flex-1 px-5 pt-4 pb-6">
                  <h3 className="text-[16.5px] leading-snug font-light">{s.name}</h3>
                  <p className="mt-2 line-clamp-1 font-serif text-[16px] leading-snug text-soft italic">{s.tagline}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
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
