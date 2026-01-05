"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utilities/ui"

interface CookieConsentBannerProps {
  onAccept: () => void
  onReject: () => void
  className?: string
}

export function CookieConsentBanner({ onAccept, onReject, className }: CookieConsentBannerProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "animate-in slide-in-from-bottom duration-300",
        "border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        "p-4 shadow-lg",
        className
      )}
    >
      <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="text-sm text-foreground">
            We use cookies to enhance your browsing experience and analyze site traffic.
            By clicking &quot;Accept All&quot;, you consent to our use of cookies.
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={onReject}>
            Reject All
          </Button>
          <Button size="sm" onClick={onAccept}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  )
}
