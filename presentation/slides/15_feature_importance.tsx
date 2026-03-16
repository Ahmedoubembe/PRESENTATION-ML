'use client'

import { motion } from 'framer-motion'

const features = [
  { name: 'quartier_enc', importance: 0.182, category: 'Target Encoding', color: '#f59e0b' },
  { name: 'surface', importance: 0.164, category: 'Numérique', color: '#3b82f6' },
  { name: 'a_prix_titre', importance: 0.098, category: 'NLP', color: '#10b981' },
  { name: 'type_villa', importance: 0.085, category: 'NLP', color: '#10b981' },
  { name: 'dist_centre', importance: 0.074, category: 'Géo', color: '#8b5cf6' },
  { name: 'nb_chambres', importance: 0.067, category: 'Numérique', color: '#3b82f6' },
  { name: 'surface²', importance: 0.058, category: 'Interaction', color: '#ec4899' },
  { name: 'nb_sdb', importance: 0.051, category: 'Numérique', color: '#3b82f6' },
  { name: 'q_enc × surface', importance: 0.044, category: 'Interaction', color: '#ec4899' },
  { name: 'n_mosquées', importance: 0.038, category: 'POI', color: '#06b6d4' },
  { name: 'dist_plage', importance: 0.033, category: 'Géo', color: '#8b5cf6' },
  { name: 'type_dar', importance: 0.028, category: 'NLP', color: '#10b981' },
]

const categories = [
  { name: 'Target Encoding', color: '#f59e0b' },
  { name: 'Numérique', color: '#3b82f6' },
  { name: 'NLP', color: '#10b981' },
  { name: 'Géo', color: '#8b5cf6' },
  { name: 'Interaction', color: '#ec4899' },
  { name: 'POI', color: '#06b6d4' },
]

export default function Slide15() {
  const maxImportance = features[0].importance

  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4 self-start"
      >
        🔍 Phase 4 — Feature Importance
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Top features —{' '}
        <span className="text-cyan-400">XGBoost gain</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-cyan-500/50 via-slate-600 to-transparent mb-4 origin-left"
      />

      <div className="grid grid-cols-5 gap-5 flex-1 min-h-0">
        {/* Left: Bars */}
        <div className="col-span-3 flex flex-col gap-2.5 justify-center">
          {features.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="flex items-center gap-3"
            >
              <span className="text-slate-400 text-xs font-mono w-32 text-right shrink-0">{f.name}</span>
              <div className="flex-1 h-6 bg-slate-800/60 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(f.importance / maxImportance) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: 'easeOut' }}
                  className="h-full rounded-full flex items-center justify-end pr-2"
                  style={{ backgroundColor: f.color }}
                >
                  <span className="text-[10px] text-white font-bold">{(f.importance * 100).toFixed(1)}%</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Insights */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/30"
          >
            <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Catégories</p>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <div key={cat.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-slate-400 text-xs">{cat.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Key insights */}
          <div className="flex flex-col gap-3">
            {[
              {
                icon: '🏘️',
                title: 'Quartier domine',
                desc: 'quartier_enc (18.2%) — le target encoding capture la dynamique locale des prix',
                color: 'border-amber-500/30 bg-amber-500/5',
                textColor: 'text-amber-400',
              },
              {
                icon: '📐',
                title: 'Surface = 2ème',
                desc: 'surface (16.4%) + surface² (+5.8%) — la taille est un signal fort',
                color: 'border-blue-500/30 bg-blue-500/5',
                textColor: 'text-blue-400',
              },
              {
                icon: '🗣️',
                title: 'NLP arabe impacte',
                desc: 'a_prix_titre (9.8%) + type_villa (8.5%) — le texte arabe apporte de l\'information unique',
                color: 'border-green-500/30 bg-green-500/5',
                textColor: 'text-green-400',
              },
              {
                icon: '📍',
                title: 'Localisation',
                desc: 'dist_centre (7.4%) — la distance au centre est le 5ème prédicteur',
                color: 'border-purple-500/30 bg-purple-500/5',
                textColor: 'text-purple-400',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`p-3 rounded-xl border ${item.color}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{item.icon}</span>
                  <span className={`font-semibold text-sm ${item.textColor}`}>{item.title}</span>
                </div>
                <p className="text-slate-400 text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
