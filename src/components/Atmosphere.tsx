import { useEffect, useRef } from 'react'

/**
 * Дышащий свет за содержимым. Два пятна медленно расходятся и сходятся,
 * как подсветка в кадре: это заменяет видеофон, весит килобайты и не тормозит.
 */
export function LightField({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let t0 = 0

    const resize = () => {
      const parent = canvas.parentElement
      w = parent?.clientWidth ?? window.innerWidth
      h = parent?.clientHeight ?? window.innerHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const blob = (x: number, y: number, r: number, color: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, color)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
    }

    const draw = (time: number) => {
      if (!t0) t0 = time
      const t = (time - t0) / 1000
      ctx.clearRect(0, 0, w, h)
      const span = Math.max(w, h)
      // холодное пятно чуть выше центра, тёплое — ниже и правее
      blob(
        w * (0.5 + Math.sin(t / 13) * 0.06),
        h * (0.46 + Math.cos(t / 17) * 0.05),
        span * 0.42,
        `rgba(150,175,215,${0.3 * intensity})`,
      )
      blob(
        w * (0.62 + Math.cos(t / 19) * 0.05),
        h * (0.62 + Math.sin(t / 15) * 0.05),
        span * 0.3,
        `rgba(215,170,130,${0.2 * intensity})`,
      )
      if (!still) raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [intensity])

  return (
    <>
      <canvas
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        style={{ filter: 'blur(30px)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 78% 68% at 50% 45%, transparent 40%, rgba(0,0,0,.75) 100%)' }}
      />
    </>
  )
}
