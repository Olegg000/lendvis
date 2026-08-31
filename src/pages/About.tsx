import { FinalCall, Reveal, SectionHead } from './Home'
import { useLang } from '../lib/i18n'

export default function About() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-36 pb-4 sm:px-8 sm:pt-44">
      <SectionHead level={1} title={t.about.title} accent={t.about.titleAccent} lead={t.about.lead} />

      <div className="max-w-[62ch] space-y-6">
        {t.about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
            <p className="text-body text-soft">{p}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-24 border-t border-line pt-14">
        <Reveal>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extralight tracking-[-0.03em]">{t.about.principles.title}</h2>
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {t.about.principles.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <h3 className="font-serif text-[22px] leading-snug font-light italic">{p.name}</h3>
              <p className="mt-4 text-[13.5px] leading-[1.6] text-soft">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <FinalCall />
    </section>
  )
}
