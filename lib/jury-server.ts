/**
 * Helpers solo-servidor del portal de jurados.
 * Nunca importar desde un componente cliente — solo desde route handlers.
 */

/**
 * Mapea token → nombre del jurado. Se define en la variable de entorno
 * `JURY_TOKENS` como JSON, p. ej.:
 *   JURY_TOKENS={"a1b2c3":"0xj4an","d4e5f6":"Angela Ocando"}
 * El nombre se usa para atribuir la evaluación en Airtable.
 */
export function resolveJudge(token: string | null): string | null {
  if (!token) return null;
  const raw = process.env.JURY_TOKENS;
  if (!raw) return null;
  let map: Record<string, string>;
  try {
    map = JSON.parse(raw);
  } catch {
    console.error("[jury] JURY_TOKENS no es JSON válido.");
    return null;
  }
  const name = map[token.trim()];
  return typeof name === "string" && name.trim() ? name.trim() : null;
}

/** Credenciales de la base "Demo Day" (donde caen las entregas de los equipos). */
export function demoDayConfig() {
  return {
    apiKey: process.env.AIRTABLE_DEMODAY_API_KEY,
    baseId: process.env.AIRTABLE_DEMODAY_BASE_ID,
    table: process.env.AIRTABLE_DEMODAY_TABLE_NAME ?? "Demo Day",
  };
}

/**
 * Credenciales de la tabla "Evaluaciones".
 * Por defecto reutiliza la misma base/API key de Demo Day.
 */
export function evaluationsConfig() {
  return {
    apiKey: process.env.AIRTABLE_DEMODAY_API_KEY,
    baseId: process.env.AIRTABLE_DEMODAY_BASE_ID,
    table: process.env.AIRTABLE_EVALS_TABLE_NAME ?? "Evaluaciones",
  };
}

const AIRTABLE_BASE = "https://api.airtable.com/v0";

export function airtableUrl(baseId: string, table: string, qs = "") {
  return `${AIRTABLE_BASE}/${baseId}/${encodeURIComponent(table)}${qs}`;
}
