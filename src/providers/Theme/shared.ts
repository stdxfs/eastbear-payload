import type { Theme } from './types'
import { defaultPalette, type PaletteKey } from '@/lib/palette-config'

export const themeLocalStorageKey = 'payload-theme'
export const paletteLocalStorageKey = 'eastbear-palette'

export const defaultTheme = 'light'

export { defaultPalette }
export type { PaletteKey }

export const getImplicitPreference = (): Theme | null => {
  const mediaQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(mediaQuery)
  const hasImplicitPreference = typeof mql.matches === 'boolean'

  if (hasImplicitPreference) {
    return mql.matches ? 'dark' : 'light'
  }

  return null
}
