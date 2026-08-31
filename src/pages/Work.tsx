import { Reveal, SectionHead } from './Home'
import { WorkCard } from '../components/WorkCard'
import { useLang } from '../lib/i18n'
import { projects } from '../data'

export default function Work() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
      <SectionHead title={t.work.title} accent={t.work.titleAccent} lead={t.work.lead} />
      <Reveal>
        <p className="mb-14 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
          {projects.filter((p) => p.demo).length} / {projects.length} — {t.work.filters.all}
        </p>
      </Reveal>
      {projects.map((p, i) => (
        <WorkCard key={p.n} project={p} index={i} />
      ))}
    </section>
  )
}
