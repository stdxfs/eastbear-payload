'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register plugins
gsap.registerPlugin(ScrollTrigger, useGSAP)

// Export for use across components
export { gsap, ScrollTrigger, useGSAP }

// Animation presets
export const animations = {
  fadeInUp: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    from: { opacity: 0, x: -30 },
    to: { opacity: 1, x: 0 },
  },
  slideInRight: {
    from: { opacity: 0, x: 30 },
    to: { opacity: 1, x: 0 },
  },
} as const

export type AnimationType = keyof typeof animations

// Default scroll trigger settings
export const defaultScrollTrigger: ScrollTrigger.Vars = {
  start: 'top 85%',
  end: 'bottom 15%',
  toggleActions: 'play none none none', // play once, no reverse
}
