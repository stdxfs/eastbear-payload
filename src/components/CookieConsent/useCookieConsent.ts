"use client"

import { useState, useEffect, useCallback } from 'react'

const COOKIE_CONSENT_KEY = 'cookie-consent'

export interface CookieConsentState {
  accepted: boolean | null
  timestamp: string | null
}

export function useCookieConsent() {
  const [consent, setConsentState] = useState<CookieConsentState>({
    accepted: null,
    timestamp: null,
  })
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CookieConsentState
        setConsentState(parsed)
        setIsFirstVisit(false)
      } catch {
        // Invalid stored data, treat as first visit
        setIsFirstVisit(true)
      }
    } else {
      setIsFirstVisit(true)
    }
    setIsLoaded(true)
  }, [])

  const setConsent = useCallback((accepted: boolean) => {
    const newState: CookieConsentState = {
      accepted,
      timestamp: new Date().toISOString(),
    }
    setConsentState(newState)
    setIsFirstVisit(false)
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newState))
  }, [])

  const acceptAll = useCallback(() => {
    setConsent(true)
  }, [setConsent])

  const rejectAll = useCallback(() => {
    setConsent(false)
  }, [setConsent])

  return {
    consent,
    isFirstVisit,
    isLoaded,
    acceptAll,
    rejectAll,
  }
}
