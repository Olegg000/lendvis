import { Suspense, lazy, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from './lib/motion'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { LangProvider, useLang } from './lib/i18n'
import { scrollToTop, useSmoothScroll } from './lib/smooth'
import { Cursor } from './components/Cursor'
import { Footer, MobileNav, Nav } from './components/Chrome'
import Home from './pages/Home'

// Внутренние страницы подгружаются по требованию — первый экран не ждёт весь сайт
const Services = lazy(() => import('./pages/Services'))
const Work = lazy(() => import('./pages/Work'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
// Не часть сайта: страница выбора направления первого экрана, в меню её нет
const Lab = lazy(() => import('./pages/Lab'))

/**
 * Возврат наверх при переходе и честный заголовок вкладки: одностраничное приложение
 * иначе оставляет один и тот же title на всех пяти маршрутах.
 */
function PageMeta() {
  const { pathname } = useLocation()
  const { t, lang } = useLang()

  // Наверх — только при смене маршрута: переключение языка не должно уносить со страницы
  useEffect(() => {
    scrollToTop()
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

/**
 * Переход между страницами: содержимое проявляется снизу вверх.
 * Без exit-анимации — иначе ленивый чанк успевает мигнуть пустотой на первом заходе.
 */
function PageFade({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const still = useReducedMotion()
  if (still) return <>{children}</>
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function Shell() {
  useSmoothScroll()
  const { lang } = useLang()
  const skipLabel = lang === 'ru' ? 'К содержимому' : 'Skip to content'
  return (
    <div className="grain min-h-screen bg-ground">
      <Cursor />
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
        <PageFade>
        <Suspense fallback={<div className="min-h-[70vh]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
        </PageFade>
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
