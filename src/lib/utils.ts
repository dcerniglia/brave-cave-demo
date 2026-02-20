import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function weeksBetween(start: Date, end: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000))
}
