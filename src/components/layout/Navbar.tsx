import { useEffect, useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Menu, X } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { prefersReducedMotion } from '@/hooks/useGSAPScrollTrigger'

type NavbarProps = {
  links: ReadonlyArray<{ href: string; label: string }>
  ctaLabel: string
}

export function Navbar({ links, ctaLabel }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    root.classList.toggle('overflow-locked', isMenuOpen)
    body.classList.toggle('overflow-locked', isMenuOpen)

    return () => {
      root.classList.remove('overflow-locked')
      body.classList.remove('overflow-locked')
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  useGSAP(
    () => {
      const header = headerRef.current

      if (!header) {
        return
      }

      ScrollTrigger.create({
        start: 80,
        onEnter: () => {
          gsap.to(header, {
            backgroundColor: 'rgba(10, 8, 6, 0.94)',
            borderBottomColor: 'rgba(201, 169, 110, 0.22)',
            backdropFilter: 'blur(14px)',
            duration: 0.4,
          })
        },
        onLeaveBack: () => {
          gsap.to(header, {
            backgroundColor: 'rgba(10, 8, 6, 0)',
            borderBottomColor: 'rgba(201, 169, 110, 0)',
            backdropFilter: 'blur(0px)',
            duration: 0.4,
          })
        },
      })
    },
    { scope: headerRef },
  )

  useGSAP(
    () => {
      const panel = menuPanelRef.current

      if (!panel) {
        return
      }

      if (prefersReducedMotion()) {
        gsap.set(panel, {
          autoAlpha: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none',
          yPercent: isMenuOpen ? 0 : -4,
        })
        return
      }

      gsap.to(panel, {
        autoAlpha: isMenuOpen ? 1 : 0,
        pointerEvents: isMenuOpen ? 'auto' : 'none',
        yPercent: isMenuOpen ? 0 : -4,
        duration: isMenuOpen ? 0.72 : 0.42,
        ease: isMenuOpen ? 'expo.out' : 'power2.out',
      })

      if (isMenuOpen) {
        gsap.fromTo(
          '[data-mobile-link], [data-mobile-cta], [data-mobile-meta]',
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.08,
            delay: 0.08,
          },
        )
      }
    },
    { dependencies: [isMenuOpen], scope: menuPanelRef },
  )

  return (
    <>
      <header
        ref={headerRef}
        data-navbar
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-colors duration-500"
      >
        <div className="shell flex items-center justify-between gap-6 py-5">
          <a
            href="#top"
            className="flex flex-col gap-1"
            aria-label="Hotel California"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="font-display text-2xl font-light tracking-[0.08em] text-cream sm:text-3xl">
              Hotel California
            </span>
            <span className="h-px w-24 bg-gold/55" aria-hidden="true" />
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegacion principal">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.28em] text-gold-soft/78 transition-colors duration-300 hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#reservar" className="hidden outline-button lg:inline-flex" aria-label={ctaLabel}>
              {ctaLabel}
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-bg/10 text-gold backdrop-blur-sm lg:hidden"
              aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X className="h-4 w-4" strokeWidth={1.5} /> : <Menu className="h-4 w-4" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuPanelRef}
        id="mobile-nav-panel"
        className="fixed inset-0 z-40 flex min-h-screen flex-col justify-between bg-[linear-gradient(180deg,rgba(10,8,6,0.96),rgba(10,8,6,0.98))] px-5 pb-8 pt-28 opacity-0 pointer-events-none sm:px-8 lg:hidden"
        aria-hidden={!isMenuOpen}
        aria-label="Menu principal"
        aria-modal="true"
        role="dialog"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.12),transparent_32%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" aria-hidden="true" />

        <nav className="relative flex flex-col gap-5" aria-label="Navegacion movil">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-mobile-link
              className="border-b border-gold/12 pb-5 font-display text-4xl font-light tracking-[0.02em] text-cream"
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="relative space-y-6">
          <p data-mobile-meta className="max-w-xs text-sm leading-7 text-gold-soft/70">
            {ctaLabel}
          </p>
          <a
            href="#reservar"
            data-mobile-cta
            className="outline-button w-full justify-center"
            aria-label={ctaLabel}
            tabIndex={isMenuOpen ? 0 : -1}
            onClick={() => setIsMenuOpen(false)}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </>
  )
}
