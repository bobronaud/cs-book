import { useEffect, useRef } from 'react'
import styles from './FilterBar.module.scss'

export type GrenadeType = 'smoke' | 'molotov' | 'flash'
export type Side = 'T' | 'CT'

interface FilterBarProps {
  maps: string[]
  selectedMap: string | null
  mapOpen: boolean
  onMapButtonClick: () => void
  onMapSelect: (map: string | null) => void
  grenade: GrenadeType | null
  onGrenadeSelect: (type: GrenadeType) => void
  side: Side
  onSideToggle: () => void
}

const GRENADE_LABELS: Record<GrenadeType, string> = {
  smoke: 'Смоки',
  molotov: 'Молотов',
  flash: 'Флешки',
}

const GRENADE_COLOR_CLASS: Record<GrenadeType, string> = {
  smoke: 'colorSmoke',
  molotov: 'colorMolotov',
  flash: 'colorFlash',
}

export default function FilterBar({
  maps,
  selectedMap,
  mapOpen,
  onMapButtonClick,
  onMapSelect,
  grenade,
  onGrenadeSelect,
  side,
  onSideToggle,
}: FilterBarProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapOpen) return
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onMapButtonClick()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [mapOpen, onMapButtonClick])

  return (
    <div className={styles.bar}>
      <div className={styles.group}>
        <div className={styles.mapWrapper} ref={dropdownRef}>
          <button
            className={[styles.btn, selectedMap ? styles.active : ''].join(' ')}
            onClick={onMapButtonClick}
          >
            {selectedMap ?? 'Карта'}
            <span className={[styles.arrow, mapOpen ? styles.arrowOpen : ''].join(' ')}>▾</span>
          </button>

          {mapOpen && (
            <div className={styles.dropdown}>
              <button
                className={[styles.dropItem, selectedMap === null ? styles.dropItemActive : ''].join(' ')}
                onClick={() => onMapSelect(null)}
              >
                Все карты
              </button>
              {maps.map(map => (
                <button
                  key={map}
                  className={[styles.dropItem, selectedMap === map ? styles.dropItemActive : ''].join(' ')}
                  onClick={() => onMapSelect(map)}
                >
                  {map}
                </button>
              ))}
            </div>
          )}
        </div>

        {(['smoke', 'molotov', 'flash'] as GrenadeType[]).map(type => (
          <button
            key={type}
            className={[
              styles.btn,
              styles[GRENADE_COLOR_CLASS[type]],
              grenade === type ? styles.active : '',
            ].join(' ')}
            onClick={() => onGrenadeSelect(type)}
          >
            {GRENADE_LABELS[type]}
          </button>
        ))}
      </div>

      <div className={styles.toggler}>
        <button
          className={[styles.togglerBtn, side === 'T' ? styles.togglerActiveT : ''].join(' ')}
          onClick={() => side !== 'T' && onSideToggle()}
        >
          T
        </button>
        <button
          className={[styles.togglerBtn, side === 'CT' ? styles.togglerActiveCT : ''].join(' ')}
          onClick={() => side !== 'CT' && onSideToggle()}
        >
          CT
        </button>
      </div>
    </div>
  )
}
