import { Link } from 'react-router-dom'
import { Hero } from '../sections/Hero'
import { Showcase } from '../sections/Showcase'
import { Directions } from '../sections/Directions'
import { FinalCall, Reveal, SectionHead } from '../sections/kit'
import { Numbers } from '../sections/Numbers'
import { ScrollLit } from '../components/ScrollLit'
import { useLang } from '../lib/i18n'
import { projects } from '../data'

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
  const { t } = useLang()
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
        <Numbers />
      </section>

      {/* Студия одним экраном: лид и сводка, остальное — на своей странице */}
      <section className={`${wrap} pb-20 sm:pb-24`}>
        <Reveal>
          <p className="eyebrow mb-8">
            {t.about.title} {t.about.titleAccent}
          </p>
        </Reveal>
        {/* Крупное утверждение, которое разгорается по мере прокрутки — вместо сетки подписей */}
        <ScrollLit
          text={t.about.lead}
          className="max-w-[24ch] text-[clamp(1.9rem,5vw,3.6rem)] leading-[1.12] font-extralight tracking-[-0.035em] text-fg"
        />
        <dl className="mt-16 flex flex-wrap gap-x-14 gap-y-6 border-t border-line pt-8">
          {t.about.facts.map((f) => (
            <div key={f.k}>
              <dt className="font-mono text-micro text-faint uppercase">{f.k}</dt>
              <dd className="mt-1.5 text-[13.5px] leading-snug text-soft">{f.v}</dd>
            </div>
          ))}
        </dl>
        <More to="/about">{t.nav.about}</More>
      </section>

      <section className={`${wrap} pb-24`}>
        <FinalCall />
      </section>
    </>
  )
}
