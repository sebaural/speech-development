import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type Slide = {
  title: string
  subtitle?: string
  cta?: { text: string; href: string }
  avif?: string
  webp?: string
  png?: string
  mobilePng?: string // mobile-optimized PNG
  jpg?: string
  svg?: string
  objectPosition?: string
  mobileObjectPosition?: string // mobile-specific object position
}

export interface HeroProps {
  slides: Slide[]
  autoplay?: boolean
  heightClasses?: string
}

export default function Hero({
  slides,
  autoplay = true,
  heightClasses = 'h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[50vh]',
}: HeroProps) {
  const [index, setIndex] = useState(0)
  const total = slides.length
  const liveRef = useRef<HTMLDivElement | null>(null)
  const [interactionPaused, setInteractionPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // autoplay: advances slides unless interactionPaused and only if multiple slides
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (autoplay && !interactionPaused && total > 1) {
      intervalRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % total)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [interactionPaused, total, autoplay])

  return (
    <section className={`relative overflow-hidden bg-gradient-to-b from-white to-slate-50 ${heightClasses}`}>
      {/* Background (full-bleed) — cross-fades between slides that provide an image */}
      <AnimatePresence initial={false} mode="wait">
        {(slides[index].avif ||
          slides[index].webp ||
          slides[index].jpg ||
          slides[index].svg ||
          slides[index].png) && (
          <motion.div
            key={`bg-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-0 pointer-events-none flex items-stretch"
            aria-hidden
          >
            <picture className="absolute inset-0 w-full h-full">
              {/* Mobile-optimized image source */}
              {slides[index].mobilePng && (
                <source
                  srcSet={slides[index].mobilePng}
                  type="image/png"
                  media="(max-width: 640px)"
                />
              )}
              {slides[index].avif && <source srcSet={slides[index].avif} type="image/avif" />}
              {slides[index].webp && <source srcSet={slides[index].webp} type="image/webp" />}
              {slides[index].png && <source srcSet={slides[index].png} type="image/png" />}
              {slides[index].jpg && <source srcSet={slides[index].jpg} type="image/jpeg" />}
              {slides[index].svg && <source srcSet={slides[index].svg} type="image/svg+xml" />}
              <img
                src={
                  slides[index].mobilePng && window.innerWidth <= 640
                    ? slides[index].mobilePng
                    : slides[index].avif ||
                      slides[index].webp ||
                      slides[index].png ||
                      slides[index].jpg ||
                      slides[index].svg
                }
                alt=""
                className="absolute inset-0 w-full h-full object-cover sm:object-center object-top"
                style={{ objectPosition: window.innerWidth <= 640
                  ? slides[index].mobileObjectPosition || 'center'
                  : slides[index].objectPosition || 'center' }}
                sizes="(max-width: 640px) 100vw, 100vw"
              />
            </picture>
            <div className="absolute inset-0 bg-black/25" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-6xl px-6 h-full flex items-center text-center">
        <div
          className="relative w-full"
          role="region"
          aria-roledescription="carousel"
          aria-label="Hero carousel"
          tabIndex={0}
          ref={liveRef}
          onMouseEnter={() => setInteractionPaused(true)}
          onMouseLeave={() => setInteractionPaused(false)}
          onFocus={() => setInteractionPaused(true)}
          onBlur={() => setInteractionPaused(false)}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl font-bold text-primary">{slides[index].title}</h1>
              <p className="mt-4 text-lg text-slate-600">{slides[index].subtitle}</p>
              <div className="mt-8 flex justify-center gap-4">
                {slides[index].cta && (
                  <a
                    href={slides[index].cta.href}
                    className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-white shadow"
                  >
                    {slides[index].cta.text}
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls removed: previous/next buttons and indicators intentionally omitted */}

          {/* Live region for screen readers */}
          <div className="sr-only" aria-live="polite">
            {`Slide ${index + 1} of ${total}: ${slides[index].title}`}
          </div>
        </div>
      </div>
    </section>
  )
}