import { Inter } from 'next/font/google'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  )
}
