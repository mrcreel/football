import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "./components/Header"
import "./globals.css"

export const metadata: Metadata = {
  title: "Juco Football Stats",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='p-2 m-2 min-h-screen border-2 border-green-500'>
        <Header />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
