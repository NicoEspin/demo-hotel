import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMemo } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { AboutSection } from '@/components/sections/AboutSection'
import { BookingSection } from '@/components/sections/BookingSection'
import { ExperiencesSection } from '@/components/sections/ExperiencesSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { RoomsSection } from '@/components/sections/RoomsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { FloatingWhatsAppButton } from '@/components/ui/FloatingWhatsAppButton'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { content } from '@/data/content'
import { useLenis } from '@/hooks/useLenis'

gsap.registerPlugin(useGSAP, ScrollTrigger)
gsap.defaults({ ease: 'power2.out', duration: 1.2 })

type NavigationLink = {
  href: string
  label: string
}

function App() {
  useLenis()

  const navigationLinks = useMemo<ReadonlyArray<NavigationLink>>(
    () => [
      { href: '#habitaciones', label: content.nav.links[0] },
      { href: '#experiencias', label: content.nav.links[1] },
      { href: '#resenas', label: content.nav.links[2] },
      { href: '#reservar', label: content.nav.links[3] },
    ],
    [],
  )

  return (
    <div className="relative min-h-screen bg-bg text-cream">
      <GrainOverlay />
      <CustomCursor />
      <FloatingWhatsAppButton href={content.booking.whatsappHref} label={content.booking.ctaWhatsapp} />
      <Navbar links={navigationLinks} ctaLabel={content.nav.cta} />

      <main id="main-content" tabIndex={-1} className="relative overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <RoomsSection />
        <ExperiencesSection />
        <TestimonialsSection />
        <BookingSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
