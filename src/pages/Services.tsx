import { FinalCall, Reveal, SectionHead } from '../sections/kit'
import { Limits, Process, ServiceList } from '../sections/Offer'
import { useLang } from '../lib/i18n'

export default function Services() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
      <SectionHead level={1} title={t.services.title} accent={t.services.titleAccent} lead={t.services.lead} />
      <ServiceList />

      <div className="mt-24 border-t border-line pt-14">
        <Reveal>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extralight tracking-[-0.03em]">
            {t.services.process.title}
            <span className="font-serif text-[1.08em] font-light italic tracking-normal">
              &nbsp;{t.services.process.titleAccent}
            </span>
          </h2>
        </Reveal>
        <div className="mt-10">
          <Process />
        </div>
      </div>

      <div className="mt-24 border-t border-line pt-14">
        <Reveal>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extralight tracking-[-0.03em]">
            {t.services.limits.title}
            <span className="font-serif text-[1.08em] font-light italic tracking-normal">
              &nbsp;{t.services.limits.titleAccent}
            </span>
          </h2>
        </Reveal>
        <div className="mt-8">
          <Limits />
        </div>
      </div>

      <FinalCall />
    </section>
  )
}
