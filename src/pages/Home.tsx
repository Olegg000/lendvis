import { Hero } from '../sections/Hero'
import { Showcase } from '../sections/Showcase'
import { Directions } from '../sections/Directions'
import { Cases } from '../sections/Cases'
import { Limits, Process, ServiceList } from '../sections/Offer'
import { Principles, StudioStory } from '../sections/Studio'
import { ContactBlock } from '../sections/ContactBlock'
import { FinalCall, Reveal, SectionHead } from '../sections/kit'
import { CountUp } from '../components/CountUp'
import { useLang } from '../lib/i18n'
import { metrics, projects } from '../data'

/** Разделы главной. Маршруты вида /services приводят сюда же и доводят до нужного якоря. */
export const SECTIONS = ['services', 'work', 'about', 'contact'] as const

const wrap = 'mx-auto max-w-[1180px] px-5 sm:px-8'

/** Подзаголовок внутри раздела: тот же приём, что у заголовков, но тише. */
function SubHead({ title, accent }: { title: string; accent?: string }) {
  return (
    <Reveal>
      <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extralight tracking-[-0.03em]">
        {title}
        {accent && (
          <span className="font-serif text-[1.08em] font-light italic tracking-normal">&nbsp;{accent}</span>
        )}
      </h2>
    </Reveal>
  )
}

export default function Home() {
  const { t, lang } = useLang()

  return (
    <>
      <Hero />

      {/* ── Направления: сперва кадрами, следом подробно ── */}
      <section id="sec-services" className={`${wrap} scroll-mt-24 pt-28 pb-20 sm:pt-36 sm:pb-24`}>
        <SectionHead
          eyebrow={t.home.services.eyebrow}
          title={t.home.services.title}
          accent={t.home.services.titleAccent}
          lead={t.home.services.lead}
        />
        <Directions />
        <div className="mt-20">
          <ServiceList />
        </div>

        <div className="mt-24 border-t border-line pt-14">
          <SubHead title={t.services.process.title} accent={t.services.process.titleAccent} />
          <div className="mt-10">
            <Process />
          </div>
        </div>
      </section>

      {/* ── Витрина: все проекты целиком, без «смотрите на другой странице» ── */}
      <section id="sec-work" className={`${wrap} scroll-mt-24 pb-20 sm:pb-24`}>
        <SectionHead
          eyebrow={t.home.work.eyebrow}
          title={t.home.work.title}
          accent={t.home.work.titleAccent}
          lead={t.home.work.lead}
        />
        <Showcase projects={projects} />
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

      <section className={`${wrap} pb-20 sm:pb-24`}>
        <SectionHead
          eyebrow={t.home.cases.eyebrow}
          title={t.home.cases.title}
          accent={t.home.cases.titleAccent}
          lead={t.home.cases.lead}
        />
        <Cases />
      </section>

      {/* ── Студия ── */}
      <section id="sec-about" className={`${wrap} scroll-mt-24 pb-20 sm:pb-24`}>
        <SectionHead title={t.about.title} accent={t.about.titleAccent} lead={t.about.lead} />
        <StudioStory />

        <div className="mt-24 border-t border-line pt-14">
          <SubHead title={t.about.principles.title} />
          <div className="mt-10">
            <Principles />
          </div>
        </div>

        <div className="mt-24 border-t border-line pt-14">
          <SubHead title={t.services.limits.title} accent={t.services.limits.titleAccent} />
          <div className="mt-8">
            <Limits />
          </div>
        </div>
      </section>

      {/* ── Связь ── */}
      <section id="sec-contact" className={`${wrap} scroll-mt-24 pb-20 sm:pb-24`}>
        <SectionHead title={t.contact.title} accent={t.contact.titleAccent} lead={t.contact.lead} />
        <ContactBlock />
      </section>

      <section className={`${wrap} pb-24`}>
        <FinalCall />
      </section>
    </>
  )
}
