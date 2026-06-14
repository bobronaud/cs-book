import { useState } from 'react'
import type { Crosshair } from '@/data/crosshairs'
import CrosshairSVG from '@/components/CrosshairSVG/CrosshairSVG'
import styles from './CrosshairCard.module.scss'

interface Props {
  crosshair: Crosshair
}

export default function CrosshairCard({ crosshair }: Props) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(crosshair.code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={styles.card}>
      <div className={styles.preview}>
        <CrosshairSVG params={crosshair.params} svgSize={100} />
      </div>
      <div className={styles.info}>
        <div className={[styles.codeField, copied ? styles.codeCopied : ''].join(' ')} onClick={handleCopy} title="Скопировать">
          <span className={styles.codeText}>{crosshair.code}</span>
          <button className={styles.copyIcon} tabIndex={-1}>
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v7A1.5 1.5 0 003.5 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
