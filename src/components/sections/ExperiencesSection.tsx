import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowUpRight, Clock3, Coffee, MapPin, Waves } from 'lucide-react'

import { GoldDivider } from '@/components/ui/GoldDivider'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { content } from '@/data/content'
import type { ExperienceItem } from '@/data/content'
import { prefersReducedMotion } from '@/hooks/useGSAPScrollTrigger'

const iconMap: Record<ExperienceItem['icon'], typeof Coffee> = {
  Clock3,
  Coffee,
  MapPin,
  Waves,
}

export function ExperiencesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current

      if (!section || prefersReducedMotion()) {
        return
      }

      gsap.from('[data-experiences-copy] > *', {
        opacity: 0,
        y: 34,
        stagger: 0.1,
        duration: 0.95,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
        },
      })

      gsap.from('[data-experience-card]', {
        opacity: 0,
        y: 56,
        stagger: 0.14,
        duration: 1.05,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-experiences-grid]',
          start: 'top 82%',
        },
      })

      gsap.from('[data-experience-icon]', {
        scale: 0.88,
        opacity: 0,
        stagger: 0.12,
        duration: 0.78,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-experiences-grid]',
          start: 'top 82%',
        },
      })

      gsap.to('[data-experiences-bg]', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="experiencias" className="section-shell relative overflow-hidden bg-surface/55">
      <div className="absolute inset-0" data-experiences-bg>
        <ImagePlaceholder className="h-full w-full border-0 opacity-30" label="[EXPERIENCES_BG]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(201,169,110,0.16),transparent_26%),radial-gradient(circle_at_82%_68%,rgba(245,239,228,0.08),transparent_24%),linear-gradient(135deg,rgba(10,8,6,0.28),rgba(10,8,6,0.84))]" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-[8%] hidden w-px bg-gold/10 lg:block" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[10%] top-24 hidden h-40 w-40 rounded-full border border-gold/10 lg:block" aria-hidden="true" />

      <div className="shell relative space-y-14 lg:space-y-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(18rem,0.48fr)] lg:items-start lg:gap-16">
          <div data-experiences-copy className="space-y-7 lg:pl-8">
            <SectionLabel>{content.experiences.label}</SectionLabel>
            <GoldDivider className="max-w-28" />
            <h2 className="section-title max-w-3xl whitespace-pre-line">{content.experiences.title}</h2>
            <p className="max-w-2xl whitespace-pre-line text-lg leading-8 text-gold-soft/80">
              {content.experiences.subtitle}
            </p>
          </div>

          <div
            className="space-y-5 border-t border-gold/15 pt-6 lg:self-end lg:border-l lg:border-t-0 lg:pt-0 lg:pl-8"
            data-experiences-copy
          >
            <p className="font-display text-2xl font-light italic leading-9 text-gold-soft/88 sm:text-[2rem]">
              {content.experiences.quote}
            </p>
            <a href="#reservar" className="eyebrow-link" aria-label={content.experiences.cta}>
              {content.experiences.cta}
            </a>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:items-stretch" data-experiences-grid>
          {content.experiences.items.map((item, index) => {
            const Icon = iconMap[item.icon]

            return (
              <article
                key={item.title}
                className="group atmospheric-card relative flex h-full flex-col overflow-hidden p-6 sm:p-8"
                data-experience-card
                data-cursor-hover
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(201,169,110,0.08),transparent_38%,rgba(10,8,6,0.2))] opacity-70 transition duration-700 group-hover:opacity-100" />
                <div className="pointer-events-none absolute right-5 top-5 h-16 w-16 rounded-full border border-gold/10 transition duration-700 group-hover:scale-110 group-hover:border-gold/20" />

                <div className="relative flex items-start justify-between gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-bg/45 text-gold"
                    data-experience-icon
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <span className="text-[0.65rem] uppercase tracking-cinematic text-gold-soft/40">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="relative mt-8 flex-1 space-y-4">
                  <h3 className="font-display text-[2.1rem] font-light leading-none text-cream sm:text-[2.45rem]">
                    {item.title}
                  </h3>
                  <p className="max-w-md whitespace-pre-line text-sm leading-7 text-gold-soft/76">{item.body}</p>
                </div>

                <div className="relative mt-8 flex items-center justify-between border-t border-gold/10 pt-5 text-[0.65rem] uppercase tracking-cinematic text-gold/72">
                  <span>{content.experiences.label}</span>
                  <ArrowUpRight className="h-4 w-4 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
