import { Users, Calendar, Activity, AlertTriangle } from "lucide-react"
import { clients } from "@/data/clients"
import { sessions } from "@/data/sessions"
import { actionItems } from "@/data/action-items"
import { getLatestScores } from "@/data/f4-scores"
import ClientRoster from "./ClientRoster"
import UpcomingSessions from "./UpcomingSessions"

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
}) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
      <Icon className="w-5 h-5 text-zinc-500 mb-3" />
      <div className="text-3xl font-bold text-zinc-100">{value}</div>
      <div className="text-sm text-zinc-500 mt-1">{label}</div>
    </div>
  )
}

export default function CoachDashboard() {
  const totalClients = clients.length

  // Sessions this week: Feb 17-23, 2026
  const sessionsThisWeek = sessions.filter(
    (s) => s.date >= "2026-02-17" && s.date <= "2026-02-23"
  ).length

  // Avg F4 Composite across all clients' latest scores
  const composites = clients
    .map((c) => {
      const latest = getLatestScores(c.id)
      if (!latest) return null
      const s = latest.scores
      return (s.fitness + s.focus + s.fraternity + s.finance) / 4
    })
    .filter((v): v is number => v !== null)
  const avgComposite =
    composites.length > 0
      ? (composites.reduce((a, b) => a + b, 0) / composites.length).toFixed(1)
      : "—"

  const overdueActions = actionItems.filter((a) => a.status === "overdue").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Coach Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Thursday, February 20, 2026</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Clients" value={totalClients} />
        <StatCard icon={Calendar} label="Sessions This Week" value={sessionsThisWeek} />
        <StatCard icon={Activity} label="Avg F4 Composite" value={avgComposite} />
        <StatCard icon={AlertTriangle} label="Overdue Actions" value={overdueActions} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ClientRoster />
        </div>
        <div>
          <UpcomingSessions />
        </div>
      </div>
    </div>
  )
}
