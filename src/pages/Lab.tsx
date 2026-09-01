import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n'

/**
 * Витрина направлений первого экрана. Не часть сайта — страница для выбора:
 * три разных идеи зрелища, между ними переключатель.
 */

const BASE = import.meta.env.BASE_URL

/* ── А. «Титры»: кадр из настоящего продукта, поданный как заставка фильма ── */
function TitleCard() {
  const still = useReducedMotion()
  const { t } = useLang()
  const h = t.home.hero
  return (
    <section className="relative h-[100svh] overflow-hidden bg-ground">
      <motion.img
        src={`${BASE}shots/autocheck.webp`}
        alt=""
        initial={still ? false : { scale: 1.02 }}
        animate={{ scale: 1.16 }}
        transition={{ duration: 26, ease: 'linear' }}
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ filter: 'grayscale(0.92) contrast(1.1) brightness(0.26) blur(9px)' }}
      />
      {/* Кадр уводим в сине-песочный, чтобы чужой интерфейс попал в нашу палитру */}
      <span
        aria-hidden="true"
        className="absolute inset-0 mix-blend-soft-light"
        style={{ background: 'linear-gradient(150deg, rgba(150,175,215,0.5), rgba(216,179,132,0.35))' }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(rgba(5,5,7,0.62), rgba(5,5,7,0.62)), radial-gradient(ellipse 70% 58% at 50% 48%, rgba(5,5,7,0.62), transparent 75%), radial-gradient(ellipse 100% 90% at 50% 45%, transparent 35%, rgba(5,5,7,0.85) 80%, #050507 100%), linear-gradient(to top, #050507 3%, transparent 42%)',
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={still ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="font-mono text-micro tracking-[0.42em] text-sand uppercase"
        >
          {h.tagline}
        </motion.p>

        <motion.h1
          initial={still ? false : { opacity: 0, filter: 'blur(18px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5, ease: EASE }}
          className="mt-8 max-w-[16ch] text-[clamp(2.4rem,7.4vw,5.6rem)] leading-[0.98] font-extralight tracking-[-0.045em]"
        >
          {h.titleBefore}{' '}
          <span className="font-serif text-[1.06em] font-light italic tracking-normal">{h.titleItalic}</span>{' '}
          {h.titleAfter}
        </motion.h1>

        <motion.span
          aria-hidden="true"
          initial={still ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 1.1, ease: EASE }}
          className="mt-10 block h-px w-[min(420px,60vw)] origin-center bg-gradient-to-r from-transparent via-white/45 to-transparent"
        />

        <motion.p
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.35 }}
          className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-soft"
        >
          {h.subtitle}
        </motion.p>
      </div>
    </section>
  )
}

/* ── Б. «Разрез»: одна огромная буквенная фраза, обрезанная краями экрана ── */
function BigType() {
  const still = useReducedMotion()
  const { t } = useLang()
  const h = t.home.hero
  return (
    <section className="relative flex h-[100svh] flex-col justify-center overflow-hidden bg-ground px-5 sm:px-10">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 22% 40%, rgba(150,175,215,0.14), transparent 70%)' }}
      />

      <div className="relative">
        <motion.p
          initial={still ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-mono text-micro tracking-[0.4em] text-faint uppercase"
        >
          {h.tagline}
        </motion.p>

        <h1 className="mt-6">
          <motion.span
            initial={still ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
            className="block text-[clamp(1.5rem,4.6vw,3.4rem)] leading-none font-extralight tracking-[-0.03em] text-soft"
          >
            {h.titleBefore}
          </motion.span>

          {/* Слово выходит за правый край: экран не вмещает его — в этом и приём */}
          <motion.span
            initial={still ? false : { opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            className="-mt-[0.06em] -ml-[0.04em] block font-serif text-[clamp(5rem,23vw,19rem)] leading-[0.82] font-light whitespace-nowrap text-fg italic"
          >
            {h.titleItalic}
          </motion.span>

          <motion.span
            initial={still ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            className="mt-3 block text-right text-[clamp(1.5rem,4.6vw,3.4rem)] leading-none font-extralight tracking-[-0.03em] text-soft"
          >
            {h.titleAfter}
          </motion.span>
        </h1>

        {/* Световая полоса проходит по кадру один раз — как затвор */}
        <motion.span
          aria-hidden="true"
          initial={still ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.75, ease: EASE }}
          className="mt-12 block h-px w-full origin-left bg-gradient-to-r from-white/40 via-white/12 to-transparent"
        />

        <motion.div
          initial={still ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
          className="mt-8 flex flex-wrap items-end justify-between gap-6"
        >
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-soft">{h.subtitle}</p>
          <span className="rounded-full border border-white/25 px-7 py-3 font-mono text-label uppercase">
            {h.ctaPrimary}
          </span>
        </motion.div>
      </div>
    </section>
  )
}

/* ── В. «Живой код»: фоном идёт то, что студия продаёт, — читаемый код ── */
const LINES = [
  '() recv_internal(int msg_value, cell in_msg_full, slice in_msg_body) impure {',
  '  throw_unless(73, equal_slices(sender_address, admin_address));',
  '  var (total, minted, cliff_end) = load_vesting_data();',
  '  if (now() < cliff_end) { return (); }',
  '}',
  'suspend fun sync(): Result<List<Pass>> = withContext(Dispatchers.IO) {',
  '  val local = dao.pending()',
  '  runCatching { api.push(local) }.onSuccess { dao.markSynced(it.ids) }',
  '}',
  'export async function checkout(cart: Cart, idem: string) {',
  '  const lock = await redis.set(`lock:${idem}`, 1, { NX: true, EX: 30 })',
  '  if (!lock) return prior(idem)',
  '  return db.tx(async (t) => { await reserve(t, cart); return pay(t, cart) })',
  '}',
  'fun verify(pass: QrPass, key: PublicKey): Boolean =',
  '  Ecdsa.verify(pass.payload, pass.signature, key) && !spent.contains(pass.nonce)',
]

function LiveCode() {
  const still = useReducedMotion()
  const { t } = useLang()
  const h = t.home.hero
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    let raf = 0
    let offset = 0
    const LH = 26

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = cv.clientWidth
      const hgt = cv.clientHeight
      if (cv.width !== w * dpr || cv.height !== hgt * dpr) {
        cv.width = w * dpr
        cv.height = hgt * dpr
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, hgt)
      ctx.font = '13px ui-monospace, "JetBrains Mono", monospace'
      ctx.textBaseline = 'top'

      const rows = Math.ceil(hgt / LH) + 2
      for (let r = 0; r < rows; r++) {
        const y = r * LH - (offset % LH)
        const idx = (r + Math.floor(offset / LH)) % LINES.length
        const line = LINES[(idx + LINES.length) % LINES.length]
        // ближе к центру строки гаснут — текст заголовка не должен спорить с фоном
        const mid = Math.abs(y - hgt / 2) / (hgt / 2)
        // к верхней и нижней кромке тоже гасим: иначе строки спорят с меню и подвалом
        const edge = 1 - Math.min(y / 140, 1) * 0 - Math.max(0, 1 - (hgt - y) / 140) * 0.55
        const top = Math.min(y / 120, 1)
        ctx.fillStyle = `rgba(255,255,255,${((0.025 + mid * 0.045) * top * edge).toFixed(3)})`
        ctx.fillText(line, 40, y)
      }

      if (!still) {
        offset += 0.28
        raf = requestAnimationFrame(draw)
      }
    }

    draw()
    const onResize = () => {
      if (still) draw()
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [still])

  return (
    <section className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-ground px-6">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 52% 44% at 50% 50%, rgba(5,5,7,0.94) 30%, rgba(5,5,7,0.55) 62%, transparent 85%)',
        }}
      />

      <div className="relative max-w-[52rem] text-center">
        <motion.p
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-mono text-micro tracking-[0.4em] text-sand uppercase"
        >
          {h.tagline}
        </motion.p>

        <motion.h1
          initial={still ? false : { opacity: 0, y: 18, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
          className="mt-7 text-[clamp(2.3rem,7vw,5rem)] leading-[1.02] font-extralight tracking-[-0.045em]"
        >
          {h.titleBefore}{' '}
          <span className="font-serif text-[1.06em] font-light italic tracking-normal">{h.titleItalic}</span>{' '}
          {h.titleAfter}
        </motion.h1>

        <motion.p
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.9 }}
          className="mx-auto mt-7 max-w-[44ch] text-[15px] leading-relaxed text-soft"
        >
          {h.subtitle}
        </motion.p>

        <motion.span
          initial={still ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease: EASE }}
          className="mt-10 inline-flex rounded-full border border-white/25 px-8 py-3.5 font-mono text-label uppercase"
        >
          {h.ctaPrimary}
        </motion.span>
      </div>
    </section>
  )
}

const VARIANTS = [
  { key: 'a', name: 'А · Титры', hint: 'Кадр настоящего продукта как заставка фильма', el: TitleCard },
  { key: 'b', name: 'Б · Разрез', hint: 'Огромная типографика, обрезанная краем экрана', el: BigType },
  { key: 'c', name: 'В · Живой код', hint: 'Фоном идёт то, что студия продаёт', el: LiveCode },
]

export default function Lab() {
  const [pick, setPick] = useState(0)
  const Active = VARIANTS[pick].el
  return (
    <div className="relative">
      <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2">
        <div className="flex gap-1 rounded-full border border-line bg-ground/90 p-1.5 backdrop-blur-md">
          {VARIANTS.map((v, i) => (
            <button
              key={v.key}
              type="button"
              onClick={() => setPick(i)}
              title={v.hint}
              className={`rounded-full px-4 py-2.5 font-mono text-[10.5px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors ${
                i === pick ? 'bg-white/12 text-fg' : 'text-faint hover:text-soft'
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>

      <Active key={VARIANTS[pick].key} />

      <p className="mx-auto max-w-[1180px] px-6 py-10 font-mono text-micro text-faint uppercase">
        {VARIANTS[pick].hint}
      </p>
    </div>
  )
}
