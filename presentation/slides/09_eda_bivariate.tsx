'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import NotebookCell from '@/components/NotebookCell'

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
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-3">
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
        className="text-3xl font-bold text-slate-100 mb-2"
      >
        Analyse <span className="text-pink-400">bivariée</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-pink-500/50 via-slate-600 to-transparent mb-3 origin-left"
      />

      <div className="grid grid-cols-5 gap-4 flex-1 min-h-0">
        {/* Left: Code cells */}
        <div className="col-span-2 flex flex-col gap-2">
          <NotebookCell
            index={11}
            delay={0.25}
            code={`from scipy.stats import pearsonr, kruskal
import numpy as np

# Corrélation surface ↔ prix (log-space)
r, p = pearsonr(
    np.log1p(df['surface']),
    np.log1p(df['prix'])
)
print(f"r = {r:.3f}, p = {p:.2e}")`}
            output={{
              type: 'text',
              lines: [
                { text: 'r = 0.624, p = 3.41e-119', color: 'text-blue-400' },
                { text: '→ Corrélation modérée-forte ✅', color: 'text-green-400' },
              ],
            }}
          />

          <NotebookCell
            index={12}
            delay={0.4}
            code={`# ANOVA non-paramétrique : effet quartier
groups = [
    g['prix'].values
    for _, g in df.groupby('quartier')
]
stat, p = kruskal(*groups)
print(f"Kruskal-Wallis: H={stat:.2f}, p={p:.2e}")

# Prix médian par quartier (M MRO)
df.groupby('quartier')['prix'].median()\\
  .sort_values(ascending=False)\\
  .div(1e6).round(2)`}
            output={{
              type: 'table',
              caption: 'Kruskal-Wallis: H=312.4, p=1.2e-64',
              headers: ['Quartier', 'Médiane (M MRO)'],
              rows: [
                { cells: ['Tevragh_Zeina', 8.50], highlight: true },
                { cells: ['Ksar', 4.20] },
                { cells: ['Dar_Naim', 3.80] },
                { cells: ['Riadh', 3.50] },
                { cells: ['El_Mina', 1.60] },
              ],
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-sm"
          >
            <p className="text-slate-300 leading-relaxed">
              <span className="text-amber-400 font-semibold">Tevragh Zeina</span> : médiane{' '}
              <span className="text-amber-400 font-bold">5.3×</span> celle d&apos;El Mina
              → le quartier est la feature la plus discriminante.
            </p>
          </motion.div>
        </div>

        {/* Right: Charts */}
        <div className="col-span-3 flex flex-col gap-3 min-h-0">
          {/* Scatter placeholder */}
          <div className="flex-1 rounded-xl bg-slate-800/40 border border-slate-700 flex items-center justify-center overflow-hidden">
            {/* IMAGE: 09_scatter_surface_prix.png — 700×240 */}
            <img
              src="/images/09_scatter_surface_prix.png"
              alt="Scatter surface vs prix"
              className="w-full h-full object-contain rounded-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
                const p = (e.target as HTMLImageElement).parentElement
                if (p) p.innerHTML = '<p class="text-slate-500 text-sm text-center px-4">🎨 Scatter surface vs prix, coloré par quartier<br/><span class="text-xs font-mono text-slate-600">→ public/images/09_scatter_surface_prix.png</span></p>'
              }}
            />
          </div>

          {/* Boxplot par quartier */}
          <div className="flex flex-col gap-1.5" style={{ height: '45%' }}>
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
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quartierStats} layout="vertical" margin={{ top: 5, right: 40, bottom: 5, left: 65 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={{ stroke: '#334155' }} tickFormatter={(v) => `${v}M`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} width={65} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} formatter={(v: number) => [`${v} M MRO`, 'Médiane']} />
                  <Bar dataKey="median" radius={[0, 4, 4, 0]} animationDuration={900} label={{ position: 'right', fill: '#94a3b8', fontSize: 10, formatter: (v: number) => `${v}M` }}>
                    {quartierStats.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
