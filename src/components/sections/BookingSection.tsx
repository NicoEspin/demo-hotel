import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Check, MessageCircleMore } from 'lucide-react'

import { GoldDivider } from '@/components/ui/GoldDivider'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { content } from '@/data/content'
import { prefersReducedMotion } from '@/hooks/useGSAPScrollTrigger'

const guestOptions = ['1 huésped', '2 huéspedes', '3 huéspedes', '4 huéspedes']

export function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const arrivalId = 'booking-arrival'
  const departureId = 'booking-departure'
  const guestsId = 'booking-guests'

  useGSAP(
    () => {
      const section = sectionRef.current

      if (!section || prefersReducedMotion()) {
        return
      }

      gsap.from('[data-booking-copy] > *', {
        opacity: 0,
        y: 38,
        stagger: 0.1,
        duration: 0.95,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
        },
      })

      gsap.from('[data-booking-panel]', {
        opacity: 0,
        scale: 0.95,
        y: 24,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-booking-panel]',
          start: 'top 84%',
        },
      })

      gsap.from('[data-booking-benefit]', {
        opacity: 0,
        x: -18,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-booking-benefits]',
          start: 'top 88%',
        },
      })

      gsap.to('[data-booking-bg]', {
        yPercent: -10,
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
    <section ref={sectionRef} id="reservar" className="section-shell relative min-h-[92vh] overflow-hidden">
      <div className="absolute inset-0" data-booking-bg>
        <ImagePlaceholder className="h-full w-full border-0" label="[BOOKING_BG]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.16),transparent_26%),linear-gradient(180deg,rgba(10,8,6,0.42),rgba(10,8,6,0.9)_44%,rgba(10,8,6,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,8,6,0.2)_0%,rgba(10,8,6,0.72)_48%,rgba(10,8,6,0.98)_100%)]" />
      </div>

      <div className="pointer-events-none absolute left-[7%] top-24 hidden h-32 w-px bg-gold/20 lg:block" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-24 right-[8%] hidden h-40 w-40 rounded-full border border-gold/10 lg:block" aria-hidden="true" />

      <div className="shell relative flex min-h-[92vh] flex-col justify-center py-20 lg:py-24">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.7fr)] lg:items-center lg:gap-14">
          <div className="space-y-7 lg:max-w-2xl" data-booking-copy>
            <SectionLabel>{content.booking.label}</SectionLabel>
            <GoldDivider className="max-w-28" />
            <h2 className="section-title max-w-3xl whitespace-pre-line">{content.booking.title}</h2>
            <p className="max-w-xl whitespace-pre-line text-lg leading-8 text-gold-soft/80">{content.booking.subtitle}</p>
            <p className="max-w-lg whitespace-pre-line font-display text-2xl font-light italic leading-9 text-gold-soft/92 sm:text-[2rem]">
              {content.booking.closing}
            </p>
          </div>

          <div className="glass-panel relative overflow-hidden p-6 sm:p-8 lg:p-10" data-booking-panel>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(201,169,110,0.1),transparent_36%,rgba(10,8,6,0.24))]" />

            <div className="relative">
              <form
                className="grid gap-4 md:grid-cols-2"
                aria-label={content.booking.form.cta}
                onSubmit={(event) => event.preventDefault()}
              >
                <label className="space-y-2 text-left text-xs uppercase tracking-[0.22em] text-gold-soft/80" htmlFor={arrivalId}>
                  {content.booking.form.arrival}
                  <input id={arrivalId} name="arrival" type="date" className="input-shell h-14 w-full" autoComplete="off" />
                </label>
                <label className="space-y-2 text-left text-xs uppercase tracking-[0.22em] text-gold-soft/80" htmlFor={departureId}>
                  {content.booking.form.departure}
                  <input id={departureId} name="departure" type="date" className="input-shell h-14 w-full" autoComplete="off" />
                </label>
                <label className="space-y-2 text-left text-xs uppercase tracking-[0.22em] text-gold-soft/80" htmlFor={guestsId}>
                  {content.booking.form.guests}
                  <select id={guestsId} name="guests" className="input-shell h-14 w-full" defaultValue={guestOptions[1]}>
                    {guestOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className="outline-button mt-3 h-14 rounded-none md:col-span-2"
                  aria-label={content.booking.form.cta}
                >
                  {content.booking.form.cta}
                </button>
              </form>

              <div className="mt-8 grid gap-3 sm:grid-cols-2" data-booking-benefits>
                {content.booking.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 border border-gold/10 bg-bg/28 p-4 text-sm leading-6 text-gold-soft/78"
                    data-booking-benefit
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/20 text-gold">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <a
                href={content.booking.whatsappHref}
                className="mt-8 inline-flex items-center gap-3 border-b border-gold/35 pb-2 text-xs uppercase tracking-cinematic text-gold transition-colors duration-500 hover:text-gold-soft"
                aria-label={content.booking.ctaWhatsapp}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircleMore className="h-4 w-4" aria-hidden="true" />
                {content.booking.ctaWhatsapp}
              </a>
            </div>
          </div>
        </div>

        <div className="relative mt-14 border-t border-gold/15 pt-8 lg:mt-16">
          <p className="max-w-3xl whitespace-pre-line text-sm leading-7 text-gold-soft/72" data-booking-copy>
            {content.booking.finalWord}
          </p>
        </div>
      </div>
    </section>
  )
}
