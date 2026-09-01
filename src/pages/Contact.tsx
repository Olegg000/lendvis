import { SectionHead } from '../sections/kit'
import { ContactBlock } from '../sections/ContactBlock'
import { LightField } from '../components/Atmosphere'
import { Dust } from '../components/Dust'
import { useLang } from '../lib/i18n'

export default function Contact() {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[75vh]">
        <LightField intensity={0.75} />
        <Dust density={0.7} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
        <SectionHead level={1} title={t.contact.title} accent={t.contact.titleAccent} lead={t.contact.lead} />
        <ContactBlock />
      </div>
    </section>
  )
}
