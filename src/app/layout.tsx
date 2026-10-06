import type { Metadata } from 'next'
import { Google_Sans_Flex } from 'next/font/google'
import type { ReactNode } from 'react'
import '@/components/admin/admin.css'
import '@/components/admin/motion.css'
import './globals.css'

const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-google-sans-flex',
})

export const metadata: Metadata = {
  title: 'Rocket Web Admin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" data-app-env={process.env.APP_ENV}>
      <body className={googleSansFlex.variable}>{children}</body>
    </html>
  )
}
