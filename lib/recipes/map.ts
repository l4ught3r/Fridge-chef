import { matchIngredients } from '@/lib/ingredient-match'
import { formatRecipeTime } from '@/lib/utils'
import type { Recipe, StoredRecipe } from '@/types/recipe'

export function toRecipe(stored: StoredRecipe, userProducts: string[]): Recipe {
	const match = matchIngredients(userProducts, stored.ingredients)
	return {
		...stored,
		...match,
		availableIngredients: match.available,
		missingIngredients: match.missing,
		timeLabel: formatRecipeTime(stored.time)
	}
}
