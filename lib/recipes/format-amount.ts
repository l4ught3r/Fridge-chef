import type { AmountUnit, RecipeIngredientAmount } from '@/types/recipe'

export function formatIngredientAmount(amount: RecipeIngredientAmount, ratio = 1): string {
	if (amount.display) return amount.display

	const value = scaleAmountValue(amount.value, ratio)
	const unitLabels: Record<AmountUnit, string> = {
		g: 'г',
		ml: 'мл',
		pcs: 'шт.',
		tsp: 'ч.л.',
		tbsp: 'ст.л.'
	}
	return `${value} ${unitLabels[amount.unit]}`
}

export function scaleAmountValue(value: number, ratio: number): number {
	const calculated = value * ratio
	return calculated % 1 === 0 ? calculated : Math.round(calculated * 10) / 10
}
