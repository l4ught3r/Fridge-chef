export type RecipeFrom = 'home' | 'search' | 'favorites'

export function recipeHref(id: string, from: RecipeFrom = 'search'): string {
	return `/recipes/${id}?from=${from}`
}

export function getRecipeBack(from: RecipeFrom | null | undefined): {
	href: string
	label: string
} {
	if (from === 'home') {
		return { href: '/', label: 'На главную' }
	}
	if (from === 'favorites') {
		return { href: '/favorites', label: 'К избранному' }
	}
	return { href: '/search', label: 'К рецептам' }
}

export function parseRecipeFrom(value: string | null | undefined): RecipeFrom {
	if (value === 'home') return 'home'
	if (value === 'favorites') return 'favorites'
	return 'search'
}
