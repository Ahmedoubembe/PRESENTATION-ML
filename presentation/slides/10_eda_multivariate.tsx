'use client'

import { motion } from 'framer-motion'
import NotebookCell from '@/components/NotebookCell'

const features = ['prix', 'surface', 'nb_chambres', 'nb_sdb', 'nb_salons', 'dist_centre', 'dist_aero', 'n_ecoles']
const correlations: Record<string, number> = {
  'prix-prix': 1.00, 'prix-surface': 0.62, 'prix-nb_chambres': 0.45, 'prix-nb_sdb': 0.51,
  'prix-nb_salons': 0.38, 'prix-dist_centre': -0.42, 'prix-dist_aero': 0.12, 'prix-n_ecoles': 0.28,
  'surface-surface': 1.00, 'surface-nb_chambres': 0.71, 'surface-nb_sdb': 0.65,
  'surface-nb_salons': 0.58, 'surface-dist_centre': -0.15, 'surface-dist_aero': 0.08, 'surface-n_ecoles': 0.21,
  'nb_chambres-nb_chambres': 1.00, 'nb_chambres-nb_sdb': 0.68, 'nb_chambres-nb_salons': 0.61,
  'nb_chambres-dist_centre': -0.09, 'nb_chambres-dist_aero': 0.05, 'nb_chambres-n_ecoles': 0.18,
  'nb_sdb-nb_sdb': 1.00, 'nb_sdb-nb_salons': 0.54, 'nb_sdb-dist_centre': -0.12,
  'nb_sdb-dist_aero': 0.07, 'nb_sdb-n_ecoles': 0.22,
  'nb_salons-nb_salons': 1.00, 'nb_salons-dist_centre': -0.08, 'nb_salons-dist_aero': 0.04, 'nb_salons-n_ecoles': 0.15,
  'dist_centre-dist_centre': 1.00, 'dist_centre-dist_aero': 0.35, 'dist_centre-n_ecoles': -0.19,
  'dist_aero-dist_aero': 1.00, 'dist_aero-n_ecoles': -0.11,
  'n_ecoles-n_ecoles': 1.00,
}

function getCorr(a: string, b: string) {
  return correlations[`${a}-${b}`] ?? correlations[`${b}-${a}`] ?? 0
}

function corrColor(v: number) {
  if (v >= 0.7) return 'bg-blue-600 text-white'
  if (v >= 0.5) return 'bg-blue-500/80 text-white'
  if (v >= 0.3) return 'bg-blue-400/60 text-slate-200'
  if (v >= 0.1) return 'bg-slate-700 text-slate-300'
  if (v >= -0.1) return 'bg-slate-800 text-slate-400'
  if (v >= -0.3) return 'bg-red-400/40 text-slate-300'
  return 'bg-red-600/60 text-white'
}

const shortName = (f: string) => f.replace('nb_', '').replace('dist_', 'd_').replace('n_ecoles', 'écoles')

export default function Slide10() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium"
        >
          📊 EDA — Étape 7
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-slate-100 mb-2"
      >
        Analyse <span className="text-indigo-400">multivariée</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-indigo-500/50 via-slate-600 to-transparent mb-3 origin-left"
      />

      <div className="grid grid-cols-2 gap-5 flex-1 min-h-0">
        {/* Left: Heatmap + code */}
        <div className="flex flex-col gap-3">
          <NotebookCell
            index={13}
            delay={0.25}
            code={`# VIF — détection multicolinéarité
from statsmodels.stats.outliers_influence import variance_inflation_factor

X_num = df[num_features].dropna()
vif = pd.DataFrame({
    'feature': num_features,
    'VIF': [variance_inflation_factor(X_num.values, i)
            for i in range(X_num.shape[1])]
}).sort_values('VIF', ascending=False)
print(vif.to_string(index=False))`}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-3 rounded-xl bg-green-500/5 border border-green-500/20"
          >
            <p className="text-green-400 text-sm font-semibold">✅ VIF &lt; 5 pour toutes les variables</p>
            <p className="text-slate-400 text-xs mt-0.5">Pas de multicollinéarité problématique → conserver toutes les features</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 text-xs font-medium uppercase tracking-widest"
          >
            Heatmap corrélation (Pearson, log-space)
          </motion.p>

          {/* Heatmap inline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-col gap-0.5"
          >
            <div className="flex gap-0.5">
              <div className="w-14 shrink-0" />
              {features.map(f => (
                <div key={f} className="flex-1 text-center text-slate-500 text-[8px] font-mono flex items-end justify-center pb-1" style={{ height: 36 }}>
                  <span style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>{shortName(f)}</span>
                </div>
              ))}
            </div>
            {features.map((rowF, ri) => (
              <motion.div
                key={rowF}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + ri * 0.04 }}
                className="flex gap-0.5"
              >
                <div className="w-14 shrink-0 text-right pr-1 text-slate-500 text-[8px] font-mono flex items-center justify-end">{shortName(rowF)}</div>
                {features.map((colF) => {
                  const v = getCorr(rowF, colF)
                  return (
                    <div key={colF} className={`flex-1 aspect-square rounded-sm flex items-center justify-center text-[7px] font-bold ${corrColor(v)}`}>
                      {v.toFixed(2).replace('0.', '.').replace('-0.', '-.')}
                    </div>
                  )
                })}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: PCA code + image */}
        <div className="flex flex-col gap-3">
          <NotebookCell
            index={14}
            delay={0.35}
            code={`# PCA pour visualisation
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_num)

pca = PCA(n_components=2)
components = pca.fit_transform(X_scaled)

print("Variance expliquée:")
for i, v in enumerate(pca.explained_variance_ratio_):
    print(f"  PC{i+1}: {v*100:.1f}%")`}
          />

          <div className="flex-1 rounded-xl bg-slate-800/40 border border-slate-700 flex items-center justify-center overflow-hidden">
            {/* IMAGE: 10_pca_colored.png — 700×340 */}
            <img
              src="/images/10_pca_colored.png"
              alt="PCA features"
              className="w-full h-full object-contain rounded-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
                const p = (e.target as HTMLImageElement).parentElement
                if (p) p.innerHTML = '<p class="text-slate-500 text-sm text-center px-6">🔵 PCA colorée par prix<br/><span class="text-xs font-mono text-slate-600">→ public/images/10_pca_colored.png</span></p>'
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: '🎯', stat: 'VIF < 5', desc: 'Pas de multicolinéarité' },
              { icon: '🔵', stat: 'PC1 48%', desc: 'Surface + pièces' },
              { icon: '🔴', stat: 'PC2 21%', desc: 'Localisation' },
            ].map((item, i) => (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-center"
              >
                <p className="text-lg">{item.icon}</p>
                <p className="text-indigo-400 font-bold text-xs font-mono">{item.stat}</p>
                <p className="text-slate-500 text-[10px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
