import type { MetricKey, MineZone, MonitoringData, MonitoringParams, TimeRange, TimeSeriesPoint } from '../types'
import { apiFetch } from './api'
import { mockGetMonitoringData, mockGetTimeSeries, mockGetZone, mockGetZones } from './mock/monitoringMock'

const useMock = import.meta.env.VITE_MOCK !== 'false'

export async function getMonitoringData(params: MonitoringParams = {}): Promise<MonitoringData[]> {
  if (!useMock) {
    const query = new URLSearchParams()
    if (params.zoneId) query.set('zone_id', params.zoneId)
    if (params.limit) query.set('limit', String(params.limit))
    return apiFetch<MonitoringData[]>(`/api/monitoring${query.size ? `?${query}` : ''}`)
  }
  return mockGetMonitoringData(params)
}

export async function getTimeSeries(metric: MetricKey, range: TimeRange): Promise<TimeSeriesPoint[]> {
  if (!useMock) return apiFetch<TimeSeriesPoint[]>(`/api/monitoring/timeseries?metric=${metric}&range=${range}`)
  return mockGetTimeSeries(metric, range)
}

export async function getZones(): Promise<MineZone[]> {
  return useMock ? mockGetZones() : apiFetch<MineZone[]>('/api/zones')
}

export async function getZone(id: string): Promise<MineZone | undefined> {
  return useMock ? mockGetZone(id) : apiFetch<MineZone>(`/api/zones/${id}`)
}