'use client'

import { motion } from 'framer-motion'

interface SlideNavProps {
  current: number
  total: number
  onPrev: () => void
  onNext: () => void
}

export default function SlideNav({ current, total, onPrev, onNext }: SlideNavProps) {
  return (
    <div className="fixed bottom-6 left-0 right-0 flex items-center justify-center gap-6 z-50">
      {/* Prev button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrev}
        disabled={current === 0}
        className="w-10 h-10 rounded-full bg-slate-700/80 border border-slate-600 flex items-center justify-center text-slate-300 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors backdrop-blur-sm"
        aria-label="Slide précédente"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>

      {/* Dot indicators */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              width: i === current ? 24 : 6,
              backgroundColor: i === current ? '#3b82f6' : i < current ? '#475569' : '#1e293b',
            }}
            transition={{ duration: 0.3 }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>

      {/* Counter */}
      <span className="text-slate-400 text-sm font-mono min-w-[48px] text-center">
        {current + 1}<span className="text-slate-600">/</span>{total}
      </span>

      {/* Next button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        disabled={current === total - 1}
        className="w-10 h-10 rounded-full bg-slate-700/80 border border-slate-600 flex items-center justify-center text-slate-300 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors backdrop-blur-sm"
        aria-label="Slide suivante"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </div>
  )
}
