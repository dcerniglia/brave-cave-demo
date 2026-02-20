import { useState } from "react"
import { CheckCircle, Send } from "lucide-react"
import type { Pillar } from "@/types"
import { PILLAR_PROMPTS, PILLAR_LABELS } from "@/types"

const PILLAR_HEX: Record<Pillar, string> = {
  fitness: "#10b981",
  focus: "#3b82f6",
  fraternity: "#f59e0b",
  finance: "#8b5cf6",
}

const PILLARS: Pillar[] = ["fitness", "focus", "fraternity", "finance"]

export default function F4Assessment() {
  const [scores, setScores] = useState<Record<Pillar, number>>({
    fitness: 5,
    focus: 5,
    fraternity: 5,
    finance: 5,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="space-y-8 p-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">F4 Self-Assessment</h1>
        <p className="text-zinc-400 mt-1">Rate yourself 1-10 on each pillar this week</p>
      </div>

      {submitted && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-emerald-400 text-sm">
          <CheckCircle className="h-4 w-4" />
          Assessment submitted successfully.
        </div>
      )}

      <div className="space-y-6">
        {PILLARS.map((pillar) => {
          const color = PILLAR_HEX[pillar]
          return (
            <div
              key={pillar}
              className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 border-l-4"
              style={{ borderLeftColor: color }}
            >
              <h3 className="text-lg font-semibold" style={{ color }}>
                {PILLAR_LABELS[pillar]}
              </h3>
              <p className="text-sm text-zinc-400 mt-1 mb-4">{PILLAR_PROMPTS[pillar]}</p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-500 w-4">1</span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={scores[pillar]}
                  onChange={(e) =>
                    setScores({ ...scores, [pillar]: parseInt(e.target.value) })
                  }
                  className="flex-1 h-2 rounded-full appearance-none bg-zinc-800 cursor-pointer"
                  style={{ accentColor: color }}
                />
                <span className="text-sm text-zinc-500 w-6">10</span>
                <span
                  className="text-2xl font-bold min-w-[2.5rem] text-right"
                  style={{ color }}
                >
                  {scores[pillar]}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
        <h3 className="text-sm font-medium text-zinc-400 mb-3">Summary</h3>
        <div className="flex items-center gap-6">
          {PILLARS.map((pillar) => (
            <div key={pillar} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: PILLAR_HEX[pillar] }}
              />
              <span className="text-sm text-zinc-300">{PILLAR_LABELS[pillar]}</span>
              <span className="text-sm font-bold" style={{ color: PILLAR_HEX[pillar] }}>
                {scores[pillar]}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-500 mt-2">
          Average: {(Object.values(scores).reduce((a, b) => a + b, 0) / 4).toFixed(1)}
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="flex items-center gap-2 rounded-lg bg-zinc-100 text-zinc-900 px-6 py-2.5 text-sm font-medium hover:bg-zinc-200 transition-colors"
      >
        <Send className="h-4 w-4" />
        Submit Assessment
      </button>
    </div>
  )
}
