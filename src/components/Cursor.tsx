import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

type Mode = { size: number; label: string }

const IDLE: Mode = { size: 12, label: '' }

/**
 * Свой курсор: кружок догоняет мышь, у ссылок раздувается,
 * а над проектами превращается в подпись «Смотреть».
 * Показываем только там, где есть настоящая мышь.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const pressRef = useRef(false)
  const [mode, setMode] = useState<Mode>(IDLE)
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const { pathname } = useLocation()

  // После перехода элемент под курсором исчезает, а mousemove не приходит,
  // пока мышь не шевельнётся — подпись залипала поверх новой страницы
  useEffect(() => setMode(IDLE), [pathname])

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || still) return
    setEnabled(true)

    const target = { x: innerWidth / 2, y: innerHeight / 2 }
    const pos = { ...target }
    let squeeze = 1
    let raf = 0

    const onMove = (e: MouseEvent) => {
      // над кадром демо родительское окно перестаёт получать движение — курсор бы замер
      if ((e.target as HTMLElement).tagName === 'IFRAME') {
        setVisible(false)
        return
      }
      target.x = e.clientX
      target.y = e.clientY
      setVisible(true)
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor],a,button')
      if (!el) return setMode(IDLE)
      const label = el.dataset.cursor
      if (label) return setMode({ size: 74, label })
      setMode({ size: 42, label: '' })
    }

    const loop = () => {
      // догоняем с отставанием — курсор «тянется» за мышью
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
      squeeze += ((pressRef.current ? 0.82 : 1) - squeeze) * 0.25
      if (dot.current)
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${squeeze})`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onLeave = () => setVisible(false)
    const onDown = () => {
      pressRef.current = true
    }
    const onUp = () => {
      pressRef.current = false
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden items-center justify-center rounded-full md:flex"
      style={{
        width: mode.size,
        height: mode.size,
        opacity: visible ? 1 : 0,
        background: mode.label ? 'var(--color-sand)' : 'transparent',
        border: mode.label ? 'none' : `1.5px solid ${mode.size > 20 ? 'var(--color-sand)' : 'rgba(255,255,255,0.75)'}`,
        transition: 'width .28s cubic-bezier(.2,.8,.2,1), height .28s cubic-bezier(.2,.8,.2,1), background .2s, border-color .2s, opacity .2s',
        mixBlendMode: mode.label ? 'normal' : 'difference',
      }}
    >
      {mode.label && (
        <span className="font-mono text-[9px] tracking-[0.14em] text-ground uppercase">{mode.label}</span>
      )}
    </div>
  )
}
