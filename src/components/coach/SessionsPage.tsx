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

export default function SessionsPage() {
  const sorted = [...sessions].sort(
    (a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time)
  )

  const upcoming = sorted.filter((s) => s.date >= "2026-02-20").reverse()
  const past = sorted.filter((s) => s.date < "2026-02-20")

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00")
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const SessionRow = ({ session }: { session: (typeof sessions)[0] }) => {
    const client = clientMap[session.clientId]
    return (
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={client?.avatarUrl}
            alt={client?.name}
            className="w-8 h-8 rounded-full bg-zinc-700"
          />
          <div>
            <div className="text-sm font-medium text-zinc-100">
              {client?.name ?? "Unknown"}
            </div>
            <div className="text-xs text-zinc-500">
              {formatDate(session.date)} at {session.time}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-xs font-medium rounded-full px-2.5 py-0.5",
              TYPE_STYLES[session.type]
            )}
          >
            {TYPE_LABELS[session.type]}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-100">Sessions</h1>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Upcoming
          </h2>
        </div>
        <div className="divide-y divide-zinc-800/50">
          {upcoming.map((s) => (
            <SessionRow key={s.id} session={s} />
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Past Sessions
          </h2>
        </div>
        <div className="divide-y divide-zinc-800/50">
          {past.map((s) => (
            <SessionRow key={s.id} session={s} />
          ))}
        </div>
      </div>
    </div>
  )
}
