import { Reveal } from '../pages/Home'
import { useLang } from '../lib/i18n'
import { cases } from '../data'

/** Коммерческие проекты под NDA: показываем задачей и результатом, без кода и имён. */
export function Cases() {
  const { lang } = useLang()
  return (
    <div>
      {cases.map((c, i) => (
        <Reveal key={c.name} delay={Math.min(i * 0.07, 0.24)}>
          <article className="grid gap-x-12 gap-y-4 border-t border-line py-10 md:grid-cols-[210px_1fr]">
            <div>
              <h3 className="text-[18px] font-light">{lang === 'ru' ? c.name : c.nameEn}</h3>
              <p className="mt-1.5 font-mono text-micro text-faint uppercase">{lang === 'ru' ? c.kind : c.kindEn}</p>
            </div>
            <p className="max-w-[62ch] text-body text-soft">{lang === 'ru' ? c.text : c.textEn}</p>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
