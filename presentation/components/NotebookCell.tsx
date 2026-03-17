'use client'

import { motion } from 'framer-motion'

interface HtmlRow {
  cells: (string | number)[]
  highlight?: boolean
}

interface HtmlTableOutput {
  type: 'table'
  headers: string[]
  rows: HtmlRow[]
  caption?: string
}

interface TextOutput {
  type: 'text'
  lines: { text: string; color?: string }[]
}

interface WarnOutput {
  type: 'warn'
  text: string
}

type CellOutput = HtmlTableOutput | TextOutput | WarnOutput

interface NotebookCellProps {
  index?: number
  code: string
  output?: CellOutput
  delay?: number
  className?: string
}

function highlight(code: string): string {
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Strings
    .replace(/(["'`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="text-green-400">$1$2$3</span>')
    // Keywords
    .replace(/\b(def|class|import|from|return|if|else|elif|for|while|in|not|and|or|True|False|None|with|as|try|except|raise|lambda|yield|async|await|print|f)\b/g,
      '<span class="text-purple-400">$1</span>')
    // Decorators
    .replace(/(@\w+)/g, '<span class="text-yellow-400">$1</span>')
    // Numbers
    .replace(/\b(\d+\.?\d*(?:e[+-]?\d+)?)\b/g, '<span class="text-orange-300">$1</span>')
    // Comments
    .replace(/(#[^\n]*)/g, '<span class="text-slate-500 italic">$1</span>')
    // Built-in functions
    .replace(/\b(len|range|print|list|dict|set|tuple|int|float|str|bool|type|sum|max|min|abs|round|sorted|enumerate|zip|map|filter|np|pd|plt|sns|xgb|KFold|variance_inflation_factor|pearsonr|kruskal|log1p)\b(?!\s*=)/g,
      '<span class="text-cyan-400">$1</span>')
}

export default function NotebookCell({
  index = 1,
  code,
  output,
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
      {/* Input cell */}
      <div className="flex">
        {/* Gutter */}
        <div className="flex flex-col items-end pt-3 px-2 bg-slate-900/80 border-r border-slate-700/40 min-w-[52px]">
          <span className="text-blue-500/70 text-[10px] font-mono whitespace-nowrap">In [{index}]:</span>
        </div>
        {/* Code */}
        <div className="flex-1 bg-slate-900 overflow-x-auto">
          <pre className="p-3 text-[11px] leading-relaxed font-mono">
            <code dangerouslySetInnerHTML={{ __html: highlight(code) }} className="text-slate-300" />
          </pre>
        </div>
      </div>

      {/* Output cell */}
      {output && (
        <div className="flex border-t border-slate-700/40">
          {/* Gutter */}
          <div className="flex flex-col items-end pt-2 px-2 bg-slate-950/60 border-r border-slate-700/40 min-w-[52px]">
            <span className="text-red-400/60 text-[10px] font-mono whitespace-nowrap">Out [{index}]:</span>
          </div>
          {/* Output content */}
          <div className="flex-1 bg-slate-950/40 overflow-x-auto">
            {output.type === 'table' && (
              <div className="p-2">
                {output.caption && (
                  <p className="text-slate-500 text-[10px] mb-1 font-mono">{output.caption}</p>
                )}
                <table className="text-[10px] font-mono border-collapse w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      {output.headers.map((h, i) => (
                        <th key={i} className="px-3 py-1 text-left text-blue-400 font-semibold whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {output.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className={`border-b border-slate-800/50 ${
                          row.highlight ? 'bg-amber-500/10' : ri % 2 === 0 ? 'bg-slate-900/20' : ''
                        }`}
                      >
                        {row.cells.map((cell, ci) => (
                          <td key={ci} className={`px-3 py-1 whitespace-nowrap ${
                            ci === 0 ? 'text-slate-400' :
                            typeof cell === 'number' && cell < 0.05 ? 'text-green-400 font-bold' :
                            typeof cell === 'string' && cell.includes('XGBoost') ? 'text-green-400 font-bold' :
                            typeof cell === 'string' && cell.includes('✅') ? 'text-green-400' :
                            typeof cell === 'string' && cell.includes('❌') ? 'text-red-400' :
                            'text-slate-300'
                          }`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {output.type === 'text' && (
              <div className="p-3 flex flex-col gap-0.5">
                {output.lines.map((line, i) => (
                  <p key={i} className={`text-[11px] font-mono ${line.color ?? 'text-slate-300'}`}>
                    {line.text}
                  </p>
                ))}
              </div>
            )}

            {output.type === 'warn' && (
              <div className="p-3 flex items-start gap-2">
                <span className="text-amber-400 text-xs">⚠</span>
                <p className="text-amber-300/80 text-[10px] font-mono">{output.text}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}
