import { DirectionIcon } from './DirectionIcon'

/**
 * Обложка направления. Раньше в карточке стоял скриншот проекта — но направление
 * это категория, а не проект: скриншот там ничего не доказывал, просто мутнел.
 * Здесь вместо него рисованное поле: свой узор, своё свечение и крупная иконка.
 */

type Look = { tint: string; glow: string; pattern: (id: string) => React.ReactNode }

const cold = 'rgba(150,175,215'
const warm = 'rgba(216,179,132'

const LOOKS: Record<string, Look> = {
  // Веб — сетка макета
  '01': {
    tint: `${cold},0.16)`,
    glow: '28% 26%',
    pattern: (id) => (
      <>
        <defs>
          <pattern id={id} width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0v26" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.5" />
      </>
    ),
  },
  // Мобильные — вертикальные дорожки экранов
  '02': {
    tint: `${cold},0.14)`,
    glow: '70% 30%',
    pattern: (id) => (
      <>
        <defs>
          <pattern id={id} width="34" height="34" patternUnits="userSpaceOnUse">
            <rect x="6" y="0" width="22" height="34" fill="none" stroke="currentColor" strokeWidth="0.5" rx="6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.45" />
      </>
    ),
  },
  // Блокчейн — решётка из ромбов
  '03': {
    tint: `${warm},0.13)`,
    glow: '50% 28%',
    pattern: (id) => (
      <>
        <defs>
          <pattern id={id} width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M15 0L30 15L15 30L0 15Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.5" />
      </>
    ),
  },
  // Бекенды — горизонтальные слои
  '04': {
    tint: `${cold},0.13)`,
    glow: '30% 70%',
    pattern: (id) => (
      <>
        <defs>
          <pattern id={id} width="8" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 13.5h8" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.55" />
      </>
    ),
  },
  // Поддержка — сбитый ритм: линии рвутся
  '05': {
    tint: `${warm},0.12)`,
    glow: '68% 62%',
    pattern: (id) => (
      <>
        <defs>
          <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M0 11h7M13 11h9" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.5" />
      </>
    ),
  },
  // 1С — табличная клетка
  '06': {
    tint: `${warm},0.11)`,
    glow: '35% 35%',
    pattern: (id) => (
      <>
        <defs>
          <pattern id={id} width="40" height="18" patternUnits="userSpaceOnUse">
            <path d="M0 17.5h40M39.5 0v18" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.5" />
      </>
    ),
  },
}

export function DirectionCover({ n }: { n: string }) {
  const look = LOOKS[n] ?? LOOKS['01']
  const id = `dir-pattern-${n}`

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0d11]">
      {/* Узор — свой у каждого направления, чтобы шесть обложек не были одной картинкой */}
      <svg className="absolute inset-0 h-full w-full text-white/[0.16]" aria-hidden="true">
        {look.pattern(id)}
      </svg>

      {/* Свечение уводит узор в глубину и задаёт направлению свой цвет */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 62% 58% at ${look.glow}, ${look.tint}, transparent 72%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 85% 75% at 50% 45%, transparent 30%, rgba(11,13,17,0.85) 100%)' }}
      />

      <div className="relative flex h-full items-center justify-center">
        <DirectionIcon
          n={n}
          className="h-[38%] w-[38%] text-white/70 transition-all duration-[900ms] group-hover:scale-[1.06] group-hover:text-white/90"
        />
      </div>
    </div>
  )
}
