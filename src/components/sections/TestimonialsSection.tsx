import { useMemo, useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Star } from 'lucide-react'

import { GoldDivider } from '@/components/ui/GoldDivider'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { content } from '@/data/content'
import { prefersReducedMotion } from '@/hooks/useGSAPScrollTrigger'

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const carouselItems = useMemo(() => content.testimonials.items, [])

  useGSAP(
    () => {
      const section = sectionRef.current
      const track = trackRef.current
      let cleanupLoop = () => undefined

      if (!section) {
        return
      }

      if (track && !prefersReducedMotion()) {
        const primaryGroup = track.querySelector<HTMLElement>('[data-testimonials-group="primary"]')

        if (primaryGroup) {
          const getLoopDistance = () => primaryGroup.offsetWidth
          const loopSpeed = 110
          const loopTween = gsap.fromTo(
            track,
            { x: 0 },
            {
              x: () => -getLoopDistance(),
              duration: () => getLoopDistance() / loopSpeed,
              ease: 'none',
              repeat: -1,
              overwrite: true,
            },
          )

          const pauseLoop = () => loopTween.pause()
          const resumeLoop = () => loopTween.resume()
          const refreshLoop = () => loopTween.invalidate().restart()

          track.addEventListener('mouseenter', pauseLoop)
          track.addEventListener('mouseleave', resumeLoop)
          track.addEventListener('focusin', pauseLoop)
          track.addEventListener('focusout', resumeLoop)
          window.addEventListener('resize', refreshLoop)

          cleanupLoop = () => {
            track.removeEventListener('mouseenter', pauseLoop)
            track.removeEventListener('mouseleave', resumeLoop)
            track.removeEventListener('focusin', pauseLoop)
            track.removeEventListener('focusout', resumeLoop)
            window.removeEventListener('resize', refreshLoop)
            loopTween.kill()
          }
        }
      }

      if (prefersReducedMotion()) {
        return cleanupLoop
      }

      gsap.from('[data-testimonials-copy] > *', {
        opacity: 0,
        y: 34,
        stagger: 0.1,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
        },
      })

      gsap.from('[data-testimonial-card]', {
        opacity: 0,
        y: 42,
        stagger: 0.12,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-testimonials-track]',
          start: 'top 84%',
        },
      })

      gsap.utils.toArray<HTMLElement>('[data-stars]').forEach((stars) => {
        gsap.from(stars.children, {
          opacity: 0,
          scale: 0.6,
          y: 8,
          stagger: 0.07,
          duration: 0.42,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stars,
            start: 'top 90%',
          },
        })
      })

      return cleanupLoop
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="resenas" className="section-shell relative overflow-hidden bg-cream text-bg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,110,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_30%,rgba(10,8,6,0.04)_100%)]" />

      <div className="shell relative space-y-12 lg:space-y-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(16rem,0.48fr)] lg:items-end">
          <div className="space-y-6" data-testimonials-copy>
            <SectionLabel className="text-bg [&>span:last-child]:text-bg [&>span:first-child]:bg-bg/30">
              {content.testimonials.label}
            </SectionLabel>
            <GoldDivider className="max-w-28 bg-bg/25" />
            <h2 className="section-title max-w-3xl whitespace-pre-line text-bg">{content.testimonials.title}</h2>
          </div>

          <p
            className="max-w-md border-l border-bg/12 pl-0 font-display text-2xl font-light italic leading-9 text-bg/72 lg:pl-8"
            data-testimonials-copy
          >
            {content.testimonials.quote}
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-[linear-gradient(90deg,#F5EFE4,rgba(245,239,228,0))] lg:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-[linear-gradient(270deg,#F5EFE4,rgba(245,239,228,0))] lg:block" />

          <div className="overflow-hidden pb-5" role="region" aria-label={content.testimonials.label} aria-roledescription="carousel">
            <div ref={trackRef} className="flex w-max" data-testimonials-track tabIndex={0}>
              {[false, true].map((isDuplicate) => (
                <div
                  key={isDuplicate ? 'duplicate' : 'primary'}
                  className="flex shrink-0 gap-5 pr-5"
                  data-testimonials-group={isDuplicate ? 'duplicate' : 'primary'}
                  aria-hidden={isDuplicate}
                  role="list"
                >
                  {carouselItems.map((item, index) => (
                    <article
                      key={`${isDuplicate ? 'duplicate' : 'primary'}-${item.author}-${index}`}
                      className="min-w-[18.5rem] border border-bg/10 bg-white/72 p-6 shadow-[0_24px_80px_rgba(10,8,6,0.08)] backdrop-blur-sm sm:min-w-[22rem] lg:min-w-[25rem]"
                      data-testimonial-card={!isDuplicate ? true : undefined}
                      data-cursor-hover
                      role="listitem"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <ImagePlaceholder
                            className="h-12 w-12 shrink-0 rounded-full border-bg/10 bg-[#ddd6c9] px-1 text-[0.42rem] tracking-[0.18em] text-bg/42 before:hidden"
                            label={item.slot}
                          />

                          <div>
                            <p className="font-medium text-bg">{item.author}</p>
                            <p className="text-sm text-bg/58">{item.city}</p>
                          </div>
                        </div>

                        <span className="text-[0.65rem] uppercase tracking-cinematic text-bg/28">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                      </div>

                      <div className="mt-8 flex gap-1 text-gold" data-stars={!isDuplicate ? true : undefined} aria-label={`${item.rating} estrellas`}>
                        {Array.from({ length: item.rating }).map((_, starIndex) => (
                          <Star key={`${item.author}-${starIndex}`} className="h-4 w-4 fill-current" aria-hidden="true" />
                        ))}
                      </div>

                      <p className="mt-6 whitespace-pre-line font-display text-[1.95rem] font-light leading-[1.08] text-bg sm:text-[2.2rem]">
                        "{item.quote}"
                      </p>

                      <div className="mt-8 border-t border-bg/10 pt-5 text-[0.65rem] uppercase tracking-cinematic text-bg/42">
                        {content.testimonials.label}
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
