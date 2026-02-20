import { TrendingUp, TrendingDown } from "lucide-react"
import type { Pillar } from "@/types"
import { cn } from "@/lib/utils"

interface F4PillarCardProps {
  pillar: Pillar
  score: number
  delta?: number
  lastDate?: string
}

const PILLAR_HEX: Record<Pillar, string> = {
  fitness: "#10b981",
  focus: "#3b82f6",
  fraternity: "#f59e0b",
  finance: "#8b5cf6",
}

const PILLAR_LABELS: Record<Pillar, string> = {
  fitness: "Fitness",
  focus: "Focus",
  fraternity: "Fraternity",
  finance: "Finance",
}

export function F4PillarCard({ pillar, score, delta, lastDate }: F4PillarCardProps) {
  const color = PILLAR_HEX[pillar]

  return (
    <div
      className={cn(
        "rounded-lg bg-zinc-900 border border-zinc-800 p-4 border-l-4 min-w-0"
      )}
      style={{ borderLeftColor: color }}
    >
      <p className="text-sm text-muted-foreground">{PILLAR_LABELS[pillar]}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-3xl font-bold" style={{ color }}>
          {score}
        </span>
        {delta !== undefined && delta !== 0 && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-sm font-medium",
              delta > 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {delta > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {delta > 0 ? "+" : ""}
            {delta}
          </span>
        )}
      </div>
      {lastDate && (
        <p className="text-xs text-muted-foreground mt-1">{lastDate}</p>
      )}
    </div>
  )
}
