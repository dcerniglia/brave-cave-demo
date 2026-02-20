import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, CheckCircle, Clock, Circle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { actionItems } from "@/data/action-items"
import { hafCheckins } from "@/data/haf-checkins"
import { sessions } from "@/data/sessions"
import { clients } from "@/data/clients"
import type { Pillar } from "@/types"

const PILLAR_HEX: Record<Pillar, string> = {
  fitness: "#10b981",
  focus: "#3b82f6",
  fraternity: "#f59e0b",
  finance: "#8b5cf6",
}

const STATUS_CONFIG: Record<string, { label: string; style: string; icon: typeof CheckCircle }> = {
  done: { label: "Done", style: "bg-emerald-500/20 text-emerald-400", icon: CheckCircle },
  "in-progress": { label: "In Progress", style: "bg-blue-500/20 text-blue-400", icon: Clock },
  pending: { label: "Pending", style: "bg-zinc-700 text-zinc-300", icon: Circle },
  overdue: { label: "Overdue", style: "bg-rose-500/20 text-rose-400", icon: AlertTriangle },
}

export default function ActionDetail() {
  const { id } = useParams<{ id: string }>()
  const action = actionItems.find((a) => a.id === id)

  if (!action) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Action item not found</p>
      </div>
    )
  }

  const client = clients.find((c) => c.id === action.clientId)
  const checkin = hafCheckins.find((h) => h.id === action.checkinId)
  const relatedSession = checkin
    ? sessions.find((s) => s.clientId === action.clientId && s.date <= checkin.date)
      ? [...sessions]
          .filter((s) => s.clientId === action.clientId && s.date <= checkin.date)
          .sort((a, b) => b.date.localeCompare(a.date))[0]
      : null
    : null

  const siblingActions = actionItems.filter(
    (a) => a.checkinId === action.checkinId && a.id !== action.id
  )

  const statusCfg = STATUS_CONFIG[action.status]
  const StatusIcon = statusCfg.icon

  const formatDate = (dateStr: string) =>
    new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  const originFix = checkin?.fixes.find((f) =>
    action.text.startsWith(f.text.substring(0, 20))
  )

  return (
    <div className="space-y-6 max-w-3xl">
      <Link
        to={`/coach/client/${action.clientId}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {client?.name ?? "Client"}
      </Link>

      {/* Action Header */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="text-xs font-medium rounded-full px-3 py-1"
            style={{
              backgroundColor: `${PILLAR_HEX[action.pillar]}20`,
              color: PILLAR_HEX[action.pillar],
            }}
          >
            {action.pillar.charAt(0).toUpperCase() + action.pillar.slice(1)}
          </span>
          <span className={cn("text-xs font-medium rounded-full px-3 py-1 flex items-center gap-1.5", statusCfg.style)}>
            <StatusIcon className="h-3 w-3" />
            {statusCfg.label}
          </span>
        </div>
        <h1 className="text-xl font-bold text-zinc-100 leading-relaxed">
          {action.text}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            Due: {formatDate(action.dueDate)}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            Created: {formatDate(action.createdDate)}
          </div>
        </div>
        {client && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-800">
            <img
              src={client.avatarUrl}
              alt={client.name}
              className="w-8 h-8 rounded-full bg-zinc-700"
            />
            <div>
              <p className="text-sm font-medium text-zinc-200">{client.name}</p>
              <p className="text-xs text-zinc-500">{client.company}</p>
            </div>
          </div>
        )}
      </div>

      {/* Origin: HAF Check-in */}
      {checkin && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
            Origin — HAF Check-in Week {checkin.week}
          </h2>

          {checkin.hurdles.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-2">
                Hurdles
              </h3>
              <ul className="space-y-1.5">
                {checkin.hurdles.map((h) => (
                  <li key={h.id} className="text-sm text-zinc-300 pl-3 border-l-2 border-rose-500/40">
                    {h.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {checkin.ahas.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                Ahas
              </h3>
              <ul className="space-y-1.5">
                {checkin.ahas.map((a) => (
                  <li key={a.id} className="text-sm text-zinc-300 pl-3 border-l-2 border-amber-500/40">
                    {a.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {checkin.fixes.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                Fixes
              </h3>
              <ul className="space-y-1.5">
                {checkin.fixes.map((f) => (
                  <li
                    key={f.id}
                    className={cn(
                      "text-sm pl-3 border-l-2 border-emerald-500/40",
                      originFix?.id === f.id ? "text-zinc-100 font-medium" : "text-zinc-400"
                    )}
                  >
                    {f.text}
                    {originFix?.id === f.id && (
                      <span className="ml-2 text-xs text-emerald-400">← this action</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedSession && (
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <Link
                to={`/coach/session/${relatedSession.id}`}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                View session from Week {checkin.week} →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Sibling Actions */}
      {siblingActions.length > 0 && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
            Other Actions from This Check-in
          </h2>
          <div className="space-y-2">
            {siblingActions.map((item) => {
              const cfg = STATUS_CONFIG[item.status]
              return (
                <Link
                  key={item.id}
                  to={`/coach/action/${item.id}`}
                  className="flex items-center gap-3 rounded-lg bg-zinc-800/50 px-4 py-3 hover:bg-zinc-800 transition-colors"
                >
                  <span className="text-sm text-zinc-300 flex-1">{item.text}</span>
                  <span
                    className="text-xs rounded-full px-2 py-0.5 font-medium flex-shrink-0"
                    style={{
                      backgroundColor: `${PILLAR_HEX[item.pillar]}20`,
                      color: PILLAR_HEX[item.pillar],
                    }}
                  >
                    {item.pillar.charAt(0).toUpperCase() + item.pillar.slice(1)}
                  </span>
                  <span className={cn("text-xs rounded-full px-2 py-0.5 font-medium flex-shrink-0", cfg.style)}>
                    {cfg.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
