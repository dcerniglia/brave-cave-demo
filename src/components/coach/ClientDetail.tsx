import { useState } from "react"
import { useParams } from "react-router-dom"
import { ChevronDown, ChevronRight } from "lucide-react"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"
import { clients } from "@/data/clients"
import { hafCheckins } from "@/data/haf-checkins"
import { actionItems } from "@/data/action-items"
import { getLatestScores } from "@/data/f4-scores"
import { F4RadarChart } from "@/components/shared/F4RadarChart"
import type { Pillar, HafItem } from "@/types"

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

const STATUS_STYLES: Record<string, string> = {
  done: "bg-emerald-500/20 text-emerald-400",
  "in-progress": "bg-blue-500/20 text-blue-400",
  pending: "bg-zinc-700 text-zinc-300",
  overdue: "bg-rose-500/20 text-rose-400",
}

const pillars: Pillar[] = ["fitness", "focus", "fraternity", "finance"]

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>()
  const client = clients.find((c) => c.id === id)

  if (!client) {
    return (
      <div className="text-zinc-400 text-center py-20">Client not found.</div>
    )
  }

  const latest = getLatestScores(client.id)
  const latestScores = latest?.scores
  const composite = latestScores
    ? (
        (latestScores.fitness + latestScores.focus + latestScores.fraternity + latestScores.finance) /
        4
      ).toFixed(1)
    : "—"
  const week = Math.ceil(client.programDays / 7)

  const baseline = client.f4History[0]?.scores
  const current = latestScores

  const clientCheckins = hafCheckins
    .filter((h) => h.clientId === client.id)
    .sort((a, b) => b.week - a.week)

  const clientActions = actionItems.filter((a) => a.clientId === client.id)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-5">
        <img
          src={client.avatarUrl}
          alt={client.name}
          className="w-16 h-16 rounded-full bg-zinc-700"
        />
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">{client.name}</h1>
          <p className="text-sm text-zinc-400">
            {client.role} &middot; {client.company}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs font-medium rounded-full px-2.5 py-0.5 bg-zinc-800 text-zinc-300">
              Week {week}
            </span>
            <div className="w-10 h-10 rounded-full border-2 border-zinc-600 flex items-center justify-center">
              <span className="text-sm font-bold text-zinc-100">{composite}</span>
            </div>
          </div>
        </div>
      </div>

      {/* F4 Radar + Sparklines row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h2 className="text-sm font-semibold text-zinc-300 mb-4">
            F4 Progress — Week 1 vs Current
          </h2>
          {baseline && current && (
            <F4RadarChart baseline={baseline} current={current} />
          )}
        </div>

        {/* Sparklines */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h2 className="text-sm font-semibold text-zinc-300 mb-4">F4 Trends</h2>
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((pillar) => {
              const data = client.f4History.map((entry) => ({
                week: entry.week,
                value: entry.scores[pillar],
              }))
              return (
                <div key={pillar}>
                  <ResponsiveContainer width={150} height={60}>
                    <LineChart data={data}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={PILLAR_HEX[pillar]}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-zinc-500 mt-1">{PILLAR_LABELS[pillar]}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* HAF Timeline */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-100">HAF Timeline</h2>
        </div>
        <div className="divide-y divide-zinc-800/50">
          {clientCheckins.map((checkin) => (
            <HafCard key={checkin.id} checkin={checkin} />
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-100">Action Items</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
              <th className="text-left px-6 py-3">Action</th>
              <th className="text-left px-4 py-3">Pillar</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-6 py-3">Due</th>
            </tr>
          </thead>
          <tbody>
            {clientActions.map((item) => {
              const due = new Date(item.dueDate + "T00:00:00")
              const formatted = due.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
              return (
                <tr
                  key={item.id}
                  className="border-b border-zinc-800/50"
                >
                  <td className="px-6 py-3 text-sm text-zinc-200">{item.text}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-block text-xs font-medium rounded-full px-2 py-0.5"
                      style={{
                        backgroundColor: `${PILLAR_HEX[item.pillar]}20`,
                        color: PILLAR_HEX[item.pillar],
                      }}
                    >
                      {PILLAR_LABELS[item.pillar]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "text-xs font-medium rounded-full px-2.5 py-0.5",
                        STATUS_STYLES[item.status]
                      )}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right text-xs text-zinc-400">{formatted}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function HafCard({ checkin }: { checkin: (typeof hafCheckins)[number] }) {
  const [open, setOpen] = useState(false)
  const date = new Date(checkin.date + "T00:00:00")
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const sections: { label: string; items: HafItem[]; accent: string }[] = [
    { label: "Hurdles", items: checkin.hurdles, accent: "border-rose-500" },
    { label: "Ahas", items: checkin.ahas, accent: "border-amber-500" },
    { label: "Fixes", items: checkin.fixes, accent: "border-emerald-500" },
  ]

  return (
    <div className="px-6 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left"
      >
        {open ? (
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        )}
        <span className="text-sm font-semibold text-zinc-100">Week {checkin.week}</span>
        <span className="text-xs text-zinc-500">{formatted}</span>
      </button>
      {open && (
        <div className="mt-4 space-y-4 pl-6">
          {sections.map((section) => (
            <div key={section.label}>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                {section.label}
              </h4>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li
                    key={item.id}
                    className={cn("border-l-2 pl-3 text-sm text-zinc-300", section.accent)}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
