'use client'

import { FindRecipesButton } from '@/components/features/home/FindRecipesButton'
import { RandomRecipeButton } from '@/components/features/home/RandomRecipeButton'
import { IngredientPanel } from '@/components/features/ingredients/IngredientPanel'

interface IngredientInputProps {
	centered?: boolean
	compact?: boolean
}

export function IngredientInput({ compact = false }: IngredientInputProps) {
	if (compact) {
		return <IngredientPanel compact />
	}

	return (
		<IngredientPanel showActions>
			<FindRecipesButton />
			<RandomRecipeButton />
		</IngredientPanel>
	)
}
