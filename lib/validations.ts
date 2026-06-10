import { z } from 'zod'

export const ingredientInputSchema = z.object({
	value: z.string().trim().min(1, 'Введите название продукта').max(80, 'Слишком длинное название')
})

export type IngredientInputValues = z.infer<typeof ingredientInputSchema>
