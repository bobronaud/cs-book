import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import styles from './AdminPage.module.scss'
import Select from '@/components/Select/Select'

type Section = 'crosshair' | 'grenade' | null

const MAPS = ['Ancient', 'Anubis', 'Cache', 'Dust2', 'Inferno', 'Mirage', 'Nuke', 'Overpass']

function FileField({ label, id }: { label: string; id: string }) {
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.files?.[0]?.name ?? null)
  }

  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.fileRow}>
        <label htmlFor={id} className={styles.fileLabel}>
          Выбрать файл
        </label>
        <span className={styles.fileName}>{fileName ?? 'Файл не выбран'}</span>
      </div>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        className={styles.fileInput}
        onChange={handleChange}
      />
    </div>
  )
}

function CrosshairForm() {
  return (
    <div className={styles.formGrid}>
      <FileField label="Изображение" id="crosshair-image" />
      <div className={styles.field}>
        <label htmlFor="crosshair-code" className={styles.fieldLabel}>
          Код прицела
        </label>
        <input
          id="crosshair-code"
          type="text"
          className={styles.input}
          placeholder="CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
        />
      </div>
      <button type="button" className={styles.submitBtn}>Добавить</button>
    </div>
  )
}

const SIDES = [
  { value: 'T', label: 'T' },
  { value: 'CT', label: 'CT' },
]

const GRENADE_TYPES = [
  { value: 'smoke', label: 'Смоки' },
  { value: 'molotov', label: 'Молотов' },
  { value: 'flash', label: 'Флешки' },
]

function GrenadeForm() {
  const [map, setMap] = useState('')
  const [side, setSide] = useState('')
  const [type, setType] = useState('')

  return (
    <div className={styles.formGrid}>
      <div className={styles.field}>
        <span className={styles.fieldLabel}>Карта</span>
        <Select
          value={map}
          onChange={setMap}
          options={MAPS.map((m) => ({ value: m, label: m }))}
          placeholder="Выбрать карту"
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Сторона</span>
        <Select
          value={side}
          onChange={setSide}
          options={SIDES}
          placeholder="Выбрать сторону"
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Тип гранаты</span>
        <Select
          value={type}
          onChange={setType}
          options={GRENADE_TYPES}
          placeholder="Выбрать тип"
        />
      </div>

      <FileField label="Куда встать" id="grenade-stand" />
      <FileField label="Куда прицелиться" id="grenade-aim" />
      <FileField label="Куда упадёт" id="grenade-land" />
      <div className={styles.field}>
        <label htmlFor="grenade-desc" className={styles.fieldLabel}>
          Описание
        </label>
        <textarea id="grenade-desc" className={styles.textarea} rows={5} />
      </div>
      <button type="button" className={styles.submitBtn}>Добавить</button>
    </div>
  )
}

function AdminPanel() {
  const [section, setSection] = useState<Section>(null)

  return (
    <div className={styles.panel}>
      <aside className={styles.sidebar}>
        <button
          className={[styles.sideBtn, section === 'crosshair' ? styles.sideBtnActive : ''].join(' ')}
          onClick={() => setSection('crosshair')}
        >
          Добавить прицел
        </button>
        <button
          className={[styles.sideBtn, section === 'grenade' ? styles.sideBtnActive : ''].join(' ')}
          onClick={() => setSection('grenade')}
        >
          Добавить раскидку
        </button>
      </aside>
      <div className={styles.content}>
        {section === 'crosshair' && <CrosshairForm />}
        {section === 'grenade' && <GrenadeForm />}
        {section === null && (
          <p className={styles.hint}>Выберите раздел слева</p>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [pin, setPin] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('adminAuth') === '1'
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (pin === import.meta.env.VITE_ADMIN_PIN) {
      sessionStorage.setItem('adminAuth', '1')
      setIsAuthenticated(true)
    } else {
      setPin('')
    }
  }

  if (isAuthenticated) {
    return <AdminPanel />
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход в админку</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label} htmlFor="pin">
            Пин-код
          </label>
          <input
            id="pin"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className={styles.input}
            placeholder="••••"
            autoComplete="current-password"
          />
          <button type="submit" className={styles.button}>
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}
