import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VIDA-WELLNESS CENTER',
  description: 'Pisac Valle Sagrado',
  generator: 'Paul CCopa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
