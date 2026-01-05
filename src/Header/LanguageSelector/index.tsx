'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Globe } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface Language {
  code: string
  label: string
  flag?: string | null
}

interface LanguageSelectorProps {
  languages: Language[]
  defaultLanguage?: string
  className?: string
}

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return ''
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  defaultLanguage = 'en',
  className,
}) => {
  const [currentLanguage, setCurrentLanguage] = React.useState(defaultLanguage)

  const handleLanguageChange = (value: string) => {
    setCurrentLanguage(value)
    // Future: Implement actual language switching with next-intl or similar
  }

  const currentLang = languages.find((l) => l.code === currentLanguage)

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger
        className={cn(
          'w-auto gap-2 border-none bg-transparent text-sm text-brand-gold hover:text-brand-gold/80 hover:bg-brand-gold/10 focus:ring-0 focus:ring-offset-0',
          className,
        )}
      >
        <Globe className="h-4 w-4" />
        <SelectValue>
          <span className="flex items-center gap-1">
            {currentLang?.flag && <span>{getFlagEmoji(currentLang.flag)}</span>}
            <span className="hidden sm:inline">{currentLang?.label}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <span className="flex items-center gap-2">
              {language.flag && <span>{getFlagEmoji(language.flag)}</span>}
              {language.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
