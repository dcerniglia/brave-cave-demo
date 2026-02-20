import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { RoleSwitcher } from "./RoleSwitcher"

export function AppShell() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-end border-b border-border px-6">
          <RoleSwitcher />
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
