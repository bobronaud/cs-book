import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'

const navItems = [
  { to: '/grenades', label: 'Раскидки' },
  { to: '/crosshairs', label: 'Прицелы' },
]

export default function Header({ children }: { children?: ReactNode }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {children}
        <nav className={styles.nav}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.active : ''].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
