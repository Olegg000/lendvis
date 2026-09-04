/**
 * Точка входа для сборки страниц в статику.
 *
 * Сайт одностраничный: браузер рисует его скриптом, а робот без JS видел только
 * заглушку «Сайту нужен JavaScript». Google исполняет скрипты и потому справлялся,
 * а Яндекс делает это медленно, роботы языковых моделей — обычно не делают вовсе.
 * Поэтому при сборке каждый маршрут отрисовывается здесь и кладётся в свой файл.
 *
 * prerender, а не renderToString: внутренние страницы подгружаются лениво, и обычная
 * отрисовка отдала бы вместо них пустую заглушку Suspense.
 */
import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { LangProvider } from './lib/i18n'
import { Shell } from './App'

export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <LangProvider>
        <StaticRouter location={url}>
          <Shell />
        </StaticRouter>
      </LangProvider>
    </StrictMode>,
  )
  return await new Response(prelude).text()
}
