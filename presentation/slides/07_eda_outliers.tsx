'use client'

import { motion } from 'framer-motion'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

// Simulated scatter data for prix vs surface
const generateData = () => {
  const data = []
  const quartiers = ['Tevragh Zeina', 'Ksar', 'Dar Naim', 'Sebkha', 'El Mina']
  for (let i = 0; i < 180; i++) {
    const surface = 40 + Math.random() * 400
    const isLuxe = Math.random() < 0.15
    const basePrice = isLuxe ? surface * 28000 + Math.random() * 5000000 : surface * 8000 + Math.random() * 1000000
    const isOutlier = basePrice > 12000000 || (surface > 350 && basePrice < 500000)
    data.push({
      surface: Math.round(surface),
      prix: Math.round(basePrice / 1000) * 1000,
      outlier: isOutlier,
      quartier: quartiers[Math.floor(Math.random() * quartiers.length)],
    })
  }
  return data
}

const scatterData = generateData()

export default function Slide07() {
  return (
    <div className="w-full h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium"
        >
          📊 EDA — Étape 4
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Analyse des{' '}
        <span className="text-orange-400">outliers</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-orange-500/50 via-slate-600 to-transparent mb-4 origin-left"
      />

      <div className="grid grid-cols-5 gap-6 flex-1 min-h-0">
        {/* Left: Decision + rationale */}
        <div className="col-span-2 flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
          >
            <p className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
              🔍 Observation
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Prix extrêmes détectés (jusqu&apos;à{' '}
              <span className="text-amber-400 font-mono font-bold">20 M MRO</span>
              ) — mais tous dans <span className="text-amber-300 font-semibold">Tevragh Zeina</span>, le quartier huppé de Nouakchott.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
          >
            <p className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              ✅ Décision : Garder les outliers
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">→</span>
                <span>Prix plausibles pour des villas de luxe</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">→</span>
                <span>XGBoost est robuste aux outliers</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">→</span>
                <span>Entraînement en <span className="font-mono text-green-400">log-space</span> réduit l&apos;impact</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50"
          >
            <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Légende graphique</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-slate-300">Annonces normales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-slate-300">Outliers détectés (IQR × 3)</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/30"
          >
            <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Stratégie</p>
            <p className="text-slate-300 text-sm font-mono">
              target = <span className="text-blue-400">log1p(prix)</span>
            </p>
            <p className="text-slate-500 text-xs mt-1">Log-transform → espace log normalise</p>
          </motion.div>
        </div>

        {/* Right: Scatter plot */}
        <div className="col-span-3 flex flex-col gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-xs font-medium uppercase tracking-widest"
          >
            Prix vs Surface — outliers marqués en rouge
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 min-h-0"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 30, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="surface"
                  name="Surface (m²)"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  label={{ value: 'Surface (m²)', position: 'bottom', fill: '#64748b', fontSize: 11 }}
                />
                <YAxis
                  dataKey="prix"
                  name="Prix (MRO)"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                  formatter={(v: number, name: string) => [
                    name === 'prix' ? `${(v / 1000000).toFixed(2)} M MRO` : `${v} m²`,
                    name,
                  ]}
                />
                <Scatter data={scatterData} isAnimationActive animationDuration={800}>
                  {scatterData.map((entry, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={entry.outlier ? '#ef4444' : '#3b82f6'}
                      fillOpacity={entry.outlier ? 0.9 : 0.6}
                      r={entry.outlier ? 5 : 3}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </motion.div>
          {/* IMAGE: 07_scatter_outliers.png — 800×480 — scatter prix vs surface, outliers en rouge */}
        </div>
      </div>
    </div>
  )
}
