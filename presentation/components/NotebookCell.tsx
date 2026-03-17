'use client'

import { motion } from 'framer-motion'

interface NotebookCellProps {
  index?: number
  code: string
  delay?: number
  className?: string
}

function highlight(code: string): string {
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(["'`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="text-green-400">$1$2$3</span>')
    .replace(/\b(def|class|import|from|return|if|else|elif|for|while|in|not|and|or|True|False|None|with|as|try|except|raise|lambda|yield|async|await|print|f)\b/g,
      '<span class="text-purple-400">$1</span>')
    .replace(/(@\w+)/g, '<span class="text-yellow-400">$1</span>')
    .replace(/\b(\d+\.?\d*(?:e[+-]?\d+)?)\b/g, '<span class="text-orange-300">$1</span>')
    .replace(/(#[^\n]*)/g, '<span class="text-slate-500 italic">$1</span>')
    .replace(/\b(len|range|print|list|dict|set|tuple|int|float|str|bool|type|sum|max|min|abs|round|sorted|enumerate|zip|map|filter|np|pd|plt|sns|xgb|KFold|variance_inflation_factor|pearsonr|kruskal|log1p)\b(?!\s*=)/g,
      '<span class="text-cyan-400">$1</span>')
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
      <div className="flex">
        <div className="flex flex-col items-end pt-3 px-2 bg-slate-900/80 border-r border-slate-700/40 min-w-[52px]">
          <span className="text-blue-500/70 text-[10px] font-mono whitespace-nowrap">In [{index}]:</span>
        </div>
        <div className="flex-1 bg-slate-900 overflow-x-auto">
          <pre className="p-3 text-[11px] leading-relaxed font-mono">
            <code dangerouslySetInnerHTML={{ __html: highlight(code) }} className="text-slate-300" />
          </pre>
        </div>
      </div>
    </motion.div>
  )
}
