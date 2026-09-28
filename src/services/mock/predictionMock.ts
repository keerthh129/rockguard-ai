import { mockMonitoring } from '../../data/mockData'
import type { PredictionRequest, PredictionResponse, RiskLevel } from '../../types'

export async function mockPredictRisk(request: PredictionRequest): Promise<PredictionResponse> {
  await new Promise((resolve) => window.setTimeout(resolve, 850))
  const score = Math.min(96, Math.max(8, Math.round(request.slopeAngle * 0.55 + request.rainfall * 2.1 + request.vibration * 2.8 + request.displacement * 2.6 + request.crackWidth * 1.8 + request.moisture * 0.22 - 15)))
  const riskLevel: RiskLevel = score >= 80 ? 'Critical' : score >= 60 ? 'High' : score >= 35 ? 'Medium' : 'Low'
  const zoneReadings = mockMonitoring.filter((item) => item.zoneId === (request.zoneId ?? 'zone-a'))
  const reference = zoneReadings[zoneReadings.length - 1] ?? mockMonitoring[7]
  return {
    riskLevel,
    riskScore: score,
    contributingFactors: [
      request.displacement >= reference.displacement ? 'Displacement is elevated in the submitted demo sample' : 'Displacement is within the illustrative reference range',
      request.rainfall >= reference.rainfall ? 'Rainfall is elevated in the submitted demo sample' : 'Rainfall is within the illustrative reference range',
      request.crackWidth >= reference.crackWidth ? 'Crack width is elevated in the submitted demo sample' : 'Crack width is within the illustrative reference range',
    ],
    timestamp: new Date().toISOString(),
    demo: true,
    advisory: 'Illustrative screening output only. Review site procedures and consult qualified geotechnical personnel before making operational decisions.',
  }
}