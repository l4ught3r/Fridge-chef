import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Fridge Chef',
		short_name: 'Fridge Chef',
		description: 'Готовьте из того, что есть в холодильнике',
		start_url: '/',
		display: 'standalone',
		background_color: '#FEFAF2',
		theme_color: '#E95B3C',
		lang: 'ru',
		orientation: 'portrait',
		icons: [
			{
				src: '/icons/icon-192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any'
			},
			{
				src: '/icons/icon-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any'
			},
			{
				src: '/icons/icon-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable'
			}
		]
	}
}
