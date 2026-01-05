'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'
import { LanguageSelector } from '../LanguageSelector'
import { WhatsAppLink } from '../WhatsAppLink'
import type { Header } from '@/payload-types'

interface TopBarProps {
  data: Header
}

export const TopBar: React.FC<TopBarProps> = ({ data }) => {
  const { topBar } = data

  const languages =
    topBar?.languages?.map((lang) => ({
      code: lang.code,
      label: lang.label,
      flag: lang.flag,
    })) || []

  return (
    <div className="bg-white border-b border-border/50">
      <div className="container py-3 flex items-center justify-between">
        {/* Logo - Left Side */}
        <Link href="/" className="flex-shrink-0">
          <Logo loading="eager" priority="high" />
        </Link>

        {/* Utility Items - Right Side */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          {languages.length > 0 && (
            <LanguageSelector
              languages={languages}
              defaultLanguage={topBar?.defaultLanguage || 'en'}
            />
          )}

          {/* WhatsApp Link */}
          {topBar?.phoneNumber && (
            <WhatsAppLink
              phoneNumber={topBar.phoneNumber}
              displayText={topBar.phoneDisplay || topBar.phoneNumber}
            />
          )}
        </div>
      </div>
    </div>
  )
}
