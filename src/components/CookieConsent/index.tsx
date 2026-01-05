"use client"

import * as React from "react"
import { useState } from "react"
import { CookieConsentBanner } from "./CookieConsentBanner"
import { CookieConsentButton } from "./CookieConsentButton"
import { CookieConsentDialog } from "./CookieConsentDialog"
import { useCookieConsent } from "./useCookieConsent"

export function CookieConsent() {
  const { consent, isFirstVisit, isLoaded, acceptAll, rejectAll } = useCookieConsent()
  const [dialogOpen, setDialogOpen] = useState(false)

  // Don't render anything until we've loaded from localStorage
  if (!isLoaded) {
    return null
  }

  const hasConsented = consent.accepted === true

  return (
    <>
      {/* Show banner on first visit */}
      {isFirstVisit && (
        <CookieConsentBanner onAccept={acceptAll} onReject={rejectAll} />
      )}

      {/* Show floating button after user has made a choice */}
      {!isFirstVisit && (
        <CookieConsentButton onClick={() => setDialogOpen(true)} />
      )}

      {/* Dialog for managing preferences */}
      <CookieConsentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAccept={acceptAll}
        onReject={rejectAll}
        hasConsented={hasConsented}
      />
    </>
  )
}
