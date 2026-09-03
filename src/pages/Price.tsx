import { useMemo, useState } from 'react'
import { FinalCall, Reveal, SectionHead } from '../sections/kit'
import { useLang } from '../lib/i18n'
import { trackGoal } from '../lib/metrika'
import {
  DIAGNOSTIC,
  KINDS,
  MIN_HOURS,
  MIN_ORDER,
  RATE,
  RATE_HIGH,
  SUPPORT_FROM,
  money,
  priceRange,
} from '../pricing'

/**
 * Страница цен. Никаких чисел в разметке — всё считается из pricing.ts,
 * поэтому смена ставки или трудоёмкости пересчитывает страницу целиком.
 *
 * Устроена как ответ на единственный вопрос, с которым сюда приходят:
 * «сколько это будет стоить». Сначала вилка по своей задаче, потом честный
 * разбор, от чего она двигается, и только затем всё остальное.
 */
export default function Price() {
  const { lang } = useLang()
  const ru = lang === 'ru'

  const [kindId, setKindId] = useState(KINDS[0].id)
  const [tierId, setTierId] = useState(KINDS[0].tiers[0].id)
  const [own, setOwn] = useState('')

  const kind = useMemo(() => KINDS.find((k) => k.id === kindId) ?? KINDS[0], [kindId])
  const tier = useMemo(() => kind.tiers.find((t) => t.id === tierId) ?? kind.tiers[0], [kind, tierId])
  const [low, high] = priceRange(kind, tier)
  const rate = kind.rate ?? RATE

  /** «1–1 нед.» читается как опечатка, поэтому одинаковые границы схлопываем в одно число. */
  const weeks = tier.weeks[0] === tier.weeks[1] ? `${tier.weeks[0]}` : `${tier.weeks[0]}–${tier.weeks[1]}`
  const hours = `${tier.hours[0]}–${tier.hours[1]}`

  function pickKind(id: string) {
    setKindId(id)
    const next = KINDS.find((k) => k.id === id)
    if (next) setTierId(next.tiers[0].id)
  }

  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
      <SectionHead
        level={1}
        title={ru ? 'Сколько это' : 'What it will'}
        accent={ru ? 'стоит' : 'cost'}
        lead={
          ru
            ? 'Считаем от часов, а не называем цифру с потолка. Ниже — вилка по вашей задаче: выберите, что нужно, и увидите порядок суммы и срок ещё до разговора.'
            : 'We price from hours rather than pulling a number out of the air. Pick what you need and see the range and the timeline before we even talk.'
        }
      />

      {/* ——— калькулятор ——— */}
      <Reveal>
        <div className="rounded-[3px] border border-line bg-panel p-6 sm:p-9">
          <p className="font-mono text-micro text-faint uppercase">{ru ? 'Что нужно сделать' : 'What you need'}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {KINDS.map((k) => {
              const active = k.id === kind.id
              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => pickKind(k.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-[13.5px] transition-colors ${
                    active
                      ? 'border-sand/60 bg-sand/10 text-fg'
                      : 'border-line text-soft hover:border-white/25 hover:text-fg'
                  }`}
                >
                  {ru ? k.ru : k.en}
                </button>
              )
            })}
          </div>

          <p className="mt-4 text-[13.5px] leading-[1.6] text-faint">{ru ? kind.hintRu : kind.hintEn}</p>

          <p className="mt-8 font-mono text-micro text-faint uppercase">{ru ? 'Насколько сложно' : 'How involved'}</p>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {kind.tiers.map((t) => {
              const active = t.id === tier.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTierId(t.id)}
                  aria-pressed={active}
                  className={`rounded-[3px] border px-4 py-4 text-left text-[13.5px] leading-[1.5] transition-colors ${
                    active
                      ? 'border-sand/60 bg-sand/10 text-fg'
                      : 'border-line text-soft hover:border-white/25 hover:text-fg'
                  }`}
                >
                  {ru ? t.ru : t.en}
                </button>
              )
            })}
          </div>

          {/* ——— ответ ——— */}
          <div className="mt-9 border-t border-line pt-8 sm:flex sm:items-end sm:justify-between sm:gap-10">
            <div>
              <p className="font-mono text-micro text-faint uppercase">{ru ? 'Порядок суммы' : 'The range'}</p>
              <p className="mt-3 text-[clamp(1.6rem,4.4vw,2.6rem)] leading-none font-extralight tracking-[-0.03em]">
                {money(low)}&nbsp;—&nbsp;{money(high)}&nbsp;<span className="text-soft">₽</span>
              </p>
              <p className="mt-4 text-[13.5px] text-soft">
                {kind.hourly
                  ? ru
                    ? `Примерно ${hours} часов, ${weeks} нед. по календарю.`
                    : `Roughly ${hours} hours, ${weeks} week(s) on the calendar.`
                  : ru
                    ? `Срок — ${weeks} нед. по календарю.`
                    : `Delivered in ${weeks} week(s).`}
              </p>
            </div>

            <p className="mt-6 max-w-[34ch] text-[13px] leading-[1.65] text-faint sm:mt-0">
              {kind.hourly
                ? ru
                  ? `Здесь считаем по часам: ${money(rate)} ₽/час, минимум ${MIN_HOURS} часа. Пока чужой код не открыт, честной фиксированной цены не существует — существует только завышенная на всякий случай.`
                  : `This one is billed hourly: ${money(rate)} ₽/hour, ${MIN_HOURS} hours minimum. Until the inherited code is open, there is no honest fixed price — only one padded just in case.`
                : ru
                  ? 'Это вилка, а не счёт. Цена фиксируется за результат и не меняется, даже если работа пойдёт быстрее задуманного. Точную сумму называем письменно после разбора задачи.'
                  : 'This is a range, not an invoice. The price is fixed against the result and does not move, even if the work goes faster than planned. The exact figure comes in writing once we have scoped it.'}
            </p>
          </div>

          {/* ——— своя формулировка ——— */}
          <div className="mt-8 border-t border-line pt-7">
            <label htmlFor="own-task" className="font-mono text-micro text-faint uppercase">
              {ru ? 'Ничего не подошло — опишите своими словами' : 'Nothing fits — describe it in your own words'}
            </label>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                id="own-task"
                type="text"
                value={own}
                onChange={(e) => setOwn(e.target.value)}
                placeholder={ru ? 'Например: перенести магазин с Тильды на свой движок' : 'For example: move a shop off a site builder'}
                className="w-full rounded-[3px] border border-line bg-raised px-4 py-3 text-[14px] text-fg outline-none placeholder:text-faint focus:border-sand/60"
              />
              <a
                href={`https://t.me/lendvis?text=${encodeURIComponent(
                  own || (ru ? 'Здравствуйте! Хочу обсудить задачу.' : 'Hello! I would like to discuss a project.'),
                )}`}
                onClick={() => trackGoal('price_telegram')}
                className="shrink-0 rounded-full border border-sand/60 px-6 py-3 text-center font-mono text-micro text-fg uppercase transition-colors hover:bg-sand/10"
              >
                {ru ? 'Отправить в Telegram' : 'Send on Telegram'}
              </a>
            </div>
            <p className="mt-3 text-[13px] leading-[1.6] text-faint">
              {ru
                ? 'Незнакомую задачу честнее посчитать, а не угадать: разберём и назовём вилку в тот же день.'
                : 'An unfamiliar task deserves a calculation, not a guess: we scope it and give you a range the same day.'}
            </p>
          </div>
        </div>
      </Reveal>

      {/* ——— правила, а не мелкий шрифт ——— */}
      <div className="mt-20 border-t border-line pt-14">
        <Reveal>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extralight tracking-[-0.03em]">
            {ru ? 'Как считаем' : 'How we'}
            <span className="font-serif text-[1.08em] font-light italic tracking-normal">
              &nbsp;{ru ? 'честно' : 'count'}
            </span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {[
            {
              t: ru ? 'Первый шаг стоит недорого' : 'The first step is cheap',
              d: ru
                ? `Разбор задачи, письменный план и точная цена — ${money(DIAGNOSTIC)} ₽. Если заказываете работу, эта сумма вычитается из неё. Так вы не платите за воздух, а мы не оцениваем бесплатно.`
                : `Scoping, a written plan and an exact price cost ${money(DIAGNOSTIC)} ₽. If you go ahead, that comes off the invoice. You pay for something real; we don't estimate for free.`,
            },
            {
              t: ru ? 'Минимальный заказ' : 'Minimum order',
              d: ru
                ? `${money(MIN_ORDER)} ₽, а почасовая работа — от ${MIN_HOURS} часов. Любая задача, даже крошечная, съедает разговор, настройку и передачу — за меньшее браться нечестно по отношению к тем, кто уже в работе.`
                : `${money(MIN_ORDER)} ₽, and hourly work starts at ${MIN_HOURS} hours. Even a tiny task eats a conversation, a setup and a handover — taking less would be unfair to the projects already running.`,
            },
            {
              t: ru ? 'Что двигает цену' : 'What moves the price',
              d: ru
                ? 'Количество экранов, интеграции с чужими системами, срочность и наличие готового дизайна. Больше всего — интеграции: чужое API диктует свои правила, и предугадать их нельзя.'
                : 'The number of screens, integrations with external systems, urgency, and whether a design already exists. Integrations most of all: someone else’s API sets the rules, and those cannot be guessed.',
            },
            {
              t: ru ? 'Почасово, если работа непредсказуема' : 'Hourly when the work is unpredictable',
              d: ru
                ? `Починка чужого кода и доработки 1С считаются по часам: ${money(RATE)} и ${money(RATE_HIGH)} ₽/час. Пока не открыл код, честной фиксированной цены не бывает — бывает только завышенная на всякий случай.`
                : `Fixing inherited code and 1C work are billed hourly: ${money(RATE)} and ${money(RATE_HIGH)} ₽/hour. Before opening the code there is no honest fixed price — only one padded just in case.`,
            },
            {
              t: ru ? 'Поддержка после запуска' : 'Support after launch',
              d: ru
                ? `От ${money(SUPPORT_FROM)} ₽ в месяц: обновления, мелкие правки, присмотр за сервером. Не обязательна — код и доступы ваши с первого дня, и уйти можно в любой момент.`
                : `From ${money(SUPPORT_FROM)} ₽ a month: updates, small fixes, keeping an eye on the server. Optional — the code and the access are yours from day one, and you can walk away whenever.`,
            },
            {
              t: ru ? 'Оплата по этапам' : 'Paid in stages',
              d: ru
                ? 'Крупная работа делится на этапы: каждый оплачивается отдельно и заканчивается тем, что можно открыть и посмотреть. Не понравилось — останавливаемся на границе этапа, без неустоек.'
                : 'Large work is split into stages: each is paid separately and ends with something you can open and look at. If you are not happy, we stop at a stage boundary, with no penalties.',
            },
          ].map((c, i) => (
              <Reveal key={c.t} delay={Math.min(i * 0.05, 0.2)}>
                <div>
                  <h3 className="text-[17px] leading-snug font-light">{c.t}</h3>
                  <p className="mt-3 text-[13.5px] leading-[1.7] text-soft">{c.d}</p>
                </div>
              </Reveal>
            ))}
        </div>
      </div>

      <FinalCall />
    </section>
  )
}
