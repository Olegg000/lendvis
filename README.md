# Лендвис — сайт студии

> **EN.** Landing site for Lendvis, a software studio: web, mobile, blockchain, backends, support and 1C. Built with React 19, Vite, Tailwind CSS v4 and Framer Motion; deployed to GitHub Pages. Dark theme, scroll-driven motion, live demo links to the studio's open-source projects.

Сайт-хаб студии: направления, витрина проектов с живыми демо, кейсы и контакты.
С него ведут ссылки на остальные проекты и демо.

**Живой сайт:** https://olegg000.github.io/lendvis/

## Стек

React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

## Быстрый старт

```bash
npm ci
npm run dev
```

Сборка: `npm run build`, локальный просмотр собранного: `npm run preview`.
Деплой автоматический — GitHub Actions собирает и публикует на Pages при пуше в `main`.

## Структура

| Путь | Что внутри |
|---|---|
| `src/App.tsx` | Секции страницы: навигация, герой, услуги, проекты, цифры, кейсы, контакты |
| `src/components/Projects.tsx` | Карточки проектов, складывающиеся стопкой при прокрутке |
| `src/components/Marquee.tsx` | Две ленты работ, расходящиеся по скроллу |
| `src/lib/motion.tsx` | Общие приёмы движения: появление, проявление текста по словам, магнит к курсору |
| `src/data.ts` | Контент: услуги, проекты, метрики, кейсы |
| `public/shots/` | Скриншоты проектов и экраны мобильных приложений |

## Что настроено

- Тёмная тема, типографика Unbounded + Playfair Display + Golos Text + JetBrains Mono
- Движение по прокрутке: ленты работ, стопка карточек, проявление текста, магнитная кнопка
- `prefers-reduced-motion` отключает анимации
- Адаптив от 375px, без горизонтальной прокрутки
