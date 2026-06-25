import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import FilterBar, { type GrenadeType, type Side } from '@/components/FilterBar/FilterBar';
import GrenadesPage from '@/pages/Grenades/GrenadesPage';
import CrosshairsPage from '@/pages/Crosshairs/CrosshairsPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import styles from './App.module.scss';

const MAPS = ['Ancient', 'Anubis', 'Cache', 'Dust2', 'Inferno', 'Mirage', 'Nuke', 'Overpass'];

export default function App() {
  const location = useLocation();
  const onGrenades = location.pathname === '/grenades' || location.pathname === '/';

  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [grenade, setGrenade] = useState<GrenadeType | null>(null);
  const [side, setSide] = useState<Side>('T');

  return (
    <div className={styles.app}>
      <Header>
        {onGrenades && (
          <FilterBar
            maps={MAPS}
            selectedMap={selectedMap}
            mapOpen={mapOpen}
            onMapButtonClick={() => setMapOpen((prev) => !prev)}
            onMapSelect={(map) => {
              setSelectedMap(map);
              setMapOpen(false);
            }}
            grenade={grenade}
            onGrenadeSelect={(type) => setGrenade((prev) => (prev === type ? null : type))}
            side={side}
            onSideToggle={() => setSide((s) => (s === 'T' ? 'CT' : 'T'))}
          />
        )}
      </Header>
      <main className={styles.main}>
        <Routes>
          <Route path='/' element={<Navigate to='/grenades' replace />} />
          <Route
            path='/grenades'
            element={<GrenadesPage selectedMap={selectedMap} grenade={grenade} side={side} />}
          />
          <Route path='/crosshairs' element={<CrosshairsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
