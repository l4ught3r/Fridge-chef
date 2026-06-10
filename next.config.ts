import withPWAInit from '@ducanh2912/next-pwa'
import type { NextConfig } from 'next'

const precacheRevision = new Date().toISOString()

const withPWA = withPWAInit({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	register: true,
	reloadOnOnline: true,
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	cacheStartUrl: true,
	dynamicStartUrl: false,
	fallbacks: {
		document: '/~offline'
	},
	extendDefaultRuntimeCaching: true,
	workboxOptions: {
		skipWaiting: true,
		// Не используем navigateFallback на "/": с App Router URL меняется,
		// а SW отдаёт HTML главной — получаем /search в адресной строке и home на экране.
		additionalManifestEntries: [
			{ url: '/search', revision: precacheRevision },
			{ url: '/favorites', revision: precacheRevision }
		],
		runtimeCaching: [
			{
				urlPattern: /\/data\/recipes\.json$/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'recipes-catalog',
					expiration: {
						maxEntries: 1,
						maxAgeSeconds: 60 * 60 * 24 * 30
					}
				}
			},
			{
				urlPattern: /\/images\/.*/i,
				handler: 'CacheFirst',
				options: {
					cacheName: 'recipe-images',
					expiration: {
						maxEntries: 700,
						maxAgeSeconds: 60 * 60 * 24 * 30
					}
				}
			}
		]
	}
})

const nextConfig: NextConfig = {
	// @ducanh2912/next-pwa injects webpack config; empty turbopack opts in for `next dev` (PWA off in dev).
	turbopack: {},
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com'
			},
			{
				protocol: 'https',
				hostname: 'www.themealdb.com'
			}
		]
	}
}

export default withPWA(nextConfig)
