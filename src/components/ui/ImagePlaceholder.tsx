import { cn } from '@/lib/cn'

type ImagePlaceholderProps = {
  className?: string
  label: string
}

export function ImagePlaceholder({ className, label }: ImagePlaceholderProps) {
  return (
    <div
      aria-label={`Placeholder ${label}`}
      role="img"
      className={cn(
        'relative flex items-center justify-center overflow-hidden border border-border bg-surface text-center',
        'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.12),transparent_40%)] before:content-[""]',
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,169,110,0.08),transparent_42%,rgba(10,8,6,0.7))]" />
      <span className="relative px-4 font-body text-[0.65rem] uppercase tracking-[0.35em] text-muted">
        {label}
      </span>
    </div>
  )
}
