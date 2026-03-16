'use client'

import { motion } from 'framer-motion'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

function highlight(code: string): string {
  // Simple syntax highlighting via HTML
  return code
    // Strings
    .replace(/(["'`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="text-green-400">$1$2$3</span>')
    // Keywords
    .replace(/\b(def|class|import|from|return|if|else|elif|for|while|in|not|and|or|True|False|None|with|as|try|except|raise|lambda|yield|async|await)\b/g, '<span class="text-purple-400">$1</span>')
    // Numbers
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-400">$1</span>')
    // Comments
    .replace(/(#[^\n]*)/g, '<span class="text-slate-500">$1</span>')
    // Function calls
    .replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, '<span class="text-blue-300">$1</span>')
    // Operators
    .replace(/([=<>!+\-*/%&|^~]+)/g, '<span class="text-slate-300">$1</span>')
}

export default function CodeBlock({ code, language = 'python', className = '' }: CodeBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-xl overflow-hidden border border-slate-700 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-slate-500 text-xs ml-2 font-mono">{language}</span>
      </div>
      {/* Code */}
      <pre className="bg-slate-900 p-4 overflow-x-auto code-block text-sm leading-relaxed">
        <code
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
          className="text-slate-300"
        />
      </pre>
    </motion.div>
  )
}
