import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { FadeIn, Magnet, RevealText } from './lib/motion'
import { Marquee } from './components/Marquee'
import { Projects } from './components/Projects'
import { cases, metrics, services } from './data'

const nav = [
  { href: '#services', label: 'Услуги' },
  { href: '#work', label: 'Проекты' },
  { href: '#cases', label: 'Кейсы' },
  { href: '#contact', label: 'Контакты' },
]

export default function App() {
  return (
    <div className="min-h-screen bg-ground">
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Numbers />
      <Cases />
      <Contact />
      <Footer />
    </div>
  )
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-full border border-hair bg-panel/85 px-2 py-2 backdrop-blur-md sm:gap-2">
        <span className="px-3 font-display text-sm font-bold tracking-tight sm:text-base">
          ЛЕНД<span className="text-gold">ВИС</span>
        </span>
        <span className="mx-1 hidden h-5 w-px bg-hair sm:block" />
        {nav.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="hidden rounded-full px-3 py-1.5 font-mono text-xs tracking-[0.1em] text-muted uppercase transition hover:bg-raised hover:text-fg sm:block"
          >
            {n.label}
          </a>
        ))}
        <a
          href="#contact"
          className="rounded-full bg-gold px-4 py-1.5 font-mono text-xs tracking-[0.1em] text-ground uppercase transition hover:brightness-110"
        >
          Обсудить
        </a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center px-5 pt-28 pb-16 sm:px-8 md:px-12">
      <div className="pointer-events-none absolute top-[-18%] left-1/2 -z-10 h-[560px] w-[860px] max-w-[100vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(242,180,65,0.13),transparent_66%)] blur-2xl" />

      <FadeIn delay={0.05} y={-14}>
        <p className="font-mono text-[11px] tracking-[0.22em] text-gold uppercase sm:text-xs">
          Студия разработки · Самара · удалённо
        </p>
      </FadeIn>

      <FadeIn delay={0.12} y={38}>
        <h1 className="steel mt-6 font-display text-[13vw] leading-[0.92] font-black tracking-[-0.04em] sm:text-[11vw] lg:text-[9.2vw]">
          Пишем то,
          <br />
          что <span className="font-serif italic font-medium tracking-normal">работает</span>
          <br />в проде
        </h1>
      </FadeIn>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
        <FadeIn delay={0.3} y={20}>
          <p className="max-w-[34ch] text-base leading-snug text-muted sm:text-lg">
            Сайты, мобильные приложения, блокчейн и бекенды — от архитектуры до боевого сервера. Плюс поддержка и
            спасение чужого кода.
          </p>
        </FadeIn>

        <FadeIn delay={0.42} y={20}>
          <div className="flex flex-wrap gap-3">
            <Magnet>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-mono text-xs tracking-[0.14em] text-ground uppercase transition hover:brightness-110 sm:text-sm"
              >
                Смотреть проекты <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>
            </Magnet>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-hair px-7 py-4 font-mono text-xs tracking-[0.14em] text-fg uppercase transition hover:bg-raised sm:text-sm"
            >
              Обсудить задачу
            </a>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.7} className="mt-14 flex items-center gap-3 text-faint">
        <ArrowDown size={14} />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Прокрутите</span>
      </FadeIn>
    </section>
  )
}

function SectionHead({ label, title, accent }: { label: string; title: string; accent?: string }) {
  return (
    <>
      <FadeIn>
        <p className="font-mono text-[11px] tracking-[0.22em] text-gold uppercase">{label}</p>
      </FadeIn>
      <FadeIn delay={0.08}>
        <h2 className="steel mt-4 font-display text-[10vw] leading-[0.95] font-black tracking-[-0.03em] sm:text-6xl lg:text-7xl">
          {title}
          {accent && <span className="font-serif italic font-medium tracking-normal"> {accent}</span>}
        </h2>
      </FadeIn>
    </>
  )
}

function Services() {
  return (
    <section id="services" className="px-5 py-20 sm:px-8 sm:py-28 md:px-12">
      <SectionHead label="Направления" title="Что" accent="делаем" />
      <div className="mt-14">
        {services.map((s, i) => (
          <FadeIn key={s.n} delay={i * 0.06}>
            <div className="rule grid grid-cols-1 items-start gap-3 py-7 sm:grid-cols-[auto_1fr] sm:gap-8 sm:py-9 md:grid-cols-[110px_minmax(0,340px)_1fr]">
              <span className="font-display text-3xl leading-none font-bold text-faint sm:text-5xl">{s.n}</span>
              <h3 className="font-display text-lg font-medium sm:text-2xl">{s.name}</h3>
              <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{s.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="px-5 py-20 sm:px-8 sm:py-28 md:px-12">
      <SectionHead label="Витрина" title="Открытый" accent="код" />
      <FadeIn delay={0.12}>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Код можно читать, демо — открыть прямо сейчас, а всё остальное поднимается одной командой.
        </p>
      </FadeIn>
      <Projects />
    </section>
  )
}

function Numbers() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24 md:px-12">
      <div className="rule grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <FadeIn key={m.label} delay={i * 0.08}>
            <p className="font-display text-3xl leading-none font-bold text-gold tabular-nums sm:text-4xl">{m.value}</p>
            <p className="mt-3 text-sm leading-snug text-fg">{m.label}</p>
            <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-faint">{m.sub}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function Cases() {
  return (
    <section id="cases" className="px-5 py-20 sm:px-8 sm:py-28 md:px-12">
      <SectionHead label="Кейсы" title="Работа не с" accent="витрины" />
      <RevealText
        className="mt-8 max-w-3xl text-lg leading-relaxed text-fg sm:text-2xl"
        text="Коммерческий и клиентский код закрыт договорами, поэтому рассказываем задачами и результатами: что было сломано, что мы сделали и чем всё закончилось."
      />
      <div className="mt-14">
        {cases.map((c, i) => (
          <FadeIn key={c.name} delay={i * 0.07}>
            <div className="rule grid gap-4 py-8 md:grid-cols-[230px_1fr] md:gap-10 md:py-10">
              <div>
                <h3 className="font-display text-lg font-bold sm:text-xl">{c.name}</h3>
                <p className="mt-1.5 font-mono text-[11px] tracking-[0.12em] text-faint uppercase">{c.kind}</p>
                <p className="mt-4 font-display text-2xl font-bold text-gold tabular-nums">{c.metric}</p>
                <p className="font-mono text-[11px] text-faint">{c.metricLabel}</p>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{c.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const links = [
    { label: 'Telegram', value: '@nektoo1111', href: 'https://t.me/nektoo1111' },
    { label: 'Email', value: 'olegkovalik2013@yandex.ru', href: 'mailto:olegkovalik2013@yandex.ru' },
    { label: 'GitHub', value: 'github.com/Olegg000', href: 'https://github.com/Olegg000' },
    { label: 'Kwork', value: 'olegworking55', href: 'https://kwork.ru/user/olegworking55' },
  ]
  return (
    <section id="contact" className="px-5 py-20 sm:px-8 sm:py-28 md:px-12">
      <div className="relative overflow-hidden rounded-3xl border border-hair bg-panel px-6 py-14 sm:px-10 sm:py-20 md:rounded-[40px] md:px-16">
        <div className="pointer-events-none absolute top-[-40%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(242,180,65,0.12),transparent_65%)] blur-2xl" />
        <FadeIn>
          <p className="font-mono text-[11px] tracking-[0.22em] text-gold uppercase">Контакты</p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="steel mt-4 max-w-[16ch] font-display text-[9vw] leading-[0.98] font-black tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Расскажите, что нужно <span className="font-serif italic font-medium tracking-normal">сделать</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Опишите задачу в двух словах — вернёмся с оценкой сроков и вариантами решения. Работаем с русско- и
            англоязычными заказчиками.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <FadeIn key={l.label} delay={0.2 + i * 0.06}>
              <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">{l.label}</p>
              <a href={l.href} className="mt-1.5 block text-sm break-words text-fg hover:text-gold sm:text-base">
                {l.value}
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-5 pt-6 pb-16 sm:px-8 md:px-12">
      <div className="rule flex flex-wrap items-center justify-between gap-4 pt-8">
        <span className="font-display text-sm font-bold">
          ЛЕНД<span className="text-gold">ВИС</span>
        </span>
        <span className="font-mono text-[11px] text-faint">Студия разработки · Самара · работаем удалённо</span>
      </div>
    </footer>
  )
}
