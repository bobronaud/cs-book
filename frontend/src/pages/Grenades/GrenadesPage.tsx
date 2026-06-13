import { useState, useMemo } from 'react'

const MAPS = ['Ancient', 'Anubis', 'Cache', 'Dust2', 'Inferno', 'Mirage', 'Nuke', 'Overpass']
import FilterBar, { type GrenadeType, type Side } from '@/components/FilterBar/FilterBar'
import GrenadeCard from '@/components/GrenadeCard/GrenadeCard'
import { grenadeLineups } from '@/data/grenades'
import styles from './GrenadesPage.module.scss'

export default function GrenadesPage() {
  const [selectedMap, setSelectedMap] = useState<string | null>(null)
  const [mapOpen, setMapOpen] = useState(false)
  const [grenade, setGrenade] = useState<GrenadeType | null>(null)
  const [side, setSide] = useState<Side>('T')

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

  function handleMapButtonClick() {
    setMapOpen(prev => !prev)
  }

  function handleMapSelect(map: string | null) {
    setSelectedMap(map)
    setMapOpen(false)
  }

  function handleGrenadeSelect(type: GrenadeType) {
    setGrenade(prev => (prev === type ? null : type))
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <FilterBar
          maps={MAPS}
          selectedMap={selectedMap}
          mapOpen={mapOpen}
          onMapButtonClick={handleMapButtonClick}
          onMapSelect={handleMapSelect}
          grenade={grenade}
          onGrenadeSelect={handleGrenadeSelect}
          side={side}
          onSideToggle={() => setSide(s => (s === 'T' ? 'CT' : 'T'))}
        />
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
