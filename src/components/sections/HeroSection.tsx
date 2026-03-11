import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { content } from '@/data/content'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { prefersReducedMotion } from '@/hooks/useGSAPScrollTrigger'

const titleLines = content.hero.title.split('\n')

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current

      if (!section) {
        return
      }

      if (prefersReducedMotion()) {
        gsap.set('[data-hero-bg], [data-hero-vignette], [data-hero-label], [data-hero-sub], [data-hero-cta], [data-hero-scroll], [data-hero-title] .line > span', {
          clearProps: 'all',
          opacity: 1,
          y: 0,
          scale: 1,
        })
        return
      }

      const timeline = gsap.timeline({ delay: 0.2 })

      timeline
        .from('[data-hero-bg]', { scale: 1.08, duration: 2, ease: 'power1.out' })
        .from('[data-hero-vignette]', { opacity: 0, duration: 1.6 }, '-=1.7')
        .from('[data-hero-label]', { opacity: 0, y: -18, duration: 0.8 }, '-=1.35')
        .from(
          '[data-hero-title] .line > span',
          { opacity: 0, yPercent: 120, stagger: 0.12, duration: 1, ease: 'expo.out' },
          '-=1.15',
        )
        .from('[data-hero-sub]', { opacity: 0, y: 24, duration: 0.8 }, '-=0.55')
        .from('[data-hero-cta] > *', { opacity: 0, y: 24, stagger: 0.1, duration: 0.72 }, '-=0.35')
        .from('[data-hero-scroll]', { opacity: 0, y: 16, duration: 0.65 }, '-=0.25')

      gsap.to('[data-hero-bg-wrap]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('[data-hero-copy]', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="top" className="relative min-h-[100svh] overflow-hidden pt-24">
      <div className="absolute inset-0" data-hero-bg-wrap>
        <ImagePlaceholder className="h-full w-full border-0" label="[HERO_BG]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.18)_0%,rgba(10,8,6,0.36)_28%,rgba(10,8,6,0.75)_72%,#0A0806_100%)]" data-hero-bg />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,rgba(201,169,110,0.15),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(245,239,228,0.08),transparent_24%)]" data-hero-vignette />
      </div>

      <div className="shell relative flex min-h-[100svh] flex-col justify-between pb-10 pt-16 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
        <div data-hero-copy className="grid items-end gap-8 md:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(15rem,0.42fr)] lg:gap-12">
          <div className="max-w-4xl space-y-7 sm:space-y-8">
            <span
              data-hero-label
              className="inline-flex border border-gold/20 bg-bg/30 px-4 py-2 text-[0.65rem] uppercase tracking-cinematic text-gold-soft/90 backdrop-blur-sm"
            >
              {content.hero.label}
            </span>

            <h1 data-hero-title className="display-title max-w-4xl text-[clamp(3.1rem,13vw,7.5rem)] text-cream">
              {titleLines.map((line) => (
                <span key={line} className="line block overflow-hidden">
                  <span className="block">{line}</span>
                </span>
              ))}
            </h1>

            <p data-hero-sub className="max-w-xl whitespace-pre-line text-base leading-8 text-gold-soft/82 sm:text-lg">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-hero-cta>
              <a href="#reservar" className="outline-button" aria-label={content.hero.ctaPrimary}>
                {content.hero.ctaPrimary}
              </a>
              <a href="#historia" className="eyebrow-link" aria-label={content.hero.ctaSecondary}>
                {content.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="flex min-h-[16rem] w-full max-w-[16rem] items-end justify-end border-r border-gold/16 pr-6">
              <span className="mb-8 h-20 w-px bg-gradient-to-b from-transparent via-gold/45 to-transparent" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div data-hero-scroll className="mt-14 flex items-center gap-4 text-[0.65rem] uppercase tracking-cinematic text-gold/80 sm:mt-16">
          <span className="relative block h-10 w-px overflow-hidden bg-gold/30">
            <span className="absolute left-0 top-0 h-4 w-px animate-[scrollCue_2.2s_ease-in-out_infinite] bg-gold" />
          </span>
          <a href="#historia" className="text-gold-soft/72 transition-colors duration-300 hover:text-cream" aria-label="Ir a nuestra historia">
            {content.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
