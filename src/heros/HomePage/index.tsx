'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { ItinerarySearchBar } from '@/components/ItinerarySearchBar'
import RichText from '@/components/RichText'

export const HomePageHero: React.FC<Page['hero']> = ({ media, airlineLogos, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div
      className="relative -mt-[10.4rem] text-white min-h-[70vh] md:min-h-[72vh] overflow-hidden"
      data-theme="dark"
    >
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 select-none">
          <Media
            fill
            imgClassName="object-cover"
            videoClassName="absolute inset-0 w-full h-full object-cover"
            priority
            resource={media}
          />
        </div>
      )}

      <div className="container relative z-10 flex flex-col items-center justify-start gap-6 pt-24 pb-16 md:pt-28">
        {richText && (
          <div className="max-w-3xl text-center">
            <RichText className="font-[Times]" data={richText} enableGutter={false} />
          </div>
        )}

        {/* Airline Logos */}
        {Array.isArray(airlineLogos) && airlineLogos.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mb-16 md:mb-20">
            {airlineLogos.map((item, i) => (
              <div
                key={i}
                className=" h-[30px] rounded-lg flex items-center justify-center"
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
        <div className="w-full max-w-[1280px]">
          <ItinerarySearchBar />
        </div>
      </div>
    </div>
  )
}
