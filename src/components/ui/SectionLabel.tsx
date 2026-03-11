import { cn } from '@/lib/cn'

type SectionLabelProps = {
  className?: string
  children: string
}

export function SectionLabel({ className, children }: SectionLabelProps) {
  return (
    <div className={cn('inline-flex items-center gap-3 text-gold', className)}>
      <span className="h-px w-12 bg-gold/60" aria-hidden="true" />
      <span className="text-[0.65rem] uppercase tracking-cinematic text-gold/90">{children}</span>
    </div>
  )
}
