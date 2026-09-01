/**
 * Значки каналов связи. Телеграм и почта нарисованы линией той же толщины,
 * что иконки направлений, — чтобы значки на сайте читались одной семьёй.
 * Знак GitHub оставлен фирменной формой: у логотипа узнаваемость важнее единообразия.
 */
export function ContactIcon({ kind, className = '' }: { kind: 'telegram' | 'mail' | 'github'; className?: string }) {
  if (kind === 'github') {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M8 .2a8 8 0 0 0-2.53 15.6c.4.07.55-.17.55-.38l-.01-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.88.5-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 8 .2Z" />
      </svg>
    )
  }
  const line = {
    viewBox: '0 0 20 20',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.3,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className,
  }
  if (kind === 'telegram') {
    return (
      <svg {...line}>
        <path d="M18 3.2 2.4 9.3c-.7.3-.7.8.1 1l4 1.2 1.5 4.4c.2.5.6.6 1 .2l2.2-2 4.1 3c.5.4.9.2 1-.4L18.9 4c.1-.7-.3-1-.9-.8Z" />
        <path d="m6.5 11.5 8.7-5.6-6.6 6.5" opacity="0.6" />
      </svg>
    )
  }
  return (
    <svg {...line}>
      <rect x="2.2" y="4.4" width="15.6" height="11.2" rx="2" />
      <path d="m2.8 5.4 7.2 5.2 7.2-5.2" />
    </svg>
  )
}
