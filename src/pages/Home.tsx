import { Link } from 'react-router-dom'
import { Hero } from '../sections/Hero'
import { Showcase } from '../sections/Showcase'
import { Directions } from '../sections/Directions'
import { FinalCall, Reveal, SectionHead } from '../sections/kit'
import { ContactBlock } from '../sections/ContactBlock'
import { CountUp } from '../components/CountUp'
import { useLang } from '../lib/i18n'
import { metrics, projects } from '../data'

const wrap = 'mx-auto max-w-[1180px] px-5 sm:px-8'

/** Ссылка вглубь: главная только знакомит, подробности живут на своей странице. */
function More({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Reveal delay={0.1}>
      <Link
        to={to}
        className="mt-12 inline-block border-b border-white/30 pb-1 font-mono text-label text-soft uppercase transition-colors hover:border-white/70 hover:text-fg"
      >
        {children}
      </Link>
    </Reveal>
  )
}

/**
 * Главная — витрина, а не весь сайт: кратко обо всём, красиво и с записью на созвон.
 * Подробности про услуги, проекты и студию живут на отдельных страницах.
 */
export default function Home() {
  const { t, lang } = useLang()
  const shown = projects.slice(0, 3)

  return (
    <>
      <Hero />

      <section className={`${wrap} pt-28 pb-20 sm:pt-36 sm:pb-24`}>
        <SectionHead
          eyebrow={t.home.services.eyebrow}
          title={t.home.services.title}
          accent={t.home.services.titleAccent}
          lead={t.home.services.lead}
        />
        <Directions />
      </section>

      <section className={`${wrap} pb-20 sm:pb-24`}>
        <SectionHead
          eyebrow={t.home.work.eyebrow}
          title={t.home.work.title}
          accent={t.home.work.titleAccent}
          lead={t.home.work.lead}
        />
        <Showcase projects={shown} />
        <More to="/work">
          {t.home.work.more} · {projects.length}
        </More>
      </section>

      <section className={`${wrap} pb-20 sm:pb-24`}>
        <SectionHead
          eyebrow={t.home.numbers.eyebrow}
          title={t.home.numbers.title}
          accent={t.home.numbers.titleAccent}
          lead={t.home.numbers.lead}
        />
        <dl className="grid gap-x-10 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={Math.min(i * 0.07, 0.28)}>
              <dt className="font-serif text-[clamp(2.4rem,6vw,4rem)] leading-none font-light text-fg italic tabular-nums">
                <CountUp value={lang === 'ru' ? m.value : m.valueEn} />
              </dt>
              <dd className="mt-4 text-[14px] leading-snug text-soft">{lang === 'ru' ? m.label : m.labelEn}</dd>
              <dd className="mt-2 font-mono text-micro leading-relaxed text-faint">
                {lang === 'ru' ? m.sub : m.subEn}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Студия одним экраном: лид и сводка, остальное — на своей странице */}
      <section className={`${wrap} pb-20 sm:pb-24`}>
        <SectionHead title={t.about.title} accent={t.about.titleAccent} lead={t.about.lead} />
        <dl className="grid gap-x-10 gap-y-8 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {t.about.facts.map((f, i) => (
            <Reveal key={f.k} delay={Math.min(i * 0.06, 0.24)}>
              <dt className="font-mono text-micro text-faint uppercase">{f.k}</dt>
              <dd className="mt-2 text-[14.5px] leading-snug text-soft">{f.v}</dd>
            </Reveal>
          ))}
        </dl>
        <More to="/about">{t.nav.about}</More>
      </section>

      {/* Записаться можно не уходя с главной — это и есть её работа */}
      <section className={`${wrap} pb-20 sm:pb-24`}>
        <SectionHead title={t.contact.title} accent={t.contact.titleAccent} lead={t.contact.lead} />
        <ContactBlock />
      </section>

      <section className={`${wrap} pb-24`}>
        <FinalCall />
      </section>
    </>
  )
}
