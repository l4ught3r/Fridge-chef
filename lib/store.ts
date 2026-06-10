import { create } from 'zustand'
import { resolveIngredient } from '@/lib/ingredients'
import type { SearchSortMode } from '@/lib/recipe-sort'

interface AppState {
	selectedIngredients: string[]
	inputValue: string
	pantryHydrated: boolean
	searchSort: SearchSortMode
	searchCategory: string | null
	addIngredient: (ingredient: string) => void
	removeIngredient: (ingredient: string) => void
	toggleIngredient: (ingredient: string) => void
	clearIngredients: () => void
	setInputValue: (value: string) => void
	setSelectedIngredients: (ingredients: string[]) => void
	setPantryHydrated: (value: boolean) => void
	setSearchSort: (mode: SearchSortMode) => void
	setSearchCategory: (category: string | null) => void
}

export const useAppStore = create<AppState>(set => ({
	selectedIngredients: [],
	inputValue: '',
	pantryHydrated: false,
	searchSort: 'match',
	searchCategory: null,
	addIngredient: ingredient =>
		set(state => {
			const resolved = resolveIngredient(ingredient)
			if (!resolved || state.selectedIngredients.includes(resolved)) return state
			return { selectedIngredients: [...state.selectedIngredients, resolved] }
		}),
	removeIngredient: ingredient =>
		set(state => ({
			selectedIngredients: state.selectedIngredients.filter(i => i !== ingredient)
		})),
	toggleIngredient: ingredient =>
		set(state => {
			if (state.selectedIngredients.includes(ingredient)) {
				return {
					selectedIngredients: state.selectedIngredients.filter(i => i !== ingredient)
				}
			}
			return { selectedIngredients: [...state.selectedIngredients, ingredient] }
		}),
	clearIngredients: () => set({ selectedIngredients: [] }),
	setInputValue: value => set({ inputValue: value }),
	setSelectedIngredients: ingredients => set({ selectedIngredients: ingredients }),
	setPantryHydrated: value => set({ pantryHydrated: value }),
	setSearchSort: mode => set({ searchSort: mode }),
	setSearchCategory: category => set({ searchCategory: category })
}))
