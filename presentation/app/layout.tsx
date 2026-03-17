import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prédiction des Prix Immobiliers — SupNum 2026',
  description: 'Présentation du projet capstone ML — Équipe SupNum',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  )
}
