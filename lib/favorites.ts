import { db } from '@/lib/db'
import { getRecipeById } from '@/lib/recipes'
import type { Recipe } from '@/types/recipe'

export async function isFavorite(recipeId: string): Promise<boolean> {
	const found = await db.favorites.where('recipeId').equals(recipeId).first()
	return Boolean(found)
}

export async function toggleFavorite(recipeId: string): Promise<boolean> {
	const existing = await db.favorites.where('recipeId').equals(recipeId).first()
	if (existing?.id) {
		await db.favorites.delete(existing.id)
		return false
	}
	await db.favorites.add({ recipeId, addedAt: Date.now() })
	return true
}

export async function getFavoriteRecipeIds(limit?: number): Promise<string[]> {
	let query = db.favorites.orderBy('addedAt').reverse()
	if (limit !== undefined) {
		query = query.limit(limit)
	}
	const rows = await query.toArray()
	return rows.map(row => row.recipeId)
}

export async function getFavoriteRecipes(
	userProducts: string[],
	limit?: number
): Promise<Recipe[]> {
	const ids = await getFavoriteRecipeIds(limit)
	const recipes: Recipe[] = []
	for (const id of ids) {
		const recipe = await getRecipeById(id, userProducts)
		if (recipe) recipes.push(recipe)
	}
	return recipes
}
