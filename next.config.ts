import type { NextConfig } from 'next'
// @ts-expect-error next-pwa has no bundled types
import withPWA from 'next-pwa'

const nextConfig: NextConfig = {
	// next-pwa injects webpack config; empty turbopack opts in for `next dev` (PWA off in dev).
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

export default withPWA({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	register: true,
	skipWaiting: true,
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
		},
		{
			urlPattern: /^https:\/\/www\.themealdb\.com\/.*/i,
			handler: 'CacheFirst',
			options: {
				cacheName: 'themealdb-images',
				expiration: {
					maxEntries: 100,
					maxAgeSeconds: 60 * 60 * 24 * 7
				}
			}
		}
	]
})(nextConfig)
