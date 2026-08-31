export type Lang = 'ru' | 'en'

export const copy = {
  ru: {
    nav: {
      home: 'Главная',
      services: 'Услуги',
      work: 'Проекты',
      about: 'О студии',
      contact: 'Контакты',
      cta: 'Обсудить проект',
    },

    home: {
      hero: {
        pill: '«Профессионалы» 2025 — 3 место в России по мобильной разработке',
        titleBefore: 'Пишем то, что',
        titleItalic: 'работает',
        titleAfter: 'в проде',
        subtitle:
          'Сайты, мобильные приложения, блокчейн, бекенды. От архитектуры до боевого сервера — и дальше, пока проект живёт.',
        ctaPrimary: 'Расскажите о задаче',
        ctaSecondary: 'Обсудить задачу',
        scroll: 'Прокрутите',
      },
      services: {
        eyebrow: 'Направления',
        title: 'Стек выбираем под',
        titleAccent: 'задачу',
        lead: 'А не задачу под стек. Шесть направлений, и в каждом за спиной боевые проекты, а не учебные.',
      },
      work: {
        eyebrow: 'Витрина',
        title: 'Код можно',
        titleAccent: 'прочитать',
        lead: 'Открытые репозитории, живые демо, каждый проект поднимается одной командой. Проверьте нас до того, как заплатите.',
      },
      numbers: {
        eyebrow: 'Цифры',
        title: 'Всё здесь',
        titleAccent: 'проверяемо',
        lead: 'Места на олимпиадах, пользователи в проде, строки в живом коде. Ни одной цифры, которую нельзя перепроверить.',
      },
      cases: {
        eyebrow: 'Кейсы',
        title: 'Что было',
        titleAccent: 'сломано',
        lead: 'Клиентский код закрыт договорами, поэтому рассказываем задачами: что не работало, что мы сделали и чем всё закончилось.',
      },
      final: {
        title: 'Расскажите, что нужно',
        titleAccent: 'сделать',
        text: 'Хватит двух абзацев. В ответ — оценка сроков, варианты решения и честное «это не наша задача», если она действительно не наша.',
        cta: 'Обсудить проект',
      },
    },

    services: {
      title: 'Шесть направлений, один',
      titleAccent: 'подход',
      lead: 'Сначала разбираемся, что должно происходить в системе, и только потом выбираем, на чём её писать. Ниже — что именно мы делаем и чем.',
      items: [
        {
          number: '01',
          name: 'Сайты и веб-сервисы',
          tagline: 'Витрина, которая держит пиковый день.',
          text: 'Интернет-магазины, платформы, дашборды, админки. Собираем целиком: от макета до боевого сервера, где уже крутятся оплата, склад, доставка и аналитика.',
          bullets: [
            'Витрины и интернет-магазины с оплатой и складом',
            'Личные кабинеты, дашборды, панели администратора',
            'Интеграции с CRM, доставкой и платёжными системами',
            'Деплой, домены и мониторинг после запуска',
          ],
          stack: 'Next.js · React · TypeScript · FastAPI · PostgreSQL · Redis',
        },
        {
          number: '02',
          name: 'Мобильные приложения',
          tagline: 'Одна кодовая база — Android, iOS и Аврора.',
          text: 'Нативно и кроссплатформенно. Kotlin Multiplatform и Compose, когда нужны общая логика и скорость; Flutter, когда нужен единый интерфейс везде. Отечественная ОС Аврора — тоже наша территория.',
          bullets: [
            'Android и iOS из общего кода на Kotlin Multiplatform',
            'Интерфейсы на Compose и Flutter',
            'Приложения под ОС Аврора',
            'Офлайн-режим, синхронизация, работа без сети',
          ],
          stack: 'Kotlin Multiplatform · Compose · Flutter · Aurora OS',
        },
        {
          number: '03',
          name: 'Блокчейн',
          tagline: 'Ошибку в контракте не откатишь.',
          text: 'Смарт-контракты и интеграции для TON, EVM и корпоративных сетей. Пишем медленно и аккуратно, читаем чужие контракты, считаем токеномику и вестинг до первой строчки кода.',
          bullets: [
            'Смарт-контракты на FunC и Solidity',
            'Приватные сети: Waves Enterprise, Hyperledger Fabric',
            'Токеномика, вестинг, схемы распределения',
            'Связка контрактов с сайтом и ботами',
          ],
          stack: 'TON · FunC · Solidity · Waves Enterprise · Hyperledger Fabric',
        },
        {
          number: '04',
          name: 'Бекенды и интеграции',
          tagline: 'Здесь всё обычно и ломается.',
          text: 'API, очереди, фоновые задачи, платёжные и складские системы. Делаем так, чтобы платёж не терялся между кассой и складом, а очередь переживала перезапуск сервера.',
          bullets: [
            'API на Spring Boot, FastAPI и Node',
            'Очереди и фоновые задачи',
            'Платёжные системы, склад, CRM, доставка',
            'Docker, деплой, логи и мониторинг',
          ],
          stack: 'Spring Boot · FastAPI · Node.js · PostgreSQL · Docker',
        },
        {
          number: '05',
          name: 'Поддержка и багфиксы',
          tagline: 'Ищем причину, а не симптом.',
          text: 'Входим в чужой код: без документации, без автора, с одной фразой «иногда падает». Читаем, воспроизводим, доходим до корня. В одном проекте корнем оказалась утечка — двенадцать структур создавались каждый кадр и не освобождались никогда.',
          bullets: [
            'Разбор legacy-кода без документации',
            'Утечки памяти, гонки, плавающие баги',
            'Починка сломанной сборки и деплоя',
            'Приём проекта на сопровождение и развитие',
          ],
          stack: 'Профилировщики · логи · тесты · git bisect',
        },
        {
          number: '06',
          name: '1С',
          tagline: 'Конфигурация под ваш процесс, а не процесс под конфигурацию.',
          text: 'Дорабатываем типовые конфигурации, пишем расширения и печатные формы, переводим на новые релизы платформы без потери доработок. Сертификат 1С:Профессионал 8.3.',
          bullets: [
            'Доработка типовых конфигураций',
            'Расширения вместо правки типовой',
            'Печатные формы и отчёты',
            'Обновление релизов с сохранением доработок',
          ],
          stack: '1С:Предприятие 8.3 · расширения · печатные формы',
        },
      ],
    },

    work: {
      title: 'Проекты, которые можно',
      titleAccent: 'открыть',
      lead: 'Репозитории публичные, демо живые, всё поднимается одной командой. Коммерческие проекты под NDA показываем задачами и результатами.',
      filters: {
        all: 'Все',
        web: 'Веб',
        mobile: 'Мобильные',
        blockchain: 'Блокчейн',
        backend: 'Бекенд',
        support: 'Поддержка',
      },
    },

    about: {
      title: 'Кто пишет ваш',
      titleAccent: 'код',
      lead: 'Лендвис — студия разработки из Самары. Работаем удалённо, с русско- и англоязычными заказчиками.',
      paragraphs: [
        'Начинали с олимпиад, и это оказалось полезной привычкой: задачу дают за час до сдачи, а работать должно всё. На «Профессионалах» 2025 взяли первое место в Самаре по мобильной разработке, третье по России и первое в командном зачёте. На Волга-IT — третье место с приложением на Flutter под ОС Аврора.',
        'Дальше был прод. Интернет-магазин на 80 тысяч строк: витрина на Next.js, бекенд на FastAPI, оплата через ЮKassa, склад в МойСклад, CRM, Яндекс Доставка. Задача была не в красоте, а в том, чтобы пиковый день система прошла без падений.',
        'Система питания колледжа на тысячу человек: QR-пропуск работает без интернета, подпись ECDSA проверяется на месте, повторное гашение ловит защита от double-spend. Клиент — одна кодовая база Kotlin Multiplatform на Android и iOS. Плюс смарт-контракты для компаний, которых мы не назовём: NDA.',
        'И отдельная часть работы — чужой код. Проекты, где автор ушёл, документации не было изначально, а всё, что известно, — «иногда падает». Туда мы заходим добровольно: в одном таком нашлась утечка памяти и около двадцати багов, которые считались особенностями.',
      ],
      principles: {
        title: 'На чём стоим',
        items: [
          {
            name: 'Причина, а не симптом',
            text: 'Симптом закрывается за час и возвращается через неделю. Мы ищем строку, с которой всё началось, даже если она в чужом модуле.',
          },
          {
            name: 'Показываем, а не рассказываем',
            text: 'Репозитории открыты, демо работают, код читается. Составить мнение о нас можно до того, как вы заплатите первый рубль.',
          },
          {
            name: 'Говорим прямо',
            text: 'Если задача решается готовым сервисом за тысячу рублей в месяц, мы скажем это, а не продадим разработку.',
          },
        ],
      },
      awards: {
        title: 'Чем подтверждено',
        items: [
          {
            name: '«Профессионалы» 2025 · мобильная разработка',
            detail: '1 место в Самаре, 3 место в России, 1 место в командном зачёте',
          },
          { name: '«Профессионалы» 2025 · блокчейн', detail: '2 место в Самаре' },
          { name: 'Волга-IT’2025', detail: '3 место, приложение на Flutter под ОС Аврора' },
          { name: 'MTS True Tech Champ', detail: '3 место' },
          { name: 'РуКод, МФТИ', detail: 'Финалист' },
          { name: '1С:Профессионал', detail: 'Сертификат по платформе 8.3' },
        ],
      },
    },

    contact: {
      title: 'Начните с',
      titleAccent: 'задачи',
      lead: 'Два абзаца: что есть сейчас, что должно быть вместо этого и к какому сроку. Этого хватит, чтобы ответить по существу.',
      fields: {
        telegram: 'Telegram',
        email: 'Почта',
        github: 'GitHub',
        kwork: 'Kwork',
      },
      note: 'Отвечаем в рабочее время, обычно в тот же день. Оценку сроков даём после того, как разберёмся в задаче, а не до.',
    },

    footer: {
      line: 'Студия разработки · Самара · работаем удалённо',
      copyright: '© 2026 Лендвис',
    },
  },

  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      work: 'Work',
      about: 'Studio',
      contact: 'Contact',
      cta: 'Start a project',
    },

    home: {
      hero: {
        pill: 'Professionals 2025 — third in Russia for mobile development',
        titleBefore: 'We ship what',
        titleItalic: 'works',
        titleAfter: 'in production',
        subtitle:
          'Web, mobile, blockchain, backends. From architecture to the live server — and after that, for as long as the project runs.',
        ctaPrimary: 'Tell us about your project',
        ctaSecondary: 'Talk it through',
        scroll: 'Scroll',
      },
      services: {
        eyebrow: 'What we build',
        title: 'The stack fits the',
        titleAccent: 'problem',
        lead: 'Not the other way round. Six directions, each with production work behind it rather than tutorials.',
      },
      work: {
        eyebrow: 'Open code',
        title: 'Read the',
        titleAccent: 'source',
        lead: 'Public repositories, live demos, one command to run any of them. Check us before you pay us.',
      },
      numbers: {
        eyebrow: 'Numbers',
        title: 'All of it is',
        titleAccent: 'verifiable',
        lead: 'Competition placements, users in production, lines in a live codebase. Nothing here you cannot look up.',
      },
      cases: {
        eyebrow: 'Case studies',
        title: 'What was',
        titleAccent: 'broken',
        lead: 'Client code sits behind contracts, so we tell it as problems: what failed, what we did, how it ended.',
      },
      final: {
        title: 'Tell us what needs',
        titleAccent: 'building',
        text: 'Two paragraphs is enough. Back comes a timeline, a couple of options, and a straight "this is not a job for us" when that is the honest answer.',
        cta: 'Start a project',
      },
    },

    services: {
      title: 'Six directions, one',
      titleAccent: 'method',
      lead: 'First we work out what the system has to do, then we pick what to build it with. Here is the work and the tooling behind it.',
      items: [
        {
          number: '01',
          name: 'Websites and web services',
          tagline: 'A storefront that holds up on its busiest day.',
          text: 'Online stores, platforms, dashboards, admin panels. Built end to end: from the layout to a live server already running payments, inventory, delivery and analytics.',
          bullets: [
            'Storefronts and online stores with payments and inventory',
            'Customer accounts, dashboards, admin panels',
            'Integrations with CRM, delivery and payment providers',
            'Deployment, domains and monitoring after launch',
          ],
          stack: 'Next.js · React · TypeScript · FastAPI · PostgreSQL · Redis',
        },
        {
          number: '02',
          name: 'Mobile apps',
          tagline: 'One codebase for Android, iOS and Aurora OS.',
          text: 'Native and cross-platform. Kotlin Multiplatform and Compose when you want shared logic and speed, Flutter when you want the same interface everywhere. Aurora OS included.',
          bullets: [
            'Android and iOS from shared Kotlin Multiplatform code',
            'Interfaces in Compose and Flutter',
            'Apps for Aurora OS',
            'Offline mode, sync, work with no connection',
          ],
          stack: 'Kotlin Multiplatform · Compose · Flutter · Aurora OS',
        },
        {
          number: '03',
          name: 'Blockchain',
          tagline: 'A shipped contract cannot be patched.',
          text: 'Smart contracts and integrations for TON, EVM and enterprise networks. We write slowly and carefully, read contracts written by others, and settle tokenomics and vesting before the first line of code.',
          bullets: [
            'Smart contracts in FunC and Solidity',
            'Private networks: Waves Enterprise, Hyperledger Fabric',
            'Tokenomics, vesting, distribution schemes',
            'Wiring contracts into web apps and bots',
          ],
          stack: 'TON · FunC · Solidity · Waves Enterprise · Hyperledger Fabric',
        },
        {
          number: '04',
          name: 'Backends and integrations',
          tagline: 'This is where things quietly break.',
          text: 'APIs, queues, background jobs, payment and warehouse systems. Built so a payment never vanishes between the checkout and the stockroom, and a queue survives a server restart.',
          bullets: [
            'APIs on Spring Boot, FastAPI and Node',
            'Queues and background jobs',
            'Payments, inventory, CRM, delivery',
            'Docker, deployment, logs and monitoring',
          ],
          stack: 'Spring Boot · FastAPI · Node.js · PostgreSQL · Docker',
        },
        {
          number: '05',
          name: 'Support and bug fixing',
          tagline: 'We hunt the cause, not the symptom.',
          text: 'We walk into code written by someone else: no documentation, no author, one sentence to go on — "it crashes sometimes". We read it, reproduce it, and get to the root. In one project the root was a leak: twelve structures allocated every frame and never freed.',
          bullets: [
            'Legacy code with no documentation',
            'Memory leaks, race conditions, intermittent bugs',
            'Repairing broken builds and deployments',
            'Taking a project over and continuing it',
          ],
          stack: 'Profilers · logs · tests · git bisect',
        },
        {
          number: '06',
          name: '1C',
          tagline: 'The configuration bends to your process, not the reverse.',
          text: 'We extend standard 1C configurations, write extensions and print forms, and move you onto new platform releases without losing the custom work. Certified 1C:Professional 8.3.',
          bullets: [
            'Extending standard configurations',
            'Extensions instead of editing the base configuration',
            'Print forms and reports',
            'Release upgrades that keep your customisations',
          ],
          stack: '1C:Enterprise 8.3 · extensions · print forms',
        },
      ],
    },

    work: {
      title: 'Projects you can',
      titleAccent: 'open',
      lead: 'Public repositories, live demos, one command to run any of them. Commercial work under NDA is told as problems and outcomes instead.',
      filters: {
        all: 'All',
        web: 'Web',
        mobile: 'Mobile',
        blockchain: 'Blockchain',
        backend: 'Backend',
        support: 'Support',
      },
    },

    about: {
      title: 'Who writes your',
      titleAccent: 'code',
      lead: 'Lendvis is a development studio based in Samara, Russia. We work remotely, with Russian and English-speaking clients.',
      paragraphs: [
        'We came up through competitions, and it turned out to be a useful habit: you get the brief an hour before the deadline and everything still has to run. At Professionals 2025 we took first place in Samara for mobile development, third in Russia, and first in the team event. At Volga-IT, third place with a Flutter app for Aurora OS.',
        'Then came production. An 80,000-line online store: a Next.js storefront over a FastAPI backend, payments through YooKassa, inventory in MoySklad, CRM, Yandex Delivery. The job was not to make it pretty. The job was to get through the peak season without going down.',
        'A campus meal system for a thousand people: the QR pass works with no internet, an ECDSA signature is verified on the spot, and a double-spend guard catches replays. The client is one Kotlin Multiplatform codebase running on Android and iOS. Alongside that, smart contracts for companies we cannot name.',
        'And a separate line of work: code written by someone else. Projects where the author left, the documentation never existed, and all anyone knows is that it "crashes sometimes". We go in on purpose. One of them turned out to hold a memory leak and around twenty bugs that had been filed as quirks.',
      ],
      principles: {
        title: 'What we hold to',
        items: [
          {
            name: 'Cause over symptom',
            text: 'A symptom takes an hour to hide and comes back next week. We look for the line that started it, even when it lives in someone else’s module.',
          },
          {
            name: 'Show, do not tell',
            text: 'The repositories are public, the demos run, the code reads. You can form an opinion about us before you spend anything.',
          },
          {
            name: 'Straight answers',
            text: 'If an off-the-shelf tool solves it for ten dollars a month, we will say so instead of selling you a build.',
          },
        ],
      },
      awards: {
        title: 'The receipts',
        items: [
          {
            name: 'Professionals 2025 · mobile development',
            detail: 'First in Samara, third in Russia, first in the team event',
          },
          { name: 'Professionals 2025 · blockchain', detail: 'Second in Samara' },
          { name: 'Volga-IT 2025', detail: 'Third place, a Flutter app for Aurora OS' },
          { name: 'MTS True Tech Champ', detail: 'Third place' },
          { name: 'RuCode, MIPT', detail: 'Finalist' },
          { name: '1C:Professional', detail: 'Certified on platform 8.3' },
        ],
      },
    },

    contact: {
      title: 'Start with the',
      titleAccent: 'problem',
      lead: 'Two paragraphs: what you have now, what should happen instead, and by when. That is enough for a real answer.',
      fields: {
        telegram: 'Telegram',
        email: 'Email',
        github: 'GitHub',
        kwork: 'Kwork',
      },
      note: 'We reply during working hours, usually the same day. Estimates come once we understand the problem, not before.',
    },

    footer: {
      line: 'Development studio · Samara · working remotely',
      copyright: '© 2026 Lendvis',
    },
  },
}

export type Copy = (typeof copy)['ru']
