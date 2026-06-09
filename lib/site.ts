/**
 * Contenido y datos de la landing.
 * Centralizado para que copy y secciones se editen sin tocar componentes.
 */

export const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://chat.whatsapp.com/";

export const NAV_LINKS = [
  { label: "Agenda", href: "#agenda" },
  { label: "Premios", href: "#premios" },
  { label: "Mentores", href: "#mentores" },
  { label: "Jurado", href: "#jurado" },
  { label: "FAQ", href: "#faq" },
] as const;

export const STATS = [
  { value: "3M", unit: "COPm", label: "en premios en efectivo" },
  { value: "3", unit: "semanas", label: "de bootcamp + hackathon" },
  { value: "Híbrida", unit: "", label: "Presencial en Cali + Virtual" },
  { value: "Desde", unit: "cero", label: "sin requisitos" },
] as const;

/** Eras — visual timeline de la sección "¿Por qué esto importa?" */
export const ERAS = [
  {
    tag: "Ayer",
    title: "Apps que reaccionaban",
    desc: "El software esperaba tu clic. Nada pasaba si tú no lo ordenabas.",
  },
  {
    tag: "Hoy",
    title: "IA que ayuda a construir",
    desc: "Los modelos escriben código, redactan y aceleran a quien construye.",
  },
  {
    tag: "Lo que viene",
    title: "Agentes que usan dinero",
    desc: "Software que paga, cobra y mueve stablecoins de forma autónoma.",
  },
] as const;

/** "¿Qué vas a construir?" — ejemplos concretos de proyectos. */
export const BUILD_EXAMPLES = [
  {
    icon: "PiggyBank",
    text: "Un agente que ahorra por ti: redondea cada compra y te acerca a tu meta.",
  },
  {
    icon: "Users",
    text: "Una app para la vaca del grupo: cobra, organiza los turnos y reparte sin peleas.",
  },
  {
    icon: "Send",
    text: "Un agente que le manda plata a tu familia, puntual, cada mes.",
  },
  {
    icon: "Repeat",
    text: "Un agente que caza tus suscripciones y cancela las que no usas.",
  },
  {
    icon: "TrendingUp",
    text: "Un mercado de predicciones sobre el fútbol, las elecciones o el dólar.",
  },
  {
    icon: "MapPin",
    text: "Escribe «necesito un plomero hoy» y un agente lo encuentra, agenda y paga.",
  },
] as const;

/** "¿Qué aprenderás?" */
export const SKILLS = [
  {
    icon: "Sparkles",
    title: "Vibe Coding",
    desc: "Aprende a construir usando herramientas como Cursor, Claude y ChatGPT como copilotos de desarrollo.",
  },
  {
    icon: "Bot",
    title: "Agentes Onchain",
    desc: "Construye software capaz de interactuar con apps, ejecutar acciones y operar usando wallets y stablecoins.",
  },
  {
    icon: "Coins",
    title: "Stablecoins",
    desc: "Integra pagos y dinero programable dentro de tus apps.",
  },
  {
    icon: "LayoutGrid",
    title: "Mini Apps",
    desc: "Construye apps ligeras listas para distribución masiva.",
  },
  {
    icon: "Wallet",
    title: "Wallets",
    desc: "Integra identidad, autenticación y dinero onchain.",
  },
  {
    icon: "Rocket",
    title: "Deploy",
    desc: "Publica tu proyecto y déjalo funcionando en internet.",
  },
] as const;

export const TIMELINE = [
  {
    phase: "01",
    title: "Kickoff",
    date: "Lunes 1 de junio · 6:00 a 8:00 PM",
    venue: "Auditorio Ernesto de Lima · Edificio L",
    desc: "Presentación oficial de la hackathon, comunidad, retos y primeros pasos para empezar a construir.",
    links: [
      {
        label: "Grabación",
        href: "https://www.youtube.com/watch?v=ihDRqe2X-4c",
        icon: "Youtube",
      },
      {
        label: "Slides",
        href: "https://hackathon.celocolombia.org/slides/kickoff",
        icon: "Presentation",
      },
    ],
  },
  {
    phase: "02",
    title: "Bootcamp #1",
    date: "Viernes 5 de junio · 6:00 a 8:00 PM",
    venue: "Auditorio Banco de Occidente · Edificio E",
    desc: "Introducción a Vibe Coding, herramientas IA y fundamentos para construir apps onchain.",
    links: [
      {
        label: "Grabación",
        href: "https://youtu.be/v1IOUc2M1zw",
        icon: "Youtube",
      },
      {
        label: "Slides",
        href: "https://hackathon.celocolombia.org/slides/bootcamp-1",
        icon: "Presentation",
      },
    ],
  },
  {
    phase: "03",
    title: "Bootcamp #2",
    date: "Martes 9 de junio · 6:00 a 8:00 PM",
    venue: "Auditorio Carlos Arcesio Paz · Edificio D",
    desc: "Wallets, stablecoins y cómo conectar dinero programable dentro de tus apps.",
  },
  {
    phase: "04",
    title: "Bootcamp #3",
    date: "Viernes 12 de junio · 6:00 a 8:00 PM",
    venue: "Auditorio Carlos Arcesio Paz · Edificio D",
    desc: "Mini apps, agentes onchain y preparación para la hackathon.",
  },
  {
    phase: "05",
    title: "Hackathon + Office Hours",
    date: "12 → 18 de junio",
    desc: "Una semana construyendo junto a mentores, comunidad y otros builders.",
  },
  {
    phase: "06",
    title: "Demo Day & Ganadores",
    date: "19 de junio",
    venue: "Auditorio Carlos Arcesio Paz · Edificio D",
    desc: "Presentación de proyectos, selección de ganadores y cierre oficial de la hackathon.",
  },
] as const;

/** Podio — premios a las mejores Mini Apps. */
export const PRIZES = [
  { rank: 1, place: "1er lugar", amount: "1.000.000", note: "Mejor Mini App" },
  { rank: 2, place: "2do lugar", amount: "600.000", note: "Mejor Mini App" },
  { rank: 3, place: "3er lugar", amount: "400.000", note: "Mejor Mini App" },
] as const;

/** Premio adicional por integración. */
export const PRIZE_BONUS = {
  title: "Bonus integración COPm",
  amount: "1.000.000",
  detail: "Hasta 10 proyectos · 100.000 COPm cada uno",
} as const;

/** Bolsa total en premios (suma de podio + bonus). */
export const PRIZE_TOTAL = "3.000.000";

/**
 * Mentores. `role` es un arreglo de tokens (texto + link opcional) para que
 * cada mentor arme su línea de presentación libremente. `achievements` usa el
 * patrón `pre + linkText + post` (href vacío = texto plano destacado).
 */
export const MENTORS = [
  {
    name: "Camilo Sacanamboy",
    initials: "CS",
    photo: "/camilo.png",
    role: [
      { text: "Fundador de ", href: "" },
      { text: "Peewah", href: "https://peewah.co" },
      { text: " · Embajador de ", href: "" },
      { text: "Celo Colombia", href: "https://www.celocolombia.org/" },
    ],
    achievements: [
      {
        icon: "Trophy",
        pre: "Ganador del Hookathon Global — ",
        linkText: "Uniswap Hook Incubator",
        href: "https://atrium.academy/uniswap",
        post: " (2025)",
      },
      {
        icon: "Star",
        pre: "Top 7 Global en ",
        linkText: "Proof of Ship",
        href: "https://talent.app/~/earn/celo-proof-of-ship",
        post: " (abril 2026)",
      },
    ],
  },
  {
    name: "Tereza Bízková",
    initials: "TB",
    photo: "/tereza.jpg",
    role: [
      {
        text: "Head of Communications & Community en Funding the Commons",
        href: "",
      },
    ],
    achievements: [
      {
        icon: "Sparkles",
        pre: "Conecta ",
        linkText: "narrativa, ecosistemas y producto",
        href: "",
        post: ".",
      },
      {
        icon: "Users",
        pre: "Contribuye a ",
        linkText: "Crypto Altruism",
        href: "",
        post: " y forma parte de ReFi Medellín.",
      },
      {
        icon: "Megaphone",
        pre: "Apoyo en ",
        linkText: "posicionamiento, comunicación y distribución",
        href: "",
        post: " desde el día uno.",
      },
    ],
  },
  {
    name: "Saul Jaramillo",
    initials: "SJ",
    photo: "/0xultravioleta.jpg",
    role: [
      { text: "Founder de ", href: "" },
      { text: "Ultravioleta DAO", href: "" },
      { text: " · Agentic en ", href: "" },
      { text: "MoonPay", href: "" },
    ],
    achievements: [
      {
        icon: "Bot",
        pre: "Power user de ",
        linkText: "Claude Code y agentic systems",
        href: "",
        post: " a escala industrial — MCP, evals y observabilidad.",
      },
      {
        icon: "Coins",
        pre: "Contribuye a ",
        linkText: "x402-rs",
        href: "",
        post: " — pagos USDC sin gas en 19 mainnets, micropagos agente-a-agente.",
      },
      {
        icon: "Rocket",
        pre: "Construyó ",
        linkText: "Execution Market y Meshrelay",
        href: "",
        post: " — agentes que contratan humanos y se comunican entre sí.",
      },
      {
        icon: "Wrench",
        pre: "17 años en DevOps · 9 en blockchain. Antes Head of DevOps en ",
        linkText: "Stake Capital",
        href: "",
        post: " (5 años).",
      },
    ],
  },
] as const;

/**
 * Jurado oficial. Mismo shape que MENTOR pero como array para escalar
 * cuando se sumen más jurados.
 */
export const JURY = [
  {
    name: "0xj4an",
    initials: "JA",
    photo: "/0xj4an.jpeg",
    roleText: "Celo Regional Ambassador para Colombia · Lead de ",
    roleLinks: [
      {
        label: "Gobernanza",
        href: "https://mondo.celo.org/delegate/0xFEF5A1A2b3754A2F53161EaaAcb3EB889F004d4a",
      },
      {
        label: "Comunidades",
        href: "https://forum.celo.org/u/celocommunities/summary",
      },
    ],
    achievements: [
      {
        icon: "Coins",
        pre: "Autor de la propuesta del ",
        linkText: "cCOP (hoy COPm)",
        href: "https://mondo.celo.org/governance/191",
        post: ", aprobada en gobernanza Celo",
      },
      {
        icon: "ShieldCheck",
        pre: "3 años liderando la ",
        linkText: "gobernanza del ecosistema Celo",
        href: "",
        post: "",
      },
      {
        icon: "Mic",
        pre: "Speaker recurrente sobre ",
        linkText: "stablecoins y usabilidad onchain",
        href: "",
        post: "",
      },
    ],
  },
  {
    name: "Angela Ocando",
    initials: "AO",
    photo: "/angela.jpg",
    roleText: "Dev Rel en ",
    roleLinks: [
      { label: "Uniswap Labs", href: "https://uniswap.org/" },
    ],
    achievements: [
      {
        icon: "GraduationCap",
        pre: "Escaló una de las comunidades hispanohablantes de blockchain más grandes en ",
        linkText: "Platzi",
        href: "https://platzi.com/",
        post: " — 100.000+ estudiantes",
      },
      {
        icon: "Users",
        pre: "Apoya a builders y partners del ecosistema en ",
        linkText: "Uniswap v4 y la Uniswap API",
        href: "",
        post: "",
      },
      {
        icon: "Sparkles",
        pre: "Conecta builders con ",
        linkText: "AI workflows",
        href: "",
        post: " y nuevas formas de shippear productos",
      },
    ],
  },
  {
    name: "Nicolas Perez",
    initials: "NP",
    photo: "/nicolas.jpeg",
    roleText: "Founder de Legal Monitor · Investor & Venture Builder",
    roleLinks: [],
    achievements: [
      {
        icon: "Sparkles",
        pre: "Ha liderado la creación de ",
        linkText: "startups y productos digitales",
        href: "",
        post: " en fintech, blockchain, IA y activos tokenizados",
      },
      {
        icon: "Users",
        pre: "Acompaña a ",
        linkText: "startups desde etapa temprana",
        href: "",
        post: " hasta procesos de escalamiento",
      },
      {
        icon: "Mic",
        pre: "Mentor y conferencista en ",
        linkText: "innovación y tecnologías emergentes",
        href: "",
        post: " para empresas, gobiernos y comunidades tech",
      },
    ],
  },
] as const;

export const FAQS = [
  {
    q: "¿Necesito saber programar?",
    a: [
      "No necesariamente.",
      "Puedes participar incluso si nunca has programado antes y aprender usando herramientas de Vibe Coding durante el bootcamp.",
      "Sin embargo, las personas con experiencia programando probablemente tendrán una ventaja durante la hackathon, especialmente al construir mini apps más avanzadas o complejas en menos tiempo.",
      "La idea del bootcamp es ayudarte a entender las bases y comenzar a construir rápido.",
    ],
  },
  {
    q: "¿Qué es Vibe Coding?",
    a: [
      "Vibe Coding es una forma de construir software usando herramientas de IA como Cursor, Claude o ChatGPT como copilotos de desarrollo.",
      "En lugar de escribir todo manualmente desde cero, puedes describir ideas, iterar más rápido y construir mini apps funcionales apoyándote en IA.",
      "Será una parte importante de la hackathon.",
    ],
  },
  {
    q: "¿Qué necesito para participar?",
    a: [
      "Necesitas una laptop, conexión a internet y ganas de construir.",
      "También recomendamos tener acceso a herramientas de IA como ChatGPT, Claude o Cursor, ya que serán parte importante de la experiencia durante la hackathon.",
    ],
  },
  {
    q: "¿Puedo participar solo o en equipo?",
    a: [
      "Sí.",
      "Puedes participar solo o en equipos de hasta 4 integrantes.",
      "También ayudaremos a conectar builders que quieran formar equipo durante la hackathon.",
    ],
  },
  {
    q: "¿Cómo se elegirán los ganadores?",
    a: [
      "Los proyectos serán evaluados por el jurado de la hackathon.",
      "Más adelante compartiremos los criterios oficiales de evaluación, pero se tendrán en cuenta aspectos como creatividad, ejecución, experiencia del producto e integración con herramientas onchain.",
    ],
  },
  {
    q: "¿La hackathon es virtual o presencial?",
    a: [
      "La hackathon será híbrida.",
      "Tendremos actividades presenciales en Cali y participación virtual para builders de toda Colombia.",
    ],
  },
  {
    q: "¿Qué pasa si nunca he usado blockchain?",
    a: [
      "No hay problema.",
      "El bootcamp cubrirá conceptos fundamentales como wallets, stablecoins, mini apps y herramientas onchain.",
      "La idea es ayudarte a entrar al ecosistema y comenzar a construir aunque sea tu primera vez explorando estas tecnologías.",
    ],
  },
  {
    q: "¿Qué herramientas usaremos durante la hackathon?",
    a: [
      "Trabajaremos con herramientas modernas de Vibe Coding y desarrollo onchain como Cursor, Claude, ChatGPT, wallets y herramientas del ecosistema Celo.",
    ],
  },
  {
    q: "¿Necesito tener una idea antes de entrar?",
    a: [
      "No.",
      "Puedes llegar con una idea, explorando o buscando equipo.",
      "Durante el bootcamp y la hackathon iremos compartiendo ejemplos, retos e inspiración para construir mini apps.",
    ],
  },
  {
    q: "¿Qué se construirá durante la hackathon?",
    a: [
      "El foco principal de la hackathon será la construcción de mini apps usando herramientas de IA y tecnologías onchain del ecosistema Celo.",
    ],
  },
  {
    q: "¿Los premios son individuales o por equipo?",
    a: [
      "Los premios serán entregados a los equipos o participantes ganadores definidos por el jurado.",
      "Más adelante compartiremos las reglas completas y distribución oficial de premios.",
    ],
  },
] as const;

/** Pasos visuales del formulario. */
export const APPLY_STEPS = [
  { n: "1", t: "Aplicas", d: "Llenas este formulario en menos de un minuto." },
  { n: "2", t: "Entras al grupo de WhatsApp", d: "Te llevamos directo a la comunidad." },
  { n: "3", t: "Empiezas a construir", d: "Recibes fechas, recursos y el primer reto." },
] as const;

/* --- Preguntas del formulario --- */

export const PROGRAMMING_EXP = [
  "Nunca he programado",
  "He probado un poco",
  "Ya construyo proyectos",
  "Trabajo programando",
] as const;

export const AI_TOOLS_EXP = [
  "Nunca",
  "He usado ChatGPT",
  "Uso Cursor, Claude o Copilot",
  "Construyo regularmente con Vibe Coding",
] as const;

export const BLOCKCHAIN_EXP = [
  "No sé nada",
  "He usado wallets o crypto",
  "He usado apps onchain",
  "Ya he construido proyectos blockchain",
] as const;

export const MOTIVATIONS = [
  "Aprender a construir con IA",
  "Crear mi primera app",
  "Explorar blockchain y stablecoins",
  "Construir algo con otros builders",
  "Competir por premios",
  "Conocer gente del ecosistema",
  "Todavía estoy explorando",
] as const;

export const MODALITIES = ["Presencial en Cali", "Virtual"] as const;
