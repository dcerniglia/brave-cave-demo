import { Link } from "react-router-dom"
import { CalendarDays, ClipboardCheck, ArrowRight, Circle } from "lucide-react"
import { useRole } from "@/hooks/useRole"
import { clients } from "@/data/clients"
import { sessions } from "@/data/sessions"
import { actionItems } from "@/data/action-items"
import { F4PillarCard } from "@/components/shared/F4PillarCard"
import { cn } from "@/lib/utils"
import type { Pillar } from "@/types"

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

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-zinc-500",
  "in-progress": "bg-blue-500",
  done: "bg-emerald-500",
  overdue: "bg-rose-500",
}

export default function ClientDashboard() {
  const { activeClientId } = useRole()
  const client = clients.find((c) => c.id === activeClientId)

  if (!client) return <div className="p-6 text-zinc-400">Client not found.</div>

  const firstName = client.name.split(" ")[0]
  const currentWeek = Math.ceil(client.programDays / 7)

  const nextSession = sessions
    .filter((s) => s.clientId === activeClientId && s.date >= "2026-02-20")
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))[0]

  const pillars: Pillar[] = ["fitness", "focus", "fraternity", "finance"]
  const latest = client.f4History[client.f4History.length - 1]
  const previous = client.f4History.length >= 2 ? client.f4History[client.f4History.length - 2] : undefined

  const recentActions = actionItems
    .filter((a) => a.clientId === activeClientId)
    .sort((a, b) => b.createdDate.localeCompare(a.createdDate))
    .slice(0, 5)

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Welcome back, {firstName}</h1>
        <p className="text-zinc-400 mt-1">
          Week {currentWeek} of your 60-day arc
        </p>
        {nextSession && (
          <p className="text-zinc-400 mt-0.5 flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            Next session: {new Date(nextSession.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} at {nextSession.time}
          </p>
        )}
      </div>

      {/* F4 Pillar Cards */}
      <div>
        <h2 className="text-lg font-semibold text-zinc-200 mb-3">F4 Scores</h2>
        <div className="grid grid-cols-2 gap-3">
          {pillars.map((pillar) => {
            const score = latest?.scores[pillar] ?? 0
            const prev = previous?.scores[pillar]
            const delta = prev !== undefined ? score - prev : undefined
            const lastDate = latest
              ? new Date(latest.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })
              : undefined
            return (
              <F4PillarCard
                key={pillar}
                pillar={pillar}
                score={score}
                delta={delta}
                lastDate={lastDate}
              />
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-zinc-200 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/client/checkin"
            className="flex items-center gap-3 rounded-xl bg-zinc-900 border border-zinc-800 p-4 hover:border-zinc-700 transition-colors"
          >
            <ClipboardCheck className="h-5 w-5 text-zinc-400 flex-shrink-0" />
            <span className="text-sm font-medium text-zinc-200">Prep for next session</span>
            <ArrowRight className="h-4 w-4 text-zinc-500 ml-auto flex-shrink-0" />
          </Link>
          <Link
            to="/client/assess"
            className="flex items-center gap-3 rounded-xl bg-zinc-900 border border-zinc-800 p-4 hover:border-zinc-700 transition-colors"
          >
            <CalendarDays className="h-5 w-5 text-zinc-400 flex-shrink-0" />
            <span className="text-sm font-medium text-zinc-200">Take F4 Assessment</span>
            <ArrowRight className="h-4 w-4 text-zinc-500 ml-auto flex-shrink-0" />
          </Link>
        </div>
      </div>

      {/* Recent Actions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-zinc-200">Recent Actions</h2>
          <Link to="/client/actions" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {recentActions.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-3"
            >
              <Circle
                className={cn("h-2.5 w-2.5 flex-shrink-0", STATUS_COLORS[item.status])}
                fill="currentColor"
                style={{ color: item.status === "done" ? "#10b981" : item.status === "in-progress" ? "#3b82f6" : item.status === "overdue" ? "#f43f5e" : "#71717a" }}
              />
              <span className={cn("text-sm text-zinc-300 flex-1 truncate", item.status === "done" && "line-through text-zinc-500")}>
                {item.text}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: PILLAR_HEX[item.pillar] + "20", color: PILLAR_HEX[item.pillar] }}
              >
                {PILLAR_LABELS[item.pillar]}
              </span>
              <span className="text-xs text-zinc-500 flex-shrink-0">
                {new Date(item.dueDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
