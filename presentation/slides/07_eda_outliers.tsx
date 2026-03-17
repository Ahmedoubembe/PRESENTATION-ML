'use client'

import { motion } from 'framer-motion'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import NotebookCell from '@/components/NotebookCell'

const generateData = () => {
  const data = []
  for (let i = 0; i < 180; i++) {
    const surface = 40 + Math.random() * 400
    const isLuxe = Math.random() < 0.15
    const basePrice = isLuxe ? surface * 28000 + Math.random() * 5000000 : surface * 8000 + Math.random() * 1000000
    const isOutlier = basePrice > 12000000 || (surface > 350 && basePrice < 500000)
    data.push({ surface: Math.round(surface), prix: Math.round(basePrice / 1000) * 1000, outlier: isOutlier })
  }
  return data
}

const scatterData = generateData()

export default function Slide07() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-3">
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
        className="text-3xl font-bold text-slate-100 mb-2"
      >
        Analyse des <span className="text-orange-400">outliers</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-orange-500/50 via-slate-600 to-transparent mb-3 origin-left"
      />

      <div className="grid grid-cols-5 gap-4 flex-1 min-h-0">
        {/* Left: Code cells + decision */}
        <div className="col-span-2 flex flex-col gap-2">
          <NotebookCell
            index={7}
            delay={0.25}
            code={`# Détection par IQR × 3 (seuil libéral)
Q1 = df['prix'].quantile(0.25)
Q3 = df['prix'].quantile(0.75)
IQR = Q3 - Q1

seuil_haut = Q3 + 3 * IQR
seuil_bas  = Q1 - 3 * IQR

outliers = df[
    (df['prix'] > seuil_haut) |
    (df['prix'] < seuil_bas)
]
print(f"{len(outliers)} outliers détectés")`}
            output={{
              type: 'text',
              lines: [
                { text: '23 outliers détectés', color: 'text-orange-400' },
                { text: 'seuil_haut = 11 854 000 MRO', color: 'text-slate-400' },
              ],
            }}
          />

          <NotebookCell
            index={8}
            delay={0.4}
            code={`# Tous dans Tevragh Zeina ?
outliers['quartier'].value_counts()`}
            output={{
              type: 'table',
              headers: ['Quartier', 'Count'],
              rows: [
                { cells: ['Tevragh_Zeina', 19], highlight: true },
                { cells: ['Ksar', 3] },
                { cells: ['Dar_Naim', 1] },
              ],
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-col gap-2"
          >
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm">
              <p className="text-green-400 font-semibold mb-1">✅ Décision : Garder</p>
              <div className="text-slate-400 text-xs space-y-1">
                <p>→ Prix plausibles (villas de luxe)</p>
                <p>→ XGBoost robuste aux outliers</p>
                <p>→ Entraînement en <span className="font-mono text-green-400">log-space</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/30 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /><span className="text-slate-300">Normal</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><span className="text-slate-300">Outlier (IQR×3)</span></div>
            </div>
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
            Prix vs Surface — outliers en rouge
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
                <XAxis dataKey="surface" name="Surface (m²)" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={{ stroke: '#334155' }} label={{ value: 'Surface (m²)', position: 'bottom', fill: '#64748b', fontSize: 11 }} />
                <YAxis dataKey="prix" name="Prix" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} formatter={(v: number, name: string) => [name === 'prix' ? `${(v / 1000000).toFixed(2)} M MRO` : `${v} m²`, name]} />
                <Scatter data={scatterData} isAnimationActive animationDuration={800}>
                  {scatterData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.outlier ? '#ef4444' : '#3b82f6'} fillOpacity={entry.outlier ? 0.9 : 0.55} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </motion.div>
          {/* IMAGE: 07_scatter_outliers.png — 800×480 */}
        </div>
      </div>
    </div>
  )
}
