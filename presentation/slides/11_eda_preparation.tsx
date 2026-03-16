'use client'

import { motion } from 'framer-motion'

const featureCategories = [
  {
    label: 'Numériques (12)',
    color: 'bg-blue-500',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    features: ['surface', 'nb_chambres', 'nb_sdb', 'nb_salons', 'dist_centre', 'dist_aéroport', 'dist_plage', 'dist_marché', 'dist_port', 'n_écoles', 'n_mosquées', 'n_commerces'],
  },
  {
    label: 'NLP arabe (8)',
    color: 'bg-green-500',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    features: ['type_villa', 'type_dar', 'type_appt', 'a_jardin', 'a_terrasse', 'a_parking', 'mention_prix', 'n_mots'],
  },
  {
    label: 'Target Encoding (8)',
    color: 'bg-orange-500',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    features: ['quartier_enc', 'type_enc', 'quartier×type', 'q×surface_grp', 'q×chambres_grp', 'q×surface_med', 'type×surface', 'q×sdb'],
  },
  {
    label: 'Interactions (17)',
    color: 'bg-purple-500',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    features: ['surface²', 'surface×chambres', 'surface×sdb', 'prix_m²_est', 'dist_centre²', 'n_poi_total', 'surface×dist', '...'],
  },
]

export default function Slide11() {
  return (
    <div className="w-full h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-4">
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
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Préparation des features
        <span className="text-slate-500 text-2xl font-normal ml-3">12 → 45 features</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-purple-500/50 via-slate-600 to-transparent mb-4 origin-left"
      />

      <div className="grid grid-cols-5 gap-5 flex-1 min-h-0">
        {/* Left: Feature categories */}
        <div className="col-span-3 grid grid-cols-2 gap-3">
          {featureCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className={`p-4 rounded-xl ${cat.bg} border ${cat.border} flex flex-col gap-2`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                <span className={`font-semibold text-sm ${cat.text}`}>{cat.label}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {cat.features.map(f => (
                  <span key={f} className="px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400 text-[10px] font-mono">
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: KFold target encoding schema */}
        <div className="col-span-2 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50"
          >
            <p className="text-slate-300 font-semibold mb-1">KFold Target Encoding</p>
            <p className="text-slate-400 text-xs mb-3">Anti-leakage : chaque fold encode avec les autres folds</p>

            {/* Visual schema */}
            <div className="flex flex-col gap-2">
              {/* Data splits */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(k => (
                  <motion.div
                    key={k}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + k * 0.08, duration: 0.3 }}
                    className={`flex-1 h-8 rounded flex items-center justify-center text-xs font-mono ${
                      k === 3
                        ? 'bg-orange-500/30 border border-orange-500/50 text-orange-400'
                        : 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                    }`}
                  >
                    {k === 3 ? '🎯' : `F${k}`}
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-1 text-[10px] text-center text-slate-500">
                <span className="flex-1">Train</span>
                <span className="flex-1">Train</span>
                <span className="flex-1 text-orange-500">Test</span>
                <span className="flex-1">Train</span>
                <span className="flex-1">Train</span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-2 p-2.5 rounded-lg bg-green-500/10 border border-green-500/20"
              >
                <p className="text-green-400 text-xs font-semibold">✅ Résultat</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Chaque ligne encodée avec la moyenne du prix de son quartier,{' '}
                  <span className="text-slate-300">sans voir sa propre valeur</span> → pas de leakage
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/30"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-500 font-mono">12</p>
                <p className="text-slate-500 text-xs">features brutes</p>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8 }}
                className="flex-1 h-0.5 bg-gradient-to-r from-slate-600 to-blue-500 origin-left"
              />
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-400 font-mono">45</p>
                <p className="text-slate-400 text-xs">features finales</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs text-slate-500">
              <span>+ 8 NLP arabes</span>
              <span>+ 8 target encoded</span>
              <span>+ 17 interactions</span>
              <span>+ 5 distances geo</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
