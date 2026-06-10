'use client'

import { useCallback, useEffect, useState } from 'react'
import { isFavorite, toggleFavorite } from '@/lib/favorites'

export function useFavorite(recipeId: string) {
	const [favorited, setFavorited] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let cancelled = false
		setLoading(true)
		isFavorite(recipeId)
			.then(value => {
				if (!cancelled) setFavorited(value)
			})
			.finally(() => {
				if (!cancelled) setLoading(false)
			})
		return () => {
			cancelled = true
		}
	}, [recipeId])

	const toggle = useCallback(async () => {
		const next = await toggleFavorite(recipeId)
		setFavorited(next)
		return next
	}, [recipeId])

	return { favorited, loading, toggle }
}
