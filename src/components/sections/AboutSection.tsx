import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import aboutImage from '@/assets/about.webp'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { content } from '@/data/content'
import { prefersReducedMotion } from '@/hooks/useGSAPScrollTrigger'

function formatStatValue(value: number, decimals = 0) {
  if (decimals > 0) {
    return (Math.round(value) / 10 ** decimals).toFixed(decimals)
  }

  return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(Math.round(value))
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
          once: true,
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
        const card = element.closest('article')
        const counter = { value: 0 }

        element.textContent = `${prefix}${formatStatValue(counter.value, decimals)}`

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card ?? element,
            start: 'top 86%',
            once: true,
          },
        })

        timeline.fromTo(
          element,
          { yPercent: 8, opacity: 0 },
          {
            duration: 1.2,
            yPercent: 0,
            opacity: 1,
            ease: 'power2.out',
          },
          0,
        )

        timeline.to(
          counter,
          {
            value,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate() {
              element.textContent = `${prefix}${formatStatValue(counter.value, decimals)}`
            },
            onComplete() {
              element.textContent = `${prefix}${formatStatValue(value, decimals)}`
            },
          },
          0,
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
              <img
                src={aboutImage}
                alt="Interior del Hotel California con luz cálida y detalles refinados"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-3 bg-[linear-gradient(180deg,rgba(10,8,6,0)_0%,rgba(10,8,6,0.18)_55%,rgba(10,8,6,0.6)_100%)]" />
            </div>
          </div>

          <div data-about-stats className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.about.stats.map((stat) => {
              const decimals = 'decimals' in stat ? stat.decimals : 0

              return (
                <article
                  key={stat.label}
                  className="atmospheric-card flex min-h-[10.5rem] min-w-0 flex-col items-center justify-center p-5 text-center sm:min-h-[11rem] sm:p-6"
                >
                  <p className="mb-3 text-center text-[0.65rem] uppercase tracking-cinematic text-gold/80">{content.about.label}</p>
                  <p className="text-center font-display text-[clamp(2.25rem,4vw,2.8rem)] font-light leading-[0.88] text-cream">
                    <span
                      className="inline-flex flex-col items-center justify-center gap-2 text-center tabular-nums"
                    >
                      <span
                        className="inline-block max-w-full origin-center will-change-transform"
                        data-stat-value
                        data-value={stat.value}
                        data-decimals={decimals}
                        data-prefix={stat.prefix}
                      >
                        {`${stat.prefix}${formatStatValue(stat.value, decimals)}`}
                      </span>
                      <span className="max-w-full text-center text-[0.7rem] uppercase tracking-[0.22em] text-gold-soft/72 sm:text-sm">
                        {stat.suffix}
                      </span>
                    </span>
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
