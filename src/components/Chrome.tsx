import { useEffect, useState } from 'react'
import { ContactIcon } from './ContactIcon'
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
        <NavLink to="/" className="wordmark text-[14px] tracking-[0.03em] text-fg">
          {lang === 'ru' ? 'Лендвис' : 'Lendvis'}
        </NavLink>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {routes.slice(1, 4).map((r) => (
            <NavLink
              key={r.to}
              to={r.to}
              className={({ isActive }) =>
                `font-mono text-[10.5px] tracking-[0.14em] uppercase transition-colors ${
                  isActive ? 'text-fg' : 'text-faint hover:text-fg'
                }`
              }
            >
              {t.nav[r.key]}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/contact"
          className="hidden rounded-full border border-white/28 px-4 py-2 font-mono text-micro uppercase transition-[background-color,border-color] duration-300 hover:border-white/60 hover:bg-white/[0.08] md:inline-flex"
        >
          {t.nav.cta}
        </NavLink>

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
    <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center gap-0.5 border-t sm:gap-1 border-line bg-ground/92 px-1.5 pt-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      {routes.map((r) => (
        <NavLink
          key={r.to}
          to={r.to}
          className={({ isActive }) =>
            `flex min-h-[44px] items-center justify-center rounded-full px-1.5 font-mono text-[10px] tracking-normal whitespace-nowrap uppercase transition-colors sm:px-2.5 sm:tracking-[0.06em] ${
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
  const f = t.footer
  const link =
    'group inline-flex items-center gap-2.5 text-[13.5px] text-soft transition-colors hover:text-fg'
  const ico = 'h-[15px] w-[15px] text-faint transition-colors group-hover:text-sand'
  return (
    /* Одна ступень вместо трёх. В шапке уже есть вся навигация, на странице «О студии» —
       весь рассказ; подвалу остаётся только то, чего больше нигде нет: как связаться,
       кто и откуда. Колонка со ссылками на разделы дословно повторяла меню. */
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-10 gap-y-4 px-5 py-10 pb-28 sm:px-8 md:pb-10">
        <p className="font-mono text-[11px] text-faint">
          {f.copyright} · {f.line}
        </p>
        <nav className="flex flex-wrap items-center gap-x-7 gap-y-2">
          <a href="https://t.me/nektoo1111" className={link}>
            <ContactIcon kind="telegram" className={ico} />
            Telegram
          </a>
          <a href="mailto:olegkovalik2013@yandex.ru" className={link}>
            <ContactIcon kind="mail" className={ico} />
            {t.contact.fields.email}
          </a>
          <a href="https://github.com/Olegg000" className={link}>
            <ContactIcon kind="github" className={ico} />
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
