import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono, Syne } from 'next/font/google'
import './globals.css'
import ScrollProgress from '@/components/site/ScrollProgress'
import CursorSpotlight from '@/components/site/CursorSpotlight'
import CustomCursor from '@/components/CustomCursor'
import ScrollRestoration from '@/components/ScrollRestoration'
import LoadingScreen from '@/components/LoadingScreen'
import { XPProvider } from '@/context/XPContext'
import XPBar from '@/components/XPBar'
import ToastContainer from '@/components/ToastContainer'
import GameController from '@/components/GameController'
import SectionProgress from '@/components/SectionProgress'
import FloatingChat from '@/components/FloatingChat'

const syne = Syne({ subsets: ['latin'], variable: '--font-heading' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Developer Portfolio',
  description: 'Modern portfolio with projects, skills, and contact section',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
        <LoadingScreen />
        <XPProvider>
          <ScrollRestoration />
          <XPBar />
          <SectionProgress />
          <FloatingChat />
          <ToastContainer />
          <GameController />
          <CustomCursor />
          <ScrollProgress />
          <CursorSpotlight />
          {children}
        </XPProvider>
      </body>
    </html>
  )
}

