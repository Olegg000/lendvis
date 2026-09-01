import { useEffect, useState } from 'react'
import { scrollToEl } from '../lib/smooth'
import { useLang } from '../lib/i18n'

const IDS = ['sec-services', 'sec-work', 'sec-about', 'sec-contact'] as const

/**
 * Указатель раздела сбоку. Сайт стал одностраничным на четырнадцать тысяч пикселей —
 * без него непонятно, где ты находишься и сколько ещё впереди.
 */
export function Rail() {
  const { t } = useLang()
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    // раздел считается текущим, когда его верх прошёл треть экрана
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-33% 0px -60% 0px', threshold: 0 },
    )
    for (const id of IDS) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  const label: Record<string, string> = {
    'sec-services': t.nav.services,
    'sec-work': t.nav.work,
    'sec-about': t.nav.about,
    'sec-contact': t.nav.contact,
  }

  return (
    <nav
      aria-label={t.nav.services}
      className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {IDS.map((id) => {
        const on = active === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollToEl(id)}
            className="group flex items-center gap-3"
          >
            <span
              className={`font-mono text-[10px] tracking-[0.16em] uppercase transition-all duration-500 ${
                on ? 'text-soft opacity-100' : 'text-faint opacity-0 group-hover:opacity-100'
              }`}
            >
              {label[id]}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                on ? 'w-8 bg-sand' : 'w-4 bg-white/25 group-hover:w-6 group-hover:bg-white/50'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
