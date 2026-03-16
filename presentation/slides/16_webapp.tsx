'use client'

import { motion } from 'framer-motion'

export default function Slide16() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-5 self-start"
      >
        🌐 Phase 5 — Application Web
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        De la prédiction à{' '}
        <span className="text-pink-400">l&apos;application</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-pink-500/50 via-slate-600 to-transparent mb-5 origin-left"
      />

      <div className="grid grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Left: Architecture */}
        <div className="flex flex-col gap-4">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Architecture</p>

          {/* Architecture diagram */}
          <div className="flex flex-col gap-2">
            {/* User */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20"
            >
              <span className="text-2xl">👤</span>
              <div>
                <p className="text-blue-300 font-semibold text-sm">Utilisateur</p>
                <p className="text-slate-400 text-xs">Choisit quartier, surface, nb chambres...</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4 }}
              className="w-0.5 h-6 bg-slate-600 mx-auto"
            />

            {/* Frontend */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20"
            >
              <span className="text-2xl">⚛️</span>
              <div className="flex-1">
                <p className="text-indigo-300 font-semibold text-sm">Next.js Frontend</p>
                <p className="text-slate-400 text-xs">UI React, formulaire interactif, affichage résultat</p>
              </div>
              <span className="text-indigo-500 text-xs font-mono">:3000</span>
            </motion.div>

            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.55 }}
              className="w-0.5 h-6 bg-slate-600 mx-auto"
            />

            {/* API */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20"
            >
              <span className="text-2xl">🐍</span>
              <div className="flex-1">
                <p className="text-green-300 font-semibold text-sm">Flask REST API</p>
                <p className="text-slate-400 text-xs">POST /predict → JSON {`{ price, low, high }`}</p>
              </div>
              <span className="text-green-500 text-xs font-mono">:5000</span>
            </motion.div>

            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.7 }}
              className="w-0.5 h-6 bg-slate-600 mx-auto"
            />

            {/* Model */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
            >
              <span className="text-2xl">🤖</span>
              <div className="flex-1">
                <p className="text-amber-300 font-semibold text-sm">XGBoost Model</p>
                <p className="text-slate-400 text-xs">housing_model.pkl — RMSLE 0.541</p>
              </div>
              <span className="text-amber-500 text-xs font-mono">.pkl</span>
            </motion.div>
          </div>
        </div>

        {/* Right: App mockup / screenshot */}
        <div className="flex flex-col gap-4">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Interface utilisateur</p>

          {/* App mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex flex-col"
          >
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 border-b border-slate-700">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 text-center text-slate-500 text-xs font-mono">immobilier-nouakchott.app</div>
            </div>

            {/* App content */}
            <div className="flex-1 p-4 flex flex-col gap-3">
              <p className="text-slate-300 font-semibold text-sm">🏠 Estimez votre bien immobilier</p>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Quartier', value: 'Tevragh Zeina', type: 'select' },
                  { label: 'Surface (m²)', value: '180', type: 'number' },
                  { label: 'Chambres', value: '4', type: 'number' },
                  { label: 'Salles de bain', value: '2', type: 'number' },
                ].map((field) => (
                  <div key={field.label} className="flex flex-col gap-1">
                    <label className="text-slate-500 text-xs">{field.label}</label>
                    <div className="px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-mono flex items-center justify-between">
                      <span>{field.value}</span>
                      {field.type === 'select' && <span className="text-slate-600">▾</span>}
                    </div>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-auto p-3 rounded-xl bg-green-500/10 border border-green-500/30"
              >
                <p className="text-slate-400 text-xs mb-1">Estimation du prix</p>
                <p className="text-2xl font-bold text-green-400 font-mono">7 200 000 <span className="text-sm font-normal text-slate-400">MRO</span></p>
                <div className="flex gap-2 mt-1">
                  <span className="text-slate-500 text-xs">Fourchette :</span>
                  <span className="text-green-600 text-xs font-mono">6.1M – 8.4M MRO</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* IMAGE: 16_app_screenshot.png — 700×450 — capture d'écran de l'application web */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-slate-600 text-xs text-center font-mono"
          >
            → Remplacer par: public/images/16_app_screenshot.png
          </motion.p>
        </div>
      </div>
    </div>
  )
}
