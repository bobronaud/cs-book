export type GrenadeType = 'smoke' | 'molotov' | 'flash'
export type Side = 'T' | 'CT'

export interface GrenadeLineup {
  id: string
  description: string
  side: Side
  type: GrenadeType
  map: string
  images: {
    stand: string
    aim: string
    result: string
  }
}

interface GrenadeMeta {
  description: string
  side: Side
  type: GrenadeType
  map: string
}

const metaModules = import.meta.glob('./grenades/*/meta.json', { eager: true })
const imageModules = import.meta.glob<string>(
  './grenades/*/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
)

function findImage(lineupId: string, name: 'stand' | 'aim' | 'result'): string {
  const pattern = new RegExp(`^\\./grenades/${lineupId}/${name}\\.(jpg|jpeg|png|webp)$`)
  const entry = Object.entries(imageModules).find(([path]) => pattern.test(path))
  return entry ? entry[1] : ''
}

export const grenadeLineups: GrenadeLineup[] = Object.entries(metaModules).map(([path, mod]) => {
  const id = path.match(/\.\/grenades\/(.+)\/meta\.json/)?.[1] ?? ''
  const meta = (mod as { default: GrenadeMeta }).default
  return {
    id,
    description: meta.description,
    side: meta.side,
    type: meta.type,
    map: meta.map,
    images: {
      stand: findImage(id, 'stand'),
      aim: findImage(id, 'aim'),
      result: findImage(id, 'result'),
    },
  }
})
