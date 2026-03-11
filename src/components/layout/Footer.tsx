import { Mail, MapPin, Phone } from 'lucide-react'

import { SectionLabel } from '@/components/ui/SectionLabel'
import { content } from '@/data/content'

const footerAnchors = ['#habitaciones', '#experiencias', '#resenas', '#reservar', '#reservar']

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/20 bg-[#070504]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,169,110,0.12),transparent_28%),linear-gradient(180deg,rgba(7,5,4,0)_0%,rgba(7,5,4,0.92)_100%)]" />

      <div className="shell relative space-y-14 py-16 lg:space-y-16 lg:py-20">
        <div className="border-b border-gold/12 pb-10">
          <div className="space-y-5">
            <SectionLabel>Hotel California</SectionLabel>
            <p className="max-w-3xl whitespace-pre-line font-display text-4xl font-light leading-none text-cream sm:text-5xl lg:text-[4.25rem]">
              {content.footer.tagline}
            </p>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr_1fr]">
          <div className="space-y-5">
            <div>
              <span className="font-display text-3xl font-light text-cream">Hotel California</span>
              <div className="mt-3 h-px w-24 bg-gold/45" />
            </div>
            <p className="max-w-sm whitespace-pre-line text-sm leading-7 text-gold-soft/74">
              {content.footer.tagline}
            </p>
          </div>

          <nav className="space-y-5" aria-label="Enlaces del pie de pagina">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/90">Links</p>
            <div className="flex flex-col gap-3">
              {content.footer.links.map((label, index) => (
                <a
                  key={label}
                  href={footerAnchors[index]}
                  className="text-sm text-gold-soft/78 transition-colors duration-300 hover:text-cream"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/90">Contacto</p>
            <div className="space-y-4 text-sm text-gold-soft/78">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-gold" aria-hidden="true" />
                <span>{content.footer.contact.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-gold" aria-hidden="true" />
                <a href="tel:+5493541560518" className="transition-colors duration-300 hover:text-cream">
                  {content.footer.contact.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 text-gold" aria-hidden="true" />
                <a href="mailto:hola@hotelcalifornia.com.ar" className="transition-colors duration-300 hover:text-cream">
                  {content.footer.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shell relative border-t border-gold/30 py-5 text-xs uppercase tracking-[0.24em] text-muted">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>{content.footer.copyright}</span>
          <span>{content.footer.credit}</span>
        </div>
      </div>
    </footer>
  )
}
