import { mockAlerts } from '../../data/mockData'
import type { Alert, AlertStatus } from '../../types'

let demoAlerts = [...mockAlerts]

export function mockGetAlerts(): Alert[] {
  return [...demoAlerts]
}

export function mockPatchAlert(id: string, payload: { status: AlertStatus }): Alert {
  const existing = demoAlerts.find((alert) => alert.id === id)
  if (!existing) throw new Error('Alert not found')
  const updated = { ...existing, ...payload }
  demoAlerts = demoAlerts.map((alert) => alert.id === id ? updated : alert)
  return updated
}