export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical'
export type AlertStatus = 'open' | 'reviewed' | 'closed'
export type MetricKey = 'slopeAngle' | 'rainfall' | 'vibration' | 'displacement' | 'crackWidth' | 'moisture' | 'temperature'
export type TimeRange = '1H' | '6H' | '24H' | '7D' | '30D'

export interface PredictionRequest {
  slopeAngle: number
  rainfall: number
  vibration: number
  displacement: number
  crackWidth: number
  moisture: number
  temperature: number
  zoneId?: string
}

export interface PredictionResponse {
  riskLevel: RiskLevel
  riskScore: number
  contributingFactors: string[]
  timestamp: string
  confidence?: number
  advisory: string
  demo?: boolean
}

export interface MonitoringData extends PredictionRequest {
  timestamp: string
  zoneId: string
}

export interface Alert {
  id: string
  timestamp: string
  zone: string
  level: RiskLevel
  parameter: string
  description: string
  status: AlertStatus
}

export interface MineZone {
  id: string
  name: string
  sector: string
  level: RiskLevel
  score: number
  sensorsOnline: number
  sensorsTotal: number
  lastReading: string
}

export interface TimeSeriesPoint {
  timestamp: string
  label: string
  value: number
  risk: number
}

export interface MonitoringParams {
  zoneId?: string
  limit?: number
}