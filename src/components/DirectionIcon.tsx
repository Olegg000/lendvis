/**
 * Крупные иконки направлений. Рисованные, а не из набора: тонкая линия,
 * одна геометрия на все шесть — чтобы читались как одна семья, а не как чужие значки.
 */
export function DirectionIcon({ n, className = '' }: { n: string; className?: string }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.1,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className,
  }

  switch (n) {
    // Сайты и веб-сервисы — окно браузера
    case '01':
      return (
        <svg {...common}>
          <rect x="4" y="8" width="40" height="32" rx="3" />
          <path d="M4 17h40" />
          <circle cx="9.5" cy="12.5" r="1.1" />
          <circle cx="14" cy="12.5" r="1.1" />
          <circle cx="18.5" cy="12.5" r="1.1" />
          <path d="M11 24h13M11 30h9M31 22.5l4.5 4.5L31 31.5" opacity="0.65" />
        </svg>
      )
    // Мобильные приложения — два экрана рядом
    case '02':
      return (
        <svg {...common}>
          <rect x="9" y="5" width="20" height="38" rx="3.5" />
          <path d="M16.5 9h5" />
          <rect x="32" y="14" width="10" height="24" rx="2.5" opacity="0.55" />
          <path d="M14 20h10M14 26h7" opacity="0.65" />
          <circle cx="19" cy="37.5" r="1.3" />
        </svg>
      )
    // Блокчейн — сцепленные звенья
    case '03':
      return (
        <svg {...common}>
          <path d="M24 6l13 7.5v15L24 36l-13-7.5v-15z" />
          <path d="M24 21L11 13.5M24 21l13-7.5M24 21v15" opacity="0.55" />
          <circle cx="24" cy="21" r="1.3" opacity="0.85" />
        </svg>
      )
    // Бекенды — стопка узлов
    case '04':
      return (
        <svg {...common}>
          <rect x="7" y="8" width="34" height="9" rx="2" />
          <rect x="7" y="19.5" width="34" height="9" rx="2" />
          <rect x="7" y="31" width="34" height="9" rx="2" />
          <circle cx="13" cy="12.5" r="1.2" />
          <circle cx="13" cy="24" r="1.2" />
          <circle cx="13" cy="35.5" r="1.2" />
          <path d="M31 12.5h5M31 24h5M31 35.5h5" opacity="0.55" />
        </svg>
      )
    // Поддержка и багфиксы — лупа над сбитой строкой
    case '05':
      return (
        <svg {...common}>
          <path d="M5 34h11M32 34h11" opacity="0.5" />
          <path d="M16 34l4-7 4 14 4-7" opacity="0.85" />
          <circle cx="27" cy="17" r="10" />
          <path d="M34.5 24.5L42 32" />
          <path d="M23 17h8M27 13v8" opacity="0.5" />
        </svg>
      )
    // 1С — таблица с итоговой строкой
    default:
      return (
        <svg {...common}>
          <rect x="7" y="6" width="34" height="36" rx="3" />
          <path d="M7 15h34M7 24h34M7 33h34" opacity="0.55" />
          <path d="M19 15v27M31 15v27" opacity="0.35" />
          <path d="M12 10.5h8" opacity="0.7" />
          <path d="M23.5 37.5h13" opacity="0.9" />
        </svg>
      )
  }
}
