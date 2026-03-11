import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { prefersReducedMotion } from '@/hooks/useGSAPScrollTrigger'

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined
    }

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

    const lenis = new Lenis({
      lerp: isTouchDevice ? 0.18 : 0.12,
      smoothWheel: true,
    })

    const getScrollOffset = () => {
      const navbar = document.querySelector<HTMLElement>('[data-navbar]')

      return navbar ? navbar.offsetHeight + 12 : 0
    }

    const onScroll = () => ScrollTrigger.update()
    const updateLenis = (time: number) => lenis.raf(time * 1000)
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const link = target.closest<HTMLAnchorElement>('a[href^="#"]')
      const href = link?.getAttribute('href')

      if (!link || !href || href === '#') {
        return
      }

      const targetId = decodeURIComponent(href.slice(1))
      const destination = targetId === 'top' ? document.body : document.getElementById(targetId)

      if (!destination) {
        return
      }

      event.preventDefault()

      lenis.scrollTo(targetId === 'top' ? 0 : destination, {
        offset: targetId === 'top' ? 0 : -getScrollOffset(),
        duration: 1.2,
      })

      window.history.replaceState(null, '', href)
    }

    lenis.on('scroll', onScroll)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)
    document.addEventListener('click', onAnchorClick)
    window.setTimeout(() => ScrollTrigger.refresh(), 64)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      gsap.ticker.remove(updateLenis)
      lenis.off('scroll', onScroll)
      lenis.destroy()
    }
  }, [])
}
