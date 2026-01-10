'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { ItinerarySearchBar } from '@/components/ItinerarySearchBar'
import RichText from '@/components/RichText'
import { gsap, useGSAP } from '@/lib/gsap'

export const HomePageHero: React.FC<Page['hero']> = ({ media, airlineLogos, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  useGSAP(
    () => {
      // Set initial states
      gsap.set('.hero-bg', { opacity: 0, scale: 1.05 })
      gsap.set('.hero-title', { opacity: 0, y: 30 })
      gsap.set('.hero-logo', { opacity: 0, scale: 0.9 })
      gsap.set('.hero-search', { opacity: 0, y: 30 })

      const tl = gsap.timeline({ delay: 0.1 })

      // Background image fade and scale in
      tl.to('.hero-bg', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      })
        // Title fade in and slide up
        .to(
          '.hero-title',
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          },
          '-=0.5',
        )
        // Airline logos stagger in
        .to(
          '.hero-logo',
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.3',
        )
        // Search bar slide up
        .to(
          '.hero-search',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2',
        )
    },
    { scope: heroRef },
  )

  return (
    <div
      ref={heroRef}
      className="relative -mt-[10.4rem] text-white min-h-screen overflow-hidden bg-transparent"
      data-theme="dark"
    >
      {media && typeof media === 'object' && (
        <div className="hero-bg absolute inset-0 select-none">
          <Media
            fill
            imgClassName="object-cover"
            videoClassName="absolute inset-0 w-full h-full object-cover"
            priority
            resource={media}
          />
        </div>
      )}

      <div className="container relative z-10 flex flex-col items-center justify-center gap-6 min-h-screen pt-24 pb-16">
        {richText && (
          <div className="hero-title max-w-3xl text-center">
            <RichText className="font-[Times]" data={richText} enableGutter={false} />
          </div>
        )}

        {/* Airline Logos */}
        {Array.isArray(airlineLogos) && airlineLogos.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mb-16 md:mb-20">
            {airlineLogos.map((item, i) => (
              <div
                key={i}
                className="hero-logo h-[30px] rounded-lg flex items-center justify-center"
                title={item.name || undefined}
              >
                {item.logo && typeof item.logo === 'object' && (
                  <Media
                    resource={item.logo}
                    imgClassName="h-full w-auto object-contain grayscale brightness-125 contrast-110"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Itinerary Search Bar */}
        <div className="hero-search w-full max-w-[1280px]">
          <ItinerarySearchBar />
        </div>
      </div>
    </div>
  )
}
