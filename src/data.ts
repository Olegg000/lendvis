const base = import.meta.env.BASE_URL

export type Project = {
  n: string
  name: string
  nameEn: string
  kind: string
  kindEn: string
  summary: string
  summaryEn: string
  stack: string[]
  repo: string
  demo?: string
  shots: string[]
  phone?: boolean
}

export const projects: Project[] = [
  {
    n: '07',
    name: 'TON Jetton Vesting',
    nameEn: 'TON Jetton Vesting',
    kind: 'Блокчейн · смарт-контракт',
    kindEn: 'Blockchain · smart contract',
    summary:
      'Токен стандарта TIP-3 для TON с он-чейн вестингом: девять пулов токеномики, трёхмесячный клиф, графики на 12 и 18 месяцев, сжигание с перераспределением. Ошибку в контракте не откатишь, поэтому всё покрыто песочными тестами — 34 из 34 зелёные.',
    summaryEn:
      'A TIP-3 jetton for TON with on-chain vesting: nine tokenomics pools, a three-month cliff, 12- and 18-month schedules, and burn with redistribution. A contract cannot be patched after deploy, so it is covered by sandbox tests — 34 of 34 green.',
    stack: ['FunC', 'TON', 'TypeScript', 'Jest'],
    repo: 'https://github.com/Olegg000/ton-jetton-vesting',
    shots: [`${base}shots/blockchain.webp`],
  },

  {
    n: '01',
    name: 'AutoCheck',
    nameEn: 'AutoCheck',
    kind: 'Веб-платформа · живое демо',
    kindEn: 'Web platform · live demo',
    summary:
      'Панель эксперта для автоматической проверки заданий: очередь проверок, загрузка решений, разбор по чекерам и аналитика. Демо работает целиком в браузере — данные отдают моки, бекенд не нужен.',
    summaryEn:
      'An expert console for automated assignment checking: a queue of runs, uploads, a per-checker breakdown and analytics. The demo runs entirely in the browser — mocked data, no backend needed.',
    stack: ['React 19', 'RTK Query', 'Tailwind', 'MSW'],
    repo: 'https://github.com/Olegg000/autoCheckMobileReact',
    demo: 'https://olegg000.github.io/autoCheckMobileReact/',
    shots: [`${base}shots/autocheck.webp`],
  },
  {
    n: '02',
    name: 'Geo Album',
    nameEn: 'Geo Album',
    kind: 'Мобильное · ОС Аврора',
    kindEn: 'Mobile · Aurora OS',
    summary:
      'Фотоальбом для отечественной ОС Аврора: читает геометки EXIF и раскладывает снимки по карте, кэширует тайлы для работы без сети, готовит миниатюры в отдельных изолятах.',
    summaryEn:
      'A photo album for Russia\'s Aurora OS: reads EXIF geotags onto a map, caches tiles so it works without a network, and builds thumbnails in separate isolates.',
    stack: ['Flutter', 'Dart', 'Aurora OS'],
    repo: 'https://github.com/Olegg000/volgaIT2025-flutter',
    shots: [`${base}shots/aurora-1.webp`, `${base}shots/aurora-2.webp`, `${base}shots/aurora-3.webp`],
    phone: true,
  },
  {
    n: '03',
    name: 'Drawer',
    nameEn: 'Drawer',
    kind: 'Реальное время · живое демо',
    kindEn: 'Realtime · live demo',
    summary:
      'Общая доска: несколько человек рисуют и печатают на одном холсте, штрихи и текст расходятся по комнате мгновенно через WebSocket.',
    summaryEn:
      'A shared board: several people draw and type on one canvas, and strokes and text reach the whole room instantly over WebSocket.',
    stack: ['React', 'Konva', 'Socket.IO', 'Express'],
    repo: 'https://github.com/Olegg000/drawer',
    demo: 'https://olegg000.github.io/drawer/',
    shots: [`${base}shots/drawer.webp`],
  },
  {
    n: '04',
    name: 'Разбор багов React',
    nameEn: 'React bug teardown',
    kind: 'Поддержка · демо «до / после»',
    kindEn: 'Support · before / after demo',
    summary:
      'Четыре типовые ошибки — потеря состояния при быстрых кликах, мутация массива, index в ключе, утечка таймера. Каждая с разбором: симптом, причина, исправление.',
    summaryEn:
      'Four classic mistakes — state lost on rapid clicks, a mutated array, index as a key, a leaking timer. Each one with the symptom, the cause and the fix.',
    stack: ['React', 'Vite'],
    repo: 'https://github.com/Olegg000/react-bugfix-demo',
    demo: 'https://olegg000.github.io/react-bugfix-demo/',
    shots: [`${base}shots/bugfix-fix.webp`],
  },
  {
    n: '05',
    name: 'Quiz',
    nameEn: 'Quiz',
    kind: 'Платформа тестирования',
    kindEn: 'Testing platform',
    summary:
      'LMS с ролями преподавателя, студента и руководства: группы, назначение тестов, статистика и загрузка материалов. Поднимается одной командой в Docker.',
    summaryEn:
      'An LMS with teacher, student and management roles: groups, assigned tests, statistics and uploads. Comes up with a single Docker command.',
    stack: ['React', 'Express', 'PostgreSQL', 'Docker'],
    repo: 'https://github.com/Olegg000/quiz',
    shots: [`${base}shots/quiz-catalog.webp`, `${base}shots/quiz-login.webp`],
  },
  {
    n: '06',
    name: 'HR Connect API',
    nameEn: 'HR Connect API',
    kind: 'Бекенд · документация онлайн',
    kindEn: 'Backend · docs online',
    summary:
      'Mock REST API на 27 маршрутов: авторизация по токену, пагинация, генерация аватаров — и всё это на чистом Node без единой зависимости.',
    summaryEn:
      'A mock REST API with 27 routes: token auth, pagination, generated avatars — all on plain Node without a single dependency.',
    stack: ['Node.js', 'OpenAPI', 'Docker'],
    repo: 'https://github.com/Olegg000/hr-connect-mock-backend',
    demo: 'https://olegg000.github.io/hr-connect-mock-backend/',
    shots: [`${base}shots/hr-swagger.webp`],
  },
]

export const metrics: Metric[] = [
  {
    value: '~1000',
    valueEn: '~1000',
    label: 'Пользователей у системы питания колледжа в проде',
    labelEn: 'Users on the campus meal system in production',
    sub: 'Офлайн-QR на ECDSA, защита от повторного гашения, нагрузочные прогоны',
    subEn: 'Offline ECDSA-signed QR, double-spend protection, load tested',
  },
  {
    value: '4',
    valueEn: '4',
    label: 'Блокчейн-сети, в которых у нас есть рабочий код',
    labelEn: 'Blockchain networks we have shipped working code on',
    sub: 'TON · Ethereum · Waves Enterprise · Hyperledger Fabric',
    subEn: 'TON · Ethereum · Waves Enterprise · Hyperledger Fabric',
  },
  {
    value: '80K+',
    valueEn: '80K+',
    label: 'Строк в боевом магазине с оплатой, складом и доставкой',
    labelEn: 'Lines in a live shop with payments, stock and delivery',
    sub: 'Next.js и FastAPI, три мессенджер-бота, админка на двадцать разделов',
    subEn: 'Next.js and FastAPI, three messenger bots, a twenty-section admin panel',
  },
  {
    value: String(projects.length),
    valueEn: String(projects.length),
    label: 'Проектов, которые можно открыть и потрогать прямо сейчас',
    labelEn: 'Projects you can open and poke at right now',
    sub: 'Открытый код, живые демо, запуск одной командой',
    subEn: 'Open code, live demos, one command to run',
  },
]

export const cases: Case[] = [
  {
    name: 'PrimeFlowers',
    nameEn: 'PrimeFlowers',
    kind: 'Интернет-магазин под нагрузкой',
    metric: '80K+',
    metricLabel: 'строк кода',
    metricLabelEn: 'lines of code',
    kindEn: 'Online shop under load',
    textEn:
      'A live flower-delivery shop: a Next.js storefront over FastAPI, PostgreSQL, Redis and Celery. Payments, stock, CRM, delivery, three messenger bots and a twenty-section admin panel. The job was not to look good — it was to survive the busiest day of the year without going down.',
    text: 'Боевой магазин доставки цветов: витрина на Next.js поверх FastAPI, PostgreSQL, Redis и Celery. Оплата, склад, CRM, доставка, три мессенджер-бота и админка на двадцать разделов. Задача была не в красоте, а в том, чтобы 8 марта система прошла пик без падений.',
  },
  {
    name: 'PGK FOOD',
    nameEn: 'PGK FOOD',
    kind: 'Система питания колледжа',
    metric: '~1000',
    metricLabel: 'пользователей',
    metricLabelEn: 'users',
    kindEn: 'Campus meal system',
    textEn:
      'Meal payments by QR pass that works with no internet: an ECDSA signature is verified on the spot, and double-spend protection catches a pass used twice. The Kotlin backend was load tested; the client is one codebase for Android and iOS.',
    text: 'Оплата питания по QR-пропуску, который работает без интернета: подпись ECDSA проверяется на месте, а повторное гашение ловит защита от double-spend. Бекенд на Kotlin проверен нагрузкой, клиент — одна кодовая база на Android и iOS.',
  },
  {
    name: 'Спасение legacy-кода',
    nameEn: 'Rescuing legacy code',
    kind: 'Поддержка и багфиксы',
    metric: '~20',
    metricLabel: 'исправленных багов',
    metricLabelEn: 'bugs fixed',
    kindEn: 'Support and bugfixes',
    textEn:
      'A project handed over as-is: enemy logic did not work, physics behaved unpredictably, performance decayed. The cause was a leak — twelve data structures allocated every frame and never freed.',
    text: 'Проект достался в наследство: логика противников не работала, физика вела себя непредсказуемо, производительность падала. Причиной оказалась утечка — двенадцать структур создавались каждый кадр и никогда не освобождались.',
  },
]

export type Metric = { value: string; valueEn: string; label: string; labelEn: string; sub: string; subEn: string }
export type Case = {
  name: string
  nameEn: string
  kind: string
  kindEn: string
  metric: string
  metricLabel: string
  metricLabelEn: string
  text: string
  textEn: string
}

export type Direction = { key: string; shot?: string }

/** Картинка к каждому направлению: где есть настоящий экран — берём его. */
export const directionShots: Direction[] = [
  { key: '01', shot: `${import.meta.env.BASE_URL}shots/quiz-catalog.webp` },
  { key: '02', shot: `${import.meta.env.BASE_URL}shots/aurora-1.webp` },
  { key: '03', shot: `${import.meta.env.BASE_URL}shots/blockchain.webp` },
  { key: '04', shot: `${import.meta.env.BASE_URL}shots/hr-swagger.webp` },
  { key: '05', shot: `${import.meta.env.BASE_URL}shots/bugfix-fix.webp` },
  { key: '06' },
]
