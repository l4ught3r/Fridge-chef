import { normalizeRecipeIngredients } from '@/lib/ingredients'
import { isAllowedCategory } from '@/lib/recipe-categories'
import type { RecipeJson, StoredRecipe } from '@/types/recipe'

export function mapJsonToStored(recipe: RecipeJson): StoredRecipe | null {
	const ingredients = normalizeRecipeIngredients(recipe.ingredients)
	if (ingredients.length === 0) {
		console.warn(`[seed] Пропуск рецепта ${recipe.id}: нет допустимых ингредиентов`)
		return null
	}

	if (!isAllowedCategory(recipe.category)) {
		console.warn(
			`[seed] Рецепт ${recipe.id}: неизвестная category "${recipe.category}", оставляем как есть`
		)
	}

	const dropped = recipe.ingredients.length - ingredients.length
	if (dropped > 0) {
		console.warn(
			`[seed] Рецепт ${recipe.id}: нормализовано ингредиентов ${recipe.ingredients.length} → ${ingredients.length}`
		)
	}

	return {
		id: recipe.id,
		name: recipe.name,
		image: recipe.image,
		ingredients,
		steps: recipe.instructions,
		category: recipe.category,
		categories: [recipe.category],
		time: recipe.time,
		servings: recipe.servings,
		difficulty: recipe.difficulty
	}
}
