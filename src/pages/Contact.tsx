import { Reveal, SectionHead } from './Home'
import { LightField } from '../components/Atmosphere'
import { useLang } from '../lib/i18n'

const links = [
  { key: 'telegram', value: '@nektoo1111', href: 'https://t.me/nektoo1111' },
  { key: 'email', value: 'olegkovalik2013@yandex.ru', href: 'mailto:olegkovalik2013@yandex.ru' },
  { key: 'github', value: 'github.com/Olegg000', href: 'https://github.com/Olegg000' },
  { key: 'kwork', value: 'olegworking55', href: 'https://kwork.ru/user/olegworking55' },
] as const

export default function Contact() {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]">
        <LightField intensity={0.7} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
        <SectionHead title={t.contact.title} accent={t.contact.titleAccent} lead={t.contact.lead} />

        <dl className="mt-4 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <Reveal key={l.key} delay={i * 0.06}>
              <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">{t.contact.fields[l.key]}</dt>
              <dd className="mt-2">
                <a
                  href={l.href}
                  className="text-[15px] break-words transition-colors hover:text-sand"
                  data-cursor={t.nav.cta}
                >
                  {l.value}
                </a>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.24}>
          <p className="mt-16 max-w-[54ch] border-t border-line pt-8 text-[14px] leading-relaxed text-faint">
            {t.contact.note}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
