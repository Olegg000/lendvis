import { useMemo, useState } from 'react'
import { Reveal, SectionHead } from './Home'
import { LightField } from '../components/Atmosphere'
import { Dust } from '../components/Dust'
import { useLang } from '../lib/i18n'

const TG = 'nektoo1111'
const SLOTS = ['10:00', '12:00', '14:00', '16:00', '18:00']

const MAIL = 'olegkovalik2013@yandex.ru'

/** Письмо уходит с темой и каркасом вопросов — иначе почтовый путь хуже телеграма. */
function channelsFor(lang: 'ru' | 'en') {
  const subject = lang === 'ru' ? 'Проект для Лендвис' : 'Project for Lendvis'
  const body =
    lang === 'ru'
      ? 'Что есть сейчас:\n\nЧто должно быть вместо этого:\n\nК какому сроку:\n'
      : 'What we have now:\n\nWhat should be there instead:\n\nBy when:\n'
  return [
    { key: 'telegram', value: '@' + TG, href: 'https://t.me/' + TG },
    {
      key: 'email',
      value: MAIL,
      href: `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    },
    { key: 'github', value: 'github.com/Olegg000', href: 'https://github.com/Olegg000' },
  ] as const
}

/** Ближайшие рабочие дни — выходные под созвон не предлагаем. */
function workdays(count: number) {
  const out: Date[] = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  while (out.length < count) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d))
  }
  return out
}

export default function Contact() {
  const { t, lang } = useLang()
  const b = t.contact.booking
  const days = useMemo(() => workdays(6), [])
  const [day, setDay] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)

  const locale = lang === 'ru' ? 'ru-RU' : 'en-GB'
  const dayLabel = (d: Date) => ({
    weekday: d.toLocaleDateString(locale, { weekday: 'short' }),
    date: d.toLocaleDateString(locale, { day: 'numeric', month: 'short' }),
  })

  const ready = day && time
  const link = ready
    ? `https://t.me/${TG}?text=${encodeURIComponent(
        `${b.message} ${day.toLocaleDateString(locale, { day: 'numeric', month: 'long' })}, ${time} (UTC+4)?`,
      )}`
    : `https://t.me/${TG}`

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[75vh]">
        <LightField intensity={0.75} />
        <Dust density={0.7} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
        <SectionHead level={1} title={t.contact.title} accent={t.contact.titleAccent} lead={t.contact.lead} />

        <div className="mt-6">
          <Reveal>
            <p className="font-mono text-micro text-faint uppercase">{t.contact.channels}</p>
          </Reveal>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {channelsFor(lang).map((c, i) => (
              <Reveal key={c.key} delay={i * 0.06}>
                <a
                  href={c.href}
                  data-cursor={t.contact.fields[c.key]}
                  className="group flex flex-col gap-2 rounded-xl border border-line px-5 py-4 transition-colors hover:border-white/35 hover:bg-white/[0.03]"
                >
                  <span className="font-mono text-micro text-faint uppercase">
                    {t.contact.fields[c.key]}
                  </span>
                  <span className="text-[13.5px] text-soft transition-colors group-hover:text-fg">
                    {c.value}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Запись на созвон: выбор дня и слота собирает готовое сообщение */}
        <Reveal>
          <div className="mt-16 rounded-2xl border border-line bg-white/[0.02] p-6 backdrop-blur-sm sm:p-9">
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extralight tracking-[-0.03em]">{b.title}</h2>
            <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-soft">{b.lead}</p>

            <p id="pick-day" className="mt-8 font-mono text-micro text-faint uppercase">{b.pickDay}</p>
            <div role="group" aria-labelledby="pick-day" className="mt-3 flex flex-wrap gap-2">
              {days.map((d) => {
                const l = dayLabel(d)
                const active = day?.toDateString() === d.toDateString()
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    onClick={() => setDay(d)}
                    aria-pressed={active}
                    className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                      active ? 'border-white/70 bg-white/10' : 'border-line hover:border-white/35'
                    }`}
                  >
                    <span className="block font-mono text-[9.5px] tracking-[0.14em] text-faint uppercase">
                      {l.weekday}
                    </span>
                    <span className="mt-1 block text-[14px] font-light">{l.date}</span>
                  </button>
                )
              })}
            </div>

            <p id="pick-time" className="mt-7 font-mono text-micro text-faint uppercase">{b.pickTime}</p>
            <div role="group" aria-labelledby="pick-time" className="mt-3 flex flex-wrap gap-2">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTime(s)}
                  aria-pressed={time === s}
                  className={`rounded-full border px-5 py-2.5 font-mono text-[12px] transition-colors ${
                    time === s ? 'border-white/70 bg-white/10 text-fg' : 'border-line text-soft hover:border-white/35'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={ready ? link : undefined}
                data-cursor="telegram"
                aria-disabled={!ready}
                className={`inline-flex rounded-full px-7 py-3.5 font-mono text-label uppercase transition-[background-color,border-color] duration-300 ${
                  ready
                    ? 'border border-white bg-white text-ground hover:border-white/85 hover:bg-white/85'
                    : 'pointer-events-none border border-line text-white/25'
                }`}
              >
                {b.confirm}
              </a>
              <span className="font-mono text-[11px] text-faint">
                {ready
                  ? `${b.chosen}: ${day.toLocaleDateString(locale, { day: 'numeric', month: 'long' })}, ${time}`
                  : b.tz}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 border-t border-line pt-12">
          <Reveal>
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extralight tracking-[-0.03em]">
              {t.contact.next.title}
            </h2>
          </Reveal>
          <ol className="mt-8 space-y-5">
            {t.contact.next.items.map((item, i) => (
              <Reveal key={item} delay={Math.min(i * 0.07, 0.24)}>
                <li className="grid max-w-[64ch] grid-cols-[40px_1fr] gap-x-4">
                  <span className="font-mono text-micro text-faint tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[14.5px] leading-[1.65] text-soft">{item}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.24}>
            <p className="mt-10 max-w-[54ch] text-[13.5px] leading-relaxed text-faint">{t.contact.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
