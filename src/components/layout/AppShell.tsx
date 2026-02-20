import { Outlet, useLocation, Link } from "react-router-dom"
import { useEffect } from "react"
import { Sidebar, MobileDrawer, BottomNav } from "./Sidebar"
import { RoleSwitcher } from "./RoleSwitcher"
import { Flame } from "lucide-react"
import { useRole } from "@/hooks/useRole"
import { WelcomeModal } from "./WelcomeModal"

export function AppShell() {
  const { pathname } = useLocation()
  const { role, setRole } = useRole()

  useEffect(() => {
    const pathRole = pathname.startsWith("/client") ? "client" : "coach"
    if (pathRole !== role) setRole(pathRole)
  }, [pathname, role, setRole])
  return (
    <div className="flex h-screen bg-background text-foreground">
      <WelcomeModal />
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header: always visible, content changes by breakpoint */}
        <header className="flex h-14 items-center justify-between border-b border-border px-4 lg:px-6">
          {/* Left side: hamburger + logo (below lg), nothing (lg+, sidebar has logo) */}
          <div className="flex items-center gap-3 lg:hidden">
            <MobileDrawer />
            <Link to={role === "coach" ? "/coach" : "/client"} className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              <span className="text-base font-bold tracking-wide text-foreground">
                BRAVE CAVE
              </span>
            </Link>
          </div>
          {/* Spacer for lg+ so role switcher pushes right */}
          <div className="hidden lg:block" />
          <RoleSwitcher />
        </header>
        <main className="flex-1 overflow-auto p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
