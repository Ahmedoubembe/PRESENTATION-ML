'use client'

import { motion } from 'framer-motion'
import CodeBlock from '@/components/CodeBlock'

const stats = [
  { label: 'Annonces collectées', value: '1 153', color: 'text-blue-400' },
  { label: 'Colonnes / features', value: '12', color: 'text-green-400' },
  { label: 'Pause entre requêtes', value: '2s', color: 'text-orange-400' },
  { label: 'Source', value: 'voursa.com', color: 'text-purple-400' },
]

const ethics = [
  { icon: '📋', text: 'robots.txt respecté avant scraping' },
  { icon: '⏱️', text: 'Pauses de 2s entre chaque requête' },
  { icon: '🏷️', text: 'User-Agent identifié (projet académique)' },
  { icon: '🔒', text: 'Données utilisées uniquement à des fins de recherche' },
]

export default function Slide03() {
  return (
    <div className="w-full h-full flex flex-col p-10 pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-5 self-start"
      >
        🕷️ Phase 1 — Scraping
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-slate-100 mb-2"
      >
        Collecte des données sur{' '}
        <span className="text-blue-400">voursa.com</span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px bg-gradient-to-r from-blue-500/50 via-slate-600 to-transparent mb-6 origin-left"
      />

      <div className="grid grid-cols-3 gap-6 flex-1">
        {/* Left: Stats + Ethics */}
        <div className="flex flex-col gap-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col gap-1"
              >
                <span className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</span>
                <span className="text-slate-400 text-xs leading-tight">{s.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Ethics */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl bg-green-500/5 border border-green-500/20"
          >
            <p className="text-green-400 text-sm font-semibold mb-3 flex items-center gap-2">
              ✅ Éthique du scraping
            </p>
            <div className="flex flex-col gap-2">
              {ethics.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="flex items-center gap-2 text-slate-400 text-sm"
                >
                  <span>{e.icon}</span>
                  <span>{e.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle + Right: Code + Sample */}
        <div className="col-span-2 flex flex-col gap-4">
          <CodeBlock
            code={`import requests
from bs4 import BeautifulSoup
import time

headers = {"User-Agent": "SupNum-Research/1.0 (academic project)"}

def scrape_page(url):
    resp = requests.get(url, headers=headers)
    soup = BeautifulSoup(resp.text, "html.parser")
    listings = soup.find_all("div", class_="listing-item")
    return [parse_listing(l) for l in listings]

for page in range(1, 116):
    data = scrape_page(f"{BASE_URL}?page={page}")
    save(data)
    time.sleep(2)  # pause éthique`}
            language="python"
          />

          {/* Sample annonce */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col gap-3"
          >
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Exemple d&apos;annonce collectée</p>
            <div className="flex items-start gap-4">
              {/* Arabic text */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-right flex-1">
                <p className="text-slate-300 text-lg arabic leading-loose" dir="rtl">
                  فيلا للبيع في تيارت زين — ٥ غرف، ٣ حمامات، مساحة ٣٥٠ م²
                </p>
                <p className="text-slate-500 text-xs mt-1 text-left" dir="ltr">
                  Villa à vendre à Tevragh Zeina — 5 chambres, 3 sdb, 350 m²
                </p>
              </div>
              {/* Parsed */}
              <div className="flex flex-col gap-1 text-xs font-mono shrink-0">
                <span className="text-slate-400">quartier: <span className="text-blue-300">Tevragh_Zeina</span></span>
                <span className="text-slate-400">surface: <span className="text-green-300">350</span></span>
                <span className="text-slate-400">nb_chambres: <span className="text-orange-300">5</span></span>
                <span className="text-slate-400">nb_sdb: <span className="text-orange-300">3</span></span>
                <span className="text-slate-400">type: <span className="text-purple-300">villa</span></span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
