import { NavLink, Link } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Target,
  CheckSquare,
  Flame,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRole } from "@/hooks/useRole"


interface NavItem {
  label: string
  to: string
  icon: typeof LayoutDashboard
}

const coachNav: NavItem[] = [
  { label: "Dashboard", to: "/coach", icon: LayoutDashboard },
  { label: "Clients", to: "/coach/clients", icon: Users },
  { label: "Sessions", to: "/coach/sessions", icon: Calendar },
]

const clientNav: NavItem[] = [
  { label: "Dashboard", to: "/client", icon: LayoutDashboard },
  { label: "Check-in", to: "/client/checkin", icon: MessageSquare },
  { label: "Assessment", to: "/client/assess", icon: Target },
  { label: "Actions", to: "/client/actions", icon: CheckSquare },
]

export function Sidebar() {
  const { role } = useRole()
  const items = role === "coach" ? coachNav : clientNav

  return (
    <aside className="hidden md:flex h-full w-64 flex-col bg-zinc-950 border-r border-border">
      <Link to={role === "coach" ? "/coach" : "/client"} className="flex items-center gap-2 px-6 py-5">
        <Flame className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold tracking-wide text-foreground">
          BRAVE CAVE
        </span>
      </Link>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/coach" || item.to === "/client"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-zinc-800 text-primary"
                    : "text-muted-foreground hover:bg-zinc-900 hover:text-foreground"
                )
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export function BottomNav() {
  const { role } = useRole()
  const items = role === "coach" ? coachNav : clientNav

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-zinc-950 border-t border-zinc-800 px-2 py-2 md:hidden">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/coach" || item.to === "/client"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 transition-colors",
                isActive ? "text-primary" : "text-zinc-500"
              )
            }
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
