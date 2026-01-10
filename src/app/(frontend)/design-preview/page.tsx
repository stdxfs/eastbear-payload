'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { PaletteSwitcher } from '@/components/PaletteSwitcher'
import { palettes, type PaletteKey } from '@/lib/palette-config'

export default function DesignPreviewPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold palette-gradient-text">
            Design System Preview
          </h1>
          <p className="text-lg text-palette-text-secondary">
            Switchable color palettes with light/dark mode support
          </p>
        </div>

        {/* Theme/Palette Switcher */}
        <section className="flex justify-center">
          <PaletteSwitcher />
        </section>

        {/* Color Palette Display */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="h-16 rounded-card bg-palette-primary" />
              <p className="text-xs text-center text-palette-text-secondary">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-card bg-palette-accent" />
              <p className="text-xs text-center text-palette-text-secondary">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-card bg-palette-accent-light" />
              <p className="text-xs text-center text-palette-text-secondary">Accent Light</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-card bg-palette-secondary border" />
              <p className="text-xs text-center text-palette-text-secondary">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-card palette-gradient" />
              <p className="text-xs text-center text-palette-text-secondary">Gradient</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-card bg-palette-surface border shadow-palette-card" />
              <p className="text-xs text-center text-palette-text-secondary">Surface</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Buttons</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-palette-text-secondary">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="gradient">Gradient</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-palette-text-secondary">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="xl" variant="gradient">Extra Large</Button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription>Default card styling with palette shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Card content with the new design system styling.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="gradient">Action</Button>
              </CardFooter>
            </Card>

            <Card hover>
              <CardHeader>
                <CardTitle>Hover Card</CardTitle>
                <CardDescription>With hover lift effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Hover over me to see the lift effect!</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="accent">Click Me</Button>
              </CardFooter>
            </Card>

            <Card className="palette-gradient text-white">
              <CardHeader>
                <CardTitle className="text-white">Gradient Card</CardTitle>
                <CardDescription className="text-white/80">With gradient background</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/90">A premium styled card with gradient background.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/20">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Form Inputs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Input</label>
              <Input placeholder="Enter text..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Filled Input</label>
              <Input variant="filled" placeholder="Filled style..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Underline Input</label>
              <Input variant="underline" placeholder="Underline style..." />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Textarea</label>
              <Textarea placeholder="Enter your message..." />
            </div>
            <div className="space-y-4">
              <label className="text-sm font-medium">Checkboxes</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="check1" />
                  <label htmlFor="check1" className="text-sm">Option 1</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="check2" defaultChecked />
                  <label htmlFor="check2" className="text-sm">Option 2 (checked)</label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Typography</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h1 className="text-4xl font-bold">Heading 1 (4xl)</h1>
              <h2 className="text-3xl font-bold">Heading 2 (3xl)</h2>
              <h3 className="text-2xl font-semibold">Heading 3 (2xl)</h3>
              <h4 className="text-xl font-semibold">Heading 4 (xl)</h4>
              <p className="text-base text-palette-text-primary">Body text (base) - Primary color</p>
              <p className="text-sm text-palette-text-secondary">Small text (sm) - Secondary color</p>
              <p className="text-xs text-palette-text-muted">Extra small text (xs) - Muted color</p>
              <p className="text-lg palette-gradient-text font-bold">Gradient text styling</p>
            </CardContent>
          </Card>
        </section>

        {/* Shadows */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Shadows</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-palette-surface rounded-card shadow-palette-card text-center">
              <p className="text-sm font-medium">Card Shadow</p>
              <p className="text-xs text-palette-text-muted">shadow-palette-card</p>
            </div>
            <div className="p-6 bg-palette-surface rounded-card shadow-palette-button text-center">
              <p className="text-sm font-medium">Button Shadow</p>
              <p className="text-xs text-palette-text-muted">shadow-palette-button</p>
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Palette Info</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(Object.keys(palettes) as PaletteKey[]).map((key) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle>{palettes[key].name}</CardTitle>
                  <CardDescription>{palettes[key].description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {Object.entries(palettes[key].colors).map(([colorName, colorValue]) => (
                      <div key={colorName} className="text-center">
                        <div
                          className="w-10 h-10 rounded-full border"
                          style={{ backgroundColor: colorValue }}
                        />
                        <p className="text-xs mt-1 text-palette-text-muted">{colorName}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t">
          <p className="text-sm text-palette-text-muted">
            Design System Preview - Switch palettes and themes above to see changes
          </p>
        </footer>
      </div>
    </div>
  )
}
