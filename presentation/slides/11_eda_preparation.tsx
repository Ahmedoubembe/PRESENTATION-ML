'use client'

import { motion } from 'framer-motion'
import NotebookCell from '@/components/NotebookCell'

const featureCategories = [
  {
    label: 'Numériques (12)', color: 'bg-blue-500', border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400',
    features: ['surface', 'nb_chambres', 'nb_sdb', 'nb_salons', 'dist_centre', 'dist_aéroport', 'dist_plage', 'dist_marché', 'dist_port', 'n_écoles', 'n_mosquées', 'n_commerces'],
  },
  {
    label: 'NLP arabe (8)', color: 'bg-green-500', border: 'border-green-500/30', bg: 'bg-green-500/10', text: 'text-green-400',
    features: ['type_villa', 'type_dar', 'type_appt', 'a_jardin', 'a_terrasse', 'a_parking', 'mention_prix', 'n_mots'],
  },
  {
    label: 'Target Encoding (8)', color: 'bg-orange-500', border: 'border-orange-500/30', bg: 'bg-orange-500/10', text: 'text-orange-400',
    features: ['quartier_enc', 'type_enc', 'quartier×type', 'q×surface_grp', 'q×chambres_grp', 'q×surface_med', 'type×surface', 'q×sdb'],
  },
  {
    label: 'Interactions (17)', color: 'bg-purple-500', border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-400',
    features: ['surface²', 'surface×chambres', 'surface×sdb', 'prix_m²_est', 'dist_centre²', 'n_poi_total', 'surface×dist', '...'],
  },
]

export default function Slide11() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium"
        >
          📊 EDA — Étape 8
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-slate-100 mb-2"
      >
        Préparation des features
        <span className="text-slate-500 text-xl font-normal ml-3">12 → 45 features</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-purple-500/50 via-slate-600 to-transparent mb-3 origin-left"
      />

      <div className="grid grid-cols-5 gap-4 flex-1 min-h-0">
        {/* Left: Feature categories */}
        <div className="col-span-2 grid grid-cols-1 gap-2 content-start">
          {featureCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className={`p-3 rounded-xl ${cat.bg} border ${cat.border}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                <span className={`font-semibold text-xs ${cat.text}`}>{cat.label}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {cat.features.map(f => (
                  <span key={f} className="px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400 text-[9px] font-mono">{f}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Code cells for KFold + interactions */}
        <div className="col-span-3 flex flex-col gap-2 overflow-y-auto">
          <NotebookCell
            index={15}
            delay={0.3}
            code={`# KFold Target Encoding (anti-leakage)
from sklearn.model_selection import KFold

kf = KFold(n_splits=5, shuffle=True, random_state=42)
df['quartier_enc'] = np.nan

for train_idx, val_idx in kf.split(df):
    means = df.iloc[train_idx].groupby('quartier')['log_prix'].mean()
    df.iloc[val_idx, df.columns.get_loc('quartier_enc')] = (
        df.iloc[val_idx]['quartier'].map(means)
    )
# Remplir les NaN par la moyenne globale (nouveaux quartiers)
global_mean = df['log_prix'].mean()
df['quartier_enc'].fillna(global_mean, inplace=True)`}
            output={{
              type: 'text',
              lines: [
                { text: 'quartier_enc stats:' },
                { text: '  Tevragh_Zeina: 15.84 (±0.12)', color: 'text-amber-400' },
                { text: '  Ksar:          14.93 (±0.18)', color: 'text-blue-400' },
                { text: '  El_Mina:       14.11 (±0.21)', color: 'text-slate-400' },
                { text: 'NaN restants: 0 ✅', color: 'text-green-400' },
              ],
            }}
          />

          <NotebookCell
            index={16}
            delay={0.45}
            code={`# Features d'interaction
df['surface_sq']          = df['surface'] ** 2
df['surface_x_chambres']  = df['surface'] * df['nb_chambres']
df['prix_m2_est']         = df['quartier_enc'] / df['surface']
df['n_poi_total']         = (
    df['n_ecoles'] + df['n_mosquees'] + df['n_commerces']
)
df['surface_x_dist']      = df['surface'] * df['dist_centre']

print(f"Nb features final: {len(feature_cols)}")`}
            output={{
              type: 'text',
              lines: [
                { text: 'Nb features final: 45', color: 'text-green-400' },
              ],
            }}
          />

          <NotebookCell
            index={17}
            delay={0.6}
            code={`# Résumé du pipeline de features
print(pd.DataFrame({
    'Catégorie': ['Numériques', 'NLP arabe', 'Target Enc.', 'Interactions'],
    'Count':     [12, 8, 8, 17],
    'Exemple':   ['surface','type_villa','quartier_enc','surface²']
}).to_string(index=False))`}
            output={{
              type: 'table',
              headers: ['Catégorie', 'Count', 'Exemple clé'],
              rows: [
                { cells: ['Numériques', 12, 'surface, dist_centre'] },
                { cells: ['NLP arabe', 8, 'type_villa, mention_prix'] },
                { cells: ['Target Enc.', 8, 'quartier_enc ⭐'] },
                { cells: ['Interactions', 17, 'surface², surface×chambres'] },
              ],
            }}
          />
        </div>
      </div>
    </div>
  )
}
