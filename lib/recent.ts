import { MAX_RECENT_RECIPES, RECENT_RECIPES_KEY } from '@/lib/constants'
import { getRecipeById } from '@/lib/recipes'
import type { Recipe } from '@/types/recipe'

export function clearRecentRecipes(): void {
	if (typeof window === 'undefined') return
	localStorage.removeItem(RECENT_RECIPES_KEY)
}

export function getRecentRecipeIds(): string[] {
	if (typeof window === 'undefined') return []
	try {
		const raw = localStorage.getItem(RECENT_RECIPES_KEY)
		if (!raw) return []
		const parsed = JSON.parse(raw) as unknown
		return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
	} catch {
		return []
	}
}

export function addRecentRecipe(recipeId: string): void {
	if (typeof window === 'undefined') return
	const ids = getRecentRecipeIds().filter(id => id !== recipeId)
	ids.unshift(recipeId)
	localStorage.setItem(RECENT_RECIPES_KEY, JSON.stringify(ids.slice(0, MAX_RECENT_RECIPES)))
}

export async function getRecentRecipes(
	userProducts: string[],
	limit: number,
	excludeIds: string[] = []
): Promise<Recipe[]> {
	const exclude = new Set(excludeIds)
	const recipes: Recipe[] = []
	for (const id of getRecentRecipeIds()) {
		if (exclude.has(id)) continue
		const recipe = await getRecipeById(id, userProducts)
		if (recipe) recipes.push(recipe)
		if (recipes.length >= limit) break
	}
	return recipes
}
