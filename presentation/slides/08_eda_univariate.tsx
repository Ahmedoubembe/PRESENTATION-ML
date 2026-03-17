'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import NotebookCell from '@/components/NotebookCell'

const generatePriceHist = () => {
  const bins: { price: string; count: number }[] = []
  const centers = [500000, 1500000, 2500000, 3500000, 5000000, 7000000, 10000000, 15000000, 20000000]
  const counts = [15, 120, 280, 310, 220, 110, 65, 25, 8]
  centers.forEach((c, i) => { bins.push({ price: `${(c / 1000000).toFixed(1)}M`, count: counts[i] }) })
  return bins
}

const generateLogPriceHist = () => {
  const bins: { logPrice: string; count: number }[] = []
  const logCenters = [13.1, 13.4, 13.7, 14.0, 14.3, 14.6, 14.9, 15.2, 15.5]
  const counts = [25, 85, 175, 290, 310, 175, 75, 30, 8]
  logCenters.forEach((c, i) => { bins.push({ logPrice: c.toFixed(1), count: counts[i] }) })
  return bins
}

const priceHist = generatePriceHist()
const logPriceHist = generateLogPriceHist()

export default function Slide08() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-3">
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
        className="text-3xl font-bold text-slate-100 mb-2"
      >
        Analyse <span className="text-cyan-400">univariée</span>
        <span className="text-slate-500 text-xl font-normal ml-3">— distribution du prix</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-cyan-500/50 via-slate-600 to-transparent mb-3 origin-left"
      />

      <div className="grid grid-cols-5 gap-4 flex-1 min-h-0">
        {/* Left: Code */}
        <div className="col-span-2 flex flex-col gap-2">
          <NotebookCell
            index={9}
            delay={0.25}
            code={`import numpy as np
from scipy.stats import skew, kurtosis

# Distribution du prix brut
print(f"Mean:     {df['prix'].mean():>12,.0f}")
print(f"Median:   {df['prix'].median():>12,.0f}")
print(f"Std:      {df['prix'].std():>12,.0f}")
print(f"Skewness: {skew(df['prix']):>12.3f}")
print(f"Kurtosis: {kurtosis(df['prix']):>12.3f}")`}
          />

          <NotebookCell
            index={10}
            delay={0.4}
            code={`# Log-transformation (target engineering)
df['log_prix'] = np.log1p(df['prix'])

print(f"Skewness log: {skew(df['log_prix']):.3f}")
print(f"Kurtosis log: {kurtosis(df['log_prix']):.3f}")

# Vérification normalité (Shapiro sur échantillon)
from scipy.stats import shapiro
sample = df['log_prix'].sample(200, random_state=42)
stat, p = shapiro(sample)
print(f"Shapiro p-val: {p:.4f}")`}
          />

          <div className="grid grid-cols-2 gap-2 mt-1">
            {[
              { label: 'Skewness brut', value: '3.52', color: 'text-red-400' },
              { label: 'Skewness log', value: '0.12', color: 'text-green-400' },
              { label: 'Métrique Kaggle', value: 'RMSLE', color: 'text-blue-400' },
              { label: 'Target', value: 'log1p(prix)', color: 'text-purple-400' },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50"
              >
                <p className={`text-lg font-bold font-mono ${item.color}`}>{item.value}</p>
                <p className="text-slate-500 text-xs">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Charts */}
        <div className="col-span-3 flex flex-col gap-3 min-h-0">
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <p className="text-slate-400 text-xs uppercase tracking-widest">Prix brut</p>
                <span className="text-red-400 text-xs ml-auto">skew=3.52 ⚠️</span>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priceHist} margin={{ top: 5, right: 5, bottom: 25, left: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="price" tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} axisLine={{ stroke: '#334155' }} angle={-30} textAnchor="end" label={{ value: 'Prix (MRO)', position: 'insideBottom', offset: -16, fill: '#64748b', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} />
                    <Bar dataKey="count" fill="#ef4444" fillOpacity={0.8} radius={[3, 3, 0, 0]} animationDuration={800} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-slate-400 text-xs uppercase tracking-widest">log(Prix)</p>
                <span className="text-green-400 text-xs ml-auto">skew=0.12 ✅</span>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={logPriceHist} margin={{ top: 5, right: 5, bottom: 25, left: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="logPrice" tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} axisLine={{ stroke: '#334155' }} label={{ value: 'log(Prix)', position: 'insideBottom', offset: -16, fill: '#64748b', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} />
                    <Bar dataKey="count" fill="#10b981" fillOpacity={0.8} radius={[3, 3, 0, 0]} animationDuration={900} animationBegin={200} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
          {/* IMAGE: 08_histogram_prix_logprix.png — 900×350 */}
        </div>
      </div>
    </div>
  )
}
