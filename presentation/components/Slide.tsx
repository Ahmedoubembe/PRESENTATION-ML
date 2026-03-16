'use client'

import { motion } from 'framer-motion'

interface SlideProps {
  children: React.ReactNode
  className?: string
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.12, duration: 0.4 },
  }),
}

export default function Slide({ children, className = '' }: SlideProps) {
  return (
    <div className={`w-full h-full flex flex-col p-10 pb-20 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

export function SlideTitle({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <motion.h1
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
      className={`text-4xl font-bold mb-2 ${accent ? 'text-blue-400' : 'text-slate-100'}`}
    >
      {children}
    </motion.h1>
  )
}

export function SlideSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0.5}
      className="text-xl text-slate-400 mb-6 font-medium"
    >
      {children}
    </motion.h2>
  )
}

export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      custom={0}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4"
    >
      {children}
    </motion.div>
  )
}

export function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="h-px bg-gradient-to-r from-blue-500/50 via-slate-600 to-transparent mb-6 origin-left"
    />
  )
}
