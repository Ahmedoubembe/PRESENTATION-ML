'use client'

import { motion } from 'framer-motion'

const pipeline = [
  { n: '1153', label: 'annonces', icon: '🕷️' },
  { n: '45', label: 'features', icon: '⚙️' },
  { n: 'XGBoost', label: 'modèle', icon: '🤖' },
  { n: '0.541', label: 'RMSLE', icon: '📊' },
  { n: '🏆', label: '1er Kaggle', icon: '' },
]

const limits = [
  { icon: '📊', text: 'Petit dataset (1153 annonces) — généralisation limitée hors Nouakchott' },
  { icon: '📍', text: 'Coordonnées au niveau quartier — manque de précision géographique' },
  { icon: '🗺️', text: 'OSM incomplet pour Nouakchott — données POI partielles' },
  { icon: '🕰️', text: 'Données statiques — pas de mise à jour en temps réel du marché' },
]

const perspectives = [
  { icon: '📈', text: 'Plus de données (scraping continu, autres sources)' },
  { icon: '🗺️', text: 'Géocodage précis (adresses) via Google Maps API' },
  { icon: '🧠', text: 'Deep learning sur le texte arabe (AraBERT)' },
  { icon: '🔄', text: 'Mise à jour automatique du modèle (MLOps)' },
]

export default function Slide18() {
  return (
    <div className="w-full h-full flex flex-col p-10 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600 text-slate-300 text-sm font-medium">
          🎓 Conclusion
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold"
        >
          🏆 1er sur Kaggle — RMSLE 0.541
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Bilan &amp; Perspectives
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-slate-400/30 via-slate-600 to-transparent mb-4 origin-left"
      />

      {/* Summary pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex items-center justify-center gap-2 mb-5 flex-wrap"
      >
        {pipeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-center">
              {item.icon && <p className="text-lg">{item.icon}</p>}
              <p className="text-slate-100 font-bold font-mono">{item.n}</p>
              <p className="text-slate-500 text-xs">{item.label}</p>
            </div>
            {i < pipeline.length - 1 && (
              <span className="text-slate-600 text-xl">→</span>
            )}
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Limits */}
        <div className="flex flex-col gap-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 text-xs font-medium uppercase tracking-widest"
          >
            Limites actuelles
          </motion.p>
          <div className="flex flex-col gap-2">
            {limits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10"
              >
                <span className="text-lg shrink-0">{item.icon}</span>
                <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Perspectives */}
        <div className="flex flex-col gap-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 text-xs font-medium uppercase tracking-widest"
          >
            Perspectives
          </motion.p>
          <div className="flex flex-col gap-2">
            {perspectives.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/10"
              >
                <span className="text-lg shrink-0">{item.icon}</span>
                <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Thank you */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-auto p-5 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/10 border border-blue-500/20 text-center"
          >
            <p className="text-3xl mb-2">🙏</p>
            <p className="text-2xl font-bold text-slate-100 mb-1">Merci !</p>
            <p className="text-slate-400 text-sm">Questions ?</p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-slate-600 text-xs">Master 1 ML — SupNum 2026</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
