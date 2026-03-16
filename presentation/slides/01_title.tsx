'use client'

import { motion } from 'framer-motion'

export default function Slide01() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Top badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold"
      >
        🏆 1er sur Kaggle — RMSLE 0.541
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-slate-100 mb-4 leading-tight max-w-4xl"
      >
        Prédiction des Prix Immobiliers{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
          en Mauritanie
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-slate-400 text-center max-w-3xl mb-12 leading-relaxed"
      >
        De zéro à une application web :{' '}
        <span className="text-slate-300">scraping</span>,{' '}
        <span className="text-slate-300">géo-enrichissement</span>,{' '}
        <span className="text-slate-300">ML</span> &amp;{' '}
        <span className="text-slate-300">déploiement</span>
      </motion.p>

      {/* Pipeline pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex items-center gap-2 mb-12 flex-wrap justify-center"
      >
        {['Scraping', 'Géo-enrichissement', 'EDA', 'Machine Learning', 'Application Web'].map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium">
              {step}
            </span>
            {i < 4 && <span className="text-slate-600 text-lg">→</span>}
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="w-64 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8"
      />

      {/* Team & school */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">A</span>
          <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">O</span>
          <span className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 font-bold text-sm">B</span>
        </div>
        <p className="text-slate-400 text-sm">
          Équipe &mdash; Master 1 Machine Learning &mdash;{' '}
          <span className="text-blue-400 font-semibold">SupNum Mauritanie 2026</span>
        </p>
      </motion.div>
    </div>
  )
}
