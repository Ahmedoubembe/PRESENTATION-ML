'use client'

import { motion } from 'framer-motion'

const pipeline = [
  { icon: '🕷️', label: 'Scraping', color: 'from-blue-500 to-blue-600', border: 'border-blue-500/30' },
  { icon: '📍', label: 'Géo-enrichissement', color: 'from-green-500 to-green-600', border: 'border-green-500/30' },
  { icon: '📊', label: 'EDA', color: 'from-purple-500 to-purple-600', border: 'border-purple-500/30' },
  { icon: '🤖', label: 'Machine Learning', color: 'from-orange-500 to-orange-600', border: 'border-orange-500/30' },
  { icon: '🌐', label: 'Application Web', color: 'from-pink-500 to-pink-600', border: 'border-pink-500/30' },
]

const problems = [
  { icon: '🚫', text: 'Aucune base de données publique des prix immobiliers en Mauritanie' },
  { icon: '🤝', text: 'Prix négociés de gré à gré, sans référence officielle' },
  { icon: '🗣️', text: 'Annonces en arabe hassaniya, peu de données structurées' },
  { icon: '📉', text: 'Opacité du marché → acheteurs mal informés' },
]

export default function Slide02() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-5 self-start"
      >
        🎯 Le Problème
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Un marché immobilier{' '}
        <span className="text-red-400">opaque</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="h-px bg-gradient-to-r from-red-500/50 via-slate-600 to-transparent mb-6 origin-left"
      />

      <div className="grid grid-cols-2 gap-8 flex-1">
        {/* Left: Problems */}
        <div className="flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-2"
          >
            Contexte
          </motion.p>
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
            >
              <span className="text-2xl shrink-0">{p.icon}</span>
              <p className="text-slate-300 leading-relaxed">{p.text}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-2 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"
          >
            <p className="text-blue-300 font-semibold">
              🎯 Notre mission :
            </p>
            <p className="text-slate-300 mt-1">
              Construire un outil de prédiction de bout en bout pour estimer les prix immobiliers à Nouakchott
            </p>
          </motion.div>
        </div>

        {/* Right: Pipeline */}
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-6"
          >
            Notre pipeline end-to-end
          </motion.p>
          <div className="flex flex-col gap-3">
            {pipeline.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.12 }}
                className="flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-xl shrink-0`}>
                  {step.icon}
                </div>
                <div className="flex-1 flex items-center">
                  <div className={`px-4 py-2.5 rounded-xl bg-slate-800 border ${step.border} text-slate-200 font-medium flex-1`}>
                    {i + 1}. {step.label}
                  </div>
                </div>
                {i < pipeline.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.12 }}
                    className="absolute"
                  />
                )}
              </motion.div>
            ))}
            {/* Arrow between steps */}
            <div className="absolute left-[calc(50%+4rem)] flex flex-col gap-[2.1rem] top-[18rem] pointer-events-none">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.12 }}
                  className="text-slate-600 text-lg pl-6"
                >
                  ↓
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
