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
/* Разделы идут плотно: воздух между ними Олег просил убрать. */
const gap = 'pb-14 sm:pb-20'

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

      {/* Второй экран — кто это делает. Подробности живут на своей странице. */}
      <section className={`${wrap} pt-24 ${gap} sm:pt-28`}>
        <h2 className="sr-only">
          {t.about.title} {t.about.titleAccent}
        </h2>
        <ScrollLit
          text={t.about.lead}
          className="max-w-[24ch] text-[clamp(1.9rem,5vw,3.6rem)] leading-[1.12] font-extralight tracking-[-0.035em] text-fg"
        />
        <More to="/about">{t.nav.about}</More>
      </section>

      <section className={`${wrap} ${gap}`}>
        <SectionHead
          title={t.home.services.title}
          accent={t.home.services.titleAccent}
          lead={t.home.services.lead}
        />
        <Directions />
      </section>

      {/* Витрина стоит на настоящем кадре: работы плывут поверх сцены, а не поверх пустоты */}
      <section className={`relative ${gap} pt-16 sm:pt-20`}>
        <img
          src={`${import.meta.env.BASE_URL}shots/final-bg.webp`}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'grayscale(0.55) brightness(0.52) contrast(1.06)' }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, var(--color-ground) 0%, rgba(5,5,7,0.58) 20%, rgba(5,5,7,0.58) 78%, var(--color-ground) 100%)',
          }}
        />
        <div className={`relative ${wrap}`}>
          <SectionHead title={t.home.work.title} accent={t.home.work.titleAccent} lead={t.home.work.lead} />
          <Showcase projects={shown} />
          <More to="/work">
            {t.home.work.more} · {projects.length}
          </More>
        </div>
      </section>

      <section className={`${wrap} ${gap}`}>
        <SectionHead
          title={t.home.numbers.title}
          accent={t.home.numbers.titleAccent}
          lead={t.home.numbers.lead}
        />
        <Numbers />
      </section>

      <section className={`${wrap} pb-4`}>
        <FinalCall />
      </section>
    </>
  )
}
