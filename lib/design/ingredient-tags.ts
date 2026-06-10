export interface IngredientTagStyle {
	bg: string
	text: string
	border: string
}

const INGREDIENT_TAG_STYLES: IngredientTagStyle[] = [
	{ bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]', border: 'border-[#fecaca]' },
	{ bg: 'bg-[#DCFCE7]', text: 'text-[#166534]', border: 'border-[#bbf7d0]' },
	{ bg: 'bg-[#FEF9C3]', text: 'text-[#854D0E]', border: 'border-[#fef08a]' },
	{ bg: 'bg-[#E0E7FF]', text: 'text-[#3730A3]', border: 'border-[#c7d2fe]' },
	{ bg: 'bg-[#FFE4E6]', text: 'text-[#9F1239]', border: 'border-[#fecdd3]' },
	{ bg: 'bg-[#ECFDF5]', text: 'text-[#065F46]', border: 'border-[#a7f3d0]' }
]

export function getIngredientTagStyles(index: number): IngredientTagStyle {
	return INGREDIENT_TAG_STYLES[index % INGREDIENT_TAG_STYLES.length]
}
