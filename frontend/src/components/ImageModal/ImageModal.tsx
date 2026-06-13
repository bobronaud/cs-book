import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './ImageModal.module.scss'

interface Props {
  src: string
  alt?: string
  onClose: () => void
}

export default function ImageModal({ src, alt, onClose }: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return createPortal(
    <div className={styles.overlay} onMouseDown={onClose}>
      <button className={styles.close} onMouseDown={e => e.stopPropagation()} onClick={onClose}>✕</button>
      <img
        src={src}
        alt={alt ?? ''}
        className={styles.image}
        onMouseDown={e => e.stopPropagation()}
      />
    </div>,
    document.body
  )
}
