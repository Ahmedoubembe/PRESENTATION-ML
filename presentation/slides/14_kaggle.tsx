'use client'

import { motion } from 'framer-motion'

const submissions = [
  { label: 'Ensemble 3 modèles', score: 0.549, date: 'Semaine 3', highlight: false },
  { label: 'XGBoost seul', score: 0.547, date: 'Semaine 4', highlight: false },
  { label: 'Depth 5 + features', score: 0.544, date: 'Semaine 4', highlight: false },
  { label: 'Régularisation fine', score: 0.541, date: 'Final', highlight: true },
]

const params = [
  { label: 'n_estimators', value: '400', color: 'text-blue-400' },
  { label: 'max_depth', value: '5', color: 'text-green-400' },
  { label: 'learning_rate', value: '0.05', color: 'text-orange-400' },
  { label: 'subsample', value: '0.8', color: 'text-purple-400' },
  { label: 'colsample_bytree', value: '0.8', color: 'text-cyan-400' },
  { label: 'reg_alpha', value: '0.1', color: 'text-pink-400' },
  { label: 'reg_lambda', value: '2.0', color: 'text-amber-400' },
]

export default function Slide14() {
  return (
    <div className="w-full h-full flex flex-col p-10 pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-5 self-start"
      >
        🏆 Phase 4 — L&apos;Histoire Kaggle
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Progression vers la{' '}
        <span className="text-amber-400">1ère place</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-amber-500/50 via-slate-600 to-transparent mb-5 origin-left"
      />

      <div className="grid grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Left: Submission progression */}
        <div className="flex flex-col gap-4">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
            Progression des soumissions Kaggle
          </p>

          {/* Score progression chart */}
          <div className="relative flex flex-col gap-3 flex-1">
            {submissions.map((sub, i) => {
              const maxScore = 0.560
              const minScore = 0.535
              const pct = ((maxScore - sub.score) / (maxScore - minScore)) * 100

              return (
                <motion.div
                  key={sub.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className={`relative flex items-center gap-4 p-3.5 rounded-xl border transition-all ${
                    sub.highlight
                      ? 'bg-amber-500/15 border-amber-500/40'
                      : 'bg-slate-800/40 border-slate-700/40'
                  }`}
                >
                  {/* Step number */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    sub.highlight ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {sub.highlight ? '🏆' : i + 1}
                  </div>

                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${sub.highlight ? 'text-amber-300' : 'text-slate-300'}`}>
                        {sub.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-base ${sub.highlight ? 'text-amber-400' : 'text-slate-300'}`}>
                          {sub.score}
                        </span>
                        {i > 0 && (
                          <span className="text-green-400 text-xs font-mono">
                            -{((submissions[i - 1].score - sub.score) * 1000).toFixed(0)}‰
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5 + i * 0.12, duration: 0.7 }}
                        className={`h-full rounded-full ${
                          sub.highlight
                            ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                        }`}
                      />
                    </div>
                  </div>
                  <span className="text-slate-600 text-xs shrink-0">{sub.date}</span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right: Best params + lesson */}
        <div className="flex flex-col gap-4">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
            Hyperparamètres du modèle final
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50"
          >
            <div className="grid grid-cols-2 gap-2">
              {params.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 + i * 0.07 }}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-slate-900/60"
                >
                  <span className="text-slate-400 text-xs font-mono">{p.label}</span>
                  <span className={`font-mono font-bold text-sm ${p.color}`}>{p.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex flex-col gap-3"
          >
            <p className="text-green-400 font-semibold flex items-center gap-2">
              💡 La leçon principale
            </p>
            <blockquote className="text-slate-300 text-sm leading-relaxed border-l-2 border-green-500 pl-3">
              Sur un petit dataset (1153 lignes), la{' '}
              <span className="text-green-400 font-semibold">simplicité + régularisation</span>
              {' '}l&apos;emporte sur la complexité de l&apos;ensemble. XGBoost seul, bien tuné, bat un ensemble de 3 modèles.
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center gap-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15"
          >
            <div className="text-center">
              <p className="text-3xl">🏆</p>
              <p className="text-amber-400 font-bold">1ère place</p>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div className="text-center">
              <p className="text-3xl font-mono font-bold text-amber-400">0.541</p>
              <p className="text-slate-400 text-sm">RMSLE final</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
