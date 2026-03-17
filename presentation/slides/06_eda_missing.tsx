'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import NotebookCell from '@/components/NotebookCell'

const missingPct = [
  { name: 'nb_sdb', pct: 72, color: '#ef4444' },
  { name: 'terrasse', pct: 53, color: '#f59e0b' },
  { name: 'jardin', pct: 49, color: '#f59e0b' },
  { name: 'étage', pct: 46, color: '#ef4444' },
  { name: 'parking', pct: 38, color: '#f59e0b' },
  { name: 'type_bien', pct: 15, color: '#8b5cf6' },
  { name: 'nb_salons', pct: 12, color: '#ef4444' },
  { name: 'surface', pct: 5, color: '#f59e0b' },
  { name: 'nb_chambres', pct: 1, color: '#f59e0b' },
]

const strategies = [
  { type: 'MCAR', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', desc: 'Manquant au hasard → médiane/mode' },
  { type: 'MAR', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', desc: 'Dépend d\'autres variables → KNN imputation' },
  { type: 'MNAR', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', desc: 'Non aléatoire → catégorie "inconnu"' },
]

export default function Slide06() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-3">
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
        className="text-3xl font-bold text-slate-100 mb-2"
      >
        Valeurs manquantes — <span className="text-red-400">MCAR / MAR / MNAR</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-red-500/50 via-slate-600 to-transparent mb-3 origin-left"
      />

      <div className="grid grid-cols-5 gap-4 flex-1 min-h-0">
        {/* Left: Notebook cells + types */}
        <div className="col-span-2 flex flex-col gap-2 overflow-y-auto">
          <NotebookCell
            index={4}
            delay={0.25}
            code={`# Taux de manquants par variable
missing = df.isnull().mean().sort_values(ascending=False)
missing[missing > 0]`}
          />

          <NotebookCell
            index={5}
            delay={0.4}
            code={`# Test MAR : nb_sdb dépend-il du prix ?
from scipy.stats import kruskal

mask = df['nb_sdb'].isna()
prix_missing = df.loc[mask, 'prix']
prix_present = df.loc[~mask, 'prix']

stat, p = kruskal(prix_missing, prix_present)
print(f"stat={stat:.2f}, p={p:.2e}")
print("→ MAR confirmé" if p < 0.05 else "→ MCAR")`}
          />

          <NotebookCell
            index={6}
            delay={0.55}
            code={`# Imputation selon le type
from sklearn.impute import KNNImputer

# MAR → KNN (utilise les voisins)
imputer = KNNImputer(n_neighbors=5)
df[['nb_sdb','étage']] = imputer.fit_transform(
    df[['nb_sdb','étage','surface','nb_chambres']]
)[:, :2]
# MCAR → médiane/mode
df['nb_chambres'].fillna(df['nb_chambres'].median(), inplace=True)
df['parking'].fillna(0, inplace=True)`}
          />

          <div className="flex flex-col gap-1.5 mt-1">
            {strategies.map((s, i) => (
              <motion.div
                key={s.type}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${s.bg} text-xs`}
              >
                <span className={`font-bold w-10 shrink-0 ${s.color}`}>{s.type}</span>
                <span className="text-slate-400">{s.desc}</span>
              </motion.div>
            ))}
          </div>
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
            style={{ height: '42%' }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={missingPct} margin={{ top: 5, right: 10, bottom: 25, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  angle={-25}
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
                  radius={[4, 4, 0, 0]}
                  isAnimationActive
                  animationDuration={800}
                  animationEasing="ease-out"
                  label={{ position: 'top', fill: '#94a3b8', fontSize: 10, formatter: (v: number) => `${v}%` }}
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Boxplot image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex-1 rounded-xl bg-slate-800/40 border border-slate-700 flex items-center justify-center overflow-hidden"
          >
            {/* IMAGE: 06_boxplot_prix_sdb.png — 700×300 — boxplot prix selon nb_sdb présent vs absent */}
            <img
              src="/images/06_boxplot_prix_sdb.png"
              alt="Boxplot prix selon nb_sdb"
              className="w-full h-full object-contain rounded-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
                const parent = (e.target as HTMLImageElement).parentElement
                if (parent) parent.innerHTML = '<p class="text-slate-500 text-sm text-center px-4">📦 Boxplot prix selon nb_sdb présent / absent<br/><span class="text-xs font-mono text-slate-600">→ public/images/06_boxplot_prix_sdb.png</span></p>'
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
