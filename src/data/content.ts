export const content = {
  nav: {
    links: ['Habitaciones', 'Experiencias', 'Reseñas', 'Reservar'],
    cta: 'Reservar ahora',
  },
  hero: {
    label: 'Villa Carlos Paz · Córdoba · Argentina',
    title: 'Algunas noches\nno se olvidan.',
    subtitle:
      'El Hotel California no es solo donde dormís.\nEs donde algo empieza a cambiar.',
    ctaPrimary: 'Ver disponibilidad',
    ctaSecondary: 'Conocer el hotel ↓',
  },
  about: {
    label: 'Nuestra historia',
    title: 'Construido para quienes\nviajan diferente.',
    subtitle:
      'No todos buscan lo mismo cuando viajan.\nAlgunos buscan descanso. Otros, algo que recordar.',
    body:
      'El Hotel California nació de una idea simple: que un hotel puede\nser cómodo y tener alma al mismo tiempo. Que no hace falta elegir\nentre el servicio y la calidez. Que cada detalle — la luz de la\nhabitación, el silencio del pasillo, el olor de la mañana — puede\nser parte de una experiencia que el huésped no olvida.\n\nEstamos en Carlos Paz desde hace más de veinte años.\nConocemos el lago, las sierras y a quienes vienen a visitarlas.\nY sabemos que lo que hace que alguien vuelva no es solo la cama.\nEs haber sentido que estaban en el lugar correcto.',
    quote:
      'Un hotel con historia no se construye con años.\nSe construye con noches bien vividas.',
    stats: [
      { value: 20, prefix: '+', suffix: ' años de historia', label: '+20 años de historia' },
      { value: 4800, prefix: '+', suffix: ' huéspedes', label: '+4.800 huéspedes' },
      { value: 49, prefix: '', suffix: ' promedio', label: '4.9★ promedio', decimals: 1 },
    ],
  },
  rooms: {
    title: 'Habitaciones',
    quote: 'Cada habitación es una decisión. Todas son una buena decisión.',
    cards: [
      {
        slot: '[ROOM_CLASICA]',
        price: 'Desde $85.000 / noche',
        title: 'Clásica',
        description:
          'El espacio justo. Sin nada que sobre.\nPara quienes saben lo que necesitan y prefieren\nque todo funcione sin pensar.',
        includes: ['Cama queen', 'A/C', 'desayuno incluido', 'vista jardín'],
        cta: 'Ver disponibilidad',
      },
      {
        slot: '[ROOM_LAGO]',
        price: 'Desde $140.000 / noche',
        title: 'Suite Lago',
        description:
          'Una vista que cambia según la hora del día.\nPor la mañana, el lago en calma. Por la noche,\nlas luces de la ciudad reflejadas en el agua.',
        includes: ['Cama king', 'bañera independiente', 'terraza privada', 'vista lago'],
        cta: 'Ver disponibilidad',
      },
      {
        slot: '[ROOM_FAMILIAR]',
        price: 'Desde $165.000 / noche',
        title: 'Suite Familiar',
        description:
          'Pensada para que nadie tenga que sacrificar\ncomodidad. Espacio para todos, privacidad\npara cada uno.',
        includes: ['2 habitaciones', 'sala de estar', 'cocina equipada'],
        cta: 'Ver disponibilidad',
      },
    ],
  },
  experiences: {
    label: 'Lo que encontrás aquí',
    title: 'El descanso también\nse diseña.',
    subtitle:
      'Cada servicio existe porque alguien lo necesitaba\ny ningún huésped debería tener que pedirlo.',
    items: [
      {
        icon: 'Coffee',
        title: 'Desayuno de autor',
        body:
          'No un buffet. Una mesa. Con productos locales\npreparados cada mañana. Porque el día\nempieza antes de salir.',
      },
      {
        icon: 'Waves',
        title: 'Piscina exterior',
        body:
          'Abierta desde las 8. Con vista a las sierras\ny tumbonas para quienes prefieren no hacer nada\nde manera intensa.',
      },
      {
        icon: 'Clock3',
        title: 'Atención 24hs',
        body:
          'Alguien siempre disponible. Sin chatbots,\nsin demoras. Porque a veces se necesita\nuna persona, no un sistema.',
      },
      {
        icon: 'MapPin',
        title: 'Ubicación privilegiada',
        body:
          'A 4 cuadras del lago. A 10 minutos del centro.\nCerca de todo sin estar en el medio de nada.',
      },
    ],
    quote: 'Un buen hotel no se nota. Solo se siente.',
    cta: 'Reservar mi estadía →',
  },
  testimonials: {
    label: 'Lo que dicen quienes estuvieron',
    title: 'Las mejores reseñas\nno se piden.\nLlegan solas.',
    items: [
      {
        slot: '[TESTIMONIALS_01]',
        rating: 5,
        quote: 'Llegué cansado y me fui con ganas de volver.\nEso no pasa en todos lados.',
        author: 'Martín G.',
        city: 'Buenos Aires',
      },
      {
        slot: '[TESTIMONIALS_02]',
        rating: 5,
        quote:
          'La vista desde la Suite Lago a las 7 de la mañana\nes una de esas cosas que no se olvidan fácil.',
        author: 'Laura y Diego',
        city: 'Rosario',
      },
      {
        slot: '[TESTIMONIALS_03]',
        rating: 5,
        quote: 'El desayuno solo ya justifica la estadía.\nEl resto es bonus.',
        author: 'Valentina R.',
        city: 'Córdoba Capital',
      },
      {
        slot: '[TESTIMONIALS_04]',
        rating: 5,
        quote:
          'Limpio, silencioso, bien ubicado y con gente\nque parece que genuinamente quiere que estés bien.\nVolvemos en noviembre.',
        author: 'Familia Méndez',
        city: 'Mendoza',
      },
    ],
    quote:
      'Un huésped que vuelve es la crítica más honesta\nque puede recibir un hotel.',
  },
  booking: {
    label: 'Reservas directas — sin intermediarios',
    title: 'Tu próxima noche\nempieza acá.',
    subtitle:
      'Reservar directo tiene ventajas reales:\nmejor precio, atención personalizada y cancelación flexible.',
    form: {
      arrival: 'Fecha de llegada',
      departure: 'Fecha de salida',
      guests: 'Huéspedes',
      cta: 'Buscar disponibilidad →',
    },
    benefits: [
      'Mejor precio garantizado',
      'Cancelación sin cargo hasta 48hs antes',
      'Check-in flexible',
      'Atención directa por WhatsApp',
    ],
    closing:
      'Reservar en Hotel California no requiere código de descuento.\nEl precio mejor ya está acá.',
    ctaWhatsapp: '¿Tenés dudas? Escribinos →',
    finalWord:
      'Carlos Paz tiene muchos hoteles. Nosotros no competimos con todos.\nSolo con la versión de nosotros mismos del año pasado.\nSi estás leyendo esto, algo te trajo hasta acá.\nQuizás sea el momento de reservar y ver si tenemos razón.',
    whatsappHref: 'https://wa.me/5493541560518',
  },
  footer: {
    tagline: 'Donde el lago y las sierras\nse encuentran con el descanso.',
    links: [
      'Habitaciones',
      'Experiencias',
      'Reseñas',
      'Reservar',
      'Política de cancelación',
    ],
    contact: {
      address: 'Av. San Martín 1200, Villa Carlos Paz, Córdoba',
      phone: '+54 9 3541 56-0518',
      email: 'hola@hotelcalifornia.com.ar',
    },
    copyright: '© 2025 Hotel California · Todos los derechos reservados',
    credit: 'Desarrollado por Synttek',
  },
} as const

export type SiteContent = typeof content
export type NavigationItem = SiteContent['nav']['links'][number]
export type RoomCard = SiteContent['rooms']['cards'][number]
export type ExperienceItem = SiteContent['experiences']['items'][number]
export type TestimonialItem = SiteContent['testimonials']['items'][number]
