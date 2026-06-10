import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { DbProvider } from '@/components/providers/DbProvider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700', '800']
})

const jetbrainsMono = JetBrains_Mono({
	variable: '--font-jetbrains-mono',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '700']
})

export const metadata: Metadata = {
	title: 'Fridge Chef',
	description: 'Готовьте из того, что есть в холодильнике',
	applicationName: 'Fridge Chef',
	appleWebApp: {
		capable: true,
		title: 'Fridge Chef',
		statusBarStyle: 'default'
	},
	icons: {
		icon: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
		apple: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }]
	}
}

export const viewport = {
	themeColor: '#E95B3C',
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='ru'
			className={`${inter.variable} ${jetbrainsMono.variable} h-dvh min-h-0 antialiased`}
		>
			<body className='flex h-dvh min-h-0 flex-col overflow-hidden'>
				<DbProvider>{children}</DbProvider>
				<Toaster
					position='top-center'
					richColors
					closeButton
				/>
			</body>
		</html>
	)
}
