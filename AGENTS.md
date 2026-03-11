# AGENTS.md — Hotel California Landing Page
## Instrucciones para agente de coding (opencode)

---

## MISIÓN

Construir una landing page para el **Hotel California** (Villa Carlos Paz, Córdoba, Argentina) que sea digna de un **Awwwards Site of the Day**. El objetivo es convertir visitantes en huéspedes mediante reservas directas. La experiencia visual debe ser cinematográfica, íntima y coherente de principio a fin.

**Leer el PRD completo antes de escribir una sola línea de código:**
→ `hotel-california-PRD.md`

---

## SKILLS REQUERIDAS — LEER ANTES DE CODEAR

El agente DEBE leer estos archivos de skill antes de escribir cualquier código.
Contienen las mejores prácticas destiladas para producir trabajo de nivel production.

### 1. Frontend Design Skill — OBLIGATORIA
**Path:** `skills/frontend-design/SKILL.md`

Principios clave que dicta esta skill y que DEBEN aplicarse:
- Elegir una dirección estética BOLD y ejecutarla con precisión. Para este proyecto: **luxury/refined cinematográfico**.
- Tipografía: fuentes únicas y caracterizadas. Aquí: `Cormorant Garamond` + `DM Sans`. NUNCA Inter, Roboto, Arial.
- Color: paleta dominante con acento sharp. Aquí: negro cálido profundo + dorado arena.
- Motion: foco en momentos de alto impacto — page load orquestado + scroll reveals. No micro-interacciones dispersas.
- Composición espacial: layouts asimétricos, overlap, diagonal flow, espacio negativo generoso.
- Backgrounds con atmósfera: grain overlay, gradientes, transparencias en capas.
- Lo que hace UNFORGETTABLE esta landing: **la sensación cinematográfica del primer scroll** — imagen que hace zoom-out, título que emerge línea a línea, grain overlay que da textura de película.

### 2. Web Artifacts Builder Skill — REFERENCIA DE SETUP
**Path:** `skills/web-artifacts-builder/SKILL.md`
**Script de init:** `skills/web-artifacts-builder/scripts/init-artifact.sh`

Esta skill provee el script `init-artifact.sh` que configura el proyecto base con:
- React 18 + TypeScript + Vite (con detección automática de versión por Node)
- Tailwind CSS 3.4.1 ya configurado con shadcn theming system
- Path aliases `@/` listos
- 40+ componentes shadcn/ui pre-instalados
- Compatible con Node 18 y Node 20+
- Usa `pnpm` como package manager

**Cómo usar el script para este proyecto:**
```bash
# Ejecutar desde la carpeta raíz donde querés crear el proyecto
bash skills/web-artifacts-builder/scripts/init-artifact.sh hotel-california
cd hotel-california

# Luego agregar las dependencias específicas de este proyecto:
pnpm install gsap @gsap/react
pnpm install @studio-freight/lenis
```

> ⚠️ El script genera un `tailwind.config.js` con el sistema de variables de shadcn.
> Después de ejecutarlo, REEMPLAZAR el tailwind.config.js con el del Design System
> de este proyecto (ver sección DESIGN SYSTEM más abajo).
> También REEMPLAZAR `src/index.css` con el `globals.css` de este proyecto.

---

## STACK OBLIGATORIO

```
React 18 + TypeScript (Vite)  ← via init-artifact.sh
Tailwind CSS 3.4.1             ← via init-artifact.sh
shadcn/ui (40+ componentes)    ← via init-artifact.sh
GSAP + @gsap/react + ScrollTrigger  ← instalar manual
Lenis (smooth scroll)          ← instalar manual
Lucide React (íconos)          ← ya incluido en init-artifact.sh
pnpm                           ← package manager del script
```

### Instalación completa paso a paso
```bash
# 1. Inicializar proyecto base con el skill script
bash skills/web-artifacts-builder/scripts/init-artifact.sh hotel-california
cd hotel-california

# 2. Agregar dependencias de animación
pnpm install gsap @gsap/react
pnpm install @studio-freight/lenis

# 3. Verificar que todo esté instalado
pnpm dev
```

---

## ARQUITECTURA DE ARCHIVOS

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── RoomsSection.tsx
│   │   ├── ExperiencesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── BookingSection.tsx
│   └── ui/
│       ├── CustomCursor.tsx
│       ├── GrainOverlay.tsx
│       ├── SectionLabel.tsx
│       └── GoldDivider.tsx
├── hooks/
│   ├── useLenis.ts
│   └── useGSAPScrollTrigger.ts
├── styles/
│   └── globals.css
├── data/
│   └── content.ts       ← todo el copy centralizado aquí
├── App.tsx
└── main.tsx
```

---

## DESIGN SYSTEM — APLICAR SIN EXCEPCIÓN

### Variables CSS (globals.css)
```css
:root {
  --color-bg:        #0A0806;
  --color-surface:   #13110E;
  --color-gold:      #C9A96E;
  --color-gold-soft: #E8D5B0;
  --color-cream:     #F5EFE4;
  --color-muted:     #6B6358;
  --color-border:    #2A2520;

  --font-display: 'Cormorant Garamond', serif;
  --font-body:    'DM Sans', sans-serif;

  --ease-elegant: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-expo:    cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Fuentes — Google Fonts (index.html `<head>`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

### Tailwind config
```js
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        '#0A0806',
        surface:   '#13110E',
        gold:      '#C9A96E',
        'gold-soft':'#E8D5B0',
        cream:     '#F5EFE4',
        muted:     '#6B6358',
        border:    '#2A2520',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
    },
  },
}
```

---

## REGLAS DE DISEÑO — NUNCA VIOLAR

### ✅ HACER
- Tipografía grande y con peso ligero para títulos (`font-display font-light`)
- Mucho espacio negativo — respiración entre secciones (`py-32` o más)
- Líneas finas doradas como separadores y detalles decorativos
- Overlays oscuros sobre imágenes con gradiente (`from-bg/0 via-bg/60 to-bg`)
- Animaciones lentas y suaves — duración mínima 0.8s, máxima 2s
- Layouts asimétricos — evitar todo centrado y simétrico
- Labels pequeños en uppercase con letter-spacing amplio
- Imágenes con `object-cover` y `aspect-ratio` definido

### ❌ NUNCA HACER
- Font Inter, Roboto, Arial o system-ui
- Gradientes púrpura o azul eléctrico
- Cards con `rounded-2xl` uniform y sombra genérica
- Botones con fondo sólido colorido — usar bordes finos (outline)
- Layouts completamente centrados en todas las secciones
- Animaciones rápidas o bouncy — esto es lujo, no e-commerce
- Backgrounds blancos puros o grises neutros
- Íconos emoji o Font Awesome — solo Lucide React

---

## IMÁGENES — PLACEHOLDERS

**Todas las imágenes usan placeholders** hasta que el cliente las reemplace.

Usar este patrón consistente para todos los `<img>` y fondos:

```tsx
// Componente placeholder reutilizable
const ImagePlaceholder = ({ className, label }: { className?: string, label: string }) => (
  <div className={`bg-surface border border-border flex items-center justify-center ${className}`}>
    <span className="font-body text-muted text-sm tracking-widest uppercase">{label}</span>
  </div>
)
```

**Slots de imágenes que necesitan placeholder:**
- `[HERO_BG]` — Hero background fullscreen
- `[ABOUT_IMG]` — About section, columna derecha
- `[ROOM_CLASICA]` — Card habitación clásica
- `[ROOM_LAGO]` — Card suite lago
- `[ROOM_FAMILIAR]` — Card suite familiar
- `[EXPERIENCES_BG]` — Background sección experiencias
- `[TESTIMONIALS_01..04]` — Fotos de huéspedes (avatares circulares)
- `[BOOKING_BG]` — Background sección reserva final

Para fondos con imagen usar `bg-surface` como fallback hasta que se reemplace.

---

## GSAP — IMPLEMENTACIÓN

### Setup global (App.tsx)
```tsx
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power2.out', duration: 1.2 })
```

### Hook reutilizable para scroll animations
```tsx
// hooks/useGSAPScrollTrigger.ts
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { RefObject } from 'react'

export const useScrollReveal = (ref: RefObject<Element>, options = {}) => {
  useGSAP(() => {
    if (!ref.current) return
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
      ...options
    })
  }, { scope: ref })
}
```

### Animaciones por sección

**HERO — Page load timeline**
```tsx
const tl = gsap.timeline({ delay: 0.2 })
tl.from('[data-hero-bg]',    { scale: 1.08, duration: 2.0, ease: 'power1.out' })
  .from('[data-hero-label]', { opacity: 0, y: -20, duration: 0.8 }, '-=1.5')
  .from('[data-hero-title] .line', { opacity: 0, y: 60, stagger: 0.12, duration: 1.0, ease: 'expo.out' }, '-=1.2')
  .from('[data-hero-sub]',   { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
  .from('[data-hero-cta]',   { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 }, '-=0.4')
```

**ABOUT — Scroll triggered**
```tsx
// Parallax en imagen
gsap.to('[data-about-img]', {
  yPercent: -15,
  ease: 'none',
  scrollTrigger: {
    trigger: '[data-about-section]',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
})

// CountUp en stats
gsap.utils.toArray('[data-stat]').forEach((el) => {
  const target = parseInt((el as Element).getAttribute('data-value') || '0')
  gsap.from({ val: 0 }, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: { trigger: el as Element, start: 'top 80%' },
    onUpdate: function() {
      (el as Element).textContent = Math.round(this.targets()[0].val).toString()
    }
  })
})
```

**ROOMS — Stagger batch**
```tsx
ScrollTrigger.batch('[data-room-card]', {
  onEnter: (elements) => gsap.from(elements, {
    opacity: 0, y: 60, stagger: 0.15, duration: 1.0, ease: 'expo.out'
  }),
  start: 'top 85%',
})
```

**NAVBAR — Scroll state**
```tsx
ScrollTrigger.create({
  start: 80,
  onEnter: () => gsap.to('[data-navbar]', { backgroundColor: 'rgba(10,8,6,0.95)', backdropFilter: 'blur(12px)', duration: 0.4 }),
  onLeaveBack: () => gsap.to('[data-navbar]', { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4 }),
})
```

---

## LENIS — SMOOTH SCROLL

```tsx
// hooks/useLenis.ts
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])
}
```

---

## COMPONENTES UI GLOBALES

### GrainOverlay.tsx
```tsx
// Textura cinematográfica sobre toda la página
export const GrainOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none z-[9999]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      opacity: 0.035,
      mixBlendMode: 'overlay',
    }}
  />
)
```

### CustomCursor.tsx
```tsx
// Cursor personalizado: círculo dorado pequeño con lag suave
// Usar gsap.quickTo para máxima performance
// En hover sobre elementos interactivos: scale(2) + border only
```

### SectionLabel.tsx
```tsx
// Label pequeño reutilizable: uppercase, tracking-widest, color gold, tamaño xs
// Con línea decorativa antes del texto
```

### GoldDivider.tsx
```tsx
// Línea horizontal dorada que hace scaleX de 0 a 1 al entrar en viewport
// Usar para separar visualmente dentro de secciones
```

---

## SECCIONES — COMPORTAMIENTO ESPECÍFICO

### HeroSection
- `min-h-screen` con `position: relative`
- Background placeholder con overlay gradiente
- Split del título en `<span className="line block">` para animación línea a línea
- Scroll indicator: línea vertical de 40px que hace loop hacia abajo (CSS animation)
- Navbar transparente encima

### AboutSection
- Grid de 2 columnas en desktop (`lg:grid-cols-2`), stacked en mobile
- Imagen derecha con `overflow-hidden` para contener el parallax
- Stats en fila: `+20 años`, `+4.800 huéspedes`, `4.9★` — con countUp animado

### RoomsSection
- 3 cards en desktop — Suite Lago (card del medio) más alta que las otras (`lg:scale-105` o padding extra)
- Suite Lago tiene borde dorado permanente (`border border-gold`)
- En mobile: scroll horizontal snap (`overflow-x-auto snap-x snap-mandatory`)
- Hover card: `group` + imagen zoom + overlay con CTA visible

### ExperiencesSection
- Fondo con imagen placeholder muy opaca (opacity 0.15) sobre `bg-surface`
- Grid 2x2 desktop, lista en mobile
- Cada ítem: ícono Lucide en dorado + título + texto

### TestimonialsSection
- Único contraste claro de la página — fondo `#F5EFE4` (cream), texto oscuro
- Carrusel con drag — usar solo CSS scroll snap + JS mínimo, sin librerías extra
- Avatar circular 48px con placeholder gris
- Estrellas: 5 SVG gold en stagger de entrada

### BookingSection
- Fullscreen con imagen placeholder + overlay oscuro fuerte
- Formulario centrado: fecha entrada, fecha salida, huéspedes, botón
- Formulario es **visual/mock** — no requiere backend en la demo
- Botón WhatsApp secundario con ícono

### Navbar
- `position: fixed`, `z-50`, `w-full`
- Logo: "Hotel California" en `font-display` + línea dorada fina debajo
- Links: Habitaciones · Experiencias · Reseñas · Reservar
- CTA pill: pequeño, borde dorado, fondo transparente
- Hamburger en mobile con menú fullscreen

### Footer
- Fondo `#070504`
- 3 columnas: Logo + tagline | Links | Contacto
- Línea separadora dorada (`border-t border-gold/30`)
- "Desarrollado por Synttek" — discreto, muted, al final

---

## COPY — FUENTE ÚNICA

Todo el copy está en `src/data/content.ts`. El agente NO debe inventar textos.
Usar exactamente el copy del PRD (`hotel-california-PRD.md`) copiado a este archivo de datos.

```ts
// src/data/content.ts
export const content = {
  hero: { label, title, subtitle, cta1, cta2 },
  about: { label, title, subtitle, body, quote, stats },
  rooms: { title, quote, cards: [...] },
  experiences: { label, title, subtitle, items: [...], quote, cta },
  testimonials: { label, title, items: [...], quote },
  booking: { label, title, subtitle, benefits, closing, ctaWhatsapp },
  footer: { tagline, links, contact, copyright },
}
```

---

## RESPONSIVE — BREAKPOINTS

| Elemento           | Mobile         | Tablet (md)    | Desktop (lg+)       |
|--------------------|----------------|----------------|---------------------|
| H1 Hero            | text-5xl       | text-7xl       | text-8xl / clamp    |
| H2 Secciones       | text-4xl       | text-5xl       | text-6xl            |
| Grid Rooms         | scroll-x snap  | 2 cols         | 3 cols              |
| Grid Experiences   | 1 col          | 2 cols         | 2 cols              |
| About layout       | stacked        | stacked        | 2 cols              |
| Navbar             | hamburger      | hamburger      | links full          |

---

## PERFORMANCE

- Todas las imágenes: `loading="lazy"` + `decoding="async"`
- Fuentes: `rel="preload"` en index.html
- GSAP: importar solo los plugins usados
- ScrollTrigger: `ScrollTrigger.refresh()` después de que Lenis esté listo
- Evitar `useEffect` innecesarios — usar `useGSAP` de `@gsap/react`
- No usar ningún estado global para animaciones

---

## ACCESIBILIDAD MÍNIMA

- Todos los `<img>` tienen `alt` descriptivo (aunque sea placeholder)
- Botones tienen `aria-label`
- Navbar tiene `role="navigation"`
- Foco visible en elementos interactivos (`focus-visible:ring-1 ring-gold`)
- Respetar `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; }
}
```

---

## ORDEN DE IMPLEMENTACIÓN

```
1.  Setup Vite + React + TS + Tailwind
2.  Instalar dependencias (GSAP, Lenis, Lucide)
3.  globals.css — variables CSS + reset + fuentes
4.  tailwind.config.js — tokens de color y fuentes
5.  content.ts — todo el copy centralizado
6.  GrainOverlay.tsx + CustomCursor.tsx (globales)
7.  useLenis.ts hook
8.  App.tsx — registrar GSAP plugins + Lenis + estructura
9.  Navbar.tsx
10. HeroSection.tsx (establece el tono visual — la más importante)
11. AboutSection.tsx
12. RoomsSection.tsx
13. ExperiencesSection.tsx
14. TestimonialsSection.tsx
15. BookingSection.tsx
16. Footer.tsx
17. Animaciones GSAP — revisar y pulir todos los timings
18. Responsive — revisar mobile breakpoints
19. Accesibilidad — alt texts, aria-labels, focus states
20. Build final: npm run build
```

---

## DEFINICIÓN DE DONE

La landing está lista cuando:

- [ ] Todas las secciones renderizan sin errores
- [ ] Animaciones GSAP funcionan al hacer scroll
- [ ] Smooth scroll con Lenis activo
- [ ] Navbar se vuelve sólida al hacer scroll
- [ ] Formulario de reserva es visual y usable (mock)
- [ ] Responsive funciona en 375px, 768px y 1440px
- [ ] No hay textos placeholder inventados — usar solo `content.ts`
- [ ] Imágenes tienen slots claramente marcados con `[NOMBRE_SLOT]`
- [ ] Grain overlay presente en toda la página
- [ ] Build de producción sin warnings críticos

---

*Synttek · Villa Carlos Paz, Córdoba · Demo Hotel California*