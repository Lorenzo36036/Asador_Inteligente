export type AnalysisType = 'error' | 'info' | 'warning'

export interface AnalysisItem {
  type: AnalysisType
  label: string
  content: React.ReactNode
  urgent?: boolean
}
