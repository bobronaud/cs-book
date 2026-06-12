import { crosshairs } from '@/data/crosshairs'
import CrosshairCard from '@/components/CrosshairCard/CrosshairCard'
import styles from './CrosshairsPage.module.scss'

export default function CrosshairsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {crosshairs.map((c) => (
          <CrosshairCard key={c.id} crosshair={c} />
        ))}
      </div>
    </div>
  )
}
