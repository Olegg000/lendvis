/**
 * Рамки устройств. Скриншот внутри корпуса читается как работающий продукт,
 * а не как вложенная картинка — ради этого рамки и рисуем.
 * Всё на CSS: ни одного лишнего изображения.
 */

export function Laptop({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  return (
    <figure className={`m-0 w-full ${className}`}>
      {/* корпус */}
      <div className="rounded-t-xl border border-b-0 border-white/12 bg-gradient-to-b from-[#2a2f36] to-[#191d22] p-[6px] pb-0 shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)] sm:rounded-t-2xl sm:p-[9px] sm:pb-0">
        <div className="overflow-hidden rounded-t-lg bg-ground sm:rounded-t-xl">
          <img src={src} alt={alt} loading="lazy" className="block w-full object-cover object-top" />
        </div>
      </div>
      {/* основание с выемкой */}
      <div className="relative h-[10px] rounded-b-[10px] bg-gradient-to-b from-[#20242a] to-[#33383f] shadow-[0_10px_20px_-12px_rgba(0,0,0,.9)] sm:h-[14px] sm:rounded-b-[14px]">
        <span className="absolute top-0 left-1/2 h-[3px] w-14 -translate-x-1/2 rounded-b-full bg-white/12 sm:w-20" />
      </div>
      <div className="mx-auto h-[3px] w-[86%] rounded-b-full bg-black/50 blur-[1px]" />
    </figure>
  )
}

export function Phone({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  return (
    <figure
      className={`m-0 rounded-[30px] border border-white/12 bg-gradient-to-b from-[#2a2f36] to-[#191d22] p-[7px] shadow-[0_30px_60px_-32px_rgba(0,0,0,.95)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[24px] bg-ground">
        {/* островок камеры */}
        <span className="absolute top-2 left-1/2 z-10 h-[14px] w-[52px] -translate-x-1/2 rounded-full bg-black/85" />
        <img src={src} alt={alt} loading="lazy" className="block w-full" />
      </div>
    </figure>
  )
}
