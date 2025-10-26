import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: 'Gerenciamento de usuários',
  description: 'Sistema de login',
  icons: {
    icon: '/favicon.ico', // ou /favicon.png
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}