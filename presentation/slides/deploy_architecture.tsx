'use client'

import { motion } from 'framer-motion'

const stack = [
  { cat: 'Frontend',    techs: ['Next.js 14', 'TypeScript', 'Tailwind CSS'],         color: 'blue' },
  { cat: 'Carte',       techs: ['React-Leaflet', 'OpenStreetMap'],                   color: 'cyan' },
  { cat: 'Graphiques',  techs: ['Recharts'],                                          color: 'indigo' },
  { cat: 'Backend',     techs: ['Flask', 'Gunicorn'],                                 color: 'green' },
  { cat: 'ML',          techs: ['XGBoost', 'scikit-learn'],                           color: 'amber' },
  { cat: 'Modèle',      techs: ['45 features', 'depth=5', 'α=0.3 λ=2.0'],            color: 'orange' },
  { cat: 'Déploiement', techs: ['Vercel', 'Render'],                                  color: 'purple' },
]

const catColors: Record<string, string> = {
  blue:   'bg-blue-500/15 border-blue-500/30 text-blue-300',
  cyan:   'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
  indigo: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
  green:  'bg-green-500/15 border-green-500/30 text-green-300',
  amber:  'bg-amber-500/15 border-amber-500/30 text-amber-300',
  orange: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
  purple: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
}

const flow = [
  {
    step: '1',
    icon: '👤',
    title: 'Saisie utilisateur',
    detail: 'Quartier · Surface · Chambres · Salons',
    color: 'blue',
  },
  {
    step: '2',
    icon: '⚙️',
    title: 'Feature Engineering',
    detail: '45 features · NLP arabe · target encoding · interactions',
    color: 'amber',
  },
  {
    step: '3',
    icon: '🤖',
    title: 'XGBoost predict',
    detail: 'Prix estimé : 4 106 538 MRU',
    color: 'green',
  },
]

function PulseArrow({ delay }: { delay: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-2">
      {/* top label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4 }}
        className="text-slate-500 text-[10px] font-mono whitespace-nowrap"
      >
        POST /api/predict
      </motion.span>

      {/* animated right arrow */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.4, ease: 'easeOut' }}
        className="origin-left"
      >
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="flex items-center gap-0.5 text-blue-400"
        >
          <div className="w-16 h-px bg-gradient-to-r from-blue-500 to-blue-300" />
          <span className="text-sm">▶</span>
        </motion.div>
      </motion.div>

      {/* animated left arrow */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: delay + 0.35, duration: 0.4, ease: 'easeOut' }}
        className="origin-right"
      >
        <motion.div
          animate={{ x: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', delay: 0.5 }}
          className="flex items-center gap-0.5 text-green-400"
        >
          <span className="text-sm">◀</span>
          <div className="w-16 h-px bg-gradient-to-l from-green-500 to-green-300" />
        </motion.div>
      </motion.div>

      {/* bottom label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.5 }}
        className="text-slate-500 text-[10px] font-mono whitespace-nowrap"
      >
        Réponse JSON
      </motion.span>
    </div>
  )
}

export default function SlideDeployment() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      {/* Section tag */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4 self-start"
      >
        🚀 Architecture &amp; Déploiement
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-slate-100 mb-2"
      >
        Du modèle à la{' '}
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          production
        </span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-purple-500/50 via-slate-600 to-transparent mb-4 origin-left"
      />

      {/* ── Architecture diagram ── */}
      <div className="flex items-center justify-center gap-0 mb-4">
        {/* Frontend box */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-4 w-52 shrink-0"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🖥️</span>
            <div>
              <p className="text-blue-300 font-semibold text-sm">Next.js + Tailwind</p>
              <p className="text-slate-500 text-xs">Hébergé sur Vercel</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-3">
            {[
              { icon: '📝', label: 'Formulaire' },
              { icon: '🗺️', label: 'Carte Leaflet' },
              { icon: '📊', label: 'Graphiques Recharts' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 px-2 py-1 rounded-lg bg-blue-500/10 text-blue-200 text-xs">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Animated arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <PulseArrow delay={0.5} />
        </motion.div>

        {/* Backend box */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl bg-green-500/10 border border-green-500/30 p-4 w-56 shrink-0"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⚙️</span>
            <div>
              <p className="text-green-300 font-semibold text-sm">Flask API + Gunicorn</p>
              <p className="text-slate-500 text-xs">Hébergé sur Render</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-3">
            {[
              { icon: '🐍', label: 'predict.py' },
              { icon: '🤖', label: 'housing_model.pkl' },
              { icon: '🗂️', label: 'mappings.json' },
              { icon: '🔧', label: 'features.pkl' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 px-2 py-1 rounded-lg bg-green-500/10 text-green-200 text-xs font-mono">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Data flow ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex items-stretch justify-center gap-1 mb-4"
      >
        {flow.map((step, i) => {
          const border = step.color === 'blue' ? 'border-blue-500/25 bg-blue-500/8'
            : step.color === 'amber' ? 'border-amber-500/25 bg-amber-500/8'
            : 'border-green-500/25 bg-green-500/8'
          const text = step.color === 'blue' ? 'text-blue-300'
            : step.color === 'amber' ? 'text-amber-300'
            : 'text-green-300'
          return (
            <div key={i} className="flex items-center gap-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.75 + i * 0.12 }}
                className={`rounded-xl border ${border} p-3 w-44 text-center`}
              >
                <div className="text-xl mb-1">{step.icon}</div>
                <p className={`font-semibold text-xs ${text} mb-0.5`}>{step.title}</p>
                <p className="text-slate-500 text-[10px] leading-relaxed">{step.detail}</p>
              </motion.div>
              {i < flow.length - 1 && (
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut', delay: i * 0.3 }}
                  className="text-slate-600 text-base px-1"
                >
                  →
                </motion.span>
              )}
            </div>
          )
        })}
      </motion.div>

      {/* ── Tech stack badges ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="flex flex-wrap gap-2 mb-3"
      >
        {stack.map((group, gi) => (
          <div key={gi} className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${catColors[group.color]}`}>
              {group.cat}
            </span>
            {group.techs.map(t => (
              <span key={t} className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono">
                {t}
              </span>
            ))}
          </div>
        ))}
      </motion.div>

      {/* ── Live URLs ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15 }}
        className="flex gap-4 text-xs"
      >
        <a
          href="https://model-home-scope-2.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          API · model-home-scope-2.onrender.com
        </a>
        <span className="flex items-center gap-1.5 text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          App · vercel.app (à déployer)
        </span>
      </motion.div>
    </div>
  )
}
