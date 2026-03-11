import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { GoldDivider } from '@/components/ui/GoldDivider'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { content } from '@/data/content'
import { prefersReducedMotion } from '@/hooks/useGSAPScrollTrigger'

function formatStatValue(value: number, decimals = 0) {
  if (decimals > 0) {
    return (value / 10 ** decimals).toFixed(decimals)
  }

  return new Intl.NumberFormat('es-AR').format(value)
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current

      if (!section) {
        return
      }

      if (prefersReducedMotion()) {
        return
      }

      gsap.from('[data-about-copy] > *', {
        opacity: 0,
        y: 34,
        duration: 0.95,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
        },
      })

      gsap.from('[data-about-stats] article', {
        opacity: 0,
        y: 42,
        stagger: 0.12,
        duration: 0.95,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-about-stats]',
          start: 'top 82%',
        },
      })

      gsap.to('[data-about-img]', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.utils.toArray<HTMLElement>('[data-stat-value]').forEach((element) => {
        const value = Number(element.dataset.value ?? '0')
        const decimals = Number(element.dataset.decimals ?? '0')
        const prefix = element.dataset.prefix ?? ''
        const suffix = element.dataset.suffix ?? ''

        gsap.fromTo(
          element,
          { statValue: 0 },
          {
            statValue: value,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
            },
            onUpdate() {
              const currentValue = gsap.getProperty(element, 'statValue')
              const displayValue = Number.isFinite(currentValue) ? Number(currentValue) : 0
              element.textContent = `${prefix}${formatStatValue(displayValue, decimals)}${suffix}`
            },
          },
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="historia" className="section-shell" data-about-section>
      <div className="shell section-grid items-start">
        <div data-about-copy className="space-y-8 lg:pr-10">
          <SectionLabel>{content.about.label}</SectionLabel>
          <GoldDivider className="max-w-28" />
          <h2 className="section-title max-w-xl whitespace-pre-line">{content.about.title}</h2>
          <p className="max-w-xl whitespace-pre-line text-lg leading-8 text-gold-soft/82">{content.about.subtitle}</p>
          <p className="max-w-xl whitespace-pre-line body-copy">{content.about.body}</p>
          <p className="max-w-md border-l border-gold/30 pl-5 whitespace-pre-line font-display text-2xl font-light italic leading-9 text-cream/90 sm:pl-7 sm:text-[2rem]">
            {content.about.quote}
          </p>
        </div>

          <div className="space-y-8 lg:-mt-10">
          <div className="relative overflow-hidden atmospheric-card p-3">
            <div className="absolute left-4 top-4 h-16 w-16 rounded-full border border-gold/20" aria-hidden="true" />
            <div data-about-img className="relative">
              <ImagePlaceholder className="aspect-[4/5] w-full" label="[ABOUT_IMG]" />
              <div className="pointer-events-none absolute inset-3 bg-[linear-gradient(180deg,rgba(10,8,6,0)_0%,rgba(10,8,6,0.18)_55%,rgba(10,8,6,0.6)_100%)]" />
            </div>
          </div>

          <div data-about-stats className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.about.stats.map((stat) => {
              const decimals = 'decimals' in stat ? stat.decimals : 0

              return (
                <article key={stat.label} className="atmospheric-card min-h-[10.5rem] p-5 sm:min-h-[11rem] sm:p-6">
                  <p className="mb-3 text-[0.65rem] uppercase tracking-cinematic text-gold/80">{content.about.label}</p>
                  <p className="font-display text-4xl font-light text-cream sm:text-[2.8rem]">
                    <span
                      data-stat-value
                      data-value={stat.value}
                      data-decimals={decimals}
                      data-prefix={stat.prefix}
                      data-suffix={stat.suffix}
                    >
                      {`${stat.prefix}${formatStatValue(stat.value, decimals)}${stat.suffix}`}
                    </span>
                  </p>
                  <p className="mt-4 text-sm leading-6 text-gold-soft/68">{stat.label}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
