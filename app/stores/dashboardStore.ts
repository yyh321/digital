import { create } from 'zustand'

interface DashboardState {
  realtimeData: Record<string, unknown>
  setRealtimeData: (data: Record<string, unknown>) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  realtimeData: {},
  setRealtimeData: (data) => set({ realtimeData: data }),
}))
