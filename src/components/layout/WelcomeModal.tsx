import { useState } from "react"
import { X, Flame } from "lucide-react"

const STORAGE_KEY = "brave-cave-welcome-dismissed"

export function WelcomeModal() {
  const [open, setOpen] = useState(() => localStorage.getItem(STORAGE_KEY) !== "true")
  const [dontShow, setDontShow] = useState(false)

  const dismiss = () => {
    if (dontShow) localStorage.setItem(STORAGE_KEY, "true")
    setOpen(false)
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70" onClick={dismiss} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl max-w-lg w-full p-8 pointer-events-auto shadow-2xl">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <Flame className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-wide text-zinc-100">
              BRAVE CAVE
            </span>
          </div>

          <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
            <p className="text-lg text-zinc-100 font-medium">
              Hey David — I built this for you.
            </p>
            <p>
              I didn't start until right after we got off the phone. Everything you're about to see — the coach dashboard, the client portal, the F4 radar charts, the HAF check-in flow, the action item lineage — was built from zero in under an hour.
            </p>
            <p>
              No templates. No starter kits. Your frameworks, your language, your coaching rhythm. F4, HAF, Hurdles, Ahas, Fixes — all of it.
            </p>
            <p className="text-zinc-400">
              This is what I mean when I say custom software can move fast.
            </p>
          </div>

          <label className="flex items-center gap-2 mt-6 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) => setDontShow(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 accent-primary"
            />
            <span className="text-xs text-zinc-500">Don't show this again</span>
          </label>

          <button
            onClick={dismiss}
            className="mt-4 w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Let's see it
          </button>
        </div>
      </div>
    </>
  )
}
