'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const quartierStats = [
  { name: 'Tevragh Z.', median: 8.5, color: '#f59e0b' },
  { name: 'Ksar', median: 4.2, color: '#3b82f6' },
  { name: 'Dar Naim', median: 3.8, color: '#10b981' },
  { name: 'Riadh', median: 3.5, color: '#8b5cf6' },
  { name: 'Toujounine', median: 2.1, color: '#06b6d4' },
  { name: 'Sebkha', median: 2.0, color: '#ec4899' },
  { name: 'Arafat', median: 1.8, color: '#f97316' },
  { name: 'El Mina', median: 1.6, color: '#14b8a6' },
]

export default function Slide09() {
  return (
    <div className="w-full h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium"
        >
          📊 EDA — Étape 6
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Analyse{' '}
        <span className="text-pink-400">bivariée</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-pink-500/50 via-slate-600 to-transparent mb-4 origin-left"
      />

      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Left: Surface vs prix */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex-1">
              <p className="text-2xl font-bold font-mono text-blue-400">r = 0.62</p>
              <p className="text-slate-400 text-xs">Corrélation Surface ↔ Prix</p>
              <p className="text-slate-500 text-xs">(Pearson, log-space)</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex-1">
              <p className="text-2xl font-bold font-mono text-red-400">p &lt; 0.001</p>
              <p className="text-slate-400 text-xs">Kruskal-Wallis quartier</p>
              <p className="text-slate-500 text-xs">Effet quartier significatif</p>
            </div>
          </div>

          {/* Scatter placeholder */}
          <div className="flex-1 rounded-xl bg-slate-800/40 border border-dashed border-slate-700 flex flex-col items-center justify-center gap-2">
            {/* IMAGE: 09_scatter_surface_prix.png — 700×380 — scatter surface vs prix coloré par quartier */}
            <span className="text-4xl opacity-30">🎨</span>
            <p className="text-slate-500 text-sm text-center px-6">
              Scatter surface vs prix, coloré par quartier
              <br />
              <span className="text-xs font-mono text-slate-600">→ placer: public/images/09_scatter_surface_prix.png</span>
            </p>
          </div>
        </div>

        {/* Right: Boxplot par quartier */}
        <div className="flex flex-col gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-xs font-medium uppercase tracking-widest"
          >
            Prix médian par quartier (M MRO)
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 min-h-0"
          >
            <ResponsiveContainer width="100%" height="80%">
              <BarChart
                data={quartierStats}
                layout="vertical"
                margin={{ top: 5, right: 30, bottom: 5, left: 65 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  tickFormatter={(v) => `${v}M`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={65}
                />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                  formatter={(v: number) => [`${v} M MRO`, 'Prix médian']}
                />
                <Bar
                  dataKey="median"
                  name="Prix médian"
                  radius={[0, 4, 4, 0]}
                  animationDuration={900}
                  fill="#3b82f6"
                >
                  {quartierStats.map((entry, index) => (
                    <rect key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 mt-auto"
          >
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="text-amber-400 font-semibold">Tevragh Zeina</span> : prix médian{' '}
              <span className="text-amber-400 font-bold">5× plus élevé</span> qu&apos;El Mina
              → le quartier est une feature cruciale.
            </p>
          </motion.div>
          {/* IMAGE: 09_boxplot_quartier.png — 700×380 — boxplot prix par quartier */}
        </div>
      </div>
    </div>
  )
}
