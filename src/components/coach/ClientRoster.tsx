import { useNavigate } from "react-router-dom"
import { clients } from "@/data/clients"
import { getLatestScores } from "@/data/f4-scores"
import type { Pillar } from "@/types"

const PILLAR_HEX: Record<Pillar, string> = {
  fitness: "#10b981",
  focus: "#3b82f6",
  fraternity: "#f59e0b",
  finance: "#8b5cf6",
}

const PILLAR_ABBREV: Record<Pillar, string> = {
  fitness: "FIT",
  focus: "FOC",
  fraternity: "FRA",
  finance: "FIN",
}

const pillars: Pillar[] = ["fitness", "focus", "fraternity", "finance"]

export default function ClientRoster() {
  const navigate = useNavigate()

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-100">Client Roster</h2>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="bg-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
            <th className="text-left px-6 py-3">Client</th>
            <th className="text-left px-4 py-3">Week</th>
            <th className="text-left px-4 py-3">F4 Pillars</th>
            <th className="text-right px-6 py-3">Composite</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            const latest = getLatestScores(client.id)
            const scores = latest?.scores
            const composite = scores
              ? ((scores.fitness + scores.focus + scores.fraternity + scores.finance) / 4).toFixed(1)
              : "—"
            const week = Math.ceil(client.programDays / 7)

            return (
              <tr
                key={client.id}
                onClick={() => navigate(`/coach/client/${client.id}`)}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/50 transition cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={client.avatarUrl}
                      alt={client.name}
                      className="w-8 h-8 rounded-full bg-zinc-700"
                    />
                    <div>
                      <div className="text-sm font-medium text-zinc-100">{client.name}</div>
                      <div className="text-xs text-zinc-500">{client.company}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-zinc-300">Wk {week}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-1.5">
                    {scores &&
                      pillars.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center justify-center rounded-full font-medium"
                          style={{
                            backgroundColor: `${PILLAR_HEX[p]}20`,
                            color: PILLAR_HEX[p],
                          }}
                        >
                          {/* Pill layout for wider screens */}
                          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs">
                            {PILLAR_ABBREV[p]} {scores[p]}
                          </span>
                          {/* Circle layout for narrow screens */}
                          <span className="sm:hidden flex flex-col items-center justify-center w-10 h-10 text-[10px] font-semibold leading-tight">
                            <span>{PILLAR_ABBREV[p]}</span>
                            <span className="text-xs">{scores[p]}</span>
                          </span>
                        </span>
                      ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-semibold text-zinc-100">{composite}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </div>
  )
}
