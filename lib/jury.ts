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
};

/** Cada criterio se puntúa de 0 a 10. */
export const JURY_MAX_SCORE = 10;

export const JURY_CRITERIA: readonly JuryCriterion[] = [
  {
    key: "encaje",
    field: "Encaje y utilidad",
    weight: 30,
    title: "Encaje con MiniPay y utilidad real",
    desc: "¿Resuelve un problema cotidiano para un usuario móvil? ¿Lo usaría alguien sin saber qué es blockchain?",
  },
  {
    key: "calidad",
    field: "Calidad del producto",
    weight: 25,
    title: "Calidad del producto y acabado",
    desc: "¿Funciona de principio a fin en móvil? Sin enlaces rotos, sin flujos quebrados, acción principal en menos de 60 segundos.",
  },
  {
    key: "integracion",
    field: "Integración Celo",
    weight: 20,
    title: "Integración con Celo y stablecoins",
    desc: "¿Los stablecoins son centrales al flujo, no agregados al final? ¿El contrato hace algo significativo?",
  },
  {
    key: "traccion",
    field: "Tracción onchain",
    weight: 15,
    title: "Tracción y actividad en blockchain",
    desc: "Usuarios y transacciones reales. Cero actividad en blockchain es bandera roja.",
  },
  {
    key: "originalidad",
    field: "Originalidad",
    weight: 10,
    title: "Originalidad y diferenciación",
    desc: "¿Hay un hueco en el catálogo de MiniPay? Juegos con mecánicas reales, ganar por hacer, IA con pago por uso, agentes onchain.",
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
