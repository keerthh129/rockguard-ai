import { mockMonitoring, mockSeries, mockZones } from '../../data/mockData'
import type { MetricKey, MineZone, MonitoringData, MonitoringParams, TimeRange, TimeSeriesPoint } from '../../types'

export function mockGetMonitoringData(params: MonitoringParams = {}): MonitoringData[] {
  const filtered = mockMonitoring.filter((item) => item.zoneId === (params.zoneId ?? 'zone-a'))
  return filtered.slice(-(params.limit ?? filtered.length))
}

export function mockGetTimeSeries(metric: MetricKey, range: TimeRange): TimeSeriesPoint[] {
  const count = range === '1H' ? 2 : range === '6H' ? 6 : range === '24H' ? 24 : range === '7D' ? 7 * 24 : 30 * 24
  const values: Record<MetricKey, (value: number) => number> = {
    slopeAngle: (value) => 37.8 + value * 0.15,
    rainfall: (value) => Math.max(0, (value - 2) * 2.4),
    vibration: (value) => value * 0.55,
    displacement: (value) => value,
    crackWidth: (value) => 3 + value * 0.4,
    moisture: (value) => 28 + value * 1.5,
    temperature: (value) => 16 + value * 0.8,
  }
  return mockSeries.slice(-count).map((point) => ({ ...point, value: +values[metric](point.value).toFixed(1) }))
}

export function mockGetZones(): MineZone[] {
  return [...mockZones]
}

export function mockGetZone(id: string): MineZone | undefined {
  return mockZones.find((zone) => zone.id === id)
}