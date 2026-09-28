import { apiFetch } from './api'
import { mockGetPredictions } from './mock/historyMock'

export interface PredictionHistoryItem {
  id: string
  zone: string
  level: 'Low' | 'Medium' | 'High' | 'Critical'
  score: number
  timestamp: string
  source: string
}

export async function getPredictions(): Promise<PredictionHistoryItem[]> {
  return import.meta.env.VITE_MOCK !== 'false' ? mockGetPredictions() : apiFetch<PredictionHistoryItem[]>('/api/predictions')
}