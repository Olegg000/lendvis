import { Reveal } from './kit'
import { useLang } from '../lib/i18n'

/** Рассказ о студии со сводкой справа: главная и /about берут один и тот же блок. */
export function StudioStory() {
  const { t } = useLang()
  return (
    <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_260px]">
      <div className="max-w-[62ch] space-y-6">
        {t.about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
            <p className="text-body text-soft">{p}</p>
          </Reveal>
        ))}
      </div>

      {/* Правая половина экрана пустовала на четыре абзаца — здесь то, что клиент сканирует первым */}
      <Reveal delay={0.1}>
        <dl className="lg:sticky lg:top-28">
          {t.about.facts.map((f) => (
            <div
              key={f.k}
              className="border-t border-line py-4 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-4"
            >
              <dt className="font-mono text-micro text-faint uppercase">{f.k}</dt>
              <dd className="mt-1.5 text-[14px] leading-snug text-soft">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  )
}

/** На чём стоим: три принципа работы. */
export function Principles() {
  const { t } = useLang()
  return (
    <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
      {t.about.principles.items.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.07}>
          <h3 className="font-serif text-[22px] leading-snug font-light italic">{p.name}</h3>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-soft">{p.text}</p>
        </Reveal>
      ))}
    </div>
  )
}
