import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { copy, type Lang } from '../copy'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof copy)['ru'] }

const LangContext = createContext<Ctx | null>(null)
const KEY = 'lendvis-lang'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    // Страницы отрисовываются в статику при сборке, браузера там нет. Отдаём русский:
    // он же язык по умолчанию для поиска. В браузере состояние пересчитается при монтировании.
    if (typeof window === 'undefined') return 'ru'
    try {
      const saved = localStorage.getItem(KEY)
      if (saved === 'ru' || saved === 'en') return saved
    } catch {
      /* приватный режим — просто берём язык по умолчанию */
    }
    return navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* не критично */
    }
  }, [lang])

  /** Смена языка круговым разрезом из точки клика, если браузер умеет. */
  const setLang = useCallback((next: Lang) => {
    const start = (document as Document & { startViewTransition?: (cb: () => void) => void }).startViewTransition
    if (!start || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLangState(next)
      return
    }
    start.call(document, () => setLangState(next))
  }, [])

  const value = useMemo(() => ({ lang, setLang, t: copy[lang] }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang вызван вне LangProvider')
  return ctx
}
