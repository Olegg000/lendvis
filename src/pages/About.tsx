import { FinalCall, Reveal, SectionHead } from '../sections/kit'
import { Principles, StudioStory } from '../sections/Studio'
import { useLang } from '../lib/i18n'

export default function About() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
      <SectionHead level={1} title={t.about.title} accent={t.about.titleAccent} lead={t.about.lead} />
      <StudioStory />

      <div className="mt-24 border-t border-line pt-14">
        <Reveal>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extralight tracking-[-0.03em]">
            {t.about.principles.title}
          </h2>
        </Reveal>
        <div className="mt-10">
          <Principles />
        </div>
      </div>

      <FinalCall />
    </section>
  )
}
