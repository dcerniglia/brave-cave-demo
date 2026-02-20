import { createContext, useContext, useState, type ReactNode } from "react"
import React from "react"
import type { Role } from "@/types"

interface RoleContextValue {
  role: Role
  setRole: (role: Role) => void
  activeClientId: string
  setActiveClientId: (id: string) => void
}

const RoleContext = createContext<RoleContextValue | null>(null)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("coach")
  const [activeClientId, setActiveClientId] = useState("c-marcus")

  return React.createElement(
    RoleContext.Provider,
    { value: { role, setRole, activeClientId, setActiveClientId } },
    children
  )
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error("useRole must be used within RoleProvider")
  return ctx
}
