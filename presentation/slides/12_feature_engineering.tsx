'use client'

import { motion } from 'framer-motion'
import CodeBlock from '@/components/CodeBlock'

export default function Slide12() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-5 self-start"
      >
        ⚙️ Phase 4 — Feature Engineering highlights
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        3 innovations clés
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-orange-500/50 via-slate-600 to-transparent mb-5 origin-left"
      />

      <div className="grid grid-cols-3 gap-5 flex-1 min-h-0">
        {/* 1: NLP arabe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col gap-4"
        >
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🗣️</span>
              <span className="text-green-400 font-semibold">NLP Arabe Hassaniya</span>
            </div>
            <p className="text-slate-400 text-sm">
              Extraction du type de bien depuis le titre en arabe
            </p>

            <div className="flex flex-col gap-2">
              {[
                { arabic: 'فيلا', latin: 'villa', price: '9.4 M', color: 'text-amber-400' },
                { arabic: 'شقة', latin: 'appartement', price: '3.1 M', color: 'text-blue-400' },
                { arabic: 'دار', latin: 'dar (maison)', price: '2.5 M', color: 'text-green-400' },
              ].map((item, i) => (
                <motion.div
                  key={item.arabic}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg arabic" dir="rtl">{item.arabic}</span>
                    <span className="text-slate-500 text-xs">{item.latin}</span>
                  </div>
                  <span className={`font-bold font-mono text-sm ${item.color}`}>{item.price}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/30"
          >
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-2">Extraction regex</p>
            <code className="text-green-400 text-xs font-mono">
              re.search(r&apos;فيلا|villa&apos;, titre)
            </code>
          </motion.div>
        </motion.div>

        {/* 2: Mention du prix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span className="text-blue-400 font-semibold">Signal prix en arabe</span>
            </div>
            <p className="text-slate-400 text-sm">
              50% des annonces mentionnent le prix dans le titre en arabe
            </p>

            {/* Pie-like visual */}
            <div className="flex items-center gap-3">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-full min-h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="4" />
                  <motion.circle
                    cx="18" cy="18" r="15.9"
                    fill="none" stroke="#3b82f6" strokeWidth="4"
                    strokeDasharray="50 50"
                    initial={{ strokeDasharray: '0 100' }}
                    animate={{ strokeDasharray: '50 50' }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-blue-400 font-bold text-sm">50%</span>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-slate-300">Mention prix (+12% RMSLE)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span className="text-slate-400">Sans mention</span>
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              Feature binaire <code className="text-blue-400 font-mono text-xs bg-slate-800 px-1 rounded">a_prix_dans_titre</code> = un des top-5 features d&apos;importance
            </p>
          </div>

          <CodeBlock
            code={`df['a_prix_titre'] = df['titre'].str.contains(...)`}
            language="python"
          />
        </motion.div>

        {/* 3: Target encoding KFold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col gap-4"
        >
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span className="text-orange-400 font-semibold">Target Encoding KFold</span>
            </div>
            <p className="text-slate-400 text-sm">
              Encode le quartier avec le prix médian, sans leakage
            </p>

            {/* Schema anti-leakage */}
            <div className="flex flex-col gap-1.5">
              <p className="text-slate-500 text-xs">Sans KFold → leakage ❌</p>
              <div className="flex gap-1 items-center">
                <div className="flex-1 h-5 rounded bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-[10px]">Encode(all)</div>
                <span className="text-red-500 text-xs">→ fuite!</span>
              </div>

              <p className="text-slate-500 text-xs mt-1">Avec KFold → sécurisé ✅</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(k => (
                  <div key={k} className={`flex-1 h-5 rounded flex items-center justify-center text-[9px] font-mono ${k === 3 ? 'bg-orange-500/30 text-orange-400 border border-orange-500/40' : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                    }`}>
                    {k === 3 ? '🎯' : `F${k}`}
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-xs">F3 encodé avec F1+F2+F4+F5</p>
            </div>
          </div>

          <CodeBlock
            code={`from sklearn.model_selection import KFold

for train_idx, val_idx in kf.split(X):
    # Target encoding KFold
    pass`}
            language="python"
          />
        </motion.div>
      </div>
    </div>
  )
}
