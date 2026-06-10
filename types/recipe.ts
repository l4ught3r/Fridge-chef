/**
 * Формат записи в public/data/recipes.json.
 * ingredients.name — канон из MASTER_INGREDIENTS (@/lib/ingredients).
 */
export type AmountUnit = 'g' | 'ml' | 'pcs' | 'tsp' | 'tbsp'

export interface RecipeIngredientAmount {
	value: number
	unit: AmountUnit
	raw?: string
	/** Текстовая подпись вместо числа (по вкусу, щепотка). */
	display?: string
}

export interface RecipeIngredient {
	name: string
	amount?: RecipeIngredientAmount
}

export interface RecipeJson {
	id: string
	name: string
	category: string
	image: string
	ingredients: RecipeIngredient[] | string[]
	instructions: string[]
	time: number
	servings: number
	difficulty: string
}

export interface StoredRecipe {
	id: string
	name: string
	image: string
	ingredients: RecipeIngredient[]
	steps: string[]
	category: string
	categories: string[]
	time: number
	servings: number
	difficulty: string
}

export interface IngredientMatchResult {
	available: string[]
	missing: string[]
	matchPercent: number
}

export interface Recipe extends StoredRecipe, IngredientMatchResult {
	availableIngredients: string[]
	missingIngredients: string[]
	timeLabel: string
	isFavorite?: boolean
}

export function getIngredientNames(ingredients: RecipeIngredient[]): string[] {
	return ingredients.map(item => item.name)
}

/** Сначала продукты из холодильника, затем остальные (порядок внутри групп сохраняется). */
export function sortIngredientsByAvailability(
	ingredients: RecipeIngredient[],
	availableNames: readonly string[]
): RecipeIngredient[] {
	const availableSet = new Set(availableNames)
	const available: RecipeIngredient[] = []
	const missing: RecipeIngredient[] = []

	for (const ingredient of ingredients) {
		if (availableSet.has(ingredient.name)) {
			available.push(ingredient)
		} else {
			missing.push(ingredient)
		}
	}

	return [...available, ...missing]
}
