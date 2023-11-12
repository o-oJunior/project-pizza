import { Inter } from 'next/font/google'
import './globals.scss'
import Navbar from '@/components/navbar/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <title>Pizzaria</title>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
