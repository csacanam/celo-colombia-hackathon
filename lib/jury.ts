/**
 * Lógica del portal de jurados.
 * Los criterios reflejan la rúbrica pública (ver RUBRIC_CRITERIA en site.ts),
 * pero con `key` estable y nombre de columna en Airtable para evaluar.
 * No contiene secretos — los tokens de jurado viven en variables de entorno.
 */

export type JuryCriterion = {
  /** Identificador estable usado entre cliente y servidor. */
  key: string;
  /** Nombre exacto de la columna en la tabla "Evaluaciones" de Airtable. */
  field: string;
  /** Peso en el total (los pesos suman 100). */
  weight: number;
  title: string;
  desc: string;
  /** Qué hace que el criterio puntúe alto, enmarcado hacia MiniPay. */
  aim: string;
};

/** Cada criterio se puntúa de 0 a 10. */
export const JURY_MAX_SCORE = 10;

export const JURY_CRITERIA: readonly JuryCriterion[] = [
  {
    key: "encaje",
    field: "Encaje y utilidad",
    weight: 30,
    title: "Encaje con MiniPay y utilidad real",
    desc: "¿Resuelve un problema cotidiano para un usuario móvil de mercados emergentes? ¿Lo usaría alguien sin saber qué es blockchain?",
    aim: "Una persona común, sin idea de cripto, ¿entendería en la primera pantalla para qué sirve y la usaría para algo real de su día a día —pagar, ganar, ahorrar o enviar plata? Bandera roja: solo le sirve a quien ya sabe de blockchain.",
  },
  {
    key: "calidad",
    field: "Calidad del producto",
    weight: 25,
    title: "Calidad del producto y acabado",
    desc: "¿Funciona de principio a fin en móvil? Sin enlaces rotos, sin flujos quebrados, textos claros, acción principal en menos de 60 segundos.",
    aim: "Ábrela en el celular y haz la acción principal: debería lograrse en menos de 60 segundos y pocos toques, sin enlaces rotos ni pasos trabados. Imagina a alguien con un teléfono básico y mala señal.",
  },
  {
    key: "integracion",
    field: "Integración Celo",
    weight: 20,
    title: "Integración con Celo y stablecoins",
    desc: "¿Los stablecoins (USDT, USDC, USDm) son centrales al flujo, no agregados al último momento? ¿El contrato hace algo significativo?",
    aim: "Los stablecoins son monedas digitales estables atadas al dólar (USDT, USDC, USDm). Puntúa alto si mover esos stablecoins es el corazón de la app y el usuario nunca tiene que ver ni usar CELO.",
  },
  {
    key: "traccion",
    field: "Tracción onchain",
    weight: 15,
    title: "Tracción y actividad en blockchain",
    desc: "Usuarios reales, transacciones reales. Incluso 5 wallets pagando comisiones es una señal fuerte. Cero actividad en blockchain es bandera roja.",
    aim: "Abre el panel de Actividad onchain de arriba: las transacciones son acciones reales registradas y los usuarios son personas distintas que la usaron. Gente real usándola (aunque sean 5) es buena señal; cero actividad es bandera roja.",
  },
  {
    key: "originalidad",
    field: "Originalidad",
    weight: 10,
    title: "Originalidad y diferenciación",
    desc: "¿Hay un hueco en el catálogo de MiniPay? Categorías más valoradas: juegos con mecánicas reales, ganar por hacer, IA con pago por uso, agentes en blockchain.",
    aim: "MiniPay ya tiene un catálogo de apps; vale más lo nuevo o con un ángulo claramente distinto. Hoy hay más oportunidad en juegos de habilidad, apps de “ganar haciendo”, IA que cobra por uso y agentes que pagan o cobran solos.",
  },
] as const;

export type ScoreMap = Partial<Record<string, number>>;

/**
 * Total ponderado en escala 0–100.
 * Cada criterio (0–10) aporta `weight * score / 10`.
 * Devuelve null si falta puntuar algún criterio.
 */
export function computeWeightedTotal(scores: ScoreMap): number | null {
  let total = 0;
  for (const c of JURY_CRITERIA) {
    const s = scores[c.key];
    if (typeof s !== "number" || Number.isNaN(s)) return null;
    total += (c.weight * s) / JURY_MAX_SCORE;
  }
  return Math.round(total * 10) / 10;
}
