'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import CodeBlock from '@/components/CodeBlock'

const missingPct = [
  { name: 'nb_sdb', pct: 72, type: 'MAR', color: '#ef4444' },
  { name: 'terrasse', pct: 53, type: 'MCAR', color: '#f59e0b' },
  { name: 'jardin', pct: 49, type: 'MCAR', color: '#f59e0b' },
  { name: 'étage', pct: 46, type: 'MAR', color: '#ef4444' },
  { name: 'parking', pct: 38, type: 'MCAR', color: '#f59e0b' },
  { name: 'type_bien', pct: 15, type: 'MNAR', color: '#8b5cf6' },
  { name: 'nb_salons', pct: 12, type: 'MAR', color: '#ef4444' },
  { name: 'surface', pct: 5, type: 'MCAR', color: '#f59e0b' },
  { name: 'nb_chambres', pct: 1, type: 'MCAR', color: '#f59e0b' },
]

const strategies = [
  { type: 'MCAR', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: 'MCAR', desc: 'Manquant au hasard → médiane/mode' },
  { type: 'MAR', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', label: 'MAR', desc: 'Manquant selon autres variables → KNN imputation' },
  { type: 'MNAR', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', label: 'MNAR', desc: 'Manquant non aléatoire → catégorie "inconnu"' },
]

export default function Slide06() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium"
        >
          📊 EDA — Étape 3
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Analyse des{' '}
        <span className="text-red-400">valeurs manquantes</span>
        <span className="text-slate-500 text-2xl font-normal ml-3">MCAR / MAR / MNAR</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-red-500/50 via-slate-600 to-transparent mb-4 origin-left"
      />

      <div className="grid grid-cols-5 gap-5 flex-1 min-h-0">
        {/* Left: Key findings + types */}
        <div className="col-span-2 flex flex-col gap-3">
          {/* Key findings */}
          <div className="flex flex-col gap-2">
            {[
              { stat: '72%', desc: 'nb_sdb manquant → MAR', sub: 'Test Kruskal p < 0.001', color: 'text-red-400' },
              { stat: '1%', desc: 'nb_chambres manquant → MCAR', sub: 'Imputation par médiane', color: 'text-amber-400' },
              { stat: '53%', desc: 'terrasse manquante → MCAR', sub: 'Imputation par mode (0/1)', color: 'text-amber-400' },
            ].map((item, i) => (
              <motion.div
                key={item.stat + item.desc}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50"
              >
                <span className={`text-xl font-bold font-mono shrink-0 ${item.color}`}>{item.stat}</span>
                <div>
                  <p className="text-slate-200 text-sm font-medium">{item.desc}</p>
                  <p className="text-slate-500 text-xs">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Type legend */}
          <div className="flex flex-col gap-2 mt-1">
            {strategies.map((s, i) => (
              <motion.div
                key={s.type}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className={`flex items-start gap-2 p-2.5 rounded-lg border ${s.bg} text-sm`}
              >
                <span className={`font-bold shrink-0 ${s.color}`}>{s.label}</span>
                <span className="text-slate-400 text-xs">{s.desc}</span>
              </motion.div>
            ))}
          </div>

          {/* Key code */}
          <CodeBlock
            code={`# Test MAR pour nb_sdb
stat, p = kruskal(
    prix_missing,   # prix quand nb_sdb absent
    prix_present    # prix quand nb_sdb présent
)
# p < 0.001 → MAR confirmé`}
            language="python"
          />
        </div>

        {/* Right: Charts */}
        <div className="col-span-3 flex flex-col gap-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-xs font-medium uppercase tracking-widest"
          >
            % valeurs manquantes par variable
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 min-h-0"
          >
            <ResponsiveContainer width="100%" height="60%">
              <BarChart
                data={missingPct}
                margin={{ top: 5, right: 10, bottom: 20, left: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  angle={-30}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                  formatter={(v: number) => [`${v}%`, '% manquant']}
                />
                <Bar
                  dataKey="pct"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive
                  animationDuration={800}
                  animationEasing="ease-out"
                  label={{ position: 'top', fill: '#94a3b8', fontSize: 10, formatter: (v: number) => `${v}%` }}
                >
                  {missingPct.map((entry, i) => (
                    <rect key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex-1 rounded-xl bg-slate-800/40 border border-slate-700 flex items-center justify-center min-h-[120px] overflow-hidden"
          >
            <img src="/images/06_boxplot_prix_sdb.png" alt="Boxplot prix selon nb_sdb" className="w-full h-full object-contain rounded-xl" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
