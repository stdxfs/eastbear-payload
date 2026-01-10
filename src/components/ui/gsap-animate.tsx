'use client'

import React, { useRef } from 'react'
import { gsap, useGSAP, animations, defaultScrollTrigger, type AnimationType } from '@/lib/gsap'

interface GSAPAnimateProps {
  children: React.ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
}

export const GSAPAnimate: React.FC<GSAPAnimateProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animConfig = animations[animation]

  useGSAP(
    () => {
      const element = containerRef.current
      if (!element) return

      gsap.fromTo(element, animConfig.from, {
        ...animConfig.to,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          ...defaultScrollTrigger,
        },
      })
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

// Stagger container for multiple children
interface GSAPStaggerProps {
  children: React.ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  stagger?: number
}

export const GSAPStagger: React.FC<GSAPStaggerProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  className,
  stagger = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animConfig = animations[animation]

  useGSAP(
    () => {
      const element = containerRef.current
      if (!element) return

      gsap.fromTo(element.children, animConfig.from, {
        ...animConfig.to,
        duration,
        delay,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          ...defaultScrollTrigger,
        },
      })
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
