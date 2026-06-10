import { db } from '@/lib/db'
import { normalizeIngredient } from '@/lib/utils'

let catalogCache: string[] | null = null

export function invalidateIngredientCatalogCache(): void {
	catalogCache = null
}

async function getIngredientCatalog(): Promise<string[]> {
	if (catalogCache) return catalogCache
	const recipes = await db.recipes.toArray()
	const set = new Set<string>()
	for (const recipe of recipes) {
		for (const ingredient of recipe.ingredients) {
			set.add(ingredient.name)
		}
	}
	catalogCache = [...set]
	return catalogCache
}

function levenshtein(a: string, b: string): number {
	if (a === b) return 0
	if (a.length === 0) return b.length
	if (b.length === 0) return a.length
	const matrix: number[][] = Array.from({ length: a.length + 1 }, () => [])
	for (let i = 0; i <= a.length; i++) matrix[i][0] = i
	for (let j = 0; j <= b.length; j++) matrix[0][j] = j
	for (let i = 1; i <= a.length; i++) {
		for (let j = 1; j <= b.length; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1
			matrix[i][j] = Math.min(
				matrix[i - 1][j] + 1,
				matrix[i][j - 1] + 1,
				matrix[i - 1][j - 1] + cost
			)
		}
	}
	return matrix[a.length][b.length]
}

export async function suggestIngredientAlternatives(
	userProducts: string[],
	limit = 4
): Promise<string[]> {
	if (userProducts.length === 0) return []

	const catalog = await getIngredientCatalog()
	const suggestions = new Set<string>()

	for (const product of userProducts) {
		const normalized = normalizeIngredient(product)
		if (!normalized) continue

		for (const candidate of catalog) {
			const candidateNorm = normalizeIngredient(candidate)
			if (!candidateNorm || candidateNorm === normalized) continue
			if (candidateNorm.includes(normalized) || normalized.includes(candidateNorm)) continue

			const distance = levenshtein(normalized, candidateNorm)
			const maxLen = Math.max(normalized.length, candidateNorm.length)
			if (distance <= 2 && distance / maxLen < 0.45) {
				suggestions.add(candidate)
			}
		}
	}

	return [...suggestions].slice(0, limit)
}
