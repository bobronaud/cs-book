import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '@/components/Header/Header'
import GrenadesPage from '@/pages/Grenades/GrenadesPage'
import CrosshairsPage from '@/pages/Crosshairs/CrosshairsPage'
import AdminPage from '@/pages/Admin/AdminPage'
import NotFoundPage from '@/pages/NotFound/NotFoundPage'
import headshotImg from '@/assets/headshot.png'
import styles from './App.module.scss'

export default function App() {
  return (
    <div className={styles.app}>
      <div className="mobileGuard">
        <span>Only from Desktop</span>
        <img src={headshotImg} alt="" />
      </div>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/grenades" replace />} />
          <Route path="/grenades" element={<GrenadesPage />} />
          <Route path="/crosshairs" element={<CrosshairsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
