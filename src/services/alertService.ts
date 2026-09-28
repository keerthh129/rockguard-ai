import type { Alert, AlertStatus } from '../types'
import { apiFetch } from './api'
import { mockGetAlerts, mockPatchAlert } from './mock/alertMock'

const useMock = import.meta.env.VITE_MOCK !== 'false'

export async function getAlerts(): Promise<Alert[]> {
  return useMock ? mockGetAlerts() : apiFetch<Alert[]>('/api/alerts')
}

export async function patchAlert(id: string, payload: { status: AlertStatus }): Promise<Alert> {
  return useMock ? mockPatchAlert(id, payload) : apiFetch<Alert>(`/api/alerts/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })
}