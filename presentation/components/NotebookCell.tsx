'use client'

import { motion } from 'framer-motion'

interface NotebookCellProps {
  index?: number
  code: string
  delay?: number
  className?: string
}

export default function NotebookCell({
  index = 1,
  code,
  delay = 0,
  className = '',
}: NotebookCellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`rounded-xl overflow-hidden border border-slate-700/60 ${className}`}
    >
      <div className="flex bg-slate-900 border-l-4 border-slate-700/50">
        <div className="flex-1 overflow-x-auto">
          <pre className="p-3 text-[11px] leading-relaxed font-mono">
            <code className="text-slate-300">
              {code}
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  )
}
