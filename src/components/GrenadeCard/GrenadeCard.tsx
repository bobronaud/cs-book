import { useState } from 'react'
import type { GrenadeLineup } from '@/data/grenades'
import ImageModal from '@/components/ImageModal/ImageModal'
import styles from './GrenadeCard.module.scss'

const SLIDES = [
  { key: 'stand' as const, label: 'Позиция' },
  { key: 'aim' as const, label: 'Прицел' },
  { key: 'result' as const, label: 'Итог' },
]

const TYPE_LABEL: Record<string, string> = {
  smoke: 'Смок',
  molotov: 'Молотов',
  flash: 'Флешка',
}

const TYPE_CLASS: Record<string, string> = {
  smoke: 'badgeSmoke',
  molotov: 'badgeMolotov',
  flash: 'badgeFlash',
}

interface Props {
  lineup: GrenadeLineup
}

export default function GrenadeCard({ lineup }: Props) {
  const [slide, setSlide] = useState(2)
  const [modalOpen, setModalOpen] = useState(false)

  const currentImage = lineup.images[SLIDES[slide].key]

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {currentImage ? (
          <img
            src={currentImage}
            alt={SLIDES[slide].label}
            className={styles.image}
            onClick={() => setModalOpen(true)}
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>
      {modalOpen && (
        <ImageModal
          src={currentImage}
          alt={SLIDES[slide].label}
          onClose={() => setModalOpen(false)}
        />
      )}
      <div className={styles.tabs}>
        {SLIDES.map((s, i) => (
          <button
            key={s.key}
            className={[styles.tab, slide === i ? styles.tabActive : ''].join(' ')}
            onClick={() => setSlide(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className={styles.info}>
        <div className={styles.badges}>
          <span className={[styles.badge, styles[TYPE_CLASS[lineup.type]]].join(' ')}>
            {TYPE_LABEL[lineup.type]}
          </span>
          <span className={[styles.badge, lineup.side === 'T' ? styles.badgeT : styles.badgeCT].join(' ')}>
            {lineup.side}
          </span>
        </div>
        <p className={styles.description}>{lineup.description}</p>
      </div>
    </div>
  )
}
