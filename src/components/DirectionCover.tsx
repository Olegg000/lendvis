import { DirectionIcon } from './DirectionIcon'

/**
 * Обложка направления: тёмная фактура плюс крупный знак.
 *
 * Скриншот проекта здесь стоял зря — направление это категория, а не проект,
 * и доказывать ему нечего. Рисованный узор давал ритм, но не глубину.
 * Фактура даёт глубину, знак оставляет смысл: по одной картинке мобилки
 * от 1С не отличить.
 *
 * Снимки скачаны к себе, а не подгружаются с чужого хоста: сайт не должен
 * зависеть от стороннего CDN. Источник — Unsplash (лицензия разрешает
 * коммерческое использование без обязательной подписи), идентификаторы кадров:
 * 01 photo-1782402883417 · 02 photo-1642945538257 · 03 photo-1714924969684
 * 04 photo-1728853696418 · 05 photo-1571071956127 · 06 photo-1715153871357
 */

const BASE = import.meta.env.BASE_URL

/** Своя подцветка у каждого направления — чтобы шесть кадров не слиплись в один. */
const TINT: Record<string, string> = {
  '01': 'linear-gradient(155deg, rgba(150,175,215,0.22), rgba(5,5,7,0.72) 62%)',
  '02': 'linear-gradient(155deg, rgba(150,175,215,0.18), rgba(5,5,7,0.76) 60%)',
  '03': 'linear-gradient(155deg, rgba(216,179,132,0.20), rgba(5,5,7,0.74) 62%)',
  '04': 'linear-gradient(155deg, rgba(150,175,215,0.20), rgba(5,5,7,0.74) 60%)',
  '05': 'linear-gradient(155deg, rgba(216,179,132,0.16), rgba(5,5,7,0.76) 62%)',
  '06': 'linear-gradient(155deg, rgba(216,179,132,0.20), rgba(5,5,7,0.74) 60%)',
}

export function DirectionCover({ n }: { n: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0d11]">
      <img
        src={`${BASE}shots/covers/${n}.webp`}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
      />

      {/* Кадр уводим в палитру и притемняем, иначе знак на нём теряется */}
      <span aria-hidden="true" className="absolute inset-0" style={{ background: TINT[n] ?? TINT['01'] }} />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 78% 70% at 50% 46%, transparent 26%, rgba(8,9,12,0.72) 100%)' }}
      />

      <div className="relative flex h-full items-center justify-center">
        <DirectionIcon
          n={n}
          className="h-[58%] w-[58%] text-white/85 drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)] transition-all duration-[900ms] group-hover:scale-[1.05] group-hover:text-white"
        />
      </div>
    </div>
  )
}
