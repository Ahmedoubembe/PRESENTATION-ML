'use client'

import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'

const missingData = [
  { name: 'prix', present: 1153, missing: 0 },
  { name: 'surface', present: 1098, missing: 55 },
  { name: 'quartier', present: 1153, missing: 0 },
  { name: 'nb_chambres', present: 1140, missing: 13 },
  { name: 'nb_sdb', present: 322, missing: 831 },
  { name: 'nb_salons', present: 1020, missing: 133 },
  { name: 'type_bien', present: 980, missing: 173 },
  { name: 'étage', present: 620, missing: 533 },
  { name: 'parking', present: 711, missing: 442 },
  { name: 'jardin', present: 589, missing: 564 },
  { name: 'terrasse', present: 545, missing: 608 },
  { name: 'titre_arabe', present: 1153, missing: 0 },
]

const steps = [
  { num: '01', label: 'Inspection', active: true },
  { num: '02', label: 'Nettoyage', active: true },
  { num: '03', label: 'Valeurs manq.', active: false },
  { num: '04', label: 'Outliers', active: false },
  { num: '05', label: 'Univariée', active: false },
  { num: '06', label: 'Bivariée', active: false },
  { num: '07', label: 'Multivariée', active: false },
  { num: '08', label: 'Préparation', active: false },
]

export default function Slide05() {
  return (
    <div className="w-full h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-4 mb-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium"
        >
          📊 Phase 3 — EDA
        </motion.div>
        {/* Step progress */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono ${
                s.active
                  ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300'
                  : 'bg-slate-800 border border-slate-700 text-slate-500'
              }`}
            >
              <span>{s.num}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Étapes 1 &amp; 2 —{' '}
        <span className="text-purple-400">Inspection &amp; Nettoyage</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-purple-500/50 via-slate-600 to-transparent mb-4 origin-left"
      />

      <div className="grid grid-cols-5 gap-6 flex-1 min-h-0">
        {/* Left: Key stats */}
        <div className="col-span-2 flex flex-col gap-3">
          {[
            { icon: '📋', label: '1 153 annonces', sub: '12 colonnes brutes' },
            { icon: '✅', label: '0 doublon', sub: 'après déduplication' },
            { icon: '🏘️', label: '8 quartiers', sub: 'standardisés (arabe → français)' },
            { icon: '✂️', label: 'nb_salons > 10', sub: 'clippé → valeur max = 10' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-slate-200 font-semibold">{item.label}</p>
                <p className="text-slate-400 text-xs">{item.sub}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/30 mt-1"
          >
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">Standardisation des quartiers</p>
            <div className="flex flex-col gap-1 text-xs font-mono">
              <span><span className="text-red-400">تيارت زين</span> → <span className="text-green-400">Tevragh_Zeina</span></span>
              <span><span className="text-red-400">كصر</span> → <span className="text-green-400">Ksar</span></span>
              <span><span className="text-red-400">دار النعيم</span> → <span className="text-green-400">Dar_Naim</span></span>
            </div>
          </motion.div>
        </div>

        {/* Right: Chart */}
        <div className="col-span-3 flex flex-col gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-xs font-medium uppercase tracking-widest"
          >
            Valeurs présentes vs manquantes par variable
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 min-h-0"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={missingData}
                layout="vertical"
                margin={{ top: 0, right: 20, bottom: 0, left: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 1153]}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={false}
                  axisLine={false}
                  width={65}
                />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
                <Bar dataKey="present" name="Présentes" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="missing" name="Manquantes" stackId="a" fill="#ef444440" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          {/* IMAGE PLACEHOLDER: bar chart missing values */}
          {/* IMAGE: 05_missing_values_bar.png — 800×400 — barres empilées présent/manquant par variable */}
        </div>
      </div>
    </div>
  )
}
