'use client'

import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

// Simulated price histogram (log-normal distribution approximation)
const generatePriceHist = () => {
  const bins: { price: string; count: number }[] = []
  const centers = [500000, 1500000, 2500000, 3500000, 5000000, 7000000, 10000000, 15000000, 20000000]
  const counts = [15, 120, 280, 310, 220, 110, 65, 25, 8]
  centers.forEach((c, i) => {
    bins.push({ price: `${(c / 1000000).toFixed(1)}M`, count: counts[i] })
  })
  return bins
}

const generateLogPriceHist = () => {
  const bins: { logPrice: string; count: number }[] = []
  // After log transform, distribution should be ~normal
  const logCenters = [13.1, 13.4, 13.7, 14.0, 14.3, 14.6, 14.9, 15.2, 15.5]
  const counts = [25, 85, 175, 290, 310, 175, 75, 30, 8]
  logCenters.forEach((c, i) => {
    bins.push({ logPrice: c.toFixed(1), count: counts[i] })
  })
  return bins
}

const priceHist = generatePriceHist()
const logPriceHist = generateLogPriceHist()

export default function Slide08() {
  return (
    <div className="w-full h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium"
        >
          📊 EDA — Étape 5
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Analyse{' '}
        <span className="text-cyan-400">univariée</span>
        <span className="text-slate-500 text-2xl font-normal ml-3">distribution du prix</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-cyan-500/50 via-slate-600 to-transparent mb-4 origin-left"
      />

      <div className="flex flex-col gap-4 flex-1 min-h-0">
        {/* Key stat */}
        <div className="flex gap-4">
          {[
            { label: 'Skewness (prix brut)', value: '3.5', color: 'text-red-400', sub: 'Fortement asymétrique →' },
            { label: 'Skewness (log prix)', value: '0.12', color: 'text-green-400', sub: '≈ distribution normale ✓' },
            { label: 'Transformation', value: 'log1p()', color: 'text-blue-400', sub: 'Cible du modèle' },
            { label: 'Métrique Kaggle', value: 'RMSLE', color: 'text-purple-400', sub: 'Root Mean Sq Log Error' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex-1 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50"
            >
              <p className={`text-2xl font-bold font-mono ${item.color}`}>{item.value}</p>
              <p className="text-slate-400 text-xs mt-1">{item.label}</p>
              <p className="text-slate-500 text-xs">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts side by side */}
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Left: Raw price */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Prix brut (MRO)</p>
              <span className="text-red-400 text-xs ml-auto">Skewness = 3.5 ⚠️</span>
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceHist} margin={{ top: 5, right: 10, bottom: 25, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="price"
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickLine={false}
                    axisLine={{ stroke: '#334155' }}
                    angle={-30}
                    textAnchor="end"
                    label={{ value: 'Prix (MRO)', position: 'insideBottom', offset: -15, fill: '#64748b', fontSize: 11 }}
                  />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Bar dataKey="count" name="Annonces" fill="#ef4444" fillOpacity={0.8} radius={[3, 3, 0, 0]} animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Right: Log price */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">log(Prix) — transformé</p>
              <span className="text-green-400 text-xs ml-auto">Skewness ≈ 0.12 ✅</span>
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={logPriceHist} margin={{ top: 5, right: 10, bottom: 25, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="logPrice"
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickLine={false}
                    axisLine={{ stroke: '#334155' }}
                    label={{ value: 'log(Prix)', position: 'insideBottom', offset: -15, fill: '#64748b', fontSize: 11 }}
                  />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Bar dataKey="count" name="Annonces" fill="#10b981" fillOpacity={0.8} radius={[3, 3, 0, 0]} animationDuration={900} animationBegin={200} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        {/* IMAGE: 08_histogram_prix_logprix.png — 900×350 — histogramme côte à côte prix brut vs log(prix) */}
      </div>
    </div>
  )
}
