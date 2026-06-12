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
  name: string
  code: string
  params: CrosshairParams
}

export const crosshairs: Crosshair[] = [
  {
    id: 'classic',
    name: 'Классический',
    code: 'CSGO-BnkLB-P45UP-EFmGR-xWaXD-FqWPA',
    params: {
      size: 14,
      gap: 4,
      thickness: 2,
      dot: false,
      tStyle: false,
      color: '#ffffff',
      outline: false,
      outlineThickness: 1,
      alpha: 255,
    },
  },
  {
    id: 'dot-only',
    name: 'Точка',
    code: 'CSGO-YKz7a-rQmVC-3XWBP-NdLHT-Gb2EA',
    params: {
      size: 0,
      gap: 0,
      thickness: 2,
      dot: true,
      tStyle: false,
      color: '#00ff7f',
      outline: true,
      outlineThickness: 1,
      alpha: 255,
    },
  },
  {
    id: 't-style',
    name: 'T-стиль',
    code: 'CSGO-RvtJW-5mKnQ-LXpDA-2HcGe-MqBUA',
    params: {
      size: 12,
      gap: 3,
      thickness: 2,
      dot: false,
      tStyle: true,
      color: '#00cfff',
      outline: false,
      outlineThickness: 1,
      alpha: 255,
    },
  },
  {
    id: 'small-pro',
    name: 'Маленький',
    code: 'CSGO-HwCmP-xT9vK-VR3nL-Bq7eZ-DpYFA',
    params: {
      size: 6,
      gap: 2,
      thickness: 1.5,
      dot: true,
      tStyle: false,
      color: '#f0a500',
      outline: true,
      outlineThickness: 1,
      alpha: 220,
    },
  },
  {
    id: 'large',
    name: 'Большой',
    code: 'CSGO-TnKpW-4Xr2Q-JbMeA-GcHvL-NfUDA',
    params: {
      size: 20,
      gap: 6,
      thickness: 3,
      dot: false,
      tStyle: false,
      color: '#ff4d4d',
      outline: true,
      outlineThickness: 1.5,
      alpha: 200,
    },
  },
  {
    id: 'sniper',
    name: 'Снайперский',
    code: 'CSGO-KrQxD-8GpWN-Mb5eV-FtLcA-HnJUA',
    params: {
      size: 18,
      gap: 8,
      thickness: 1,
      dot: true,
      tStyle: false,
      color: '#ffffff',
      outline: false,
      outlineThickness: 1,
      alpha: 180,
    },
  },
]
