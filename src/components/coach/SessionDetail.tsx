import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { sessions } from "@/data/sessions"
import { clients } from "@/data/clients"
import { hafCheckins } from "@/data/haf-checkins"
import { actionItems } from "@/data/action-items"
import { F4RadarChart } from "@/components/shared/F4RadarChart"
import type { Pillar } from "@/types"

const PILLAR_HEX: Record<Pillar, string> = {
  fitness: "#10b981",
  focus: "#3b82f6",
  fraternity: "#f59e0b",
  finance: "#8b5cf6",
}

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

const STATUS_STYLES: Record<string, string> = {
  done: "bg-emerald-500/20 text-emerald-400",
  "in-progress": "bg-blue-500/20 text-blue-400",
  pending: "bg-zinc-700 text-zinc-300",
  overdue: "bg-rose-500/20 text-rose-400",
}

export default function SessionDetail() {
  const { id } = useParams<{ id: string }>()
  const session = sessions.find((s) => s.id === id)

  if (!session) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Session not found</p>
      </div>
    )
  }

  const client = clients.find((c) => c.id === session.clientId)
  if (!client) return null

  const sessionDate = new Date(session.date + "T00:00:00")
  const formattedDate = sessionDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  // Find the F4 entry closest to this session date
  const sessionWeek = client.f4History.find((e) => e.date <= session.date)
    ? [...client.f4History].reverse().find((e) => e.date <= session.date)
    : null
  const baseline = client.f4History[0]

  // Find HAF check-in for same week
  const checkin = hafCheckins.find(
    (h) => h.clientId === client.id && h.week === sessionWeek?.week
  )

  // Find action items from that check-in
  const relatedActions = checkin
    ? actionItems.filter((a) => a.checkinId === checkin.id)
    : []

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        to="/coach/sessions"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Sessions
      </Link>

      {/* Header */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={client.avatarUrl}
              alt={client.name}
              className="w-14 h-14 rounded-full bg-zinc-700"
            />
            <div>
              <h1 className="text-xl font-bold text-zinc-100">{client.name}</h1>
              <p className="text-sm text-zinc-400">{client.company}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                  <Clock className="w-4 h-4" />
                  {session.time}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-medium rounded-full px-3 py-1",
                TYPE_STYLES[session.type]
              )}
            >
              {TYPE_LABELS[session.type]}
            </span>
            {sessionWeek && (
              <span className="text-xs font-medium rounded-full px-3 py-1 bg-zinc-800 text-zinc-300">
                Week {sessionWeek.week}
              </span>
            )}
          </div>
        </div>

        {session.notes && (
          <div className="mt-5 pt-5 border-t border-zinc-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Session Notes
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">{session.notes}</p>
          </div>
        )}
      </div>

      {/* F4 Snapshot */}
      {sessionWeek && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">
            F4 Snapshot — Week {sessionWeek.week}
          </h2>
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
            <div className="flex-shrink-0 self-center md:self-start">
              <F4RadarChart
                current={sessionWeek.scores}
                baseline={baseline?.scores}
                size={240}
              />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {(["fitness", "focus", "fraternity", "finance"] as Pillar[]).map((p) => {
                const score = sessionWeek.scores[p]
                const baselineScore = baseline?.scores[p]
                const delta = baselineScore != null ? score - baselineScore : null
                return (
                  <div
                    key={p}
                    className="bg-zinc-800/50 rounded-lg p-4 border-l-2"
                    style={{ borderLeftColor: PILLAR_HEX[p] }}
                  >
                    <p className="text-xs text-zinc-500 capitalize">{p}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: PILLAR_HEX[p] }}
                      >
                        {score}
                      </span>
                      {delta != null && delta !== 0 && (
                        <span
                          className={cn(
                            "text-xs font-medium",
                            delta > 0 ? "text-emerald-400" : "text-rose-400"
                          )}
                        >
                          {delta > 0 ? "+" : ""}
                          {delta} from baseline
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* HAF Check-in */}
      {checkin && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">
            HAF Check-in — Week {checkin.week}
          </h2>
          <div className="space-y-5">
            {checkin.hurdles.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-2">
                  Hurdles
                </h3>
                <ul className="space-y-2">
                  {checkin.hurdles.map((h) => (
                    <li
                      key={h.id}
                      className="text-sm text-zinc-300 pl-3 border-l-2 border-rose-500/40"
                    >
                      {h.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {checkin.ahas.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Ahas
                </h3>
                <ul className="space-y-2">
                  {checkin.ahas.map((a) => (
                    <li
                      key={a.id}
                      className="text-sm text-zinc-300 pl-3 border-l-2 border-amber-500/40"
                    >
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
                <ul className="space-y-2">
                  {checkin.fixes.map((f) => (
                    <li
                      key={f.id}
                      className="text-sm text-zinc-300 pl-3 border-l-2 border-emerald-500/40 flex items-center gap-2"
                    >
                      {f.text}
                      {f.pillar && (
                        <span
                          className="text-xs rounded-full px-2 py-0.5 font-medium flex-shrink-0"
                          style={{
                            backgroundColor: `${PILLAR_HEX[f.pillar]}20`,
                            color: PILLAR_HEX[f.pillar],
                          }}
                        >
                          {f.pillar.charAt(0).toUpperCase() + f.pillar.slice(1)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Items from this session */}
      {relatedActions.length > 0 && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-100">
              Action Items from This Session
            </h2>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="bg-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-3">Action</th>
                <th className="text-left px-4 py-3">Pillar</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-6 py-3">Due</th>
              </tr>
            </thead>
            <tbody>
              {relatedActions.map((item) => {
                const due = new Date(item.dueDate + "T00:00:00")
                const dueFormatted = due.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
                return (
                  <tr
                    key={item.id}
                    className="border-b border-zinc-800/50"
                  >
                    <td className="px-6 py-4 text-sm text-zinc-300">
                      {item.text}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="text-xs rounded-full px-2 py-0.5 font-medium"
                        style={{
                          backgroundColor: `${PILLAR_HEX[item.pillar]}20`,
                          color: PILLAR_HEX[item.pillar],
                        }}
                      >
                        {item.pillar.charAt(0).toUpperCase() + item.pillar.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "text-xs rounded-full px-2 py-0.5 font-medium",
                          STATUS_STYLES[item.status]
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-zinc-400">
                      {dueFormatted}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {/* Link to full client detail */}
      <Link
        to={`/coach/client/${client.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        View full profile for {client.name}
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
