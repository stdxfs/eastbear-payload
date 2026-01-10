'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Card, type CardPostData } from '@/components/Card'
import { Button } from '@/components/ui/button'
import { GSAPAnimate } from '@/components/ui/gsap-animate'

type PostCarouselProps = {
  posts: CardPostData[]
  showDots?: boolean
  autoPlay?: boolean
  autoPlayDelay?: number
  loop?: boolean
}

export const PostCarousel: React.FC<PostCarouselProps> = ({
  posts,
  showDots = false,
  autoPlay = false,
  autoPlayDelay = 4000,
  loop = true,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const plugins = autoPlay
    ? [Autoplay({ delay: autoPlayDelay, stopOnInteraction: true })]
    : []

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align: 'start',
      slidesToScroll: 1,
      containScroll: 'trimSnaps',
    },
    plugins,
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <GSAPAnimate animation="fadeInUp">
      <div className="container">
        <div
          className={cn(
            // Light theme: dark navy wrapper with rounded corners
            'bg-[#091620] py-12 px-8 rounded-2xl',
            // Dark theme: transparent
            'dark:bg-transparent dark:py-0 dark:px-0 dark:rounded-none',
          )}
        >
          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons - Desktop */}
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'absolute -left-4 top-1/2 -translate-y-1/2 z-10',
                'hidden md:flex',
                'rounded-full w-11 h-11 shadow-lg',
                'transition-all duration-300',
                // Light theme button styling
                'bg-white hover:bg-white/90 border-0 hover:scale-105',
                'dark:bg-card dark:hover:bg-muted dark:border-border',
                !canScrollPrev && !loop && 'opacity-50 cursor-not-allowed',
              )}
              onClick={scrollPrev}
              disabled={!canScrollPrev && !loop}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={cn(
                'absolute -right-4 top-1/2 -translate-y-1/2 z-10',
                'hidden md:flex',
                'rounded-full w-11 h-11 shadow-lg',
                'transition-all duration-300',
                // Light theme button styling
                'bg-white hover:bg-white/90 border-0 hover:scale-105',
                'dark:bg-card dark:hover:bg-muted dark:border-border',
                !canScrollNext && !loop && 'opacity-50 cursor-not-allowed',
              )}
              onClick={scrollNext}
              disabled={!canScrollNext && !loop}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Embla Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {posts.map((post, index) => (
                  <div
                    key={post.slug || index}
                    className={cn(
                      'flex-none',
                      // Responsive: 1 card mobile, 2 tablet, 3 desktop
                      'w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]',
                    )}
                  >
                    <Card className="h-full" doc={post} relationTo="posts" showCategories />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation (below carousel) */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'rounded-full w-11 h-11 shadow-lg',
                'transition-all duration-300',
                // Light theme button styling
                'bg-white hover:bg-white/90 border-0 hover:scale-105',
                'dark:bg-card dark:hover:bg-muted dark:border-border',
              )}
              onClick={scrollPrev}
              disabled={!canScrollPrev && !loop}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                'rounded-full w-11 h-11 shadow-lg',
                'transition-all duration-300',
                // Light theme button styling
                'bg-white hover:bg-white/90 border-0 hover:scale-105',
                'dark:bg-card dark:hover:bg-muted dark:border-border',
              )}
              onClick={scrollNext}
              disabled={!canScrollNext && !loop}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Dots Navigation */}
          {showDots && (
            <div className="flex justify-center gap-2 mt-4">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    selectedIndex === index
                      ? 'bg-primary w-4'
                      : 'bg-white/40 hover:bg-white/60 dark:bg-border dark:hover:bg-muted-foreground',
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </GSAPAnimate>
  )
}
