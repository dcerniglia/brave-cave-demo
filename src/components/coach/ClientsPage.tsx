import ClientRoster from "./ClientRoster"

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-100">Clients</h1>
      <ClientRoster />
    </div>
  )
}
