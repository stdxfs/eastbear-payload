/**
 * Palette Configuration
 * Defines switchable color palettes for the design system
 */

export const palettes = {
  custom: {
    name: 'Forest Amber',
    description: 'Forest green with amber accents - warm and natural',
    colors: {
      primary: '#004225',
      primaryHover: '#00301A',
      secondary: '#F5F5DC',
      accent: '#FFB000',
      accentLight: '#FFCF9D',
    },
  },
  tbc: {
    name: 'TravelBusinessClass',
    description: 'Purple and magenta gradient - premium luxury',
    colors: {
      primary: '#590C32',
      primaryHover: '#3D0822',
      secondary: '#F4F6F7',
      accent: '#9D1D5A',
      accentLight: '#4A94EC',
    },
  },
} as const

export type PaletteKey = keyof typeof palettes
export type Palette = (typeof palettes)[PaletteKey]

export const paletteKeys = Object.keys(palettes) as PaletteKey[]

export const defaultPalette: PaletteKey = 'custom'

export const paletteLocalStorageKey = 'eastbear-palette'

/**
 * Get palette configuration by key
 */
export function getPalette(key: PaletteKey): Palette {
  return palettes[key]
}

/**
 * Check if a string is a valid palette key
 */
export function paletteIsValid(value: string | null): value is PaletteKey {
  return value !== null && paletteKeys.includes(value as PaletteKey)
}
