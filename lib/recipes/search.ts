import { db } from '@/lib/db'
import { toRecipe } from '@/lib/recipes/map'
import type { Recipe } from '@/types/recipe'

export async function searchRecipesByIngredients(userProducts: string[]): Promise<Recipe[]> {
	const all = await db.recipes.toArray()
	return all
		.map(recipe => toRecipe(recipe, userProducts))
		.filter(recipe => recipe.availableIngredients.length > 0)
		.sort((a, b) => {
			const matchDiff = b.availableIngredients.length - a.availableIngredients.length
			if (matchDiff !== 0) return matchDiff
			return b.matchPercent - a.matchPercent
		})
}

export async function getRecipeById(id: string, userProducts: string[]): Promise<Recipe | null> {
	const stored = await db.recipes.get(id)
	if (!stored) return null
	return toRecipe(stored, userProducts)
}
