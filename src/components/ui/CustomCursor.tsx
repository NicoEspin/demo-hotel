import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const cursor = cursorRef.current

    if (!cursor) {
      return undefined
    }

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.24, ease: 'power2.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.24, ease: 'power2.out' })

    const handleMove = (event: MouseEvent) => {
      xTo(event.clientX - 8)
      yTo(event.clientY - 8)
    }

    const handlePointerState = (event: Event) => {
      const target = event.target as HTMLElement | null
      const interactive = target?.closest('a, button, input, select, textarea, [data-cursor-hover]')

      gsap.to(cursor, {
        scale: interactive ? 2.2 : 1,
        borderColor: interactive ? 'rgba(201, 169, 110, 0.8)' : 'rgba(201, 169, 110, 0)',
        backgroundColor: interactive ? 'rgba(201, 169, 110, 0.06)' : 'rgba(201, 169, 110, 0.92)',
        duration: 0.3,
      })
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handlePointerState)
    window.addEventListener('mouseout', handlePointerState)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handlePointerState)
      window.removeEventListener('mouseout', handlePointerState)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-4 w-4 rounded-full border border-transparent md:block"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      aria-hidden="true"
    />
  )
}
