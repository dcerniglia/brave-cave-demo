export type Pillar = "fitness" | "focus" | "fraternity" | "finance"

export interface F4Score {
  fitness: number
  focus: number
  fraternity: number
  finance: number
}

export interface F4Entry {
  week: number
  date: string
  scores: F4Score
}

export interface Client {
  id: string
  name: string
  company: string
  role: string
  avatarUrl: string
  startDate: string
  programDays: number
  f4History: F4Entry[]
}

export interface HafItem {
  id: string
  text: string
  pillar?: Pillar
}

export interface HafCheckin {
  id: string
  clientId: string
  week: number
  date: string
  hurdles: HafItem[]
  ahas: HafItem[]
  fixes: HafItem[]
}

export interface ActionItem {
  id: string
  clientId: string
  checkinId: string
  text: string
  pillar: Pillar
  status: "pending" | "in-progress" | "done" | "overdue"
  dueDate: string
  createdDate: string
}

export interface Session {
  id: string
  clientId: string
  date: string
  time: string
  type: "weekly" | "deep-dive" | "deal-review"
  notes?: string
}

export type Role = "coach" | "client"

export const PILLAR_COLORS: Record<Pillar, string> = {
  fitness: "emerald",
  focus: "blue",
  fraternity: "amber",
  finance: "violet",
}

export const PILLAR_LABELS: Record<Pillar, string> = {
  fitness: "Fitness",
  focus: "Focus",
  fraternity: "Fraternity",
  finance: "Finance",
}

export const PILLAR_PROMPTS: Record<Pillar, string> = {
  fitness: "How consistent were your routines this week?",
  focus: "How locked in were you on your highest-leverage priorities?",
  fraternity: "How invested were you in your key relationships?",
  finance: "How disciplined were your financial habits and decisions?",
}
