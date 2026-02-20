import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"
import type { F4Score } from "@/types"
import { cn } from "@/lib/utils"

interface F4RadarChartProps {
  current: F4Score
  baseline?: F4Score
  size?: number
}

const pillars = [
  { key: "fitness", label: "Fitness" },
  { key: "focus", label: "Focus" },
  { key: "fraternity", label: "Fraternity" },
  { key: "finance", label: "Finance" },
] as const

export function F4RadarChart({ current, baseline, size }: F4RadarChartProps) {
  const data = pillars.map(({ key, label }) => ({
    pillar: label,
    current: current[key],
    ...(baseline ? { baseline: baseline[key] } : {}),
    fullMark: 10,
  }))

  const chart = (
    <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
      <PolarGrid stroke="#3f3f46" />
      <PolarAngleAxis dataKey="pillar" tick={{ fill: "#ffffff", fontSize: 13 }} />
      <PolarRadiusAxis domain={[0, 10]} axisLine={false} tick={false} />
      {baseline && (
        <Radar
          name="Baseline"
          dataKey="baseline"
          stroke="#71717a"
          fill="#71717a"
          fillOpacity={0.2}
          strokeDasharray="4 4"
        />
      )}
      <Radar
        name="Current"
        dataKey="current"
        stroke="#f97316"
        fill="#f97316"
        fillOpacity={0.3}
      />
    </RadarChart>
  )

  if (size) {
    return (
      <div className={cn("flex items-center justify-center")} style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          {chart}
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      {chart}
    </ResponsiveContainer>
  )
}
