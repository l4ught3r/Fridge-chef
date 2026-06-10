/** Все допустимые категории рецептов (для валидации при seed). */
export const ALL_RECIPE_CATEGORIES = [
	'Салаты',
	'Супы',
	'Паста',
	'Завтраки',
	'Десерты',
	'Выпечка',
	'Закуски',
	'Горячее',
	'Гарниры',
	'Каши и крупы',
	'Рыба и морепродукты',
	'Мясные блюда',
	'Вегетарианское',
	'Омлеты и яйца',
	'Блины и оладьи',
	'Запеканки',
	'Пицца',
	'Сэндвичи',
	'Соусы и заправки',
	'Напитки',
	'Снеки',
	'Гриль и шашлычки',
	'Фастфуд',
	'Заготовки'
] as const

/** Категории, реально присутствующие в public/data/recipes.json (порядок для UI). */
export const CATALOG_CATEGORIES = [
	'Завтраки',
	'Закуски',
	'Паста',
	'Горячее',
	'Мясные блюда',
	'Рыба и морепродукты',
	'Вегетарианское',
	'Гарниры',
	'Десерты'
] as const

export type CatalogCategory = (typeof CATALOG_CATEGORIES)[number]

export function isAllowedCategory(category: string): boolean {
	return (ALL_RECIPE_CATEGORIES as readonly string[]).includes(category)
}

export function buildCategoryCounts(
	recipes: readonly { category: string }[]
): Record<string, number> {
	const counts: Record<string, number> = {}
	for (const recipe of recipes) {
		counts[recipe.category] = (counts[recipe.category] ?? 0) + 1
	}
	return counts
}

export function orderedCategoriesWithCounts(
	counts: Record<string, number>
): { name: CatalogCategory; count: number }[] {
	return CATALOG_CATEGORIES.filter(category => (counts[category] ?? 0) > 0).map(category => ({
		name: category,
		count: counts[category]
	}))
}
