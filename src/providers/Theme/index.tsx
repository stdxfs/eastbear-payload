'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import {
  defaultTheme,
  defaultPalette,
  getImplicitPreference,
  themeLocalStorageKey,
  paletteLocalStorageKey,
  type PaletteKey,
} from './shared'
import { themeIsValid } from './types'
import { paletteIsValid } from '@/lib/palette-config'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
  palette: undefined,
  setPalette: () => null,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme | undefined>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined,
  )

  const [palette, setPaletteState] = useState<PaletteKey | undefined>(
    canUseDOM
      ? (document.documentElement.getAttribute('data-palette') as PaletteKey) || defaultPalette
      : undefined,
  )

  const setTheme = useCallback((themeToSet: Theme | null) => {
    if (themeToSet === null) {
      window.localStorage.removeItem(themeLocalStorageKey)
      const implicitPreference = getImplicitPreference()
      document.documentElement.setAttribute('data-theme', implicitPreference || '')
      if (implicitPreference) setThemeState(implicitPreference)
    } else {
      setThemeState(themeToSet)
      window.localStorage.setItem(themeLocalStorageKey, themeToSet)
      document.documentElement.setAttribute('data-theme', themeToSet)
    }
  }, [])

  const setPalette = useCallback((paletteToSet: PaletteKey | null) => {
    if (paletteToSet === null) {
      window.localStorage.removeItem(paletteLocalStorageKey)
      document.documentElement.setAttribute('data-palette', defaultPalette)
      setPaletteState(defaultPalette)
    } else {
      setPaletteState(paletteToSet)
      window.localStorage.setItem(paletteLocalStorageKey, paletteToSet)
      document.documentElement.setAttribute('data-palette', paletteToSet)
    }
  }, [])

  useEffect(() => {
    // Initialize theme
    let themeToSet: Theme = defaultTheme
    const themePreference = window.localStorage.getItem(themeLocalStorageKey)

    if (themeIsValid(themePreference)) {
      themeToSet = themePreference
    } else {
      const implicitPreference = getImplicitPreference()
      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet)
    setThemeState(themeToSet)

    // Initialize palette
    let paletteToSet: PaletteKey = defaultPalette
    const palettePreference = window.localStorage.getItem(paletteLocalStorageKey)

    if (paletteIsValid(palettePreference)) {
      paletteToSet = palettePreference
    }

    document.documentElement.setAttribute('data-palette', paletteToSet)
    setPaletteState(paletteToSet)
  }, [])

  return (
    <ThemeContext value={{ setTheme, theme, palette, setPalette }}>{children}</ThemeContext>
  )
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
