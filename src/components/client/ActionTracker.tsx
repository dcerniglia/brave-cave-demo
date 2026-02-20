import { useState } from "react"
import { useRole } from "@/hooks/useRole"
import { actionItems as initialActions } from "@/data/action-items"
import { cn } from "@/lib/utils"
import type { ActionItem, Pillar } from "@/types"

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

type FilterTab = "all" | "pending" | "in-progress" | "done" | "overdue"

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
  { key: "overdue", label: "Overdue" },
]

const STATUS_CYCLE: Record<string, ActionItem["status"]> = {
  pending: "in-progress",
  "in-progress": "done",
  done: "pending",
  overdue: "in-progress",
}

const STATUS_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-zinc-700/50", text: "text-zinc-300", label: "Pending" },
  "in-progress": { bg: "bg-blue-500/20", text: "text-blue-400", label: "In Progress" },
  done: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Done" },
  overdue: { bg: "bg-rose-500/20", text: "text-rose-400", label: "Overdue" },
}

export default function ActionTracker() {
  const { activeClientId } = useRole()
  const [filter, setFilter] = useState<FilterTab>("all")
  const [items, setItems] = useState<ActionItem[]>(
    initialActions.filter((a) => a.clientId === activeClientId)
  )

  const cycleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: STATUS_CYCLE[item.status] } : item
      )
    )
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter)

  const totalCount = items.length
  const doneCount = items.filter((i) => i.status === "done").length
  const inProgressCount = items.filter((i) => i.status === "in-progress").length
  const overdueCount = items.filter((i) => i.status === "overdue").length

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Action Tracker</h1>
        <p className="text-zinc-400 mt-1">Click status to cycle: pending → in-progress → done</p>
      </div>

      {/* Summary Stats */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">Total</span>
          <span className="text-sm font-bold text-zinc-200">{totalCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-sm text-zinc-400">Done</span>
          <span className="text-sm font-bold text-emerald-400">{doneCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          <span className="text-sm text-zinc-400">In Progress</span>
          <span className="text-sm font-bold text-blue-400">{inProgressCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span className="text-sm text-zinc-400">Overdue</span>
          <span className="text-sm font-bold text-rose-400">{overdueCount}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 rounded-lg bg-zinc-900 p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-md transition-colors",
              filter === tab.key
                ? "bg-zinc-700 text-zinc-100 font-medium"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Action Items List */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="text-sm text-zinc-500 py-4">No actions in this category.</p>
        )}
        {filtered.map((item) => {
          const badge = STATUS_BADGE[item.status]
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3",
                item.status === "overdue"
                  ? "bg-rose-500/5 border-rose-500/20"
                  : "bg-zinc-900 border-zinc-800"
              )}
            >
              <span
                className={cn(
                  "text-sm flex-1",
                  item.status === "done"
                    ? "line-through text-zinc-500"
                    : "text-zinc-300"
                )}
              >
                {item.text}
              </span>

              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                style={{
                  backgroundColor: PILLAR_HEX[item.pillar] + "20",
                  color: PILLAR_HEX[item.pillar],
                }}
              >
                {PILLAR_LABELS[item.pillar]}
              </span>

              <button
                onClick={() => cycleStatus(item.id)}
                className={cn(
                  "text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 cursor-pointer transition-colors",
                  badge.bg,
                  badge.text
                )}
              >
                {badge.label}
              </button>

              <span className="text-xs text-zinc-500 flex-shrink-0 w-16 text-right">
                {new Date(item.dueDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
