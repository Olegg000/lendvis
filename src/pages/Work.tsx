import { FinalCall, Reveal, SectionHead } from './Home'
import { WorkCard } from '../components/WorkCard'
import { useLang } from '../lib/i18n'
import { projects } from '../data'

export default function Work() {
  const { t, lang } = useLang()
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-36 pb-4 sm:px-8 sm:pt-44">
      <SectionHead level={1} title={t.work.title} accent={t.work.titleAccent} lead={t.work.lead} />
      <Reveal>
        <p className="mb-14 font-mono text-micro text-faint uppercase">
          {projects.length} {lang === 'ru' ? 'проекта' : 'projects'} ·{' '}
          {projects.filter((p) => p.demo).length} {lang === 'ru' ? 'с живым демо' : 'with live demos'}
        </p>
      </Reveal>
      <div className="space-y-24">
        {projects.map((p, i) => (
          <WorkCard key={p.n} project={p} index={i} />
        ))}
      </div>

      <FinalCall />
    </section>
  )
}
