export interface CrosshairParams {
  size: number
  gap: number
  thickness: number
  dot: boolean
  tStyle: boolean
  color: string
  outline: boolean
  outlineThickness: number
  alpha: number
}

export interface Crosshair {
  id: string
  code: string
  params: CrosshairParams
}

interface CrosshairFile {
  code: string
  params: CrosshairParams
}

const modules = import.meta.glob<{ default: CrosshairFile }>(
  './crosshairs/*.json',
  { eager: true }
)

export const crosshairs: Crosshair[] = Object.entries(modules).map(([path, mod]) => {
  const id = path.match(/\.\/crosshairs\/(.+)\.json/)?.[1] ?? ''
  return {
    id,
    code: mod.default.code,
    params: mod.default.params,
  }
})
