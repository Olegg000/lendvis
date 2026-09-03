/**
 * Яндекс.Метрика для одностраничного сайта.
 *
 * Счётчик подключается только когда задан номер и только на боевом домене:
 * на localhost и в сборках без номера ничего не грузится и статистику не пачкает.
 *
 * SPA-нюанс: Метрика считает просмотр один раз при загрузке. Переходы между
 * разделами — это смена адреса без перезагрузки, поэтому о каждом сообщаем сами.
 */

/** Номер счётчика Яндекс.Метрики. Пусто — аналитика выключена. */
export const METRIKA_ID = '112277153'

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void
    [key: `ym${string}`]: unknown
  }
}

let loaded = false

export function initMetrika() {
  if (loaded || !METRIKA_ID) return
  if (typeof window === 'undefined') return
  // На локальной машине не считаем — иначе своя разработка попадёт в отчёты
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return

  loaded = true
  const id = Number(METRIKA_ID)

  // Официальный сниппет Метрики, переписанный без eval и document.write
  window.ym =
    window.ym ||
    function (...args: unknown[]) {
      ;(window.ym as unknown as { a: unknown[][] }).a = (window.ym as unknown as { a?: unknown[][] }).a || []
      ;(window.ym as unknown as { a: unknown[][] }).a.push(args)
    }
  ;(window.ym as unknown as { l: number }).l = Date.now()

  const s = document.createElement('script')
  s.async = true
  s.src = 'https://mc.yandex.ru/metrika/tag.js'
  document.head.appendChild(s)

  window.ym?.(id, 'init', {
    // Вебвизор: запись сессии — видно, что человек делал на сайте после звонка
    webvisor: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    defer: false,
  })
}

/** Просмотр раздела при переходе внутри одностраничного сайта. */
export function trackPageView(url: string) {
  if (!METRIKA_ID) return
  window.ym?.(Number(METRIKA_ID), 'hit', url, { title: document.title })
}

/** Целевое действие: клик по контакту, отправка в Telegram и т.п. */
export function trackGoal(name: string) {
  if (!METRIKA_ID) return
  window.ym?.(Number(METRIKA_ID), 'reachGoal', name)
}
