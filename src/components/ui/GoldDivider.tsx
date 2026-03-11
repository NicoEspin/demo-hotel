import { useRef } from 'react'

import { useScrollReveal } from '@/hooks/useGSAPScrollTrigger'

type GoldDividerProps = {
  className?: string
}

export function GoldDivider({ className = '' }: GoldDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null)

  useScrollReveal(dividerRef, {
    scaleX: 0,
    opacity: 1,
    y: 0,
    transformOrigin: 'left center',
  })

  return <div ref={dividerRef} className={`h-px w-full bg-gold/45 ${className}`.trim()} />
}
