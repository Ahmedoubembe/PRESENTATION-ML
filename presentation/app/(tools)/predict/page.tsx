'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { predictPrice, PredictionInput } from '@/lib/api'

const MapComponent = dynamic(() => import('@/components/QuartierMap'), { ssr: false })

const QUARTIERS = [
  'Tevragh Zeina',
  'Ksar',
  'Arafat',
  'Dar Naim',
  'Toujounine',
  'Sebkha',
  'Riyadh',
  'Teyarett',
]

// Median prices per quartier for comparison
const PRIX_MEDIAN: Record<string, number> = {
  'Tevragh Zeina': 6_500_000,
  'Sebkha':        3_850_000,
  'Teyarett':      2_900_000,
  'Ksar':          2_900_000,
  'Dar Naim':      1_700_000,
  'Arafat':        1_300_000,
  'Toujounine':    1_100_000,
  'Riyadh':          850_000,
}

const CARACTERISTIQUES_OPTIONS = [
  'Titre foncier',
  'Garage',
  'Caméra de sécurité',
]

function formatPrix(prix: number): string {
  return new Intl.NumberFormat('fr-FR').format(Math.round(prix)) + ' MRU'
}

interface ResultType {
  prix_estime: number
  prix_min: number
  prix_max: number
  prix_m2: number
  quartier: string
  type_bien: string
}

export default function PredictPage() {
  const [quartier, setQuartier] = useState('')
  const [surface, setSurface] = useState('')
  const [chambres, setChambres] = useState('')
  const [salons, setSalons] = useState('')
  const [sdb, setSdb] = useState('')
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [caracteristiquesChecked, setCaracteristiquesChecked] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResultType | null>(null)
  const [error, setError] = useState<string | null>(null)

  function toggleCaract(opt: string) {
    setCaracteristiquesChecked(prev =>
      prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    const payload: PredictionInput = {
      quartier,
      surface_m2: parseFloat(surface),
      nb_chambres: parseInt(chambres),
      nb_salons: parseInt(salons),
    }
    if (sdb) payload.nb_sdb = parseInt(sdb)
    if (titre) payload.titre = titre
    if (description) payload.description = description
    if (caracteristiquesChecked.length > 0) {
      payload.caracteristiques = caracteristiquesChecked.join(' | ')
    }

    try {
      const data = await predictPrice(payload)
      if (data.success) {
        setResult(data.prediction)
      } else {
        setError("La prédiction a échoué. Vérifiez les données et réessayez.")
      }
    } catch {
      setError(
        "API indisponible — le serveur gratuit Render peut prendre 30–60 s à démarrer après une période d'inactivité. Réessayez dans un moment."
      )
    } finally {
      setLoading(false)
    }
  }

  const mediane = quartier ? PRIX_MEDIAN[quartier] : null
  const diffPct = result && mediane
    ? Math.round(((result.prix_estime - mediane) / mediane) * 100)
    : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Estimation de prix
        </h1>
        <p className="mt-1 text-slate-400">
          Renseignez les caractéristiques du bien pour obtenir une estimation instantanée.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Quartier */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Quartier <span className="text-blue-400">*</span>
            </label>
            <select
              required
              value={quartier}
              onChange={e => setQuartier(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="">— Sélectionner un quartier —</option>
              {QUARTIERS.map(q => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          {/* Surface + Chambres */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Surface (m²) <span className="text-blue-400">*</span>
              </label>
              <input
                type="number"
                required
                min={10}
                max={10000}
                placeholder="ex: 300"
                value={surface}
                onChange={e => setSurface(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Chambres <span className="text-blue-400">*</span>
              </label>
              <input
                type="number"
                required
                min={0}
                max={30}
                placeholder="ex: 4"
                value={chambres}
                onChange={e => setChambres(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Salons + SDB */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Salons <span className="text-blue-400">*</span>
              </label>
              <input
                type="number"
                required
                min={0}
                max={20}
                placeholder="ex: 2"
                value={salons}
                onChange={e => setSalons(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Salles de bain
              </label>
              <input
                type="number"
                min={0}
                max={20}
                placeholder="ex: 2"
                value={sdb}
                onChange={e => setSdb(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Caractéristiques */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Caractéristiques
            </label>
            <div className="flex flex-wrap gap-3">
              {CARACTERISTIQUES_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={caracteristiquesChecked.includes(opt)}
                    onChange={() => toggleCaract(opt)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-300">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Titre de l&apos;annonce
            </label>
            <input
              type="text"
              placeholder="ex: فيلا للبيع في تفرغ زينه"
              value={titre}
              onChange={e => setTitre(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="ex: فيلا فاخرة قرب السفارات"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Calcul en cours…
              </>
            ) : (
              'Estimer le prix'
            )}
          </button>
        </form>

        {/* Right column: Map + Result */}
        <div className="space-y-5">
          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <MapComponent selectedQuartier={quartier} prixEstime={result?.prix_estime} />
          </div>

          {/* Loading message */}
          {loading && (
            <div className="rounded-xl border border-blue-800 bg-blue-900/20 p-4 text-sm text-blue-300">
              <span className="font-medium">Serveur en cours de démarrage…</span>
              <br />
              Le serveur gratuit Render se met en veille après 15 min d&apos;inactivité. Le premier appel peut prendre 30–60 secondes.
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-800 bg-red-900/20 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="rounded-xl border border-green-700 bg-slate-900 p-6 space-y-4">
              {/* Prix principal */}
              <div className="text-center">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Prix estimé
                </div>
                <div className="text-4xl font-black text-green-400">
                  {formatPrix(result.prix_estime)}
                </div>
              </div>

              <hr className="border-slate-700" />

              {/* Fourchette */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-slate-800 p-3">
                  <div className="text-slate-400 text-xs mb-1">Fourchette</div>
                  <div className="font-semibold text-slate-100">
                    {formatPrix(result.prix_min)}
                    <span className="text-slate-400 font-normal"> → </span>
                    {formatPrix(result.prix_max)}
                  </div>
                </div>

                <div className="rounded-lg bg-slate-800 p-3">
                  <div className="text-slate-400 text-xs mb-1">Prix au m²</div>
                  <div className="font-semibold text-slate-100">
                    {formatPrix(result.prix_m2)}<span className="text-slate-400 font-normal">/m²</span>
                  </div>
                </div>

                <div className="rounded-lg bg-slate-800 p-3">
                  <div className="text-slate-400 text-xs mb-1">Type de bien</div>
                  <div className="font-semibold text-slate-100 capitalize">
                    {result.type_bien}
                  </div>
                </div>

                {diffPct !== null && (
                  <div className="rounded-lg bg-slate-800 p-3">
                    <div className="text-slate-400 text-xs mb-1">vs médiane quartier</div>
                    <div className={`font-semibold ${diffPct >= 0 ? 'text-orange-400' : 'text-blue-400'}`}>
                      {diffPct >= 0 ? '+' : ''}{diffPct}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
