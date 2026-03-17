'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Slide17() {
  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-green-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-col items-center gap-8 z-10 max-w-2xl w-full px-8"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="text-7xl"
        >
          🚀
        </motion.div>

        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-slate-100 mb-3"
          >
            Démo en direct
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-xl text-slate-400"
          >
            Application de prédiction immobilière — Nouakchott
          </motion.p>
        </div>

        {/* Navigation buttons */}
        <div className="w-full grid grid-cols-2 gap-4">
          <Link href="/predict" className="w-full block">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full p-4 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all cursor-pointer flex flex-col items-center gap-3 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-3xl group-hover:scale-110 transition-transform">
                🔮
              </div>
              <div className="text-center">
                <h3 className="text-slate-200 font-semibold text-lg mb-1">Prédiction</h3>
                <p className="text-slate-400 text-xs">Estimer le prix d&apos;un bien</p>
              </div>
            </motion.div>
          </Link>

          <Link href="/analyse" className="w-full block">
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
              className="w-full p-4 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all cursor-pointer flex flex-col items-center gap-3 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 text-3xl group-hover:scale-110 transition-transform">
                📊
              </div>
              <div className="text-center">
                <h3 className="text-slate-200 font-semibold text-lg mb-1">Analyse</h3>
                <p className="text-slate-400 text-xs">Explorer les données du marché</p>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Demo steps */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full grid grid-cols-3 gap-3"
        >
          {[
            { step: '1', icon: '📋', text: 'Entrer les caractéristiques du bien' },
            { step: '2', icon: '⚡', text: 'Prédiction instantanée par XGBoost' },
            { step: '3', icon: '💰', text: 'Prix estimé avec fourchette ±15%' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-center"
            >
              <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                {item.step}
              </div>
              <span className="text-2xl">{item.icon}</span>
              <p className="text-slate-400 text-xs leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-slate-600 text-sm italic"
        >
          Remplacer l&apos;URL ci-dessus par le lien de déploiement (Vercel / Railway / serveur)
        </motion.p>
      </motion.div>
    </div>
  )
}
