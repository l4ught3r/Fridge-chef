import { ingredientKey } from '@/lib/ingredients'
import {
	getIngredientNames,
	type IngredientMatchResult,
	type RecipeIngredient
} from '@/types/recipe'

/**
 * Сопоставление продуктов холодильника с ингредиентами рецепта.
 *
 * - Ввод и хранение: канон через resolveIngredient() (@/lib/ingredients).
 * - Ингредиенты рецепта: канон через normalizeRecipeIngredients() при seed.
 * - Подбор: точное совпадение по ingredientKey (без fuzzy substring).
 */
export function matchIngredients(
	userProducts: string[],
	recipeIngredients: RecipeIngredient[] | string[]
): IngredientMatchResult {
	const names =
		recipeIngredients.length === 0
			? []
			: typeof recipeIngredients[0] === 'string'
				? (recipeIngredients as string[])
				: getIngredientNames(recipeIngredients as RecipeIngredient[])

	if (names.length === 0) {
		return { available: [], missing: [], matchPercent: 0 }
	}

	const userKeys = new Set(userProducts.map(ingredientKey))
	const available: string[] = []
	const missing: string[] = []

	for (const ingredient of names) {
		if (userKeys.has(ingredientKey(ingredient))) {
			available.push(ingredient)
		} else {
			missing.push(ingredient)
		}
	}

	const matchPercent = Math.round((available.length / names.length) * 100)

	return { available, missing, matchPercent }
}
