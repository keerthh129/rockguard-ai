import type { Alert, MineZone, MonitoringData, RiskLevel, TimeSeriesPoint } from '../types'

// DEMO ONLY: values are illustrative fixtures, not live mine telemetry or model output.
export const mockZones: MineZone[] = [
  { id: 'zone-a', name: 'Zone A', sector: 'North wall', level: 'Medium', score: 42, sensorsOnline: 12, sensorsTotal: 12, lastReading: '2 min ago' },
  { id: 'zone-b', name: 'Zone B', sector: 'East bench', level: 'Low', score: 18, sensorsOnline: 10, sensorsTotal: 11, lastReading: '1 min ago' },
  { id: 'zone-c', name: 'Zone C', sector: 'South ramp', level: 'High', score: 76, sensorsOnline: 9, sensorsTotal: 10, lastReading: 'Just now' },
  { id: 'zone-d', name: 'Zone D', sector: 'West cutback', level: 'Low', score: 23, sensorsOnline: 11, sensorsTotal: 11, lastReading: '3 min ago' },
]

export const mockMonitoring: MonitoringData[] = [
  { timestamp: '2026-09-28T08:00:00Z', zoneId: 'zone-a', slopeAngle: 38.4, rainfall: 2.1, vibration: 1.8, displacement: 2.4, crackWidth: 4.2, moisture: 31, temperature: 18 },
  { timestamp: '2026-09-28T08:05:00Z', zoneId: 'zone-a', slopeAngle: 38.5, rainfall: 2.4, vibration: 1.9, displacement: 2.6, crackWidth: 4.3, moisture: 32, temperature: 18.2 },
  { timestamp: '2026-09-28T08:10:00Z', zoneId: 'zone-a', slopeAngle: 38.5, rainfall: 2.7, vibration: 2.1, displacement: 2.8, crackWidth: 4.4, moisture: 32, temperature: 18.4 },
  { timestamp: '2026-09-28T08:15:00Z', zoneId: 'zone-a', slopeAngle: 38.6, rainfall: 3.1, vibration: 2.0, displacement: 3.1, crackWidth: 4.4, moisture: 33, temperature: 18.6 },
  { timestamp: '2026-09-28T08:20:00Z', zoneId: 'zone-a', slopeAngle: 38.6, rainfall: 3.4, vibration: 2.3, displacement: 3.5, crackWidth: 4.6, moisture: 34, temperature: 18.7 },
  { timestamp: '2026-09-28T08:25:00Z', zoneId: 'zone-a', slopeAngle: 38.7, rainfall: 3.6, vibration: 2.4, displacement: 3.8, crackWidth: 4.8, moisture: 34, temperature: 19 },
  { timestamp: '2026-09-28T08:30:00Z', zoneId: 'zone-a', slopeAngle: 38.7, rainfall: 3.9, vibration: 2.5, displacement: 4.1, crackWidth: 4.9, moisture: 35, temperature: 19.1 },
  { timestamp: '2026-09-28T08:35:00Z', zoneId: 'zone-a', slopeAngle: 38.8, rainfall: 4.2, vibration: 2.6, displacement: 4.4, crackWidth: 5.1, moisture: 36, temperature: 19.3 },
  { timestamp: '2026-09-28T08:35:00Z', zoneId: 'zone-b', slopeAngle: 37.1, rainfall: 1.2, vibration: 1.4, displacement: 1.8, crackWidth: 3.3, moisture: 27, temperature: 17.5 },
  { timestamp: '2026-09-28T08:35:00Z', zoneId: 'zone-c', slopeAngle: 40.2, rainfall: 6.4, vibration: 3.1, displacement: 7.8, crackWidth: 6.2, moisture: 48, temperature: 20.1 },
  { timestamp: '2026-09-28T08:35:00Z', zoneId: 'zone-d', slopeAngle: 36.9, rainfall: 0.8, vibration: 1.1, displacement: 2.1, crackWidth: 3.1, moisture: 25, temperature: 16.8 },
]

export const mockAlerts: Alert[] = [
  { id: 'RG-2048', timestamp: '2026-09-28T08:34:00Z', zone: 'Zone C', level: 'High', parameter: 'Displacement', description: 'Movement trend exceeded the demo review threshold over the latest sample window.', status: 'open' },
  { id: 'RG-2047', timestamp: '2026-09-28T08:12:00Z', zone: 'Zone A', level: 'Medium', parameter: 'Crack width', description: 'Crack-width readings show a gradual increase in this illustrative dataset.', status: 'open' },
  { id: 'RG-2046', timestamp: '2026-09-28T07:48:00Z', zone: 'Zone C', level: 'Medium', parameter: 'Rainfall', description: 'Rainfall reading is elevated relative to recent demo samples.', status: 'reviewed' },
  { id: 'RG-2045', timestamp: '2026-09-28T07:25:00Z', zone: 'Zone B', level: 'Low', parameter: 'Sensor health', description: 'One demo sensor is not reporting in the latest sample.', status: 'reviewed' },
  { id: 'RG-2044', timestamp: '2026-09-28T06:52:00Z', zone: 'Zone D', level: 'Low', parameter: 'Ground vibration', description: 'Short vibration event recorded; follow-up sample is within the demo band.', status: 'closed' },
  { id: 'RG-2043', timestamp: '2026-09-28T06:31:00Z', zone: 'Zone C', level: 'Medium', parameter: 'Ground moisture', description: 'Moisture reading is above the previous illustrative sample.', status: 'reviewed' },
  { id: 'RG-2042', timestamp: '2026-09-28T05:58:00Z', zone: 'Zone A', level: 'Low', parameter: 'Slope angle', description: 'Slope angle sample updated in the demo data stream.', status: 'closed' },
  { id: 'RG-2041', timestamp: '2026-09-28T05:22:00Z', zone: 'Zone D', level: 'Medium', parameter: 'Rainfall', description: 'Rainfall sample recorded for illustrative trend review.', status: 'reviewed' },
]

export const mockHistory = [
  { id: 'PR-1092', zone: 'Zone C', level: 'High' as RiskLevel, score: 76, timestamp: '2026-09-28T08:35:00Z', source: 'Scheduled demo assessment' },
  { id: 'PR-1091', zone: 'Zone A', level: 'Medium' as RiskLevel, score: 42, timestamp: '2026-09-28T08:20:00Z', source: 'User initiated' },
  { id: 'PR-1090', zone: 'Zone B', level: 'Low' as RiskLevel, score: 18, timestamp: '2026-09-28T07:55:00Z', source: 'Scheduled demo assessment' },
  { id: 'PR-1089', zone: 'Zone D', level: 'Low' as RiskLevel, score: 23, timestamp: '2026-09-28T07:30:00Z', source: 'User initiated' },
  { id: 'PR-1088', zone: 'Zone C', level: 'Medium' as RiskLevel, score: 61, timestamp: '2026-09-28T07:05:00Z', source: 'Scheduled demo assessment' },
  { id: 'PR-1087', zone: 'Zone A', level: 'Low' as RiskLevel, score: 26, timestamp: '2026-09-28T06:40:00Z', source: 'User initiated' },
]

export const mockSeries: TimeSeriesPoint[] = Array.from({ length: 30 * 24 }, (_, index) => {
  const timestamp = new Date(Date.UTC(2026, 8, 28) - (30 * 24 - index - 1) * 60 * 60 * 1000)
  const dailyCycle = Math.sin(index / 24 * Math.PI * 2) * 4
  const trend = 34 + index / 720 * 39 + dailyCycle
  return {
    timestamp: timestamp.toISOString(),
    label: `${String(timestamp.getUTCHours()).padStart(2, '0')}:00`,
    value: +(2.2 + index / 720 * 3.1 + Math.cos(index / 18) * 0.6).toFixed(1),
    risk: Math.max(12, Math.min(88, Math.round(trend))),
  }
})