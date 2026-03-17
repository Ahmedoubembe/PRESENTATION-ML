'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

// ---- Hardcoded data ----

const PRIX_MEDIAN = [
  { quartier: 'Tevragh Zeina', prix: 6_500_000 },
  { quartier: 'Sebkha',        prix: 3_850_000 },
  { quartier: 'Teyarett',      prix: 2_900_000 },
  { quartier: 'Ksar',          prix: 2_900_000 },
  { quartier: 'Dar Naim',      prix: 1_700_000 },
  { quartier: 'Arafat',        prix: 1_300_000 },
  { quartier: 'Toujounine',    prix: 1_100_000 },
  { quartier: 'Riyadh',        prix:   850_000 },
]

const ANNONCES = [
  { quartier: 'Tevragh Zeina', nb: 373 },
  { quartier: 'Teyarett',      nb: 270 },
  { quartier: 'Arafat',        nb: 244 },
  { quartier: 'Toujounine',    nb: 115 },
  { quartier: 'Dar Naim',      nb:  82 },
  { quartier: 'Ksar',          nb:  46 },
  { quartier: 'Riyadh',        nb:  13 },
  { quartier: 'Sebkha',        nb:  10 },
]

const FEATURES = [
  { feature: 'quartier_te_mean',   importance: 0.35 },
  { feature: 'surface_m2',         importance: 0.12 },
  { feature: 'prix_mentioned_any', importance: 0.08 },
  { feature: 'log_qte',            importance: 0.07 },
  { feature: 'quartier_te_median', importance: 0.06 },
  { feature: 'surface_x_qte',      importance: 0.05 },
  { feature: 'log_surface',        importance: 0.04 },
  { feature: 'type_bien_te_mean',  importance: 0.03 },
  { feature: 'chambres_x_surface', importance: 0.03 },
  { feature: 'sqrt_surface',       importance: 0.02 },
]

const STATS_CARDS = [
  { label: 'Annonces analysées',  value: '1 153',           color: 'text-blue-400' },
  { label: 'Prix moyen',          value: '4 339 931 MRU',   color: 'text-green-400' },
  { label: 'Prix médian',         value: '2 600 000 MRU',   color: 'text-emerald-400' },
  { label: 'Quartiers couverts',  value: '8',               color: 'text-purple-400' },
  { label: 'Meilleur modèle',     value: 'XGBoost depth=5', color: 'text-orange-400' },
  { label: 'Score Kaggle (RMSLE)', value: '0.541 · 1er',   color: 'text-yellow-400' },
]

const BLUE_PALETTE = [
  '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af',
  '#1e3a8a', '#172554', '#0f172a', '#334155',
]

function formatMillions(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`
  return String(value)
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}

function PrixTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm">
      <div className="font-semibold text-slate-200 mb-1">{label}</div>
      <div className="text-green-400">
        {new Intl.NumberFormat('fr-FR').format(payload[0].value)} MRU
      </div>
    </div>
  )
}

function AnnoncesTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm">
      <div className="font-semibold text-slate-200 mb-1">{label}</div>
      <div className="text-blue-400">{payload[0].value} annonces</div>
    </div>
  )
}

function FeaturesTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm">
      <div className="font-semibold text-slate-200 mb-1">{label}</div>
      <div className="text-purple-400">{(payload[0].value * 100).toFixed(0)}%</div>
    </div>
  )
}

export default function AnalysePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Analyse du marché</h1>
        <p className="mt-1 text-slate-400">
          Statistiques et visualisations — Marché immobilier de Nouakchott
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {STATS_CARDS.map(card => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-700 bg-slate-900 p-4"
          >
            <div className="text-xs font-medium text-slate-400 mb-1">{card.label}</div>
            <div className={`text-xl font-bold ${card.color}`}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Chart 1 — Prix médian par quartier */}
      <section>
        <h2 className="text-lg font-semibold text-slate-200 mb-4">
          Prix médian par quartier
        </h2>
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={PRIX_MEDIAN}
              layout="vertical"
              margin={{ top: 0, right: 60, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={formatMillions}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#475569' }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="quartier"
                width={110}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<PrixTooltip />} cursor={{ fill: '#1e293b' }} />
              <Bar dataKey="prix" radius={[0, 4, 4, 0]} label={{ position: 'right', formatter: formatMillions, fill: '#64748b', fontSize: 11 }}>
                {PRIX_MEDIAN.map((_, i) => (
                  <Cell key={i} fill={BLUE_PALETTE[i % BLUE_PALETTE.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Chart 2 — Nombre d'annonces */}
      <section>
        <h2 className="text-lg font-semibold text-slate-200 mb-4">
          Nombre d&apos;annonces par quartier
        </h2>
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={ANNONCES}
              margin={{ top: 0, right: 20, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="quartier"
                tick={({ x, y, payload }) => (
                  <text x={x} y={y} dy={8} textAnchor="end" fill="#94a3b8" fontSize={11} transform={`rotate(-30, ${x}, ${y})`}>
                    {payload.value}
                  </text>
                )}
                axisLine={{ stroke: '#475569' }}
                tickLine={false}
                interval={0}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<AnnoncesTooltip />} cursor={{ fill: '#1e293b' }} />
              <Bar dataKey="nb" radius={[4, 4, 0, 0]}>
                {ANNONCES.map((_, i) => (
                  <Cell key={i} fill={BLUE_PALETTE[i % BLUE_PALETTE.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Chart 3 — Feature importance */}
      <section>
        <h2 className="text-lg font-semibold text-slate-200 mb-4">
          Top 10 features — Importance XGBoost
        </h2>
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={FEATURES}
              layout="vertical"
              margin={{ top: 0, right: 60, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={v => `${(v * 100).toFixed(0)}%`}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: '#475569' }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="feature"
                width={160}
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<FeaturesTooltip />} cursor={{ fill: '#1e293b' }} />
              <Bar dataKey="importance" radius={[0, 4, 4, 0]} label={{ position: 'right', formatter: (v: number) => `${(v * 100).toFixed(0)}%`, fill: '#64748b', fontSize: 11 }}>
                {FEATURES.map((_, i) => {
                  const green = `hsl(${152 - i * 10}, 70%, ${55 - i * 3}%)`
                  return <Cell key={i} fill={i < 3 ? '#10b981' : green} />
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}
