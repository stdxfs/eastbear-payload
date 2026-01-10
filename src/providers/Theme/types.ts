import type { PaletteKey } from '@/lib/palette-config'

export type Theme = 'dark' | 'light'

export interface ThemeContextType {
  setTheme: (theme: Theme | null) => void
  theme?: Theme | null
  // Palette support
  palette?: PaletteKey | null
  setPalette: (palette: PaletteKey | null) => void
}

export function themeIsValid(string: null | string): string is Theme {
  return string ? ['dark', 'light'].includes(string) : false
}
