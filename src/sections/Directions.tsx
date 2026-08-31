import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../lib/i18n'
import { directionShots } from '../data'

/**
 * Направления лентой: карточки с кадрами, которые листаются вбок.
 * Список из шести строк читался как оглавление — здесь их видно.
 */
export function Directions() {
  const { t } = useLang()
  const still = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const [atEnd, setAtEnd] = useState(false)

  const shotOf = (n: string) => directionShots.find((d) => d.key === n)?.shot

  const nudge = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: still ? 'auto' : 'smooth' })
  }

  const onScroll = () => {
    const el = track.current
    if (!el) return
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 24)
  }

  return (
    <div className="relative">
      <div
        ref={track}
        onScroll={onScroll}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {t.services.items.map((s, i) => {
          const shot = shotOf(s.number)
          return (
            <motion.div
              key={s.number}
              initial={still ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: Math.min(i * 0.06, 0.3) }}
              className="w-[268px] shrink-0 snap-start sm:w-[330px]"
            >
              <Link
                to="/services"
                data-cursor={t.nav.services.toLowerCase()}
                className="group block overflow-hidden rounded-xl border border-line bg-panel transition-colors duration-500 hover:border-white/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0f13]">
                  {shot ? (
                    <img
                      src={shot}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-top opacity-75 transition-all duration-[900ms] group-hover:scale-[1.04] group-hover:opacity-100"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-serif text-[3.4rem] font-light text-white/12 italic">{s.number}</span>
                    </div>
                  )}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-panel to-transparent" />
                  <span className="absolute top-3 left-4 font-mono text-[10px] text-white/45">{s.number}</span>
                </div>

                <div className="px-5 pt-4 pb-6">
                  <h3 className="text-[16.5px] leading-snug font-light">{s.name}</h3>
                  <p className="mt-2 font-serif text-[15px] leading-snug text-soft italic">{s.tagline}</p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="←"
          className="h-9 w-9 rounded-full border border-line text-soft transition-colors hover:border-white/40 hover:text-fg"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="→"
          className={`h-9 w-9 rounded-full border text-soft transition-colors hover:border-white/40 hover:text-fg ${
            atEnd ? 'border-line/40 text-white/20' : 'border-line'
          }`}
        >
          →
        </button>
        <Link
          to="/services"
          className="ml-auto border-b border-white/25 pb-1 font-mono text-[10px] tracking-[0.18em] text-soft uppercase transition-colors hover:border-white/70 hover:text-fg"
        >
          {t.nav.services}
        </Link>
      </div>
    </div>
  )
}
