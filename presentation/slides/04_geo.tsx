'use client'

import { motion } from 'framer-motion'

const quartiers = [
  { name: 'Tevragh Zeina', lat: '18.094', lon: '-15.978', type: 'Luxe' },
  { name: 'Ksar', lat: '18.089', lon: '-15.971', type: 'Centre' },
  { name: 'Dar Naim', lat: '18.111', lon: '-15.952', type: 'Résidentiel' },
  { name: 'Sebkha', lat: '18.078', lon: '-15.999', type: 'Populaire' },
  { name: 'El Mina', lat: '18.069', lon: '-16.017', type: 'Populaire' },
  { name: 'Toujounine', lat: '18.121', lon: '-15.934', type: 'Périphérie' },
  { name: 'Arafat', lat: '18.057', lon: '-15.950', type: 'Populaire' },
  { name: 'Riadh', lat: '18.101', lon: '-15.960', type: 'Résidentiel' },
]

const distances = [
  { icon: '🏛️', label: 'Centre-ville', color: 'text-blue-400' },
  { icon: '✈️', label: 'Aéroport', color: 'text-green-400' },
  { icon: '🌊', label: 'Plage', color: 'text-cyan-400' },
  { icon: '🛒', label: 'Grand marché', color: 'text-orange-400' },
  { icon: '⚓', label: 'Port de Nouakchott', color: 'text-purple-400' },
]

const pois = [
  { icon: '🏫', label: 'Écoles' },
  { icon: '🕌', label: 'Mosquées' },
  { icon: '🏪', label: 'Commerces' },
  { icon: '🏥', label: 'Cliniques' },
  { icon: '🌳', label: 'Parcs' },
  { icon: '🚌', label: 'Transports' },
]

export default function Slide04() {
  return (
    <div className="w-full min-h-full flex flex-col p-10 pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-5 self-start"
      >
        📍 Phase 2 — Géo-Enrichissement
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Enrichir avec la{' '}
        <span className="text-green-400">géographie</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-green-500/50 via-slate-600 to-transparent mb-6 origin-left"
      />

      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Left: Tools */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🗺️</span>
              <span className="text-slate-200 font-semibold">Nominatim (OSM)</span>
            </div>
            <p className="text-slate-400 text-sm">Coordonnées GPS des <span className="text-green-400 font-semibold">8 quartiers</span> de Nouakchott</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📏</span>
              <span className="text-slate-200 font-semibold">Geopy</span>
            </div>
            <p className="text-slate-400 text-sm mb-3"><span className="text-blue-400 font-semibold">5 distances</span> calculées pour chaque annonce :</p>
            <div className="flex flex-col gap-1.5">
              {distances.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.07 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <span>{d.icon}</span>
                  <span className={d.color}>{d.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔍</span>
              <span className="text-slate-200 font-semibold">Overpass API</span>
            </div>
            <p className="text-slate-400 text-sm mb-3"><span className="text-purple-400 font-semibold">6 types de POI</span> dans un rayon de 1 km :</p>
            <div className="grid grid-cols-2 gap-1.5">
              {pois.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.06 }}
                  className="flex items-center gap-1.5 text-sm text-slate-300"
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle + Right: Table */}
        <div className="col-span-2 flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-sm font-medium uppercase tracking-widest"
          >
            8 quartiers de Nouakchott — coordonnées GPS
          </motion.p>
          <div className="rounded-xl overflow-hidden border border-slate-700/50 flex flex-col">
            {/* Table header */}
            <div className="grid grid-cols-4 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Quartier</span>
              <span className="text-center">Latitude</span>
              <span className="text-center">Longitude</span>
              <span className="text-center">Type</span>
            </div>
            {/* Table rows */}
            {quartiers.map((q, i) => (
              <motion.div
                key={q.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.07 }}
                className={`grid grid-cols-4 px-4 py-2.5 text-sm border-t border-slate-700/30 ${
                  i % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-800/20'
                }`}
              >
                <span className="text-slate-200 font-medium">{q.name}</span>
                <span className="text-center text-blue-400 font-mono text-xs">{q.lat}°N</span>
                <span className="text-center text-green-400 font-mono text-xs">{q.lon}°E</span>
                <span className={`text-center text-xs font-medium ${
                  q.type === 'Luxe' ? 'text-amber-400' :
                  q.type === 'Centre' ? 'text-blue-400' :
                  q.type === 'Périphérie' ? 'text-red-400' :
                  q.type === 'Résidentiel' ? 'text-purple-400' :
                  'text-slate-400'
                }`}>{q.type}</span>
              </motion.div>
            ))}
          </div>

          {/* Honest limits */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
          >
            <p className="text-amber-400 text-sm font-semibold mb-2">⚠️ Limites honnêtes</p>
            <div className="grid grid-cols-2 gap-2 text-slate-400 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">→</span>
                <span>Précision au niveau du quartier (pas de l&apos;adresse exacte)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">→</span>
                <span>OSM incomplet pour Nouakchott (données limitées)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
