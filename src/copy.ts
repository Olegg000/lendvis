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
        titleBefore: 'Пишем то, что',
        titleItalic: 'работает',
        titleAfter: 'в проде',
        subtitle:
          'Сайты, мобильные приложения, блокчейн, бекенды. От архитектуры до боевого сервера — и дальше, пока проект живёт.',
        tagline: 'Разработка программного обеспечения',
        ctaPrimary: 'Расскажите о задаче',
        scroll: 'Прокрутите',
      },
      services: {
        eyebrow: 'Направления',
        title: 'Стек выбираем под',
        titleAccent: 'задачу',
        lead: 'А не задачу под стек. Шесть направлений, и в каждом за спиной боевые проекты, а не учебные.',
        more: 'Все направления',
      },
      work: {
        eyebrow: 'Витрина',
        title: 'Код можно',
        titleAccent: 'прочитать',
        lead: 'Открытые репозитории, живые демо, каждый проект поднимается одной командой. Проверьте нас до того, как заплатите.',
        more: 'Все проекты',
      },
      numbers: {
        eyebrow: 'Цифры',
        title: 'Всё здесь',
        titleAccent: 'проверяемо',
        lead: 'Пользователи в проде, строки в живом коде, открытые репозитории. Ни одной цифры, которую нельзя перепроверить.',
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
      process: {
        title: 'Как это',
        titleAccent: 'происходит',
        steps: [
          { n: '01', name: 'Разбираемся', text: 'Полчаса разговора: что есть сейчас, что должно быть вместо этого, какие сроки жёсткие, а какие желательные. Если код уже есть — читаем его до оценки.' },
          { n: '02', name: 'Считаем письменно', text: 'Присылаем этапы, сроки и цену текстом. Там же честно пишем, чего делать не стоит и где мы не лучший выбор.' },
          { n: '03', name: 'Пишем и показываем', text: 'Работа видна по ходу: репозиторий, стенд, короткие сводки. Не «покажем, когда будет готово», а «смотрите, как есть сейчас».' },
          { n: '04', name: 'Отдаём и остаёмся', text: 'Код, репозиторий и доступы ваши с первого дня. После запуска остаёмся на поддержке ровно столько, сколько нужно.' },
        ],
      },
      limits: {
        title: 'Когда мы',
        titleAccent: 'не нужны',
        items: [
          'Если задача закрывается готовым сервисом за тысячу рублей в месяц — мы скажем это, а не продадим разработку.',
          'Если нужен один человек в штат на полный день — вам нужен сотрудник, а не студия.',
          'Если сроки требуют команды из десяти человек со следующей недели — честнее сказать сразу, чем сорвать.',
        ],
      },
    },

    work: {
      title: 'Проекты, которые можно',
      titleAccent: 'открыть',
      lead: 'Репозитории публичные: у части проектов есть живое демо, остальные разворачиваются локально. Коммерческие проекты под NDA показываем задачами и результатами.',
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
        'Начинали с олимпиад, и это оказалось полезной привычкой: задачу дают за час до сдачи, а работать должно всё — включая деплой.',
        'Дальше был прод. Интернет-магазин на 80 тысяч строк: витрина на Next.js, бекенд на FastAPI, оплата через ЮKassa, склад в МойСклад, CRM, Яндекс Доставка. Задача была не в красоте, а в том, чтобы пиковый день система прошла без падений.',
        'Система питания колледжа на тысячу человек: QR-пропуск работает без интернета, подпись ECDSA проверяется на месте, повторное гашение ловит защита от double-spend. Клиент — одна кодовая база Kotlin Multiplatform на Android и iOS. Плюс смарт-контракты для компаний, которых мы не назовём: NDA.',
        'И отдельная часть работы — чужой код. Проекты, где автор ушёл, документации не было изначально, а всё, что известно, — «иногда падает». Туда мы заходим добровольно.',
      ],
      facts: [
        { k: 'Где', v: 'Самара, работаем удалённо' },
        { k: 'Языки', v: 'Русский и английский' },
        { k: 'Направления', v: 'Веб, мобильные, блокчейн, бекенды, поддержка, 1С' },
        { k: 'Открытый код', v: 'Семь репозиториев с живыми демо' },
        { k: 'Условия', v: 'Договор и NDA, оплата по этапам' },
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
            text: 'Мы не присылаем презентацию с логотипами. Присылаем ссылку, которую можно открыть, и репозиторий, который можно прочитать, — и до начала работы, и всё время, пока она идёт.',
          },
          {
            name: 'Говорим прямо',
            text: 'Если срок поедет, вы узнаете об этом заранее и от нас, а не в день сдачи. Плохую новость дешевле услышать рано.',
          },
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
      },
      note: 'Оценку сроков даём после того, как разберёмся в задаче, а не до.',
      next: {
        title: 'Что будет дальше',
        items: [
          'Отвечаем в рабочее время, обычно в тот же день — туда, откуда вы написали.',
          'Задаём вопросы по задаче: пока не поймём, что должно происходить в системе, сроки не называем.',
          'Присылаем письменно этапы, сроки и цену. Код, репозиторий и доступы ваши с первого дня.',
          'Работаем по договору, NDA — по запросу. Оплата по этапам, с предоплатой за первый.',
        ],
      },
      booking: {
        title: 'Или сразу назначьте созвон',
        lead: 'Выберите день и удобное время — откроется Telegram с готовым сообщением, останется отправить.',
        pickDay: 'День',
        pickTime: 'Время',
        confirm: 'Забронировать в Telegram',
        chosen: 'Выбрано',
        tz: 'Время самарское (UTC+4)',
        message: 'Здравствуйте! Хочу обсудить проект. Удобно созвониться',
      },
      channels: 'Каналы связи',
    },

    footer: {
      line: 'Студия разработки · Самара · работаем удалённо',
      copyright: '© 2026 Лендвис',
      blurb: 'Проектируем и пишем системы, которые работают в бою: от витрины до смарт-контракта. Берём проект целиком или подключаемся к живому коду.',
      columns: {
        services: 'Направления',
        studio: 'Студия',
        contact: 'Связь',
      },
      studioLinks: { about: 'О студии', work: 'Проекты', services: 'Услуги', contact: 'Контакты' },
      meta: {
        hours: 'Отвечаем в рабочее время, обычно в тот же день',
        lang: 'Ведём проекты на русском и английском',
      },
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
        titleBefore: 'We ship what',
        titleItalic: 'works',
        titleAfter: 'in production',
        subtitle:
          'Web, mobile, blockchain, backends. From architecture to the live server — and after that, for as long as the project runs.',
        tagline: 'Software development',
        ctaPrimary: 'Tell us about your project',
        scroll: 'Scroll',
      },
      services: {
        eyebrow: 'What we build',
        title: 'The stack fits the',
        titleAccent: 'problem',
        lead: 'Not the other way round. Six directions, each with production work behind it rather than tutorials.',
        more: 'All directions',
      },
      work: {
        eyebrow: 'Open code',
        title: 'Read the',
        titleAccent: 'source',
        lead: 'Public repositories, live demos, one command to run any of them. Check us before you pay us.',
        more: 'All projects',
      },
      numbers: {
        eyebrow: 'Numbers',
        title: 'All of it is',
        titleAccent: 'verifiable',
        lead: 'Users in production, lines in a live codebase, open repositories. Nothing here you cannot look up.',
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
        text: 'Two paragraphs is enough. Back comes a timeline, a couple of options, and a straight “this is not a job for us” when that is the honest answer.',
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
          text: 'We walk into code written by someone else: no documentation, no author, one sentence to go on — “it crashes sometimes”. We read it, reproduce it, and get to the root. In one project the root was a leak: twelve structures allocated every frame and never freed.',
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
      process: {
        title: 'How it',
        titleAccent: 'goes',
        steps: [
          { n: '01', name: 'We dig in', text: 'Half an hour on a call: what you have now, what should be there instead, which deadlines are hard and which are wishes. If code already exists, we read it before we quote.' },
          { n: '02', name: 'We quote in writing', text: 'Stages, timing and price come as text. The same note says plainly what is not worth building and where we are not the best fit.' },
          { n: '03', name: 'We build in the open', text: 'The work stays visible: repository, staging, short updates. Not “we will show you when it is done” but “here is where it stands”.' },
          { n: '04', name: 'We hand over and stay', text: 'The code, the repository and the access are yours from day one. After launch we stay on support for exactly as long as you need.' },
        ],
      },
      limits: {
        title: 'When you',
        titleAccent: 'do not need us',
        items: [
          'If an off-the-shelf tool solves it for ten dollars a month, we will say so instead of selling you a build.',
          'If you need one person in-house full time, you need an employee, not a studio.',
          'If the deadline needs ten people starting next week, it is fairer to say so now than to miss it.',
        ],
      },
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
        'We came up through competitions, and it turned out to be a useful habit: you get the brief an hour before the deadline and everything still has to run — deployment included.',
        'Then came production. An 80,000-line online store: a Next.js storefront over a FastAPI backend, payments through YooKassa, inventory in MoySklad, CRM, Yandex Delivery. The job was not to make it pretty. The job was to get through the peak season without going down.',
        'A campus meal system for a thousand people: the QR pass works with no internet, an ECDSA signature is verified on the spot, and a double-spend guard catches replays. The client is one Kotlin Multiplatform codebase running on Android and iOS. Alongside that, smart contracts for companies we cannot name.',
        'And a separate line of work: code written by someone else. Projects where the author left, the documentation never existed, and all anyone knows is that it “crashes sometimes”. We go in on purpose.',
      ],
      facts: [
        { k: 'Where', v: 'Samara, working remotely' },
        { k: 'Languages', v: 'Russian and English' },
        { k: 'Fields', v: 'Web, mobile, blockchain, backends, support, 1C' },
        { k: 'Open code', v: 'Seven repositories with live demos' },
        { k: 'Terms', v: 'Contract and NDA, staged payments' },
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
            text: 'We do not send a slide deck with logos. We send a link you can open and a repository you can read — before the work starts and every day it runs.',
          },
          {
            name: 'Straight answers',
            text: 'If a deadline is about to slip, you hear it from us early — not on delivery day. Bad news is cheaper the sooner it lands.',
          },
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
      },
      note: 'Estimates come once we understand the problem, not before.',
      next: {
        title: 'What happens next',
        items: [
          'We reply during working hours, usually the same day, on whichever channel you used.',
          'We ask about the problem: until we understand what the system has to do, we do not name a timeline.',
          'You get stages, timing and price in writing. The code, the repository and the access are yours from day one.',
          'We work under contract, NDA on request. Payment goes stage by stage, with the first one paid upfront.',
        ],
      },
      booking: {
        title: 'Or put a call in the calendar',
        lead: 'Pick a day and a slot — Telegram opens with the message ready, you just hit send.',
        pickDay: 'Day',
        pickTime: 'Time',
        confirm: 'Book over Telegram',
        chosen: 'Selected',
        tz: 'Samara time (UTC+4)',
        message: 'Hi! I would like to discuss a project. Could we talk',
      },
      channels: 'Channels',
    },

    footer: {
      line: 'Development studio · Samara · working remotely',
      copyright: '© 2026 Lendvis',
      blurb: 'We design and build systems that hold up in production — from a storefront to a smart contract. Take the whole project, or join the code you already have.',
      columns: {
        services: 'What we do',
        studio: 'Studio',
        contact: 'Get in touch',
      },
      studioLinks: { about: 'About', work: 'Work', services: 'Services', contact: 'Contact' },
      meta: {
        hours: 'We reply during working hours, usually the same day',
        lang: 'We run projects in Russian and English',
      },
    },
  },
}

export type Copy = (typeof copy)['ru']
