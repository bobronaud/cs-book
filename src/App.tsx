import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import GrenadesPage from '@/pages/Grenades/GrenadesPage';
import CrosshairsPage from '@/pages/Crosshairs/CrosshairsPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import styles from './App.module.scss';

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path='/' element={<Navigate to='/grenades' replace />} />
          <Route path='/grenades' element={<GrenadesPage />} />
          <Route path='/crosshairs' element={<CrosshairsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
