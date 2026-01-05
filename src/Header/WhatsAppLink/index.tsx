'use client'

import React from 'react'
import { Phone } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface WhatsAppLinkProps {
  phoneNumber: string
  displayText?: string
  className?: string
}

export const WhatsAppLink: React.FC<WhatsAppLinkProps> = ({
  phoneNumber,
  displayText,
  className,
}) => {
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '')
  const whatsappUrl = `https://wa.me/${cleanNumber.replace('+', '')}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-2 text-sm text-brand-gold hover:text-brand-gold/80 transition-colors',
        className,
      )}
      aria-label={`Contact us on WhatsApp at ${displayText || phoneNumber}`}
    >
      <Phone className="h-4 w-4" />
      <span className="hidden sm:inline">{displayText || phoneNumber}</span>
    </a>
  )
}
