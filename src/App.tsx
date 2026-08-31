import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LangProvider } from './lib/i18n'
import { useSmoothScroll } from './lib/smooth'
import { Cursor } from './components/Cursor'
import { Footer, MobileNav, Nav } from './components/Chrome'
import Home from './pages/Home'
import Services from './pages/Services'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'

/** При смене страницы возвращаемся наверх — иначе новая страница открывается с середины. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function Shell() {
  useSmoothScroll()
  return (
    <div className="grain min-h-screen bg-ground">
      <Cursor />
      <Nav />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
