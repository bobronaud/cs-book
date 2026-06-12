import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.scss'

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Страница не найдена</h1>
      <Link to="/" className={styles.link}>
        На главную
      </Link>
    </div>
  )
}
