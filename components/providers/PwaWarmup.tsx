'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const WARMUP_ROUTES = ['/search', '/favorites'] as const

export function PwaWarmup() {
	const router = useRouter()

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') return

		for (const route of WARMUP_ROUTES) {
			router.prefetch(route)
		}
	}, [router])

	return null
}
