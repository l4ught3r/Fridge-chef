import { z } from 'zod'
import type { RecipeJson } from '@/types/recipe'

const amountUnitSchema = z.enum(['g', 'ml', 'pcs', 'tsp', 'tbsp'])

const recipeIngredientAmountSchema = z.object({
	value: z.number(),
	unit: amountUnitSchema,
	raw: z.string().optional(),
	display: z.string().optional()
})

const recipeIngredientSchema = z.object({
	name: z.string().trim().min(1),
	amount: recipeIngredientAmountSchema.optional()
})

export const recipeJsonSchema = z.object({
	id: z.string().trim().min(1),
	name: z.string().trim().min(1),
	category: z.string().trim().min(1),
	image: z.string().trim().min(1),
	ingredients: z.array(z.union([recipeIngredientSchema, z.string().trim().min(1)])).min(1),
	instructions: z.array(z.string().trim().min(1)).min(1),
	time: z.number().nonnegative(),
	servings: z.number().positive(),
	difficulty: z.string().trim().min(1)
})

export type ValidatedRecipeJson = z.infer<typeof recipeJsonSchema>

export function parseRecipesCatalog(data: unknown): RecipeJson[] {
	if (!Array.isArray(data)) {
		throw new Error('recipes.json должен быть массивом рецептов')
	}

	const valid: RecipeJson[] = []
	let skipped = 0

	for (let index = 0; index < data.length; index++) {
		const result = recipeJsonSchema.safeParse(data[index])
		if (result.success) {
			valid.push(result.data as RecipeJson)
			continue
		}

		skipped++
		const id =
			typeof data[index] === 'object' &&
			data[index] !== null &&
			'id' in data[index] &&
			typeof (data[index] as { id: unknown }).id === 'string'
				? (data[index] as { id: string }).id
				: `#${index}`
		console.warn(`[seed] Пропуск рецепта ${id}:`, result.error.issues[0]?.message)
	}

	if (valid.length === 0) {
		throw new Error('Ни одна запись в recipes.json не прошла валидацию')
	}

	if (skipped > 0) {
		console.warn(`[seed] Пропущено записей при валидации: ${skipped}`)
	}

	return valid
}
