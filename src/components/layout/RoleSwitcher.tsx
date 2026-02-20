import { Shield, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useRole } from "@/hooks/useRole"
import type { Role } from "@/types"

const options: { value: Role; label: string; icon: typeof Shield }[] = [
  { value: "coach", label: "Coach", icon: Shield },
  { value: "client", label: "Client", icon: User },
]

export function RoleSwitcher() {
  const { role, setRole } = useRole()
  const navigate = useNavigate()

  return (
    <div className="flex rounded-lg bg-zinc-800 p-1">
      {options.map((opt) => {
        const Icon = opt.icon
        const active = role === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => {
              setRole(opt.value)
              navigate(opt.value === "coach" ? "/coach" : "/client")
            }}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
