import { useMemo } from 'react'
import type { GrenadeType, Side } from '@/components/FilterBar/FilterBar'
import GrenadeCard from '@/components/GrenadeCard/GrenadeCard'
import { grenadeLineups } from '@/data/grenades'
import styles from './GrenadesPage.module.scss'

interface GrenadesPageProps {
  selectedMap: string | null
  grenade: GrenadeType | null
  side: Side
}

export default function GrenadesPage({ selectedMap, grenade, side }: GrenadesPageProps) {
  const filtered = useMemo(
    () =>
      grenadeLineups.filter(l => {
        if (selectedMap && l.map !== selectedMap) return false
        if (grenade && l.type !== grenade) return false
        if (l.side !== side) return false
        return true
      }),
    [selectedMap, grenade, side]
  )

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map(lineup => (
              <GrenadeCard key={lineup.id} lineup={lineup} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Раскидки не найдены</p>
        )}
      </div>
    </div>
  )
}
