import { mockHistory } from '../../data/mockData'
import type { PredictionHistoryItem } from '../historyService'

export function mockGetPredictions(): PredictionHistoryItem[] {
  return [...mockHistory]
}