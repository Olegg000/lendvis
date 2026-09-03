import { FinalCall, Reveal, SectionHead } from '../sections/kit'
import { Cases } from '../sections/Cases'
import { WorkCard } from '../components/WorkCard'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { projects } from '../data'

export default function Work() {
  const { t, lang } = useLang()
  const { hash } = useLocation()

  // Переход с главной по клику на проект: доскроллить к его карточке.
  // Страница длинная, картинки ленивые и двигают вёрстку — поэтому доскролл
  // повторяем несколько раз, пока позиция карточки не устаканится.
  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let timer: number
    const settle = () => {
      const el = document.getElementById(id)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 16
        window.scrollTo({ top: y })
      }
      if (++tries < 8) timer = window.setTimeout(settle, 140)
    }
    timer = window.setTimeout(settle, 80)
    return () => window.clearTimeout(timer)
  }, [hash])
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
