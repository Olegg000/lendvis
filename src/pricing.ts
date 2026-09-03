/**
 * Все деньги студии живут здесь и больше нигде.
 *
 * Цены считаются из часов, а не назначаются: часы × ставка. Поэтому чтобы
 * поднять или опустить цену, правится ЛИБО ставка, ЛИБО вилка часов у уровня —
 * и вся страница пересчитывается сама. Логику калькулятора трогать не нужно.
 */

/** Ставка студии, ₽/час. Не равна тому, что зарабатывает исполнитель на подработке:
 *  сюда заложены звонки, оценки несостоявшихся сделок, правки после сдачи и налоги. */
export const RATE = 2000

/** Работы, где компетенция редкая, а ошибка стоит дорого. */
export const RATE_HIGH = 2500

/** Ниже этой суммы не берёмся: любая задача съедает разговор, деплой и передачу. */
export const MIN_ORDER = 10_000

/** Платный первый шаг: разбор задачи, письменный план и точная цена.
 *  Вычитается из стоимости работ, если заказ состоялся. */
export const DIAGNOSTIC = 5_000

/** Поддержка после запуска, ₽/месяц. */
export const SUPPORT_FROM = 12_000

/** Минимум часов в почасовой работе — меньше не берём в работу. */
export const MIN_HOURS = 4

export type Tier = {
  id: string
  ru: string
  en: string
  /** Вилка трудоёмкости в часах: [минимум, максимум] */
  hours: [number, number]
  /** Срок в неделях: [минимум, максимум] */
  weeks: [number, number]
}

export type Kind = {
  id: string
  ru: string
  en: string
  /** Одной строкой: кому и зачем — чтобы выбирать не по названию, а по своей ситуации */
  hintRu: string
  hintEn: string
  rate?: number
  /** Работа непредсказуема, пока не откроешь чужой код: считаем и показываем по часам.
   *  У остального цена фиксируется за результат — сколько часов он занял, дело студии. */
  hourly?: boolean
  tiers: Tier[]
}

/**
 * Порядок намеренный. Первым идёт то, с чего заказчик реально начинает
 * знакомство со студией: починить то, что уже есть. Крупные работы стоят ниже —
 * они якорят цену и показывают, что со студией можно расти.
 */
export const KINDS: Kind[] = [
  {
    id: 'fix',
    ru: 'Починить то, что уже есть',
    en: 'Fix what you already have',
    hintRu: 'Сайт работает не так, отвалилась форма, поехала вёрстка, прошлый подрядчик пропал',
    hintEn: 'The site misbehaves, a form broke, the layout slipped, the previous contractor vanished',
    hourly: true,
    tiers: [
      { id: 'spot', ru: 'Точечно: один-два конкретных бага', en: 'Spot fix: one or two specific bugs', hours: [4, 8], weeks: [1, 1] },
      { id: 'list', ru: 'Список правок или переделка блока', en: 'A list of fixes or one section rebuilt', hours: [12, 25], weeks: [1, 2] },
      { id: 'deep', ru: 'Разобраться в чужом коде и привести в порядок', en: 'Take over someone else’s code and clean it up', hours: [30, 60], weeks: [2, 4] },
    ],
  },
  {
    id: 'bot',
    ru: 'Телеграм-бот',
    en: 'Telegram bot',
    hintRu: 'Приём заявок, ответы на частые вопросы, запись клиентов на время',
    hintEn: 'Taking requests, answering common questions, booking clients into time slots',
    tiers: [
      { id: 'card', ru: 'Меню, ответы, заявка владельцу в чат', en: 'Menu, answers, a request sent to the owner', hours: [8, 14], weeks: [1, 2] },
      { id: 'booking', ru: 'Запись на время, напоминания клиенту', en: 'Time-slot booking with client reminders', hours: [25, 40], weeks: [2, 3] },
      { id: 'full', ru: 'Админка с выручкой, оплата, интеграции', en: 'Admin panel with revenue, payments, integrations', hours: [45, 70], weeks: [3, 5] },
    ],
  },
  {
    id: 'site',
    ru: 'Сайт',
    en: 'Website',
    hintRu: 'От одной страницы до магазина с оплатой и складом',
    hintEn: 'From a single page to a shop with payments and stock',
    tiers: [
      { id: 'landing', ru: 'Лендинг: одна страница, форма заявки', en: 'Landing page with a request form', hours: [22, 35], weeks: [2, 3] },
      { id: 'cms', ru: 'Сайт с админкой и каталогом', en: 'Site with an admin panel and a catalogue', hours: [50, 80], weeks: [3, 6] },
      { id: 'shop', ru: 'Магазин: оплата, склад, доставка', en: 'Shop: payments, stock, delivery', hours: [110, 220], weeks: [6, 12] },
    ],
  },
  {
    id: 'mobile',
    ru: 'Мобильное приложение',
    en: 'Mobile app',
    hintRu: 'Android и iOS — одной кодовой базой, если нужны обе платформы',
    hintEn: 'Android and iOS from one codebase when both are needed',
    tiers: [
      { id: 'demo', ru: 'Витрина или каталог на готовых данных', en: 'A showcase or catalogue on prepared data', hours: [45, 70], weeks: [3, 5] },
      { id: 'app', ru: 'Приложение с бекендом и входом', en: 'An app with a backend and sign-in', hours: [85, 130], weeks: [5, 9] },
      { id: 'pro', ru: 'Офлайн-режим, платежи, интеграции', en: 'Offline mode, payments, integrations', hours: [150, 260], weeks: [9, 16] },
    ],
  },
  {
    id: 'backend',
    ru: 'Бекенд и интеграции',
    en: 'Backend and integrations',
    hintRu: 'Связать вашу систему с чужой: касса, склад, CRM, доставка, платежи',
    hintEn: 'Wiring your system to someone else’s: till, stock, CRM, delivery, payments',
    tiers: [
      { id: 'one', ru: 'Одна интеграция с чужой системой', en: 'One integration with an external system', hours: [15, 30], weeks: [1, 3] },
      { id: 'api', ru: 'API с базой и авторизацией', en: 'An API with a database and auth', hours: [35, 60], weeks: [3, 5] },
      { id: 'load', ru: 'Сервис с очередями и нагрузкой', en: 'A service with queues, built for load', hours: [80, 150], weeks: [5, 10] },
    ],
  },
  {
    id: 'blockchain',
    ru: 'Блокчейн и смарт-контракты',
    en: 'Blockchain and smart contracts',
    hintRu: 'Ошибку в контракте не откатишь, поэтому здесь дороже час и больше тестов',
    hintEn: 'A contract cannot be patched after deploy, so the hour costs more and the tests run deeper',
    rate: RATE_HIGH,
    tiers: [
      { id: 'token', ru: 'Токен по стандарту сети', en: 'A token following the network standard', hours: [30, 50], weeks: [2, 4] },
      { id: 'logic', ru: 'Контракт со своей логикой и тестами', en: 'A contract with custom logic and tests', hours: [55, 90], weeks: [4, 7] },
      { id: 'system', ru: 'Система из нескольких контрактов', en: 'A system of several contracts', hours: [120, 200], weeks: [8, 14] },
    ],
  },
  {
    id: 'odinc',
    ru: '1С',
    en: '1C',
    hintRu: 'Доработки типовой конфигурации так, чтобы обновления вендора не ломали их',
    hintEn: 'Customising a standard configuration so vendor updates do not break it',
    rate: RATE_HIGH,
    hourly: true,
    tiers: [
      { id: 'form', ru: 'Печатная форма или отчёт', en: 'A printed form or a report', hours: [6, 14], weeks: [1, 1] },
      { id: 'ext', ru: 'Расширение конфигурации', en: 'A configuration extension', hours: [20, 40], weeks: [2, 4] },
      { id: 'merge', ru: 'Слияние доработок к новому релизу', en: 'Merging customisations into a new release', hours: [40, 80], weeks: [3, 6] },
    ],
  },
]

/** Округление вверх до «человеческого» шага: мелкие суммы до тысячи, крупные до пяти. */
export function roundPrice(value: number): number {
  const step = value >= 200_000 ? 5_000 : 1_000
  return Math.ceil(value / step) * step
}

export function priceRange(kind: Kind, tier: Tier): [number, number] {
  const rate = kind.rate ?? RATE
  const low = Math.max(MIN_ORDER, roundPrice(tier.hours[0] * rate))
  const high = Math.max(low, roundPrice(tier.hours[1] * rate))
  return [low, high]
}

/** 137000 → «137 000» с неразрывными пробелами, чтобы число не переносилось. */
export function money(value: number): string {
  return value.toLocaleString('ru-RU').replace(/\s/g, ' ')
}
