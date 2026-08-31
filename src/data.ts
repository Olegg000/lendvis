const base = import.meta.env.BASE_URL

export type Project = {
  n: string
  name: string
  kind: string
  summary: string
  stack: string[]
  repo: string
  demo?: string
  shots: string[]
  phone?: boolean
}

export const services = [
  {
    n: '01',
    name: 'Сайты и веб-сервисы',
    text: 'Интернет-магазины, платформы, дашборды и админки: от макета до боевого сервера с оплатой, интеграциями и нагрузкой.',
  },
  {
    n: '02',
    name: 'Мобильные приложения',
    text: 'Android, iOS и кроссплатформа — Kotlin Multiplatform, Compose, Flutter. Включая отечественную ОС Аврора.',
  },
  {
    n: '03',
    name: 'Блокчейн',
    text: 'Смарт-контракты и интеграции: TON и FunC, Solidity, Waves Enterprise, Hyperledger Fabric. Токеномика, вестинг, приватные сети.',
  },
  {
    n: '04',
    name: 'Бекенды и интеграции',
    text: 'API, очереди, платёжные и складские системы, Docker и серверы под ключ. Spring Boot, FastAPI, Node.',
  },
  {
    n: '05',
    name: 'Поддержка и багфиксы',
    text: 'Входим в чужой код и находим причину, а не симптом: утечки памяти, гонки, сломанные сборки, наследство без документации.',
  },
  {
    n: '06',
    name: '1С',
    text: 'Доработка и сопровождение конфигураций, расширения, печатные формы, обновление до новых релизов платформы.',
  },
]

export const projects: Project[] = [
  {
    n: '01',
    name: 'AutoCheck',
    kind: 'Веб-платформа · живое демо',
    summary:
      'Панель эксперта для автоматической проверки заданий: очередь проверок, загрузка решений, разбор по чекерам и аналитика. Демо работает целиком в браузере — данные отдают моки, бекенд не нужен.',
    stack: ['React 19', 'RTK Query', 'Tailwind', 'MSW'],
    repo: 'https://github.com/Olegg000/autoCheckMobileReact',
    demo: 'https://olegg000.github.io/autoCheckMobileReact/',
    shots: [`${base}shots/autocheck.png`],
  },
  {
    n: '02',
    name: 'Geo Album',
    kind: 'Мобильное · ОС Аврора · Волга-IT, 3 место',
    summary:
      'Фотоальбом для отечественной ОС Аврора: читает геометки EXIF и раскладывает снимки по карте, кэширует тайлы для работы без сети, готовит миниатюры в отдельных изолятах.',
    stack: ['Flutter', 'Dart', 'Aurora OS'],
    repo: 'https://github.com/Olegg000/volgaIT2025-flutter',
    shots: [`${base}shots/aurora-1.png`, `${base}shots/aurora-2.png`, `${base}shots/aurora-3.png`],
    phone: true,
  },
  {
    n: '03',
    name: 'Drawer',
    kind: 'Реальное время · живое демо',
    summary:
      'Общая доска: несколько человек рисуют и печатают на одном холсте, штрихи и текст расходятся по комнате мгновенно через WebSocket.',
    stack: ['React', 'Konva', 'Socket.IO', 'Express'],
    repo: 'https://github.com/Olegg000/drawer',
    demo: 'https://olegg000.github.io/drawer/',
    shots: [`${base}shots/drawer.png`],
  },
  {
    n: '04',
    name: 'Разбор багов React',
    kind: 'Поддержка · демо «до / после»',
    summary:
      'Четыре типовые ошибки — потеря состояния при быстрых кликах, мутация массива, index в ключе, утечка таймера. Каждая с разбором: симптом, причина, исправление.',
    stack: ['React', 'Vite'],
    repo: 'https://github.com/Olegg000/react-bugfix-demo',
    demo: 'https://olegg000.github.io/react-bugfix-demo/',
    shots: [`${base}shots/bugfix-fix.png`],
  },
  {
    n: '05',
    name: 'Quiz',
    kind: 'Платформа тестирования',
    summary:
      'LMS с ролями преподавателя, студента и руководства: группы, назначение тестов, статистика и загрузка материалов. Поднимается одной командой в Docker.',
    stack: ['React', 'Express', 'PostgreSQL', 'Docker'],
    repo: 'https://github.com/Olegg000/quiz',
    shots: [`${base}shots/quiz-catalog.png`, `${base}shots/quiz-login.png`],
  },
  {
    n: '06',
    name: 'HR Connect API',
    kind: 'Бекенд · документация онлайн',
    summary:
      'Mock REST API на 27 маршрутов: авторизация по токену, пагинация, генерация аватаров — и всё это на чистом Node без единой зависимости.',
    stack: ['Node.js', 'OpenAPI', 'Docker'],
    repo: 'https://github.com/Olegg000/hr-connect-mock-backend',
    demo: 'https://olegg000.github.io/hr-connect-mock-backend/',
    shots: [`${base}shots/hr-swagger.png`],
  },
]

export const marquee = [
  `${base}shots/autocheck.png`,
  `${base}shots/quiz-catalog.png`,
  `${base}shots/bugfix-fix.png`,
  `${base}shots/drawer.png`,
  `${base}shots/hr-swagger.png`,
  `${base}shots/quiz-login.png`,
  `${base}shots/alice-oauth.png`,
]

export const metrics = [
  { value: '1 место', label: 'Мобильная разработка, «Профессионалы» 2025', sub: 'Самара · 3 место в России · 1 место в командном' },
  { value: '2 место', label: 'Блокчейн-компетенция, «Профессионалы» 2025', sub: 'Самара' },
  { value: '3 место', label: 'Волга-IT’2025 и MTS True Tech Champ', sub: 'Flutter для ОС Аврора · AI-сервис' },
  { value: '~1000', label: 'Пользователей в проде у системы питания', sub: 'Офлайн-QR, ECDSA, нагрузочные тесты' },
]

export const cases = [
  {
    name: 'PrimeFlowers',
    kind: 'Интернет-магазин под нагрузкой',
    metric: '80K+',
    metricLabel: 'строк кода',
    text: 'Боевой магазин доставки цветов: витрина на Next.js поверх FastAPI, PostgreSQL, Redis и Celery. Оплата, склад, CRM, доставка, три мессенджер-бота и админка на двадцать разделов. Задача была не в красоте, а в том, чтобы 8 марта система прошла пик без падений.',
  },
  {
    name: 'PGK FOOD',
    kind: 'Система питания колледжа',
    metric: '~1000',
    metricLabel: 'пользователей',
    text: 'Оплата питания по QR-пропуску, который работает без интернета: подпись ECDSA проверяется на месте, а повторное гашение ловит защита от double-spend. Бекенд на Kotlin проверен нагрузкой, клиент — одна кодовая база на Android и iOS.',
  },
  {
    name: 'Спасение legacy-кода',
    kind: 'Поддержка и багфиксы',
    metric: '~20',
    metricLabel: 'исправленных багов',
    text: 'Проект достался в наследство: логика противников не работала, физика вела себя непредсказуемо, производительность падала. Причиной оказалась утечка — двенадцать структур создавались каждый кадр и никогда не освобождались.',
  },
]

export type Direction = { key: string; shot?: string }

/** Картинка к каждому направлению: где есть настоящий экран — берём его. */
export const directionShots: Direction[] = [
  { key: '01', shot: `${import.meta.env.BASE_URL}shots/quiz-catalog.png` },
  { key: '02', shot: `${import.meta.env.BASE_URL}shots/aurora-1.png` },
  { key: '03', shot: `${import.meta.env.BASE_URL}shots/blockchain.png` },
  { key: '04', shot: `${import.meta.env.BASE_URL}shots/hr-swagger.png` },
  { key: '05', shot: `${import.meta.env.BASE_URL}shots/bugfix-fix.png` },
  { key: '06' },
]
