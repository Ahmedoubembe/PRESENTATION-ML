'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import NotebookCell from '@/components/NotebookCell'

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
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4 self-start"
      >
        🤖 Phase 4 — Modélisation
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-slate-100 mb-2"
      >
        Comparaison des <span className="text-cyan-400">6 modèles</span>
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
            index={18}
            delay={0.25}
            code={`from sklearn.model_selection import cross_val_score
from sklearn.linear_model import Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
import xgboost as xgb

models = {
    'Linear': Ridge(alpha=1.0),
    'Lasso':  Lasso(alpha=0.01),
    'RF':     RandomForestRegressor(n_estimators=200),
    'GBM':    GradientBoostingRegressor(n_estimators=200),
    'XGB':    xgb.XGBRegressor(**best_params),
}

results = {}
for name, model in models.items():
    scores = cross_val_score(
        model, X_train, y_train,
        cv=5, scoring='neg_mean_squared_error'
    )
    rmsle = np.sqrt(-scores.mean())
    results[name] = rmsle
    print(f"{name:12s}: RMSLE={rmsle:.4f}")`}
            output={{
              type: 'table',
              caption: 'Cross-validation 5-fold sur train',
              headers: ['Modèle', 'RMSLE', 'R²'],
              rows: [
                { cells: ['Linear/Ridge', 0.782, 0.51] },
                { cells: ['Lasso', 0.765, 0.53] },
                { cells: ['Random Forest', 0.634, 0.67] },
                { cells: ['GBM', 0.598, 0.72] },
                { cells: ['XGBoost ✅', 0.541, 0.78], highlight: true },
              ],
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-3 rounded-xl bg-green-500/10 border border-green-500/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-semibold text-sm">🏆 XGBoost — gagnant</span>
              <span className="font-mono text-green-400 font-bold">RMSLE: 0.541</span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              RMSLE : <span className="text-red-400">0.847</span> → <span className="text-green-400">0.541</span>
              &nbsp;·&nbsp; R² : <span className="text-red-400">0.42</span> → <span className="text-green-400">0.78</span>
            </p>
          </motion.div>
        </div>

        {/* Right: Charts */}
        <div className="col-span-3 flex flex-col gap-3 min-h-0">
          <div className="flex flex-col gap-1.5" style={{ height: '52%' }}>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">RMSLE ↓ (plus bas = meilleur)</p>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={models} layout="vertical" margin={{ top: 5, right: 55, bottom: 5, left: 85 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" domain={[0, 1.0]} tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={{ stroke: '#334155' }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} axisLine={false} width={85} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} formatter={(v: number) => [v.toFixed(3), 'RMSLE']} />
                  <Bar dataKey="rmsle" radius={[0, 4, 4, 0]} animationDuration={900} label={{ position: 'right', fill: '#94a3b8', fontSize: 11, formatter: (v: number) => v.toFixed(3) }}>
                    {models.map((entry, i) => (<Cell key={`rmsle-${i}`} fill={entry.color} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col gap-1.5" style={{ height: '42%' }}>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">R² ↑ (plus haut = meilleur)</p>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={models} layout="vertical" margin={{ top: 5, right: 45, bottom: 5, left: 85 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" domain={[0, 1.0]} tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={{ stroke: '#334155' }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} axisLine={false} width={85} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} formatter={(v: number) => [v.toFixed(2), 'R²']} />
                  <Bar dataKey="r2" radius={[0, 4, 4, 0]} animationDuration={900} animationBegin={150} label={{ position: 'right', fill: '#94a3b8', fontSize: 11, formatter: (v: number) => v.toFixed(2) }}>
                    {models.map((entry, i) => (<Cell key={`r2-${i}`} fill={entry.color} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
