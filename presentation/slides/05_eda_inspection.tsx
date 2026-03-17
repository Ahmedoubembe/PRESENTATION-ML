'use client'

import { motion } from 'framer-motion'
import NotebookCell from '@/components/NotebookCell'
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
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium"
        >
          📊 Phase 3 — EDA
        </motion.div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              className={`px-2 py-0.5 rounded-md text-xs font-mono ${
                s.active
                  ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300'
                  : 'bg-slate-800 border border-slate-700 text-slate-500'
              }`}
            >
              {s.num} {s.label}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-slate-100 mb-2"
      >
        Étapes 1 &amp; 2 — <span className="text-purple-400">Inspection &amp; Nettoyage</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-purple-500/50 via-slate-600 to-transparent mb-4 origin-left"
      />

      <div className="grid grid-cols-5 gap-4 flex-1 min-h-0">
        {/* Left: Notebook cells */}
        <div className="col-span-2 flex flex-col gap-2 overflow-y-auto">
          <NotebookCell
            index={1}
            delay={0.25}
            code={`df = pd.read_csv('housing_nouakchott.csv')
print(df.shape)
df.head(3)`}
          />

          <NotebookCell
            index={2}
            delay={0.4}
            code={`# Vérification doublons & types
print(f"Doublons: {df.duplicated().sum()}")
print(df.dtypes[['prix','surface','quartier']])`}
          />

          <NotebookCell
            index={3}
            delay={0.55}
            code={`# Standardisation des noms de quartiers
quartier_map = {
    'تيارت زين': 'Tevragh_Zeina',
    'كصر':       'Ksar',
    'دار النعيم':'Dar_Naim',
    # ... 5 autres
}
df['quartier'] = df['quartier'].replace(quartier_map)
# Clipping outliers structurels
df['nb_salons'] = df['nb_salons'].clip(upper=10)`}
          />
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
                margin={{ top: 0, right: 20, bottom: 0, left: 65 }}
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
                <Bar dataKey="present" name="Présentes" stackId="a" fill="#3b82f6" />
                <Bar dataKey="missing" name="Manquantes" stackId="a" fill="#ef444440" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
