import Lenis from 'lenis'
import { useEffect } from 'react'

let instance: Lenis | null = null

/** Прокрутка наверх через сам движок: нативный scrollTo проигрывает его инерции. */
export function scrollToTop() {
  if (instance) instance.scrollTo(0, { immediate: true })
  else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
}

let glide = 0

/**
 * Доводка до раздела. Ни nativeScroll со `smooth`, ни собственный scrollTo Lenis
 * здесь не работают: инерционный цикл перебивает первый и не отрабатывает второй.
 * Поэтому ведём сами — покадрово и мгновенными позициями, за которыми Lenis идёт следом.
 */
export function scrollToEl(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const from = window.scrollY
  const to = Math.max(0, Math.min(el.getBoundingClientRect().top + from - 84, document.documentElement.scrollHeight - window.innerHeight))
  if (Math.abs(to - from) < 2) return

  cancelAnimationFrame(glide)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: to, behavior: 'instant' as ScrollBehavior })
    return
  }

  const dur = Math.min(1100, 320 + Math.abs(to - from) * 0.12)
  const t0 = performance.now()
  const step = (now: number) => {
    const p = Math.min((now - t0) / dur, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    window.scrollTo({ top: from + (to - from) * eased, behavior: 'instant' as ScrollBehavior })
    if (p < 1) glide = requestAnimationFrame(step)
  }
  glide = requestAnimationFrame(step)
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
