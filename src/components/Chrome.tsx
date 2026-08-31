import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../lib/i18n'

const routes = [
  { to: '/', key: 'home' },
  { to: '/services', key: 'services' },
  { to: '/work', key: 'work' },
  { to: '/about', key: 'about' },
  { to: '/contact', key: 'contact' },
] as const

export function Nav() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)

  // Ниже первого экрана шапке нужна подложка, иначе текст уезжает прямо под неё
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'border-b border-line bg-ground/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center gap-5 px-5 py-5 sm:px-8">
        <NavLink to="/" className="text-[15px] font-light tracking-[0.02em] text-fg">
          Лендвис
        </NavLink>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {routes.slice(1).map((r) => (
            <NavLink
              key={r.to}
              to={r.to}
              className={({ isActive }) =>
                `font-mono text-[10.5px] tracking-[0.14em] uppercase transition-colors ${
                  isActive ? 'text-fg' : 'text-faint hover:text-soft'
                }`
              }
            >
              {t.nav[r.key]}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          className="ml-auto font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase transition-colors hover:text-fg md:ml-0"
        >
          {lang === 'ru' ? 'EN' : 'RU'}
        </button>
      </div>
    </header>
  )
}

export function MobileNav() {
  const { t } = useLang()
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center gap-1 border-t border-line bg-ground/92 px-2 py-2 backdrop-blur-md md:hidden">
      {routes.map((r) => (
        <NavLink
          key={r.to}
          to={r.to}
          className={({ isActive }) =>
            `rounded-full px-2.5 py-2 font-mono text-[9px] tracking-[0.08em] whitespace-nowrap uppercase transition-colors ${
              isActive ? 'bg-white/10 text-fg' : 'text-faint'
            }`
          }
        >
          {t.nav[r.key]}
        </NavLink>
      ))}
    </nav>
  )
}

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="mx-auto max-w-[1180px] px-5 pt-16 pb-24 sm:px-8 md:pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <span className="text-[14px] font-light">{t.footer.line}</span>
        <span className="font-mono text-[11px] text-faint">{t.footer.copyright}</span>
      </div>
    </footer>
  )
}
