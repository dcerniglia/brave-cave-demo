import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Target,
  CheckSquare,
  Flame,
  Menu,
  X,
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

function NavItems({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  return (
    <>
      {items.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/coach" || item.to === "/client"}
            onClick={onNavigate}
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
    </>
  )
}

export function Sidebar() {
  const { role } = useRole()
  const items = role === "coach" ? coachNav : clientNav

  return (
    <aside className="hidden lg:flex h-full w-64 flex-col bg-zinc-950 border-r border-border">
      <Link to={role === "coach" ? "/coach" : "/client"} className="flex items-center gap-2 px-6 py-5">
        <Flame className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold tracking-wide text-foreground">
          BRAVE CAVE
        </span>
      </Link>

      <nav className="flex-1 space-y-1 px-3 py-2">
        <NavItems items={items} />
      </nav>
    </aside>
  )
}

export function MobileDrawer() {
  const { role } = useRole()
  const items = role === "coach" ? coachNav : clientNav
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-200 ease-in-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Link
            to={role === "coach" ? "/coach" : "/client"}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <Flame className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-wide text-foreground">
              BRAVE CAVE
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1 px-3 py-2">
          <NavItems items={items} onNavigate={() => setOpen(false)} />
        </nav>
      </div>
    </>
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
