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
      // присваивание width очищает канвас: при отключённом движении кадр нужно вернуть руками
      if (still) requestAnimationFrame(draw)
    }

    /**
     * Вспышки: редкие блики, которые загораются и гаснут. Дают кадру жизнь,
     * не превращая фон в мигалку — одновременно горит одна-две.
     */
    type Flare = { x: number; y: number; r: number; born: number; life: number; warm: boolean }
    let flares: Flare[] = []
    let nextAt = 1.5

    const spawn = (t: number) => {
      // по вертикали держимся верхней и нижней третей: под заголовком вспышка съедает контраст
      const up = Math.random() < 0.5
      flares.push({
        x: 0.1 + Math.random() * 0.8,
        y: up ? 0.08 + Math.random() * 0.2 : 0.68 + Math.random() * 0.24,
        r: 0.09 + Math.random() * 0.13,
        born: t,
        life: 3.2 + Math.random() * 2.4,
        warm: Math.random() < 0.45,
      })
      nextAt = t + 2.6 + Math.random() * 3.4
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

      if (!still) {
        if (t > nextAt) spawn(t)
        flares = flares.filter((f) => t - f.born < f.life)
        for (const f of flares) {
          const p = (t - f.born) / f.life
          // быстро разгорается, долго гаснет — так вспышка читается как отблеск, а не как мигание
          const a = p < 0.22 ? p / 0.22 : Math.pow(1 - (p - 0.22) / 0.78, 2.2)
          const tint = f.warm ? '216,179,132' : '150,175,215'
          blob(w * f.x, h * f.y, span * f.r, `rgba(${tint},${(a * 0.85 * intensity).toFixed(3)})`)
        }
      }

      if (!still) raf = requestAnimationFrame(draw)
    }

    // За пределами экрана рисовать незачем: холст героя иначе крутится всю страницу
    const host = canvas.parentElement ?? canvas
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(draw)
      } else if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    io.observe(host)

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize, { passive: true })
    return () => {
      io.disconnect()
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
