import { Link } from 'react-router-dom'
import { Reveal, SectionHead } from './Home'
import { useLang } from '../lib/i18n'

export default function Services() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
      <SectionHead title={t.services.title} accent={t.services.titleAccent} lead={t.services.lead} />

      {t.services.items.map((s, i) => (
        <Reveal key={s.number} delay={Math.min(i * 0.05, 0.2)}>
          <article className="grid gap-x-10 gap-y-5 border-t border-line py-12 md:grid-cols-[52px_1fr_1fr]">
            <span className="font-mono text-[11px] text-faint">{s.number}</span>

            <div>
              <h2 className="text-[clamp(1.3rem,2.6vw,1.7rem)] leading-tight font-light tracking-[-0.02em]">
                {s.name}
              </h2>
              <p className="mt-3 font-serif text-[19px] leading-snug font-light text-soft italic">{s.tagline}</p>
            </div>

            <div>
              <p className="text-[14.5px] leading-relaxed text-soft">{s.text}</p>
              <ul className="mt-5 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[14px] text-soft">
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-white/30" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-[11px] leading-relaxed text-faint">{s.stack}</p>
            </div>
          </article>
        </Reveal>
      ))}

      <Reveal delay={0.1}>
        <Link
          to="/contact"
          className="mt-14 inline-flex rounded-full border border-white/28 px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:border-white/60 hover:bg-white/[0.06]"
        >
          {t.nav.cta}
        </Link>
      </Reveal>
    </section>
  )
}
