import type { F4Entry } from "@/types"
import { clients } from "./clients"

/**
 * F4 score history keyed by client ID.
 * This is a convenience lookup derived from client records.
 */
export const f4Scores: Record<string, F4Entry[]> = Object.fromEntries(
  clients.map((c) => [c.id, c.f4History])
)

/**
 * Get the latest F4 scores for a client, or null if no history.
 */
export function getLatestScores(clientId: string): F4Entry | null {
  const history = f4Scores[clientId]
  if (!history || history.length === 0) return null
  return history[history.length - 1]
}

/**
 * Get the delta between the two most recent weeks for a client.
 * Positive = improvement.
 */
export function getWeekOverWeekDelta(
  clientId: string
): Record<string, number> | null {
  const history = f4Scores[clientId]
  if (!history || history.length < 2) return null
  const curr = history[history.length - 1].scores
  const prev = history[history.length - 2].scores
  return {
    fitness: curr.fitness - prev.fitness,
    focus: curr.focus - prev.focus,
    fraternity: curr.fraternity - prev.fraternity,
    finance: curr.finance - prev.finance,
  }
}
