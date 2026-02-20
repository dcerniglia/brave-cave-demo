import { Routes, Route, Navigate } from "react-router-dom"
import { RoleProvider } from "@/hooks/useRole"
import { AppShell } from "@/components/layout/AppShell"
import CoachDashboard from "@/components/coach/CoachDashboard"
import ClientDetail from "@/components/coach/ClientDetail"
import ClientsPage from "@/components/coach/ClientsPage"
import SessionsPage from "@/components/coach/SessionsPage"
import ClientDashboard from "@/components/client/ClientDashboard"
import HafCheckinForm from "@/components/client/HafCheckinForm"
import F4Assessment from "@/components/client/F4Assessment"
import ActionTracker from "@/components/client/ActionTracker"

export default function App() {
  return (
    <RoleProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/coach" replace />} />
          <Route path="/coach" element={<CoachDashboard />} />
          <Route path="/coach/clients" element={<ClientsPage />} />
          <Route path="/coach/sessions" element={<SessionsPage />} />
          <Route path="/coach/client/:id" element={<ClientDetail />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/checkin" element={<HafCheckinForm />} />
          <Route path="/client/assess" element={<F4Assessment />} />
          <Route path="/client/actions" element={<ActionTracker />} />
        </Route>
      </Routes>
    </RoleProvider>
  )
}
