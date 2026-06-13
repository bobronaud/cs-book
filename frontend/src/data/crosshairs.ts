export interface CrosshairItem {
  id: string
  code: string
  image: string
}

interface CrosshairMeta {
  code: string
}

const metaModules = import.meta.glob('./crosshairs/*/meta.json', { eager: true })
const imageModules = import.meta.glob<string>(
  './crosshairs/*/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
)

export const crosshairs: CrosshairItem[] = Object.entries(metaModules).map(([path, mod]) => {
  const id = path.match(/\.\/crosshairs\/(.+)\/meta\.json/)?.[1] ?? ''
  const meta = (mod as { default: CrosshairMeta }).default
  const imageEntry = Object.entries(imageModules).find(([imgPath]) =>
    imgPath.startsWith(`./crosshairs/${id}/`)
  )
  return {
    id,
    code: meta.code,
    image: imageEntry ? imageEntry[1] : '',
  }
})
