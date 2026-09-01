import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LangProvider, useLang } from './lib/i18n'
import { scrollToEl, scrollToTop, useSmoothScroll } from './lib/smooth'
import { Cursor } from './components/Cursor'
import { Progress } from './components/Progress'
import { Rail } from './components/Rail'
import { Footer, MobileNav, Nav } from './components/Chrome'
import Home from './pages/Home'

/** Маршрут → раздел одной страницы: адреса остались прежними, содержимое живёт в одном месте. */
const ANCHOR: Record<string, string> = {
  '/services': 'sec-services',
  '/work': 'sec-work',
  '/about': 'sec-about',
  '/contact': 'sec-contact',
}

/**
 * Заголовок вкладки и переход к нужному разделу. Сайт одностраничный,
 * поэтому «переход» — это доводка до якоря, а не подмена содержимого.
 */
function PageMeta() {
  const { pathname } = useLocation()
  const { t, lang } = useLang()

  useEffect(() => {
    const id = ANCHOR[pathname]
    if (id) scrollToEl(id)
    else scrollToTop()
  }, [pathname])

  useEffect(() => {
    const studio = lang === 'ru' ? 'Лендвис' : 'Lendvis'
    const map: Record<string, { title: string; description: string }> = {
      '/': {
        title: lang === 'ru' ? 'Лендвис — студия разработки' : 'Lendvis — development studio',
        description: t.home.hero.subtitle,
      },
      '/services': { title: `${t.nav.services} — ${studio}`, description: t.services.lead },
      '/work': { title: `${t.nav.work} — ${studio}`, description: t.work.lead },
      '/about': { title: `${t.nav.about} — ${studio}`, description: t.about.lead },
      '/contact': { title: `${t.nav.contact} — ${studio}`, description: t.contact.lead },
    }
    const meta = map[pathname] ?? map['/']
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [pathname, lang, t])

  return null
}

function Shell() {
  useSmoothScroll()
  const { lang } = useLang()
  const skipLabel = lang === 'ru' ? 'К содержимому' : 'Skip to content'
  return (
    <div className="grain min-h-screen bg-ground">
      <Cursor />
      <Progress />
      <Rail />
      {/* Хэш занят маршрутизатором, поэтому переход к содержимому — кнопкой, а не ссылкой */}
      <button
        type="button"
        onClick={() => document.getElementById('main')?.focus()}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:border focus:border-white/40 focus:bg-ground focus:px-5 focus:py-2.5 focus:font-mono focus:text-[11px] focus:uppercase"
      >
        {skipLabel}
      </button>
      <Nav />
      <PageMeta />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <Shell />
      </HashRouter>
    </LangProvider>
  )
}
