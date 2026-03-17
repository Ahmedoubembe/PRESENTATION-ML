import Link from 'next/link'

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Présentation
          </Link>

          <div className="h-4 w-px bg-slate-700" />

          <Link
            href="/predict"
            className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors"
          >
            Prédiction
          </Link>

          <Link
            href="/analyse"
            className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors"
          >
            Analyse
          </Link>

          <div className="ml-auto text-xs text-slate-600 font-mono">
            HomeScope · Nouakchott
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {children}
      </main>
    </div>
  )
}
