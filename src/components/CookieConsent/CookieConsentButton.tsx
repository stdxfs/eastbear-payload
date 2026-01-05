"use client"

import * as React from "react"
import { Cookie } from "lucide-react"
import { cn } from "@/utilities/ui"

interface CookieConsentButtonProps {
  onClick: () => void
  className?: string
}

export function CookieConsentButton({ onClick, className }: CookieConsentButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-5 left-5 z-50",
        "flex h-12 w-12 items-center justify-center",
        "rounded-full bg-primary text-primary-foreground",
        "shadow-lg hover:bg-primary/90",
        "transition-all duration-200 hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      aria-label="Cookie settings"
    >
      <Cookie className="h-6 w-6" />
    </button>
  )
}
