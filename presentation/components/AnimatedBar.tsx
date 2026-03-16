'use client'

import { motion } from 'framer-motion'

interface BarItem {
  label: string
  value: number
  maxValue?: number
  color?: string
  suffix?: string
}

interface AnimatedBarProps {
  items: BarItem[]
  height?: number
  delay?: number
  horizontal?: boolean
}

export default function AnimatedBar({
  items,
  height = 32,
  delay = 0,
  horizontal = true,
}: AnimatedBarProps) {
  const max = Math.max(...items.map(i => i.maxValue ?? i.value))

  if (horizontal) {
    return (
      <div className="flex flex-col gap-3 w-full">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-slate-400 text-sm w-40 text-right shrink-0">{item.label}</span>
            <div className="flex-1 bg-slate-800 rounded-full overflow-hidden" style={{ height }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / max) * 100}%` }}
                transition={{ duration: 0.8, delay: delay + i * 0.1, ease: 'easeOut' }}
                className="h-full rounded-full flex items-center justify-end pr-3"
                style={{ background: item.color ?? 'linear-gradient(90deg, #3b82f6, #6366f1)' }}
              >
                <span className="text-white text-xs font-bold whitespace-nowrap">
                  {item.value}{item.suffix ?? ''}
                </span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-end gap-3 w-full h-full">
      {items.map((item, i) => (
        <div key={item.label} className="flex flex-col items-center gap-2 flex-1">
          <span className="text-slate-300 text-xs font-bold">{item.value}{item.suffix ?? ''}</span>
          <div className="w-full bg-slate-800 rounded-t overflow-hidden flex flex-col justify-end" style={{ height: 140 }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / max) * 100}%` }}
              transition={{ duration: 0.8, delay: delay + i * 0.1, ease: 'easeOut' }}
              className="w-full rounded-t"
              style={{ background: item.color ?? 'linear-gradient(180deg, #3b82f6, #6366f1)' }}
            />
          </div>
          <span className="text-slate-400 text-xs text-center leading-tight">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
