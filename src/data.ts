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
    name: 'Quiz',
    nameEn: 'Quiz',
    kind: 'Платформа тестирования · живое демо',
    kindEn: 'Testing platform · live demo',
    summary:
      'LMS с ролями преподавателя, студента и руководства: группы, назначение тестов, прохождение и результаты. Главное — аналитика: один SQL-запрос по ответам и меткам времени показывает долю верных и среднее время по каждому вопросу, самый популярный неверный вариант, распределение баллов и срез по группам. Так видно не «сколько баллов», а какой вопрос сформулирован плохо и где у группы общее заблуждение. Поднимается одной командой в Docker.',
    summaryEn:
      'An LMS with teacher, student and management roles: groups, assignments, test taking and results. The centrepiece is analytics: a single SQL query over answers and timestamps yields share correct and average time per question, the distractor that pulls the most students, score distribution and a per-group cut — so a teacher sees which question is badly worded, not just who scored what. Comes up with a single Docker command.',
    stack: ['React 19', 'Express', 'PostgreSQL', 'Docker'],
    repo: 'https://github.com/lendvis/quiz',
    demo: 'https://lendvis.ru/quiz/',
    shots: [`${base}shots/quiz-analytics.webp`, `${base}shots/quiz-catalog.webp`, `${base}shots/quiz-login.webp`],
  },
  {
    n: '02',
    name: 'Бот записи клиентов',
    nameEn: 'Client booking bot',
    kind: 'Telegram-бот · живое демо',
    kindEn: 'Telegram bot · live demo',
    summary:
      'Бот для сферы услуг, который сам ведёт запись: клиент выбирает услугу и свободное время прямо в переписке, слоты считаются из длительности услуги, а частичный уникальный индекс не даёт записать двоих на одно время даже при гонке. Напоминает за сутки и за два часа, а у владельца — админ-панель с расписанием, выручкой за 30 дней и конверсией. 109 тестов, ни один не требует сети или живого токена.',
    summaryEn:
      'A booking bot for service businesses that runs the schedule itself: the client picks a service and a free slot right in the chat, slots are computed from the service duration, and a partial unique index makes a double booking impossible even under a race. It reminds clients a day and two hours ahead, and the owner gets an admin panel with the schedule, 30-day revenue and conversion. 109 tests, none needing a network or a live token.',
    stack: ['Python', 'aiogram 3', 'SQLAlchemy 2', 'SQLite'],
    repo: 'https://github.com/lendvis/python-faq-bot',
    demo: 'https://lendvis.ru/python-faq-bot/',
    shots: [`${base}shots/faq-bot-start.webp`, `${base}shots/faq-bot-booking.webp`, `${base}shots/faq-bot-admin.webp`],
  },
  {
    n: '03',
    name: 'Drawer',
    nameEn: 'Drawer',
    kind: 'Реальное время · живое демо',
    kindEn: 'Realtime · live demo',
    summary:
      'Совместная доска, где несколько человек рисуют и печатают на одном холсте одновременно — штрихи и текст расходятся по комнате мгновенно через WebSocket, без перезагрузок и задержек. У каждого штриха свой идентификатор, поэтому участники не затирают линии друг друга даже когда рисуют в одном месте. Открывается по ссылке, ничего ставить не нужно.',
    summaryEn:
      'A shared board where several people draw and type on one canvas at once — strokes and text reach the whole room instantly over WebSocket, with no reloads or lag. Every stroke carries its own id, so participants never overwrite each other even while drawing in the same spot. Opens from a link, nothing to install.',
    stack: ['React', 'Konva', 'Socket.IO', 'Express'],
    repo: 'https://github.com/lendvis/drawer',
    demo: 'https://lendvis.ru/drawer/',
    shots: [`${base}shots/drawer.webp`],
  },
  {
    n: '04',
    name: 'Бронирование отелей',
    nameEn: 'Hotel booking',
    kind: 'Мобильное · Android',
    kindEn: 'Mobile · Android',
    summary:
      'Мобильное бронирование отелей с собственным фирменным стилем «Билет» — бумага, штемпель, перфорация: узнаётся с первого экрана, а не собрано из шаблона. Поиск и фильтры, карточки отелей с фото и ценой, оформление поездки, история и профиль. Мультимодульная архитектура на Jetpack Compose (app / ui-kit / network) — так проект растёт и поддерживается без переписывания. Демо запускается на подготовленных данных.',
    summaryEn:
      'A mobile hotel-booking app with its own “ticket” identity — paper, stamp, perforation: recognisable from the first screen, not assembled from a template. Search and filters, hotel cards with photos and price, trip checkout, history and a profile. A multi-module Jetpack Compose architecture (app / ui-kit / network) so the project grows and is maintained without rewrites. The demo runs on prepared data.',
    stack: ['Kotlin', 'Jetpack Compose', 'Coil'],
    repo: 'https://github.com/lendvis/hotel-booking',
    shots: [`${base}shots/mobile/hotel-booking-home.webp`, `${base}shots/mobile/hotel-booking-search.webp`, `${base}shots/mobile/hotel-booking-trips.webp`],
    phone: true,
  },
  {
    n: '05',
    name: 'HR-ассистент с офлайн-LLM',
    nameEn: 'HR assistant with an offline LLM',
    kind: 'Мобильное · модель на устройстве',
    kindEn: 'Mobile · on-device model',
    summary:
      'HR-приложение в оформлении «Личное дело»: вакансии, карточки кандидатов, профиль и чат-ассистент, который отвечает языковой моделью прямо на устройстве (MediaPipe + Qwen). Ключевое преимущество — модель работает офлайн, поэтому резюме и переписка кандидатов физически не покидают телефон: для HR это не удобство, а требование к персональным данным. Мультимодульный проект на Jetpack Compose, готовый расти под реальную нагрузку.',
    summaryEn:
      'An HR app in a “personnel file” look: vacancies, candidate cards, a profile and a chat assistant that answers with a language model on the device itself (MediaPipe + Qwen). The key advantage is that the model runs offline, so résumés and candidate chats physically never leave the phone — for HR that is a data-protection requirement, not a convenience. A multi-module Jetpack Compose project, built to scale under real load.',
    stack: ['Kotlin', 'Jetpack Compose', 'MediaPipe LLM', 'Qwen'],
    repo: 'https://github.com/lendvis/android-hr-assistant',
    shots: [`${base}shots/mobile/hr-assistant.webp`, `${base}shots/mobile/hr-vacancies.webp`, `${base}shots/mobile/hr-profile.webp`],
    phone: true,
  },
  {
    n: '06',
    name: 'Ателье на заказ',
    nameEn: 'Bespoke atelier',
    kind: 'Мобильное · Android',
    kindEn: 'Mobile · Android',
    summary:
      'Приложение ателье с полностью авторским миром «Портновский стол» — сукно, мел, золотая нить, сантиметровая лента: каждая ткань в каталоге не фотография, а рисунок на Canvas, поэтому интерфейс выглядит дороже стокового и весит меньше. Заказы с этапами пошива, корзина, профиль. Мультимодульный проект на Jetpack Compose — пример того, как мобильному приложению делают узнаваемый бренд, а не просто экраны.',
    summaryEn:
      'An atelier app with a fully bespoke “tailor’s table” world — cloth, chalk, gold thread, a measuring tape: every fabric in the catalogue is drawn on Canvas rather than photographed, so the interface looks richer than stock and weighs less. Orders with tailoring stages, a cart, a profile. A multi-module Jetpack Compose project — an example of giving a mobile app a recognisable brand, not just screens.',
    stack: ['Kotlin', 'Jetpack Compose', 'Canvas'],
    repo: 'https://github.com/lendvis/atelier-android',
    shots: [`${base}shots/mobile/atelier-catalog.webp`, `${base}shots/mobile/atelier-home.webp`, `${base}shots/mobile/atelier-cart.webp`],
    phone: true,
  },
  {
    n: '07',
    name: 'Арена игр на реакцию',
    nameEn: 'Reaction game arena',
    kind: 'Мобильное · играбельное',
    kindEn: 'Mobile · playable',
    summary:
      'Приложение-арена в оформлении «Табло»: асфальт, лайм, янтарь, живой индикатор LIVE. Комнаты с призовым фондом, лидерборд, статистика и профиль — а сама игра на реакцию по-настоящему играбельна прямо в приложении: жди зелёный круг и жми, три попытки, в зачёт лучшая. Не макет и не набор экранов, а работающий продукт с игровым циклом. Мультимодульный проект на Jetpack Compose.',
    summaryEn:
      'An arena app in a “scoreboard” look — asphalt, lime, amber, a live LIVE badge. Rooms with a prize pool, a leaderboard, statistics and a profile — and the reaction game itself is genuinely playable right in the app: wait for the green circle and tap, three tries, best one counts. Not a mock-up or a set of screens, but a working product with a real game loop. A multi-module Jetpack Compose project.',
    stack: ['Kotlin', 'Jetpack Compose'],
    repo: 'https://github.com/lendvis/crossers-arena',
    shots: [`${base}shots/mobile/arena-game.webp`, `${base}shots/mobile/arena-lobby.webp`, `${base}shots/mobile/arena-stats.webp`],
    phone: true,
  },
  {
    n: '08',
    name: 'Умный дом для Алисы',
    nameEn: 'Smart home for Alice',
    kind: 'Бекенд · живое демо',
    kindEn: 'Backend · live demo',
    summary:
      'Облачный бекенд умного дома, который подключается к Яндекс Алисе: OAuth по протоколу Яндекса, WebSocket до устройств, телеметрия и веб-панель управления домом. Один и тот же интерфейс работает и на демо-данных, и на живом сервере — переключается токеном, задержку канала видно в статусной строке. Показывает, что мы умеем не только рисовать экраны, но и держать постоянные соединения и интеграцию со сторонней экосистемой.',
    summaryEn:
      'A cloud smart-home backend that plugs into Yandex Alice: OAuth over Yandex’s protocol, a WebSocket down to the devices, telemetry and a web control panel. The same interface runs on demo data or a live server — switched with a token, with channel latency shown in the status bar. It shows we do more than draw screens: we hold persistent connections and integrate with a third-party ecosystem.',
    stack: ['Python', 'FastAPI', 'WebSocket', 'JWT'],
    repo: 'https://github.com/lendvis/alice-301-backend',
    demo: 'https://lendvis.ru/alice/',
    shots: [`${base}shots/alice-panel.webp`, `${base}shots/alice-telemetry.webp`],
  },
  {
    n: '09',
    name: 'Блокчейн-практика',
    nameEn: 'Blockchain practice',
    kind: 'Смарт-контракты · живое демо',
    kindEn: 'Smart contracts · live demo',
    summary:
      'Обзор блокчейн-направления студии сразу в четырёх сетях — TON, Ethereum, Waves Enterprise, Hyperledger Fabric: где ошибку в контракте не откатить, поэтому пишем медленно и закрываем логику тестами. Часть работ под NDA, часть открыта с кодом и тестами — чейнкод учёта поставок для Fabric и реестр документов на Waves Enterprise с проверкой целостности по SHA-256. Это направление, в котором большинство подрядчиков даже не берётся.',
    summaryEn:
      'An overview of the studio’s blockchain work across four networks at once — TON, Ethereum, Waves Enterprise, Hyperledger Fabric: where a contract bug cannot be rolled back, so we write slowly and cover the logic with tests. Some work is under NDA, some is open with code and tests — a supply-chain chaincode for Fabric and a document registry on Waves Enterprise with SHA-256 integrity checks. A field most contractors will not even take on.',
    stack: ['TypeScript', 'Hyperledger Fabric', 'Waves Enterprise'],
    repo: 'https://github.com/lendvis/blockchain-practice',
    demo: 'https://lendvis.ru/blockchain-practice/',
    shots: [`${base}shots/blockchain-desktop.webp`],
  },
  {
    n: '10',
    name: 'Разбор багов React',
    nameEn: 'React bug teardown',
    kind: 'Поддержка · демо «до / после»',
    kindEn: 'Support · before / after demo',
    summary:
      'Живой разбор четырёх типовых React-ошибок, на которых спотыкается чужой код: потеря состояния при быстрых кликах, мутация массива, index в ключе, утечка таймера. По каждой — симптом, причина и исправление рядом, «до» и «после» в одном демо. Это витрина услуги поддержки: мы приходим в незнакомый проект, находим корень проблемы, а не глушим симптом, и оставляем код, который потом не разваливается.',
    summaryEn:
      'A live teardown of four classic React mistakes that trip up inherited code: state lost on rapid clicks, a mutated array, index as a key, a leaking timer. Each one shows the symptom, the cause and the fix side by side, “before” and “after” in one demo. It is a showcase of our support service: we enter an unfamiliar project, find the root cause instead of muting the symptom, and leave code that does not fall apart later.',
    stack: ['React', 'Vite'],
    repo: 'https://github.com/lendvis/react-bugfix-demo',
    demo: 'https://lendvis.ru/react-bugfix/',
    shots: [`${base}shots/bugfix-fix.webp`],
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
    name: 'Блокчейн-игра с NFT на TON',
    nameEn: 'A blockchain game with NFTs on TON',
    kind: 'Блокчейн · сеть TON',
    kindEn: 'Blockchain · TON network',
    metric: 'NFT',
    metricLabel: 'предметы игры на блокчейне',
    metricLabelEn: 'in-game items on-chain',
    text: 'Игровой проект в сети TON: внутриигровые предметы выпущены как NFT, а экономика и владение живут на блокчейне, а не в базе на сервере. Работали со смарт-контрактами и выпуском токенов под механику игры — там, где ошибку в контракте не откатить, поэтому логика проверяется до деплоя. Проект клиентский, код закрыт.',
    textEn: 'A game project on the TON network: in-game items are issued as NFTs, and ownership and economy live on-chain rather than in a server database. We worked on the smart contracts and token issuance behind the game mechanics — where a contract bug cannot be rolled back, so the logic is verified before deploy. A client project; the code is closed.',
  },
  {
    name: 'Автопроверка заданий',
    nameEn: 'Automated assignment checking',
    kind: 'Веб-платформа · командная разработка',
    kindEn: 'Web platform · team project',
    metric: '2',
    metricLabel: 'клиента на одном API',
    metricLabelEn: 'clients on one API',
    text: 'Сервис автоматической проверки учебных заданий: решение попадает в очередь, прогоняется набором чекеров и возвращается разбором по каждому шагу, а не одной сухой оценкой — преподаватель видит, где именно студент ошибся. Ключевое инженерное решение — два клиента на одном API: панель эксперта на React и мобильное приложение на Flutter говорят с общим бэкендом, поэтому логика проверки живёт в одном месте, а не дублируется. Весь стенд поднимается одной командой в Docker Compose. Работа командная, показываем задачей, а не кодом.',
    textEn: 'A service that checks student assignments automatically: a submission enters a queue, runs through a set of checkers and comes back as a per-step breakdown rather than one dry grade — the teacher sees exactly where the student went wrong. The key engineering call was two clients on one API: an expert console in React and a mobile app in Flutter both talk to a shared backend, so the checking logic lives in one place instead of being duplicated. The whole stand comes up with a single Docker Compose command. A team project, told as a problem rather than shown as code.',
  },
  {
    name: 'Цветочный магазин под нагрузкой',
    nameEn: 'A flower shop under load',
    kind: 'Интернет-магазин под нагрузкой',
    metric: '80K+',
    metricLabel: 'строк кода',
    metricLabelEn: 'lines of code',
    kindEn: 'Online shop under load',
    textEn:
      'A production flower-delivery shop with a full commercial cycle: a Next.js storefront over FastAPI, PostgreSQL, Redis and Celery. Payments, stock sync, CRM, a delivery service, three messenger bots for orders and alerts, and a twenty-section admin panel — over 80,000 lines of live code. The job was not to look good but to withstand the 8 March peak under real traffic and stay up on the most profitable day of the year. It did, with no downtime.',
    text: 'Боевой интернет-магазин доставки цветов с полным коммерческим циклом: витрина на Next.js поверх FastAPI, PostgreSQL, Redis и Celery. Оплата, синхронизация склада, CRM, служба доставки, три мессенджер-бота для заявок и уведомлений и админка на двадцать разделов — больше 80 тысяч строк живого кода. Задача была не «сделать красиво», а выдержать пик 8 марта под настоящим трафиком и не упасть в самый прибыльный день года. Система прошла его без простоев.',
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
      'Meal payments at a campus by a QR pass that works even with no internet — critical when hundreds of people pass a point in fifteen minutes and the connection may drop. The pass is ECDSA-signed and verified on the device itself, with no server call; double-spend protection catches a pass used twice. The Kotlin backend was load tested, and the client is one codebase for both Android and iOS — one app instead of two. It ran in production for around a thousand users.',
    text: 'Оплата питания в учебном заведении по QR-пропуску, который работает даже без интернета — а это критично, когда на перемене через точку проходят сотни человек за пятнадцать минут и связь может лечь. Пропуск подписан по ECDSA и проверяется прямо на устройстве, без обращения к серверу; повторное гашение одного и того же QR ловит защита от double-spend. Бэкенд на Kotlin проверен нагрузкой, а клиент — одна кодовая база сразу на Android и iOS, то есть одно приложение вместо двух. Система работала в проде примерно на тысячу пользователей.',
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
      'A project handed over broken: enemy logic failed, physics behaved unpredictably, performance decayed to unplayable. You cannot “scrap and rewrite” this — the value is in keeping the existing mechanics and fixing the defects. The root was a memory leak: twelve data structures allocated every frame and never freed, so usage grew until it degraded. We found and fixed the cause at the root, closed about twenty bugs and restored the enemy AI. A textbook case of taking over someone else’s neglected code and putting it right.',
    text: 'Проект достался в наследство в нерабочем состоянии: логика противников ломалась, физика вела себя непредсказуемо, производительность падала до неиграбельной. Такое нельзя «снести и переписать» — ценность в том, чтобы сохранить готовые механики и починить дефекты. Корнем оказалась утечка памяти: двенадцать структур создавались каждый кадр и никогда не освобождались, поэтому потребление росло до деградации. Причину нашли и устранили в корне, закрыли около двадцати багов и восстановили ИИ противника. Классический пример того, как мы забираем чужой запущенный код и приводим его в порядок.',
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


/** Почта студии. Один адрес на весь сайт: раньше он был вписан в четырёх местах вручную. */
export const MAIL = 'hello@lendvis.ru'
