import { useEffect, useRef } from 'react'

type Mote = { x: number; y: number; r: number; a: number; vx: number; vy: number; ph: number }

/**
 * Пылинки в луче света: медленно плывут вверх, мерцают, слегка сносятся вбок.
 * Тот самый «кинематографический» слой, из-за которого кадр перестаёт быть пустым.
 */
export function Dust({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let motes: Mote[] = []

    const seed = () => {
      const count = Math.round(Math.min(90, (w * h) / 16000) * density)
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 1.7,
        a: 0.12 + Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.09,
        vy: -0.05 - Math.random() * 0.16,
        ph: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      const parent = canvas.parentElement
      w = parent?.clientWidth ?? window.innerWidth
      h = parent?.clientHeight ?? window.innerHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const m of motes) {
        m.x += m.vx
        m.y += m.vy
        if (m.y < -8) {
          m.y = h + 8
          m.x = Math.random() * w
        }
        if (m.x < -8) m.x = w + 8
        if (m.x > w + 8) m.x = -8
        // мерцание: каждая пылинка дышит в своём такте
        const twinkle = 0.55 + 0.45 * Math.sin(time / 900 + m.ph)
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,248,235,${m.a * twinkle})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
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
  }, [density])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] h-full w-full" />
}
