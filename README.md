# Hotel California Landing

Landing page cinematografica para Hotel California (Villa Carlos Paz, Cordoba, Argentina), pensada para comunicar una propuesta de hospedaje premium y empujar reservas directas.

Este README documenta el estado real del proyecto hoy. No describe el ideal del PRD si todavia no esta implementado.

## Objetivo

- Presentar una experiencia de marca refined/luxury con foco en atmosfera, ritmo visual y conversion hacia reserva directa.
- Mostrar habitaciones, servicios, prueba social y una via rapida de contacto por WhatsApp.
- Funcionar como demo frontend sin backend de reservas.

## Stack tecnico real

- `React 18` + `TypeScript`
- `Vite 7`
- `Tailwind CSS 3.4`
- `GSAP` + `@gsap/react` + `ScrollTrigger`
- `@studio-freight/lenis` para smooth scroll
- `lucide-react` para iconografia
- `ESLint 9`
- Alias `@/` configurado en `vite.config.ts` y `tsconfig.app.json`

Importante:

- El repo usa `npm` (`package-lock.json`), no `pnpm`.
- No hay `shadcn/ui` instalado en la implementacion actual.
- No existe script dedicado de typecheck en `package.json`, pero se puede correr con `npx tsc --noEmit -p tsconfig.app.json`.

## Direccion visual implementada

La landing trabaja una estetica cinematografica, calida y nocturna, con contraste entre fondos oscuros y acentos dorados.

- Tipografias: `Cormorant Garamond` para display y `DM Sans` para cuerpo, cargadas desde Google Fonts en `index.html`.
- Paleta base: `bg #0A0806`, `surface #13110E`, `gold #C9A96E`, `gold-soft #E8D5B0`, `cream #F5EFE4`, `muted #6B6358`, `border #2A2520`.
- Fondo global: gradiente oscuro con radial dorado sutil desde `body` en `src/styles/globals.css`.
- Overlays: gradientes oscuros, vignettes radiales y panels con blur para profundidad.
- Grain overlay: capa fija fullscreen con ruido SVG en `src/components/ui/GrainOverlay.tsx`.
- Cursor custom: punto dorado con seguimiento suave y escala en elementos interactivos en `src/components/ui/CustomCursor.tsx`.
- Motion language: animaciones lentas con easing `expo/power`, reveals al scroll, parallax suave y loops discretos.
- Componentes visuales reutilizables: `SectionLabel`, `GoldDivider`, `ImagePlaceholder`.

## Estructura del proyecto

```text
src/
  assets/
    hero.webp
    about.webp
    clasica.webp
    suite-lago.webp
    suite-familiar.webp
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      HeroSection.tsx
      AboutSection.tsx
      RoomsSection.tsx
      ExperiencesSection.tsx
      TestimonialsSection.tsx
      BookingSection.tsx
    ui/
      CustomCursor.tsx
      FloatingWhatsAppButton.tsx
      GoldDivider.tsx
      GrainOverlay.tsx
      ImagePlaceholder.tsx
      SectionLabel.tsx
  data/
    content.ts
  hooks/
    useGSAPScrollTrigger.ts
    useLenis.ts
  lib/
    cn.ts
  styles/
    globals.css
  App.tsx
  main.tsx
```

Archivos importantes:

- `src/App.tsx`: registra GSAP, monta overlays globales, navbar, CTA flotante y todas las secciones.
- `src/data/content.ts`: centraliza TODO el copy visible de la landing y los links principales.
- `src/styles/globals.css`: tokens visuales, utilidades de layout, focus states, scrollbar, reduced motion y cursor hiding en desktop.
- `src/hooks/useLenis.ts`: integra Lenis con GSAP/ScrollTrigger y resuelve scroll suave para anchors.
- `src/hooks/useGSAPScrollTrigger.ts`: helpers para reveal simple, batch reveal y deteccion de reduced motion.
- `index.html`: metadata basica, favicon y carga/preload de fuentes.

## Secciones implementadas

### Navbar

- Header fijo con logo tipografico, links de seccion y CTA desktop.
- Cambia de transparente a fondo oscuro con blur al superar `80px` de scroll via `ScrollTrigger`.
- En mobile muestra menu fullscreen con animacion GSAP.
- Bloquea el scroll del documento cuando el menu mobile esta abierto.
- Cierra con `Escape`, con click en links y al volver a logo/CTA.

### Hero

- Hero fullscreen con imagen real `src/assets/hero.webp`.
- Timeline de entrada: zoom-out del fondo, reveal del label, titulo linea por linea, subtitulo, CTAs y scroll cue.
- Parallax suave entre fondo y bloque de copy durante el scroll.
- CTA principal a `#reservar`; CTA secundaria y scroll cue a `#historia`.

### About

- Layout de dos columnas en desktop y stack en mobile.
- Imagen real `src/assets/about.webp` con parallax vertical.
- Reveal escalonado del copy.
- Stats animadas con count-up: anios, huespedes y rating promedio.
- Usa `GoldDivider` y quote editorial en display serif.

### Rooms

- Tres cards con imagenes reales locales: `clasica.webp`, `suite-lago.webp`, `suite-familiar.webp`.
- Entrada por batch reveal con GSAP.
- En mobile funciona como carrusel horizontal con `scroll-snap` y botones laterales con chevrones.
- En desktop pasa a grid de tres columnas.
- `Suite Lago` queda destacada con borde dorado y leve desplazamiento visual.
- Hover desktop: zoom de imagen, overlay mas intenso y CTA visible dentro de la foto.

### Experiences

- Seccion sobre fondo placeholder `[EXPERIENCES_BG]` con overlays y parallax.
- Copy principal + quote lateral con CTA a reserva.
- Grid de cuatro items con iconos Lucide (`Coffee`, `Waves`, `Clock3`, `MapPin`).
- Cada card tiene numeracion decorativa, hover atmosferico y reveal de entrada.

### Testimonials

- Unica seccion clara de la pagina (`bg-cream`, texto oscuro) para romper la cadencia visual.
- Cards con avatars placeholder `[TESTIMONIALS_01..04]`.
- Carrusel implementado como loop horizontal automatico con GSAP; duplica el grupo de cards para continuidad.
- El loop se pausa en hover y focus.
- Las estrellas entran con stagger independiente.

### Booking

- Seccion casi fullscreen con fondo placeholder `[BOOKING_BG]`.
- Copy editorial, beneficios y panel de formulario con glass effect.
- Formulario mock con `input[type="date"]`, `select` de huespedes y boton submit visual.
- `onSubmit` hace `preventDefault()`: no hay logica de reservas ni backend.
- Incluye CTA secundaria a WhatsApp dentro del panel.

### Footer

- Fondo mas oscuro que el resto (`#070504`) con overlay radial sutil.
- Bloque principal con tagline, links internos y datos de contacto.
- Iconos Lucide para direccion, telefono y email.
- Cierre inferior con copyright y credito a Synttek.

## Features globales relevantes

- `Lenis`: smooth scroll global con integracion a `ScrollTrigger` y soporte para anchors internos con offset del navbar.
- `GSAP/ScrollTrigger`: hero intro, navbar solid on scroll, parallax, reveals, batch animations, counters y loop de testimonios.
- `Floating WhatsApp Button`: CTA flotante fijo abajo a la derecha; se oculta cuando el menu mobile esta abierto.
- `Custom cursor`: solo en dispositivos con puntero fino; se desactiva en touch y reduced motion.
- `Responsive behavior`:
  - navbar desktop con links y mobile con menu fullscreen,
  - habitaciones en carrusel horizontal mobile y grid en desktop,
  - layouts de About/Experiences/Booking adaptados por breakpoint.
- `Accessibility basics`:
  - labels y `aria-label` en acciones clave,
  - foco visible global con ring dorado,
  - soporte para `prefers-reduced-motion`,
  - `alt` descriptivo en assets reales,
  - placeholders marcados con `role="img"`.

## Assets y placeholders actuales

Assets reales en uso:

- `src/assets/hero.webp` - fondo del hero
- `src/assets/about.webp` - imagen principal de About
- `src/assets/clasica.webp` - habitacion Clasica
- `src/assets/suite-lago.webp` - Suite Lago
- `src/assets/suite-familiar.webp` - Suite Familiar
- `public/favicon.png` - favicon

Secciones que todavia dependen de placeholders:

- `ExperiencesSection`: fondo `[EXPERIENCES_BG]`
- `TestimonialsSection`: avatars `[TESTIMONIALS_01]` a `[TESTIMONIALS_04]`
- `BookingSection`: fondo `[BOOKING_BG]`

Nota: el PRD original planteaba mas placeholders, pero hoy hero, about y rooms ya usan imagenes reales locales.

## Comandos de desarrollo

```bash
npm install
npm run dev
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run preview
```

Que hace cada uno:

- `npm install`: instala dependencias.
- `npm run dev`: levanta Vite en desarrollo.
- `npm run lint`: corre ESLint.
- `npx tsc --noEmit -p tsconfig.app.json`: chequeo de tipos manual.
- `npm run preview`: preview local del build ya generado.

## Decisiones y limitaciones actuales

- El README debe tomarse como fuente de verdad del estado actual; el `PRD.md` sirve como referencia de direccion, no como reflejo exacto del codigo hoy.
- El proyecto esta implementado como landing frontend pura. No hay backend, CMS, analytics ni integracion real de reservas.
- El formulario de Booking es visual. Si se conecta a reservas reales, hay que definir validaciones, estados de error, disponibilidad y tracking.
- El carrusel de testimonios NO es drag-based: hoy es un marquee automatico con pausa en hover/focus.
- El link "Politica de cancelacion" del footer apunta a `#reservar`, no a una pagina/legal real.
- El copy esta centralizado en `src/data/content.ts`; si cambia contenido o tono, conviene editar ahi primero.
- El cursor custom no aparece en mobile/touch y se desactiva con `prefers-reduced-motion`.
- La navegacion interna depende de ids de seccion (`#top`, `#historia`, `#habitaciones`, `#experiencias`, `#resenas`, `#reservar`). Si se renombran, hay que actualizar navbar/footer/CTAs.

## Referencias rapidas

- App principal: `src/App.tsx`
- Sistema visual: `src/styles/globals.css`
- Copy centralizado: `src/data/content.ts`
- Navegacion: `src/components/layout/Navbar.tsx`
- Hero: `src/components/sections/HeroSection.tsx`
- Habitaciones: `src/components/sections/RoomsSection.tsx`
- Testimonios: `src/components/sections/TestimonialsSection.tsx`
- Smooth scroll: `src/hooks/useLenis.ts`
