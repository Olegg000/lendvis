import { FinalCall, Reveal, SectionHead } from './Home'
import { WorkCard } from '../components/WorkCard'
import { Cases } from '../sections/Cases'
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
            ? `Проектов: ${projects.length} · с живым демо: ${projects.filter((p) => p.demo).length}`
            : `${projects.length} projects · ${projects.filter((p) => p.demo).length} with live demos`}
        </p>
      </Reveal>
      <div className="space-y-24">
        {projects.map((p, i) => (
          <WorkCard key={p.n} project={p} index={i} headingLevel={2} />
        ))}
      </div>

      <div className="mt-24 border-t border-line pt-14">
        <Reveal>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extralight tracking-[-0.03em]">
            {lang === 'ru' ? 'Под' : 'Under'}
            <span className="font-serif text-[1.08em] font-light italic tracking-normal">&nbsp;NDA</span>
          </h2>
        </Reveal>
        <p className="mt-5 mb-8 max-w-[58ch] text-[14px] leading-relaxed text-faint">
          {lang === 'ru'
            ? 'Коммерческий код закрыт договорами, поэтому эти проекты рассказываем задачами и результатами.'
            : 'Commercial code is under contract, so these projects are told as problems and outcomes.'}
        </p>
        <Cases />
      </div>

      <FinalCall />
    </section>
  )
}
