import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Sidebar, BottomNav } from "./Sidebar"
import { RoleSwitcher } from "./RoleSwitcher"
import { Flame } from "lucide-react"
import { useRole } from "@/hooks/useRole"

export function AppShell() {
  const { pathname } = useLocation()
  const { role, setRole } = useRole()

  useEffect(() => {
    const pathRole = pathname.startsWith("/client") ? "client" : "coach"
    if (pathRole !== role) setRole(pathRole)
  }, [pathname, role, setRole])
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-14 items-center justify-between border-b border-border px-4 md:hidden">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <span className="text-base font-bold tracking-wide text-foreground">
              BRAVE CAVE
            </span>
          </div>
          <RoleSwitcher />
        </header>
        {/* Desktop header */}
        <header className="hidden md:flex h-14 items-center justify-end border-b border-border px-6">
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
