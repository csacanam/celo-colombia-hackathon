# Hackathon de Agentes Onchain — Landing

Landing mobile-first para la Hackathon de Agentes Onchain de Celo Colombia.
La métrica de éxito es una sola: visitantes que terminan en el grupo de WhatsApp.

Stack: **Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completa las variables
npm run dev                  # http://localhost:3000
```

`npm run build` genera la versión de producción.

## Variables de entorno

Definidas en `.env.example`:

| Variable | Para qué |
|---|---|
| `AIRTABLE_API_KEY` | Personal access token de Airtable (scope `data.records:write`). |
| `AIRTABLE_BASE_ID` | ID de la base (empieza con `app`). |
| `AIRTABLE_TABLE_NAME` | Nombre de la tabla. Por defecto `Hackathon Leads`. |
| `NEXT_PUBLIC_WHATSAPP_URL` | Link del grupo de WhatsApp para el redirect post-registro. |

Si Airtable no está configurado, el endpoint `/api/apply` valida y responde
`ok: true` igual (sin persistir) para no romper el flujo en desarrollo.

## Tabla de Airtable — "Hackathon Leads"

Crea estos campos con estos nombres exactos:

| Campo | Tipo |
|---|---|
| `Nombre` | Single line text |
| `Apellido` | Single line text |
| `Email` | Email |
| `WhatsApp` | Phone number |
| `Ciudad` | Single line text |
| `Experiencia programando` | Single select |
| `Experiencia con IA` | Single select |
| `Conocimiento blockchain` | Single select |
| `Motivación` | Single select |
| `Modalidad` | Single select |
| `Fecha de registro` | Date (incluye hora) |

> El endpoint usa `typecast: true`, así que los `Single select` aceptan
> valores nuevos automáticamente.

## Estructura

```
app/
  layout.tsx          SEO, fuentes (Geist), metadata
  page.tsx            Ensambla las secciones + JSON-LD del evento
  api/apply/route.ts  Endpoint: valida → guarda en Airtable → responde
components/           Una sección por archivo
lib/site.ts           Todo el contenido (copy, premios, FAQ, mentores…)
```

Para editar textos, premios, mentores o FAQ: `lib/site.ts`.

## Deploy

Pensado para Vercel: `import` del repo, define las variables de entorno y listo.

Dominios candidatos: `agentesonchain.co`, `hackathononchain.co`,
`onchainagents.co`, `buildoncelo.co`. El `metadataBase` en `app/layout.tsx`
asume `agentesonchain.co` — ajústalo al dominio final.
