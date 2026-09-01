import { WorkCard } from '../components/WorkCard'
import type { Project } from '../data'

/**
 * Витрина на главной: кадры лежат прямо на сцене, без панели под ними.
 *
 * Стопка отсюда убрана намеренно. Она держалась ровно на том, что карточки
 * непрозрачные и накрывают друг друга; без фона они просвечивали бы насквозь.
 * Раз фон убран — раскладка стала последовательностью, и кадр сцены виден между работами.
 */
export function Showcase({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-20 sm:space-y-28">
      {projects.map((p, i) => (
        <WorkCard key={p.n} project={p} index={i} compact />
      ))}
    </div>
  )
}
