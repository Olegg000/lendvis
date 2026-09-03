import { FinalCall, Reveal, SectionHead } from '../sections/kit'
import { Cases } from '../sections/Cases'
import { WorkCard } from '../components/WorkCard'
import { useLang } from '../lib/i18n'
import { projects } from '../data'

export default function Work() {
  const { t, lang } = useLang()
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
      <SectionHead level={1} title={t.work.title} accent={t.work.titleAccent} lead={t.work.lead} />

      <Reveal>
        <p className="mb-14 font-mono text-micro text-faint uppercase">
          {lang === 'ru'
            ? 'Работали более чем над 20 проектами'
            : 'We have worked on more than 20 projects'}
        </p>
      </Reveal>

      <div className="space-y-24">
        {projects.map((p) => (
          <WorkCard key={p.n} project={p} headingLevel={2} />
        ))}
      </div>

      <div className="mt-28 border-t border-line pt-14">
        <Reveal>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extralight tracking-[-0.03em]">
            {lang === 'ru' ? 'Под' : 'Under'}
            <span className="font-serif text-[1.08em] font-light italic tracking-normal">&nbsp;NDA</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 mb-10 max-w-[62ch] text-body text-soft">
            {lang === 'ru'
              ? 'Клиентский код закрыт договорами, поэтому рассказываем задачами: что не работало, что мы сделали и чем всё закончилось.'
              : 'Commercial code is under contract, so these projects are told as problems and outcomes.'}
          </p>
        </Reveal>
        <Cases />
      </div>

      <FinalCall />
    </section>
  )
}
