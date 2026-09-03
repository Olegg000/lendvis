import { DirectionIcon } from '../components/DirectionIcon'
import { Reveal } from './kit'
import { useLang } from '../lib/i18n'

/**
 * Блоки страницы услуг, вынесенные отдельно: главная собирает их у себя,
 * страница /services — те же самые, без второй копии разметки.
 */

/** Шесть направлений в подробностях: чем занимаемся и на чём. */
export function ServiceList() {
  const { t } = useLang()
  return (
    <>
      {t.services.items.map((s, i) => (
        <Reveal key={s.number} delay={Math.min(i * 0.05, 0.2)}>
          <article className="grid gap-x-10 gap-y-5 border-t border-line py-12 md:grid-cols-[84px_1fr]">
            <DirectionIcon n={s.number} className="h-14 w-14 text-soft md:h-[72px] md:w-[72px]" />

            {/* Всё в один поток: название, краткое описание, описание, пункты */}
            <div>
              <h2 className="text-[clamp(1.3rem,2.6vw,1.7rem)] leading-tight font-light tracking-[-0.02em]">
                {s.name}
              </h2>
              <p className="mt-3 font-serif text-[19px] leading-snug font-light text-soft italic">{s.tagline}</p>
              <p className="mt-6 max-w-[64ch] text-body text-soft">{s.text}</p>
              <ul className="mt-5 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[13.5px] leading-[1.6] text-soft">
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-white/30" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      ))}
    </>
  )
}

/** Как устроена работа: четыре шага от разговора до поддержки. */
export function Process() {
  const { t } = useLang()
  return (
    <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
      {t.services.process.steps.map((step, i) => (
        <Reveal key={step.n} delay={Math.min(i * 0.06, 0.24)}>
          <div className="grid grid-cols-[44px_1fr] gap-x-5">
            <span className="font-mono text-micro text-faint">{step.n}</span>
            <div>
              <h3 className="text-[17px] font-light">{step.name}</h3>
              <p className="mt-2 max-w-[46ch] text-[13.5px] leading-[1.6] text-soft">{step.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** Когда студия не нужна: список задач, за которые честнее не браться. */
export function Limits() {
  const { t } = useLang()
  return (
    <ul className="space-y-3">
      {t.services.limits.items.map((item, i) => (
        <Reveal key={item} delay={Math.min(i * 0.06, 0.2)}>
          <li className="flex max-w-[68ch] gap-3 text-[14.5px] leading-[1.65] text-soft">
            <span className="mt-[11px] h-px w-3 shrink-0 bg-white/30" />
            {item}
          </li>
        </Reveal>
      ))}
    </ul>
  )
}
