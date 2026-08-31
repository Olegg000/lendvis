import Lenis from 'lenis'
import { useEffect } from 'react'

let instance: Lenis | null = null

/** Прокрутка наверх через сам движок: нативный scrollTo проигрывает его инерции. */
export function scrollToTop() {
  if (instance) instance.scrollTo(0, { immediate: true })
  else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
}

/**
 * Инерционный скролл. Страница едет с довеском и мягко останавливается —
 * это и есть тот самый эффект «дорогого» сайта.
 * При включённом «уменьшить движение» не подключаем вовсе: нативный скролл честнее.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    instance = lenis
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)


    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      instance = null
    }
  }, [])
}
