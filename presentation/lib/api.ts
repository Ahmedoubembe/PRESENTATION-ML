const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://model-home-scope-2.onrender.com'

export interface PredictionInput {
  quartier: string
  surface_m2: number
  nb_chambres: number
  nb_salons: number
  nb_sdb?: number
  titre?: string
  description?: string
  caracteristiques?: string
}

export interface PredictionResult {
  success: boolean
  prediction: {
    prix_estime: number
    prix_min: number
    prix_max: number
    prix_m2: number
    quartier: string
    type_bien: string
  }
}

export interface StatsResult {
  [key: string]: unknown
}

export async function predictPrice(data: PredictionInput): Promise<PredictionResult> {
  const response = await fetch(`${API_URL}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  return response.json()
}

export async function getQuartiers(): Promise<string[]> {
  const response = await fetch(`${API_URL}/api/quartiers`)
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  const data = await response.json()
  return data.quartiers ?? data
}

export async function getStats(): Promise<StatsResult> {
  const response = await fetch(`${API_URL}/api/stats`)
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  return response.json()
}
