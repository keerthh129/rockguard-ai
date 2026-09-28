import type { PredictionRequest, PredictionResponse } from '../types'
import { apiFetch } from './api'
import { mockPredictRisk } from './mock/predictionMock'

const useMock = import.meta.env.VITE_MOCK !== 'false'

export async function predictRisk(request: PredictionRequest): Promise<PredictionResponse> {
  return useMock ? mockPredictRisk(request) : apiFetch<PredictionResponse>('/api/predict', { method: 'POST', body: JSON.stringify(request) })
}