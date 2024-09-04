import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'

const inter = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'ContentPulse | Pulse Your Content 2 Life',
	description:
		'ContentPulse is a dynamic AI-powered platform that streamlines content creation for blogs and social media. With a suite of intuitive tools, it generates high-quality posts, captions, and articles in seconds, helping you keep your audience engaged effortlessly.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>{children}</body>
			</html>
		</ClerkProvider>
	)
}
