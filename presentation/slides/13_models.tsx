'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const models = [
  { name: 'Linear', rmsle: 0.847, r2: 0.42, color: '#64748b' },
  { name: 'Ridge', rmsle: 0.782, r2: 0.51, color: '#6366f1' },
  { name: 'Lasso', rmsle: 0.765, r2: 0.53, color: '#8b5cf6' },
  { name: 'Random Forest', rmsle: 0.634, r2: 0.67, color: '#3b82f6' },
  { name: 'GBM', rmsle: 0.598, r2: 0.72, color: '#06b6d4' },
  { name: 'XGBoost', rmsle: 0.541, r2: 0.78, color: '#10b981' },
]

export default function Slide13() {
  return (
    <div className="w-full h-full flex flex-col p-10 pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-5 self-start"
      >
        🤖 Phase 4 — Modélisation
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Comparaison des{' '}
        <span className="text-cyan-400">6 modèles</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-cyan-500/50 via-slate-600 to-transparent mb-4 origin-left"
      />

      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Left: RMSLE chart */}
        <div className="flex flex-col gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-xs font-medium uppercase tracking-widest"
          >
            RMSLE (plus bas = meilleur) ↓
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex-1 min-h-0"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={models}
                layout="vertical"
                margin={{ top: 5, right: 60, bottom: 5, left: 85 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 1.0]}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={85}
                />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                  formatter={(v: number) => [v.toFixed(3), 'RMSLE']}
                />
                <Bar
                  dataKey="rmsle"
                  radius={[0, 4, 4, 0]}
                  animationDuration={900}
                  label={{ position: 'right', fill: '#94a3b8', fontSize: 11, formatter: (v: number) => v.toFixed(3) }}
                >
                  {models.map((entry, i) => (
                    <Cell key={`rmsle-${i}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Right: R² chart + table */}
        <div className="flex flex-col gap-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-xs font-medium uppercase tracking-widest"
          >
            R² score (plus haut = meilleur) ↑
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 min-h-0"
          >
            <ResponsiveContainer width="100%" height="60%">
              <BarChart data={models} layout="vertical" margin={{ top: 5, right: 50, bottom: 5, left: 85 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 1.0]}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={85}
                />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                  formatter={(v: number) => [v.toFixed(2), 'R²']}
                />
                <Bar
                  dataKey="r2"
                  radius={[0, 4, 4, 0]}
                  animationDuration={900}
                  animationBegin={200}
                  label={{ position: 'right', fill: '#94a3b8', fontSize: 11, formatter: (v: number) => v.toFixed(2) }}
                >
                  {models.map((entry, i) => (
                    <Cell key={`r2-${i}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="flex flex-col gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-3 rounded-xl bg-green-500/10 border border-green-500/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-green-400 font-semibold">XGBoost tuné</span>
                </div>
                <div className="flex gap-3 font-mono text-sm">
                  <span className="text-green-400">RMSLE: <strong>0.541</strong></span>
                  <span className="text-cyan-400">R²: <strong>0.78</strong></span>
                </div>
              </div>
              <p className="text-slate-400 text-xs mt-1">
                Meilleur modèle — 1er sur Kaggle 🏆
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/30 text-sm text-slate-400"
            >
              <p>📈 Progression: RMSLE <span className="text-red-400">0.847</span> → <span className="text-green-400">0.541</span></p>
              <p className="mt-0.5">📈 R²: <span className="text-red-400">0.42</span> → <span className="text-green-400">0.78</span></p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
