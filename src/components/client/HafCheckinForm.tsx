import { useState } from "react"
import { AlertCircle, Lightbulb, Wrench, X, Plus, Send, CheckCircle } from "lucide-react"

import type { Pillar } from "@/types"

const PILLAR_OPTIONS: { value: Pillar; label: string }[] = [
  { value: "fitness", label: "Fitness" },
  { value: "focus", label: "Focus" },
  { value: "fraternity", label: "Fraternity" },
  { value: "finance", label: "Finance" },
]

interface FixItem {
  text: string
  pillar: Pillar
  dueDate: string
}

export default function HafCheckinForm() {
  const [hurdles, setHurdles] = useState<string[]>([""])
  const [ahas, setAhas] = useState<string[]>([""])
  const [fixes, setFixes] = useState<FixItem[]>([{ text: "", pillar: "focus", dueDate: "" }])
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setHurdles([""])
    setAhas([""])
    setFixes([{ text: "", pillar: "focus", dueDate: "" }])
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="space-y-8 p-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">HAF Check-In</h1>
        <p className="text-zinc-400 mt-1">Hurdles, Ahas, and Fixes for this week</p>
      </div>

      {submitted && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-emerald-400 text-sm">
          <CheckCircle className="h-4 w-4" />
          Check-in submitted successfully.
        </div>
      )}

      {/* Hurdles */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="h-5 w-5 text-rose-400" />
          <h2 className="text-lg font-semibold text-rose-400">Hurdles</h2>
        </div>
        <p className="text-sm text-zinc-500 mb-3">What got in your way this week?</p>
        <div className="space-y-2">
          {hurdles.map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={h}
                onChange={(e) => {
                  const next = [...hurdles]
                  next[i] = e.target.value
                  setHurdles(next)
                }}
                placeholder="What blocked you?"
                className="flex-1 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/50"
              />
              {hurdles.length > 1 && (
                <button
                  onClick={() => setHurdles(hurdles.filter((_, j) => j !== i))}
                  className="p-1.5 rounded text-zinc-500 hover:text-rose-400 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => setHurdles([...hurdles, ""])}
          className="flex items-center gap-1.5 mt-2 text-sm text-zinc-500 hover:text-rose-400 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add another
        </button>
      </section>

      {/* Ahas */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-5 w-5 text-amber-400" />
          <h2 className="text-lg font-semibold text-amber-400">Ahas</h2>
        </div>
        <p className="text-sm text-zinc-500 mb-3">What clicked or surprised you?</p>
        <div className="space-y-2">
          {ahas.map((a, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={a}
                onChange={(e) => {
                  const next = [...ahas]
                  next[i] = e.target.value
                  setAhas(next)
                }}
                placeholder="What insight did you have?"
                className="flex-1 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50"
              />
              {ahas.length > 1 && (
                <button
                  onClick={() => setAhas(ahas.filter((_, j) => j !== i))}
                  className="p-1.5 rounded text-zinc-500 hover:text-amber-400 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => setAhas([...ahas, ""])}
          className="flex items-center gap-1.5 mt-2 text-sm text-zinc-500 hover:text-amber-400 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add another
        </button>
      </section>

      {/* Fixes */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="h-5 w-5 text-emerald-400" />
          <h2 className="text-lg font-semibold text-emerald-400">Fixes</h2>
        </div>
        <p className="text-sm text-zinc-500 mb-3">What will you do about it?</p>
        <div className="space-y-3">
          {fixes.map((f, i) => (
            <div key={i} className="rounded-lg bg-zinc-900 border border-zinc-800 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={f.text}
                  onChange={(e) => {
                    const next = [...fixes]
                    next[i] = { ...next[i], text: e.target.value }
                    setFixes(next)
                  }}
                  placeholder="What's the fix?"
                  className="flex-1 rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50"
                />
                {fixes.length > 1 && (
                  <button
                    onClick={() => setFixes(fixes.filter((_, j) => j !== i))}
                    className="p-1.5 rounded text-zinc-500 hover:text-rose-400 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={f.pillar}
                  onChange={(e) => {
                    const next = [...fixes]
                    next[i] = { ...next[i], pillar: e.target.value as Pillar }
                    setFixes(next)
                  }}
                  className="rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500/50"
                >
                  {PILLAR_OPTIONS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={f.dueDate}
                  onChange={(e) => {
                    const next = [...fixes]
                    next[i] = { ...next[i], dueDate: e.target.value }
                    setFixes(next)
                  }}
                  className="rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setFixes([...fixes, { text: "", pillar: "focus", dueDate: "" }])}
          className="flex items-center gap-1.5 mt-2 text-sm text-zinc-500 hover:text-emerald-400 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add another
        </button>
      </section>

      <button
        onClick={handleSubmit}
        className="flex items-center gap-2 rounded-lg bg-zinc-100 text-zinc-900 px-6 py-2.5 text-sm font-medium hover:bg-zinc-200 transition-colors"
      >
        <Send className="h-4 w-4" />
        Submit Check-In
      </button>
    </div>
  )
}
