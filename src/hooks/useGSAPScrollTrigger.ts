import type { RefObject } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type RevealTarget = Element | null

export function useScrollReveal<T extends RevealTarget>(
  ref: RefObject<T>,
  options: gsap.TweenVars = {},
) {
  useGSAP(
    () => {
      if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      gsap.from(ref.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        ...options,
      })
    },
    { scope: ref },
  )
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useScrollBatch(
  selector: string,
  scope: RefObject<Element | null>,
  vars: gsap.TweenVars = {},
) {
  useGSAP(
    () => {
      if (!scope.current || prefersReducedMotion()) {
        return
      }

      ScrollTrigger.batch(selector, {
        start: 'top 85%',
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            y: 60,
            stagger: 0.15,
            duration: 1,
            ease: 'expo.out',
            ...vars,
          })
        },
      })
    },
    { scope },
  )
}
