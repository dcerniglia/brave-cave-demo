import { useNavigate } from "react-router-dom"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { sessions } from "@/data/sessions"
import { clients } from "@/data/clients"

const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))

const TYPE_STYLES: Record<string, string> = {
  weekly: "bg-zinc-700 text-zinc-300",
  "deep-dive": "bg-blue-500/20 text-blue-400",
  "deal-review": "bg-amber-500/20 text-amber-400",
}

const TYPE_LABELS: Record<string, string> = {
  weekly: "Weekly",
  "deep-dive": "Deep Dive",
  "deal-review": "Deal Review",
}

export default function UpcomingSessions() {
  const navigate = useNavigate()
  const upcoming = sessions
    .filter((s) => s.date >= "2026-02-20")
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800">
      <div className="px-6 py-4 border-b border-zinc-800 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-zinc-500" />
        <h2 className="text-lg font-semibold text-zinc-100">Upcoming Sessions</h2>
      </div>
      <div className="divide-y divide-zinc-800/50">
        {upcoming.map((session) => {
          const client = clientMap[session.clientId]
          const date = new Date(session.date + "T00:00:00")
          const formatted = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })

          return (
            <div key={session.id} onClick={() => navigate(`/coach/session/${session.id}`)} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-800/50 cursor-pointer transition-colors">
              <div>
                <div className="text-sm font-medium text-zinc-100">
                  {client?.name ?? "Unknown"}
                </div>
                <div className="text-xs text-zinc-500">
                  {formatted} at {session.time}
                </div>
              </div>
              <span
                className={cn(
                  "text-xs font-medium rounded-full px-2.5 py-0.5",
                  TYPE_STYLES[session.type]
                )}
              >
                {TYPE_LABELS[session.type]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
