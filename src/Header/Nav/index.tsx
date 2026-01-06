'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const navItems = data?.navItems || []

  return (
    <div className="bg-transparent">
      <div className="container py-3">
        <nav className="flex items-center justify-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="inline"
                className="text-sm font-medium text-foreground no-underline hover:text-brand-gold transition-colors"
              />
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation Dropdown */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            mobileMenuOpen ? 'max-h-96 opacity-100 pt-4' : 'max-h-0 opacity-0',
          )}
        >
          <div className="flex flex-col items-center gap-4 pb-4" onClick={() => setMobileMenuOpen(false)}>
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="inline"
                className="text-lg text-foreground no-underline hover:text-brand-gold transition-colors"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
