'use client'

import React from 'react'
import { useTheme } from '@/providers/Theme'
import { palettes, type PaletteKey } from '@/lib/palette-config'
import { cn } from '@/utilities/ui'

export const PaletteSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { palette, setPalette, theme, setTheme } = useTheme()

  return (
    <div className={cn('flex flex-col gap-4 p-4 rounded-card bg-card shadow-palette-card', className)}>
      {/* Palette Switcher */}
      <div>
        <h3 className="text-sm font-semibold mb-2 text-palette-text-secondary">Color Palette</h3>
        <div className="flex gap-2">
          {(Object.keys(palettes) as PaletteKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setPalette(key)}
              className={cn(
                'px-4 py-2 rounded-pill text-sm font-medium transition-all',
                palette === key
                  ? 'palette-gradient text-white shadow-palette-button'
                  : 'bg-palette-secondary text-palette-text-primary hover:bg-palette-border'
              )}
            >
              {palettes[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Switcher */}
      <div>
        <h3 className="text-sm font-semibold mb-2 text-palette-text-secondary">Theme Mode</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setTheme('light')}
            className={cn(
              'px-4 py-2 rounded-pill text-sm font-medium transition-all',
              theme === 'light'
                ? 'bg-palette-primary text-white'
                : 'bg-palette-secondary text-palette-text-primary hover:bg-palette-border'
            )}
          >
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={cn(
              'px-4 py-2 rounded-pill text-sm font-medium transition-all',
              theme === 'dark'
                ? 'bg-palette-primary text-white'
                : 'bg-palette-secondary text-palette-text-primary hover:bg-palette-border'
            )}
          >
            Dark
          </button>
        </div>
      </div>
    </div>
  )
}
