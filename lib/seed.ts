import { db } from '@/lib/db'
import { invalidateIngredientCatalogCache } from '@/lib/ingredient-hints'
import { clearRecentRecipes } from '@/lib/recent'
import { mapJsonToStored } from '@/lib/seed/map'
import { parseRecipesCatalog } from '@/lib/validations/recipe'
import type { StoredRecipe } from '@/types/recipe'

export const SEED_VERSION = 'themealdb-ru-5'
export const SEED_VERSION_KEY = 'fridge-chef-seed-version'

export async function initializeDatabase(): Promise<void> {
	if (typeof window === 'undefined') return

	const storedVersion = localStorage.getItem(SEED_VERSION_KEY)
	const recipeCount = await db.recipes.count()

	if (storedVersion === SEED_VERSION && recipeCount > 0) {
		return
	}

	const needsReseed = storedVersion !== SEED_VERSION

	let raw: unknown

	try {
		const response = await fetch('/data/recipes.json')
		if (!response.ok) {
			throw new Error(`Не удалось загрузить recipes.json: ${response.status}`)
		}
		raw = await response.json()
	} catch (err) {
		if (recipeCount > 0) {
			console.warn('[seed] Офлайн или сеть недоступна — используем локальный каталог', err)
			return
		}
		throw err
	}

	if (needsReseed) {
		await db.recipes.clear()
		await db.favorites.clear()
		clearRecentRecipes()
	}

	const recipes = parseRecipesCatalog(raw)
		.map(mapJsonToStored)
		.filter((recipe): recipe is StoredRecipe => recipe !== null)

	if (recipes.length === 0) {
		throw new Error('После валидации не осталось ни одного рецепта')
	}

	await db.recipes.bulkPut(recipes)
	localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION)
	invalidateIngredientCatalogCache()
}
