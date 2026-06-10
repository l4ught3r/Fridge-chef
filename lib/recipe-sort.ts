import { DIFFICULTY_ORDER } from '@/lib/constants'
import type { Recipe } from '@/types/recipe'

export type SearchSortMode = 'match' | 'time' | 'easy'

export function sortRecipes(recipes: Recipe[], mode: SearchSortMode): Recipe[] {
	const sorted = [...recipes]
	if (mode === 'match') {
		return sorted.sort((a, b) => {
			const percentDiff = b.matchPercent - a.matchPercent
			if (percentDiff !== 0) return percentDiff
			return b.availableIngredients.length - a.availableIngredients.length
		})
	}
	if (mode === 'time') {
		return sorted.sort((a, b) => a.time - b.time)
	}
	return sorted.sort((a, b) => {
		const diffA = DIFFICULTY_ORDER[a.difficulty] ?? 1
		const diffB = DIFFICULTY_ORDER[b.difficulty] ?? 1
		if (diffA !== diffB) return diffA - diffB
		return b.matchPercent - a.matchPercent
	})
}
