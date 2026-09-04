/**
 * После сборки раскладывает статические мета-теги по маршрутам и пишет sitemap.
 *
 * Зачем: сайт одностраничный, и без этого ВСЕ адреса отдают один и тот же HTML
 * с заголовком главной. Google дорисует title из JS, а Яндекс с JS работает плохо —
 * и у него все страницы выглядят одинаково. Здесь каждый маршрут получает свой
 * физический index.html с правильными title/description/canonical/og.
 *
 * Здесь же содержимое страницы отрисовывается в статику. Без этого робот без JS
 * видел на любом адресе только заглушку «Сайту нужен JavaScript» — 158 символов.
 * Google исполняет скрипты и потому справлялся, Яндекс делает это медленно,
 * а роботы языковых моделей обычно не делают вовсе.
 *
 * Источник истины один — seo/pages.json: из него и мета, и sitemap.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
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

async function render(page) {
  const url = cfg.site + (page.path === '/' ? '/' : page.path)
  let html = base
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(page.description)}" />`)
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(page.title)}" />`)
  html = setTag(
    html,
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${esc(page.description)}" />`,
  )
  // Содержимое — прямо в разметку. React при запуске перерисует корень заново
  // (createRoot, не hydrateRoot), поэтому расхождений с клиентом здесь не бывает.
  const app = await renderApp(page.path)
  html = html.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  return html
}

// Главная — правим на месте, остальные кладём отдельными папками
let count = 0
for (const page of cfg.pages) {
  const html = await render(page)
  if (page.path === '/') {
    writeFileSync(join(dist, 'index.html'), html)
  } else {
    // Плоский файл, а не папка с index.html: иначе nginx редиректит /services -> /services/
    // и поисковик получает лишний переход. try_files $uri.html отдаёт его напрямую.
    writeFileSync(join(dist, page.path.replace(/^\//, '') + '.html'), html)
  }
  count++
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
writeFileSync(join(dist, '404.html'), notFound)

// sitemap из того же источника
const today = new Date().toISOString().slice(0, 10)
const urls = cfg.pages
  .map((p) => {
    const loc = cfg.site + (p.path === '/' ? '/' : p.path)
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
  })
  .join('\n')
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

console.log(`seo-build: страниц ${count}, sitemap обновлён`)
