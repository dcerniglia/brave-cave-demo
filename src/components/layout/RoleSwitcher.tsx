import { Shield, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useRole } from "@/hooks/useRole"

export function RoleSwitcher() {
  const { role, setRole } = useRole()
  const navigate = useNavigate()
  const isCoach = role === "coach"

  const toggle = () => {
    const next = isCoach ? "client" : "coach"
    setRole(next)
    navigate(next === "coach" ? "/coach" : "/client")
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-3 rounded-full bg-zinc-800/80 border border-zinc-700/50 px-1.5 py-1.5 transition-colors hover:border-zinc-600"
    >
      <span
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all",
          isCoach
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-zinc-500"
        )}
      >
        <Shield className="h-3.5 w-3.5" />
        Coach
      </span>
      <span
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all",
          !isCoach
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-zinc-500"
        )}
      >
        <User className="h-3.5 w-3.5" />
        Client
      </span>
    </button>
  )
}
