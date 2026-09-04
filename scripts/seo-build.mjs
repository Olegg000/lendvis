/**
 * После сборки раскладывает страницы по файлам: по одному на каждый язык и маршрут.
 *
 * Зачем: сайт одностраничный, и без этого ВСЕ адреса отдают один и тот же HTML
 * с заголовком главной. Google дорисует title из JS, а Яндекс с JS работает плохо —
 * и у него все страницы выглядят одинаково.
 *
 * Здесь же содержимое страницы отрисовывается в статику. Без этого робот без JS
 * видел на любом адресе только заглушку «Сайту нужен JavaScript» — 158 символов.
 * Google исполняет скрипты и потому справлялся, Яндекс делает это медленно,
 * а роботы языковых моделей обычно не делают вовсе.
 *
 * Языковые версии — отдельные адреса (/services и /en/services), связанные взаимными
 * hreflang. На одном адресе с переключением скриптом английскую версию невозможно
 * ни проиндексировать, ни объявить: Google требует свой URL для каждого языка.
 *
 * Источник истины один — seo/pages.json: из него и мета, и hreflang, и sitemap.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const cfg = JSON.parse(readFileSync(join(root, 'seo', 'pages.json'), 'utf8'))

if (!existsSync(join(dist, 'index.html'))) {
  console.error('seo-build: нет dist/index.html — сначала сборка')
  process.exit(1)
}
const base = readFileSync(join(dist, 'index.html'), 'utf8')

// Серверная сборка приложения: собирается шагом раньше в dist-ssr
const { render: renderApp } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Подменяет один тег по регулярке; если тега нет — дописывает перед </head>. */
function setTag(html, re, tag) {
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

/** '/work' → '/en/work', '/' → '/en' */
const withEn = (p) => (p === '/' ? '/en' : '/en' + p)
/** Полный адрес страницы */
const abs = (p) => cfg.site + (p === '/' ? '/' : p)
/** Куда класть файл: '/' → index.html, '/en' → en/index.html, '/en/work' → en/work.html */
function fileFor(p) {
  if (p === '/') return 'index.html'
  // Плоский файл, а не папка с index.html: иначе nginx редиректит /services -> /services/
  // и поисковик получает лишний переход. try_files $uri.html отдаёт его напрямую.
  // Для /en это важно вдвойне: папка en/ дала бы редирект /en -> /en/, а правило
  // нормализации слеша гнало бы обратно — получалась петля.
  return p.replace(/^\//, '') + '.html'
}

async function render(page, lang) {
  const routePath = lang === 'en' ? withEn(page.path) : page.path
  const meta = page[lang]
  const url = abs(routePath)
  const ruUrl = abs(page.path)
  const enUrl = abs(withEn(page.path))

  let html = base
  html = html.replace('<html lang="ru">', `<html lang="${lang}">`)
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(meta.description)}" />`)
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(meta.title)}" />`)
  html = setTag(
    html,
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
  )
  html = setTag(
    html,
    /<meta property="og:locale"[^>]*>/,
    `<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'ru_RU'}" />`,
  )

  // Взаимные hreflang: каждая версия перечисляет и себя, и вторую — иначе Google их не свяжет.
  // x-default указывает на русскую: её же отдаёт сервер всем, у кого язык не определился.
  const hreflang = [
    `<link rel="alternate" hreflang="ru" href="${ruUrl}" />`,
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${ruUrl}" />`,
  ].join('\n    ')
  html = html.replace('</head>', `    ${hreflang}\n  </head>`)

  // Содержимое — прямо в разметку. React при запуске перерисует корень заново
  // (createRoot, не hydrateRoot), поэтому расхождений с клиентом здесь не бывает.
  const app = await renderApp(routePath)
  html = html.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  return { html, file: fileFor(routePath), loc: url }
}

let count = 0
const written = []
for (const page of cfg.pages) {
  for (const lang of ['ru', 'en']) {
    const { html, file, loc } = await render(page, lang)
    const target = join(dist, file)
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, html)
    written.push({ loc, priority: page.priority, path: page.path })
    count++
  }
}

// Страница «не найдено»: nginx отдаёт её с кодом 404, GitHub Pages — как фолбэк.
// Заголовок свой, а не главной, и noindex — чтобы она не попала в выдачу сама.
let notFound = readFileSync(join(dist, 'index.html'), 'utf8')
notFound = notFound.replace(/<title>[\s\S]*?<\/title>/, '<title>Страница не найдена — Лендвис</title>')
notFound = notFound.replace(
  /<meta name="description"[^>]*>/,
  '<meta name="description" content="Такой страницы нет. Вернитесь на главную — там услуги, проекты и цены студии Лендвис." />\n    <meta name="robots" content="noindex" />',
)
notFound = notFound.replace(/<link rel="canonical"[^>]*>\n?\s*/, '')
notFound = notFound.replace(/\s*<link rel="alternate"[^>]*>/g, '')
writeFileSync(join(dist, '404.html'), notFound)

// sitemap: обе версии каждой страницы, у каждой записи — ссылки на все альтернативы
const today = new Date().toISOString().slice(0, 10)
const urls = written
  .map((u) => {
    const alts = [
      `      <xhtml:link rel="alternate" hreflang="ru" href="${abs(u.path)}" />`,
      `      <xhtml:link rel="alternate" hreflang="en" href="${abs(withEn(u.path))}" />`,
      `      <xhtml:link rel="alternate" hreflang="x-default" href="${abs(u.path)}" />`,
    ].join('\n')
    return `  <url>\n    <loc>${u.loc}</loc>\n${alts}\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  })
  .join('\n')
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
)

console.log(`seo-build: страниц ${count} (${cfg.pages.length} маршрутов × 2 языка), sitemap обновлён`)
