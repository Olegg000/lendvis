import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { copy, type Lang } from '../copy'

/**
 * Язык определяется АДРЕСОМ, а не памятью браузера: /en/... — английский, всё остальное русский.
 *
 * Раньше язык лежал в localStorage и подбирался по navigator.language. Для поиска это было
 * плохо дважды: у каждой языковой версии не было своего адреса (значит, английскую версию
 * нельзя ни проиндексировать, ни связать через hreflang), а робот Google приходит с пустым
 * хранилищем и локалью en-US — и получал английскую страницу поверх русской статики.
 *
 * Теперь у каждой версии свой файл, они ссылаются друг на друга, а выбор языка — это переход
 * по ссылке. Определение по языку браузера осталось, но делает его nginx на корне сайта:
 * робот Accept-Language не присылает и всегда попадает на русскую версию.
 */

type Ctx = {
  lang: Lang
  t: (typeof copy)['ru']
  /** Адрес внутренней страницы в текущем языке: path('/work') → '/work' или '/en/work' */
  path: (p: string) => string
  /** Та же страница на другом языке — для переключателя */
  other: string
  otherLang: Lang
}

const LangContext = createContext<Ctx | null>(null)

/** '/en/work' → '/work', '/en' → '/' */
export function stripLang(pathname: string) {
  if (pathname === '/en') return '/'
  return pathname.startsWith('/en/') ? pathname.slice(3) : pathname
}

/** '/work' → '/en/work', '/' → '/en' */
export function withEn(bare: string) {
  return bare === '/' ? '/en' : '/en' + bare
}

export function LangProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const lang: Lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ru'
  const bare = stripLang(pathname)

  useEffect(() => {
    document.documentElement.lang = lang
    /* Запоминаем язык печенькой — её читает nginx на корне сайта. Без неё человек,
       выбравший русский в английском браузере, при перезагрузке lendvis.ru снова
       уезжал бы на /en/. Внутри сайта переходы клиентские, сервер о них не знает. */
    document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`
  }, [lang])

  const value = useMemo<Ctx>(
    () => ({
      lang,
      t: copy[lang],
      path: (p: string) => (lang === 'en' ? withEn(p) : p),
      other: lang === 'en' ? bare : withEn(bare),
      otherLang: lang === 'en' ? 'ru' : 'en',
    }),
    [lang, bare],
  )
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang вызван вне LangProvider')
  return ctx
}
