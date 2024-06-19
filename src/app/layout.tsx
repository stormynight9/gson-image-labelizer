import { Toaster } from '@/components/ui/sonner'
import { EdgeStoreProvider } from '@/lib/edgestore'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'gson-image-labelizer',
    description: 'Label your images with ease',
    icons: {
        icon: '/favicon.ico',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>
                    <EdgeStoreProvider>
                        {children}
                        <Toaster />
                    </EdgeStoreProvider>
                </Providers>
            </body>
        </html>
    )
}
