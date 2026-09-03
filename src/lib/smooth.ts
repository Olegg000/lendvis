import { useEffect } from 'react'

/**
 * Прокрутка — нативная. Раньше здесь был Lenis, но `overflow-x: clip` на html/body
 * ломал ему измерение высоты (limit=0): на десктопе он был пустышкой поверх нативного
 * скролла, а на мобильном с syncTouch захватывал тач и блокировал прокрутку.
 * Нативный скролл работает на всех устройствах, а анимации framer-motion (подсветка,
 * наезд карточек) читают его напрямую через useScroll.
 */

/** Мгновенно наверх — при смене маршрута. */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
}

/** Плавно к элементу — переход с главной к конкретному проекту. */
export function scrollToElement(el: HTMLElement, offset = 12) {
  const y = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: y, behavior: 'smooth' })
}

/** Оставлен как хук совместимости: нативный скролл ничего инициализировать не требует. */
export function useSmoothScroll() {
  useEffect(() => {}, [])
}
