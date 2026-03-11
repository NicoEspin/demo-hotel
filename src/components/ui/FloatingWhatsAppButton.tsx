import { MessageCircleMore } from 'lucide-react'

type FloatingWhatsAppButtonProps = {
  href: string
  label: string
}

export function FloatingWhatsAppButton({ href, label }: FloatingWhatsAppButtonProps) {
  return (
    <a
      href={href}
      className="fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/45 bg-[linear-gradient(180deg,rgba(19,17,14,0.96),rgba(10,8,6,0.94))] text-gold shadow-[0_18px_50px_rgba(0,0,0,0.34)] backdrop-blur-md transition duration-500 hover:-translate-y-0.5 hover:border-gold hover:text-gold-soft sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      data-cursor-hover
    >
      <span className="absolute inset-1 rounded-full border border-gold/10" aria-hidden="true" />
      <MessageCircleMore className="relative h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
    </a>
  )
}
