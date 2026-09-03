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
    n: '01',
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
    n: '02',
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
    n: '03',
    name: 'Quiz',
    nameEn: 'Quiz',
    kind: 'Платформа тестирования · живое демо',
    kindEn: 'Testing platform · live demo',
    summary:
      'LMS с ролями преподавателя, студента и руководства: группы, назначение тестов, прохождение и результаты. Главное — аналитика: один SQL-запрос по ответам и меткам времени показывает долю верных и среднее время по каждому вопросу, самый популярный неверный вариант, распределение баллов и срез по группам. Так видно не «сколько баллов», а какой вопрос сформулирован плохо и где у группы общее заблуждение. Поднимается одной командой в Docker.',
    summaryEn:
      'An LMS with teacher, student and management roles: groups, assignments, test taking and results. The centrepiece is analytics: a single SQL query over answers and timestamps yields share correct and average time per question, the distractor that pulls the most students, score distribution and a per-group cut — so a teacher sees which question is badly worded, not just who scored what. Comes up with a single Docker command.',
    stack: ['React 19', 'Express', 'PostgreSQL', 'Docker'],
    repo: 'https://github.com/Olegg000/quiz',
    demo: 'https://olegg000.github.io/quiz/',
    shots: [`${base}shots/quiz-analytics.webp`, `${base}shots/quiz-catalog.webp`, `${base}shots/quiz-login.webp`],
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
    name: 'Сценарий фильма в покадровый план',
    nameEn: 'Screenplay to a shot list',
    kind: 'AI-сервис · командная разработка',
    kindEn: 'AI service · team project',
    metric: 'PDF · DOCX',
    metricLabel: 'форматы на входе',
    metricLabelEn: 'input formats',
    text: 'Сервис превращает сценарий фильма в режиссёрскую покадровую таблицу: режет текст на сцены по заголовкам ИНТ./НАТ., укладывает их в контекст модели и собирает план съёмки — хронометраж, звук, реквизит и техника по каждому кадру. Сложность была не в том, чтобы поговорить с моделью, а в предсказуемой структуре на выходе. Выгрузка в CSV, который Excel открывает с кириллицей без плясок с кодировкой. Работа командная, код закрыт.',
    textEn: 'The service turns a film screenplay into a director\u2019s shot list: it splits the text into scenes by INT./EXT. headers, batches them into the model context and assembles a shooting plan — duration, sound, props and gear per shot. The hard part was not talking to a model but getting a predictable structure out of it. Exports a CSV that Excel opens with Cyrillic intact. A team project; the code is closed.',
  },
  {
    name: 'Фотоальбом с картой для ОС Аврора',
    nameEn: 'A map photo album for Aurora OS',
    kind: 'Мобильное · отечественная ОС',
    kindEn: 'Mobile · Russian OS',
    metric: 'офлайн',
    metricLabel: 'карта работает без сети',
    metricLabelEn: 'the map works with no network',
    text: 'Фотоальбом для отечественной ОС Аврора: читает геометки EXIF и раскладывает снимки по карте. Тайлы кэшируются, поэтому карта живёт и без сети, а миниатюры готовятся в отдельных изолятах, чтобы прокрутка не спотыкалась на тяжёлых снимках. Платформа непривычная: ни Google-сервисов, ни готовых карт-плагинов — всё через собственный слой. Код закрыт.',
    textEn: 'A photo album for Aurora, a Russian mobile OS: it reads EXIF geotags and lays photos out on a map. Tiles are cached so the map works with no network, and thumbnails are built in separate isolates so scrolling never stalls on heavy shots. The platform is unfamiliar territory — no Google services, no off-the-shelf map plugins — so everything goes through a layer of its own. The code is closed.',
  },
  {
    name: 'Игровой токен с вестингом',
    nameEn: 'A game token with vesting',
    kind: 'Блокчейн · сеть TON',
    kindEn: 'Blockchain · TON network',
    metric: '34/34',
    metricLabel: 'теста в песочнице',
    metricLabelEn: 'sandbox tests green',
    text: 'Жетон стандарта TIP-3 для сети TON с он-чейн вестингом: девять пулов распределения, трёхмесячный клиф, графики разблокировки на 12 и 18 месяцев, сжигание с перераспределением остатка. Контракт после публикации в сети не исправишь и не откатишь, поэтому вся арифметика вестинга закрыта песочными тестами — 34 из 34 зелёные. Токен работает в сети; код принадлежит заказчику.',
    textEn: 'A TIP-3 jetton for the TON network with on-chain vesting: nine distribution pools, a three-month cliff, 12- and 18-month unlock schedules, and burn with redistribution. A contract cannot be patched or rolled back once it is live, so every bit of the vesting arithmetic is covered by sandbox tests — 34 of 34 green. The token runs in production; the code belongs to the client.',
  },
  {
    name: 'Автопроверка заданий',
    nameEn: 'Automated assignment checking',
    kind: 'Веб-платформа · командная разработка',
    kindEn: 'Web platform · team project',
    metric: '2',
    metricLabel: 'клиента на одном API',
    metricLabelEn: 'clients on one API',
    text: 'Сервис автоматической проверки учебных заданий: решение попадает в очередь, прогоняется набором чекеров и возвращается разбором по каждому шагу, а не одной оценкой. У сервиса два клиента на общем API — панель эксперта на React и мобильное приложение на Flutter, — и весь стенд поднимается одной командой в Docker Compose. Работа командная, поэтому показываем задачей, а не кодом.',
    textEn: 'A service that checks student assignments automatically: a submission enters a queue, runs through a set of checkers and comes back as a per-step breakdown rather than a single grade. Two clients share one API — an expert console in React and a mobile app in Flutter — and the whole stand comes up with a single Docker Compose command. A team project, so it is told as a problem rather than shown as code.',
  },
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
    name: 'Питание по QR без интернета',
    nameEn: 'Offline QR meal payments',
    kind: 'Приложение для колледжа · прод',
    metric: '~1000',
    metricLabel: 'пользователей',
    metricLabelEn: 'users',
    kindEn: 'App for a vocational college · production',
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

