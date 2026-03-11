# PRD — Hotel California Landing Page
## Para agente de coding (opencode) — React + Tailwind + GSAP

---

## 1. VISIÓN DEL PROYECTO

Landing page para el **Hotel California**, ubicado en Villa Carlos Paz, Córdoba, Argentina. El objetivo es convertir visitantes en huéspedes mediante reservas directas, reduciendo la dependencia de plataformas como Booking.com. La experiencia visual debe ser digna de un Awwwards — cinematográfica, íntima y con una dirección de arte coherente de principio a fin.

---

## 2. STACK TECNOLÓGICO

- **Framework:** React (Vite)
- **Estilos:** Tailwind CSS
- **Animaciones:** GSAP + ScrollTrigger
- **Fuentes:** Google Fonts — `Cormorant Garamond` (display/títulos) + `DM Sans` (body/UI)
- **Íconos:** Lucide React
- **Deploy:** Vercel o Netlify (estático)

---

## 3. DIRECCIÓN DE ARTE

### Paleta de colores
```
--color-bg:        #0A0806   /* Negro cálido profundo */
--color-surface:   #13110E   /* Superficie de cards */
--color-gold:      #C9A96E   /* Dorado arena — acento principal */
--color-gold-soft: #E8D5B0   /* Dorado claro — textos secundarios */
--color-cream:     #F5EFE4   /* Crema — textos principales */
--color-muted:     #6B6358   /* Gris cálido — textos de apoyo */
--color-border:    #2A2520   /* Bordes sutiles */
```

### Tipografía
- **Títulos H1/H2:** `Cormorant Garamond`, weight 300–400, tamaños grandes (clamp 48px–96px)
- **Subtítulos/UI:** `DM Sans`, weight 300–400
- **Detalle/labels:** `DM Sans`, weight 500, letter-spacing amplio, uppercase, tamaño pequeño

### Estética general
- Tema **oscuro y cinematográfico** — como una película de autor italiana de los 70s
- Fotografías a pantalla completa con overlay gradiente
- Mucho espacio negativo
- Líneas finas doradas como elementos decorativos
- Animaciones lentas, suaves, con easing elegante (`power2.out`, `expo.out`)
- Cursor personalizado: círculo pequeño dorado que sigue el mouse
- Grain/noise texture overlay sutil sobre toda la página (CSS pseudo-element)

---

## 4. ANIMACIONES GSAP — GUÍA GENERAL

```javascript
// Configuración global recomendada
gsap.defaults({ ease: "power2.out", duration: 1.2 });

// Entrada de títulos: split text por línea, stagger desde abajo
// Imágenes: scale desde 1.1 a 1 con fade-in
// Secciones: fade + translateY(40px) al entrar en viewport
// Parallax: backgrounds con yPercent en ScrollTrigger
// Líneas decorativas: scaleX de 0 a 1 con transformOrigin "left"
// Números/stats: countUp animado con ScrollTrigger
```

Usar `ScrollTrigger.batch()` para elementos en grilla.
Cada sección tiene su propio timeline de entrada.

---

## 5. ESTRUCTURA DE SECCIONES

### SECCIÓN 1 — HERO (fullscreen)

**Componente:** `HeroSection.jsx`

**Layout:**
- Pantalla completa (100vh)
- Video loop o imagen de fondo de alta calidad (habitación con vista al lago o exterior del hotel)
- Overlay gradiente: `linear-gradient(to bottom, rgba(10,8,6,0.3) 0%, rgba(10,8,6,0.7) 60%, #0A0806 100%)`
- Contenido centrado verticalmente con leve offset hacia abajo

**Copy:**
```
LABEL (pequeño, uppercase, dorado):
"Villa Carlos Paz · Córdoba · Argentina"

TÍTULO H1 (Cormorant, enorme, cream):
"Algunas noches
no se olvidan."

SUBTÍTULO (DM Sans, light, gold-soft):
"El Hotel California no es solo donde dormís.
Es donde algo empieza a cambiar."

CTA PRIMARIO (botón con borde dorado, fondo transparente):
"Ver disponibilidad"

CTA SECUNDARIO (texto con línea inferior animada):
"Conocer el hotel ↓"
```

**Animaciones GSAP:**
1. Al cargar: imagen de fondo hace zoom-out desde scale(1.08) a scale(1) — duración 2s
2. Label entra con fade desde arriba — delay 0.3s
3. Título entra línea por línea desde abajo — stagger 0.15s — delay 0.6s
4. Subtítulo fade-in — delay 1.2s
5. CTAs suben desde abajo — delay 1.5s
6. Scroll indicator (línea vertical pulsante) aparece al final

**Extras:**
- Scroll suave con indicador animado (línea que baja en bucle)
- Navbar transparente que se vuelve sólida al hacer scroll

---

### SECCIÓN 2 — SOBRE EL HOTEL ("La historia")

**Componente:** `AboutSection.jsx`

**Layout:**
- Dos columnas: izquierda texto, derecha imagen
- Imagen con efecto parallax vertical
- Línea decorativa dorada horizontal sobre el título

**Copy:**
```
LABEL: "Nuestra historia"

TÍTULO H2:
"Construido para quienes
viajan diferente."

SUBTÍTULO:
"No todos buscan lo mismo cuando viajan.
Algunos buscan descanso. Otros, algo que recordar."

TEXTO LARGO:
"El Hotel California nació de una idea simple: que un hotel puede
ser cómodo y tener alma al mismo tiempo. Que no hace falta elegir
entre el servicio y la calidez. Que cada detalle — la luz de la
habitación, el silencio del pasillo, el olor de la mañana — puede
ser parte de una experiencia que el huésped no olvida.

Estamos en Carlos Paz desde hace más de veinte años.
Conocemos el lago, las sierras y a quienes vienen a visitarlas.
Y sabemos que lo que hace que alguien vuelva no es solo la cama.
Es haber sentido que estaban en el lugar correcto."

FRASE MEMORABLE:
"Un hotel con historia no se construye con años.
Se construye con noches bien vividas."

STATS (animados con countUp):
+20 años de historia | +4.800 huéspedes | 4.9★ promedio
```

**Animaciones GSAP:**
- Imagen hace parallax (yPercent: -15) al hacer scroll
- Texto entra por línea con stagger suave
- Stats hacen countUp al entrar en viewport
- Línea dorada hace scaleX de 0 a 1

---

### SECCIÓN 3 — HABITACIONES

**Componente:** `RoomsSection.jsx`

**Layout:**
- Título centrado arriba
- Grid de 3 cards horizontales (cada una con imagen grande, nombre, descripción y CTA)
- En mobile: scroll horizontal tipo carrusel

**Habitaciones:**

```
CARD 1 — Habitación Clásica
Imagen: habitación cálida, iluminación suave
Label: "Desde $85.000 / noche"
Título: "Clásica"
Descripción: "El espacio justo. Sin nada que sobre.
Para quienes saben lo que necesitan y prefieren
que todo funcione sin pensar."
Incluye: Cama queen, A/C, desayuno incluido, vista jardín
CTA: "Ver disponibilidad"

CARD 2 — Suite Lago (destacada — más grande visualmente)
Imagen: habitación con ventanal y vista al lago
Label: "Desde $140.000 / noche"
Título: "Suite Lago"
Descripción: "Una vista que cambia según la hora del día.
Por la mañana, el lago en calma. Por la noche,
las luces de la ciudad reflejadas en el agua."
Incluye: Cama king, bañera independiente, terraza privada, vista lago
CTA: "Ver disponibilidad"

CARD 3 — Suite Familiar
Imagen: suite amplia, tonos neutros
Label: "Desde $165.000 / noche"
Título: "Suite Familiar"
Descripción: "Pensada para que nadie tenga que sacrificar
comodidad. Espacio para todos, privacidad
para cada uno."
Incluye: 2 habitaciones, sala de estar, cocina equipada
CTA: "Ver disponibilidad"
```

**Frase de cierre de sección:**
*"Cada habitación es una decisión. Todas son una buena decisión."*

**Animaciones GSAP:**
- Cards entran en stagger desde abajo al hacer scroll
- Hover en card: imagen hace zoom sutil (scale 1.04), aparece overlay con CTA
- Card Suite Lago tiene borde dorado permanente como destacado

---

### SECCIÓN 4 — EXPERIENCIAS / AMENITIES

**Componente:** `ExperiencesSection.jsx`

**Layout:**
- Fondo oscuro con imagen de fondo muy opaca (textura de piedra o madera)
- Título centrado
- 4 ítems en grid 2x2 (desktop) / lista (mobile)
- Cada ítem: ícono lineal dorado + título + texto corto

**Copy:**
```
LABEL: "Lo que encontrás aquí"

TÍTULO H2:
"El descanso también
se diseña."

SUBTÍTULO:
"Cada servicio existe porque alguien lo necesitaba
y ningún huésped debería tener que pedirlo."

ÍTEM 1 — Desayuno de autor
Ícono: Coffee
"No un buffet. Una mesa. Con productos locales
preparados cada mañana. Porque el día
empieza antes de salir."

ÍTEM 2 — Piscina exterior
Ícono: Waves
"Abierta desde las 8. Con vista a las sierras
y tumbonas para quienes prefieren no hacer nada
de manera intensa."

ÍTEM 3 — Atención 24hs
Ícono: Clock
"Alguien siempre disponible. Sin chatbots,
sin demoras. Porque a veces se necesita
una persona, no un sistema."

ÍTEM 4 — Ubicación privilegiada
Ícono: MapPin
"A 4 cuadras del lago. A 10 minutos del centro.
Cerca de todo sin estar en el medio de nada."

FRASE MEMORABLE:
"Un buen hotel no se nota. Solo se siente."

CTA:
"Reservar mi estadía →"
```

**Animaciones GSAP:**
- Ítems entran en stagger con fade + translateY
- Íconos hacen un pequeño scale bounce al entrar
- Fondo imagen tiene parallax lento

---

### SECCIÓN 5 — TESTIMONIOS

**Componente:** `TestimonialsSection.jsx`

**Layout:**
- Fondo crema muy claro (contraste con secciones oscuras — respiro visual)
- Texto oscuro
- Slider/carrusel horizontal — 3 testimonios visibles
- Foto pequeña circular del huésped + nombre + ciudad + estrellas

**Copy:**
```
LABEL: "Lo que dicen quienes estuvieron"

TÍTULO H2:
"Las mejores reseñas
no se piden.
Llegan solas."

TESTIMONIO 1:
★★★★★
"Llegué cansado y me fui con ganas de volver.
Eso no pasa en todos lados."
— Martín G., Buenos Aires

TESTIMONIO 2:
★★★★★
"La vista desde la Suite Lago a las 7 de la mañana
es una de esas cosas que no se olvidan fácil."
— Laura y Diego, Rosario

TESTIMONIO 3:
★★★★★
"El desayuno solo ya justifica la estadía.
El resto es bonus."
— Valentina R., Córdoba Capital

TESTIMONIO 4:
★★★★★
"Limpio, silencioso, bien ubicado y con gente
que parece que genuinamente quiere que estés bien.
Volvemos en noviembre."
— Familia Méndez, Mendoza

FRASE MEMORABLE:
"Un huésped que vuelve es la crítica más honesta
que puede recibir un hotel."
```

**Animaciones GSAP:**
- Sección entra con fade sobre fondo claro
- Cards del slider: drag habilitado, snap suave entre cards
- Estrellas aparecen una a una con micro-stagger

---

### SECCIÓN 6 — RESERVA / CTA FINAL

**Componente:** `BookingSection.jsx`

**Layout:**
- Pantalla completa o casi completa
- Imagen de fondo (exterior del hotel de noche o vista lago al atardecer)
- Overlay oscuro fuerte
- Formulario de disponibilidad centrado: fecha entrada, fecha salida, personas, botón
- O bien: botón grande que abre modal/redirige a sistema de reservas

**Copy:**
```
LABEL: "Reservas directas — sin intermediarios"

TÍTULO H2:
"Tu próxima noche
empieza acá."

SUBTÍTULO:
"Reservar directo tiene ventajas reales:
mejor precio, atención personalizada y cancelación flexible."

FORMULARIO:
[ Fecha de llegada ] [ Fecha de salida ] [ Huéspedes ] [ Buscar disponibilidad → ]

BENEFICIOS BAJO EL FORMULARIO (inline, pequeños):
✓ Mejor precio garantizado
✓ Cancelación sin cargo hasta 48hs antes
✓ Check-in flexible
✓ Atención directa por WhatsApp

FRASE FINAL:
"Reservar en Hotel California no requiere código de descuento.
El precio mejor ya está acá."

CTA SECUNDARIO:
"¿Tenés dudas? Escribinos →" (abre WhatsApp)

ÚLTIMA PALABRA (párrafo de cierre de página):
"Carlos Paz tiene muchos hoteles. Nosotros no competimos con todos.
Solo con la versión de nosotros mismos del año pasado.
Si estás leyendo esto, algo te trajo hasta acá.
Quizás sea el momento de reservar y ver si tenemos razón."
```

**Animaciones GSAP:**
- Título entra en split-text desde abajo
- Formulario aparece con leve scale desde 0.95 + fade
- Beneficios entran en stagger horizontal
- Fondo tiene parallax sutil

---

### NAVBAR

**Componente:** `Navbar.jsx`

**Comportamiento:**
- Inicial: transparente, logo en blanco, links en cream
- Al scroll > 80px: fondo `rgba(10,8,6,0.95)` con blur, borde inferior dorado 1px
- Transición suave con GSAP o CSS transition
- Links: Habitaciones | Experiencias | Reseñas | Reservar
- CTA botón: "Reservar ahora" (dorado, pequeño)
- Logo: "Hotel California" en Cormorant Garamond con ícono mínimo

---

### FOOTER

**Componente:** `Footer.jsx`

**Layout:**
- Fondo muy oscuro `#070504`
- 3 columnas: Logo + tagline | Links rápidos | Contacto
- Línea dorada separadora
- Copyright + redes sociales

**Copy:**
```
TAGLINE:
"Donde el lago y las sierras
se encuentran con el descanso."

LINKS: Habitaciones · Experiencias · Reseñas · Reservar · Política de cancelación

CONTACTO:
📍 Av. San Martín 1200, Villa Carlos Paz, Córdoba
📞 +54 9 3541 00-0000
✉ hola@hotelcalifornia.com.ar

COPYRIGHT:
© 2025 Hotel California · Todos los derechos reservados
Desarrollado por Synttek
```

---

## 6. COMPONENTES TÉCNICOS

### CustomCursor.jsx
```jsx
// Círculo pequeño (8px) dorado que sigue el mouse con lag suave
// En hover sobre links/botones: escala a 2x y cambia a borde
// Implementar con GSAP quickTo para máxima performance
```

### GrainOverlay.jsx
```jsx
// Pseudo-elemento fixed, pointer-events none, z-index 9999
// SVG noise filter o imagen PNG grain con opacity 0.035
// Cubre toda la página para dar textura cinematográfica
```

### SmoothScroll
```jsx
// Usar Lenis + GSAP ScrollTrigger para scroll suave
// npm install @studio-freight/lenis
```

---

## 7. PERFORMANCE Y NOTAS

- Todas las imágenes: WebP, lazy loading, placeholder blur
- Fuentes: preload en `<head>`
- GSAP: importar solo lo necesario (`gsap`, `ScrollTrigger`, `SplitText` si licencia disponible — si no, split manual)
- Formulario de reservas: puede ser mock para la demo (no requiere backend)
- WhatsApp link: `https://wa.me/5493541000000`
- Mobile first en Tailwind, breakpoints: `sm`, `md`, `lg`, `xl`

---

## 8. ORDEN DE IMPLEMENTACIÓN SUGERIDO

1. Setup proyecto (Vite + React + Tailwind + GSAP + Lenis)
2. Variables CSS globales + fuentes
3. GrainOverlay + CustomCursor
4. Navbar
5. HeroSection (la más impactante — marcar el tono)
6. AboutSection
7. RoomsSection
8. ExperiencesSection
9. TestimonialsSection
10. BookingSection
11. Footer
12. Pulido de animaciones y responsive

---

## 9. IMÁGENES (para demo)

Usar Unsplash con estas búsquedas:
- Hero: `https://unsplash.com/s/photos/luxury-hotel-lake`
- Habitaciones: `https://unsplash.com/s/photos/hotel-room-elegant`
- About: `https://unsplash.com/s/photos/boutique-hotel`
- Experiencias: `https://unsplash.com/s/photos/hotel-pool-mountains`
- Booking: `https://unsplash.com/s/photos/hotel-night-exterior`

O usar directamente URLs de Unsplash Source:
```
https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80
```

---

*PRD generado para demo — Synttek · Villa Carlos Paz, Córdoba*