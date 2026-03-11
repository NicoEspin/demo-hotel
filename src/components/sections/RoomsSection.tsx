import { useRef } from 'react'

import { content } from '@/data/content'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useScrollBatch } from '@/hooks/useGSAPScrollTrigger'

export function RoomsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useScrollBatch('[data-room-card]', sectionRef)

  return (
    <section ref={sectionRef} id="habitaciones" className="section-shell">
      <div className="shell space-y-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:items-end">
          <div className="space-y-6">
            <SectionLabel>{content.rooms.title}</SectionLabel>
            <p className="max-w-sm font-display text-3xl font-light italic leading-tight text-gold-soft/88 sm:text-4xl">
              {content.rooms.quote}
            </p>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="max-w-[18rem] border-t border-gold/20 pt-5 text-right">
              <p className="text-[0.65rem] uppercase tracking-cinematic text-gold/75">{content.rooms.title}</p>
            </div>
          </div>
        </div>

        <div
          className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-5 sm:pr-8 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pr-0"
          aria-label={content.rooms.title}
        >
          {content.rooms.cards.map((room) => {
            const featured = room.title === 'Suite Lago'

            return (
              <article
                key={room.title}
                className={`group atmospheric-card relative min-w-[84vw] max-w-[28rem] snap-center overflow-hidden p-4 sm:min-w-[25rem] lg:min-w-0 lg:max-w-none ${featured ? 'border-gold/70 lg:translate-y-4 lg:p-5' : ''}`}
                data-room-card
                data-cursor-hover
              >
                <div className="relative overflow-hidden">
                  <ImagePlaceholder className={`w-full transition-transform duration-700 group-hover:scale-[1.04] ${featured ? 'aspect-[4/5]' : 'aspect-[4/5] lg:aspect-[4/4.8]'}`} label={room.slot} />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.02)_0%,rgba(10,8,6,0.08)_40%,rgba(10,8,6,0.88)_100%)] opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
                  <div className="absolute inset-x-0 bottom-0 hidden justify-between gap-4 px-5 pb-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 lg:flex lg:translate-y-4">
                    <span className="text-[0.65rem] uppercase tracking-cinematic text-gold-soft/72">{room.price}</span>
                    <a href="#reservar" className="eyebrow-link" aria-label={room.cta}>
                      {room.cta}
                    </a>
                  </div>
                </div>

                <div className="space-y-4 px-2 pb-3 pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-cinematic text-gold/85">{room.price}</p>
                      <h3 className="font-display text-4xl font-light text-cream sm:text-[2.75rem]">{room.title}</h3>
                    </div>
                    {featured ? <span className="mt-3 h-px w-12 bg-gold/55" aria-hidden="true" /> : null}
                  </div>

                  <p className="whitespace-pre-line text-sm leading-7 text-gold-soft/76">{room.description}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-muted">{room.includes.join(' · ')}</p>
                  <a href="#reservar" className="eyebrow-link" aria-label={room.cta}>
                    {room.cta}
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
