import { db } from '@/lib/db'
import { toRecipe } from '@/lib/recipes/map'
import type { Recipe } from '@/types/recipe'

export { toRecipe } from '@/lib/recipes/map'

export async function getRandomRecipes(count: number, userProducts: string[]): Promise<Recipe[]> {
	if (userProducts.length === 0) return []

	const all = await db.recipes.toArray()
	const matched = all
		.map(recipe => toRecipe(recipe, userProducts))
		.filter(recipe => recipe.availableIngredients.length > 0)

	if (matched.length === 0) return []

	const shuffled = [...matched]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}

	return shuffled.slice(0, count)
}

export { getRecipeById, searchRecipesByIngredients } from '@/lib/recipes/search'
