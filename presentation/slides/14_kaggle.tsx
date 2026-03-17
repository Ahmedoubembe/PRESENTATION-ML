'use client'

import { motion } from 'framer-motion'
import NotebookCell from '@/components/NotebookCell'

const submissions = [
  { label: 'Ensemble 3 modèles', score: 0.549, date: 'Semaine 3', highlight: false },
  { label: 'XGBoost seul', score: 0.547, date: 'Semaine 4', highlight: false },
  { label: 'Depth 5 + features', score: 0.544, date: 'Semaine 4', highlight: false },
  { label: 'Régularisation fine', score: 0.541, date: 'Final', highlight: true },
]

export default function Slide14() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4 self-start"
      >
        🏆 Phase 4 — L&apos;Histoire Kaggle
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-slate-100 mb-2"
      >
        Progression vers la <span className="text-amber-400">1ère place</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-amber-500/50 via-slate-600 to-transparent mb-3 origin-left"
      />

      <div className="grid grid-cols-2 gap-5 flex-1 min-h-0">
        {/* Left: Code XGBoost final */}
        <div className="flex flex-col gap-3">
          <NotebookCell
            index={19}
            delay={0.25}
            code={`# Hyperparamètres finaux — XGBoost
best_params = {
    'n_estimators':     400,
    'max_depth':        5,
    'learning_rate':    0.05,
    'subsample':        0.8,
    'colsample_bytree': 0.8,
    'reg_alpha':        0.1,    # L1
    'reg_lambda':       2.0,    # L2
    'min_child_weight': 3,
    'gamma':            0.1,
    'random_state':     42,
    'objective':        'reg:squarederror',
}

model = xgb.XGBRegressor(**best_params)
model.fit(
    X_train, y_train,           # y = log1p(prix)
    eval_set=[(X_val, y_val)],
    early_stopping_rounds=30,
    verbose=50
)`}
          />

          <NotebookCell
            index={20}
            delay={0.45}
            code={`# Soumission Kaggle
y_pred_log = model.predict(X_test)
y_pred     = np.expm1(y_pred_log)      # inverse log1p

submission = pd.DataFrame({
    'Id':    test_ids,
    'SalePrice': y_pred
})
submission.to_csv('submission.csv', index=False)

# Score local (cross-val)
cv_rmsle = np.sqrt(
    -cross_val_score(model, X_train, y_train,
    cv=5, scoring='neg_mean_squared_error').mean()
)
print(f"CV RMSLE: {cv_rmsle:.4f}")`}
          />
        </div>

        {/* Right: Progression + lesson */}
        <div className="flex flex-col gap-3">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
            Progression des soumissions
          </p>

          {submissions.map((sub, i) => {
            const maxScore = 0.560
            const minScore = 0.535
            const pct = ((maxScore - sub.score) / (maxScore - minScore)) * 100
            return (
              <motion.div
                key={sub.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  sub.highlight ? 'bg-amber-500/15 border-amber-500/40' : 'bg-slate-800/40 border-slate-700/40'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  sub.highlight ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-400'
                }`}>
                  {sub.highlight ? '🏆' : i + 1}
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${sub.highlight ? 'text-amber-300' : 'text-slate-300'}`}>{sub.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-bold ${sub.highlight ? 'text-amber-400' : 'text-slate-300'}`}>{sub.score}</span>
                      {i > 0 && <span className="text-green-400 text-xs font-mono">-{((submissions[i-1].score - sub.score)*1000).toFixed(0)}‰</span>}
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.7 }}
                      className={`h-full rounded-full ${sub.highlight ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                    />
                  </div>
                </div>
                <span className="text-slate-600 text-xs shrink-0">{sub.date}</span>
              </motion.div>
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-auto p-4 rounded-xl bg-green-500/10 border border-green-500/20"
          >
            <p className="text-green-400 font-semibold mb-1">💡 Leçon principale</p>
            <blockquote className="text-slate-300 text-sm leading-relaxed border-l-2 border-green-500 pl-3">
              Sur 1153 lignes, <span className="text-green-400 font-semibold">simplicité + régularisation L1/L2</span> &gt; complexité d&apos;ensemble. Un seul XGBoost bien tuné bat 3 modèles combinés.
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="flex items-center justify-center gap-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15"
          >
            <p className="text-3xl">🏆</p>
            <div className="w-px h-10 bg-slate-700" />
            <div>
              <p className="text-3xl font-mono font-bold text-amber-400">0.541</p>
              <p className="text-slate-400 text-xs">RMSLE — 1ère place Kaggle</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
