import { useState } from 'react'
import FilterBar, { type GrenadeType, type Side } from '@/components/FilterBar/FilterBar'
import styles from './GrenadesPage.module.scss'

const MAPS = ['Ancient', 'Anubis', 'Cache', 'Dust2', 'Inferno', 'Mirage', 'Nuke', 'Overpass']

export default function GrenadesPage() {
  const [selectedMap, setSelectedMap] = useState<string | null>(null)
  const [mapOpen, setMapOpen] = useState(false)
  const [grenade, setGrenade] = useState<GrenadeType | null>(null)
  const [side, setSide] = useState<Side>('T')

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
      </div>
    </div>
  )
}
