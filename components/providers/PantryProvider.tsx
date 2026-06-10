'use client'

import { type ReactNode, useEffect, useRef } from 'react'
import { resolveIngredient } from '@/lib/ingredients'
import { loadPantryIngredients, savePantryIngredients } from '@/lib/pantry'
import { useAppStore } from '@/lib/store'

interface PantryProviderProps {
	children: ReactNode
}

export function PantryProvider({ children }: PantryProviderProps) {
	const pantryHydrated = useAppStore(state => state.pantryHydrated)
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const setSelectedIngredients = useAppStore(state => state.setSelectedIngredients)
	const setPantryHydrated = useAppStore(state => state.setPantryHydrated)
	const skipNextSave = useRef(true)

	useEffect(() => {
		loadPantryIngredients()
			.then(ingredients => {
				const normalized = ingredients
					.map(item => resolveIngredient(item))
					.filter((item): item is NonNullable<typeof item> => item !== null)
				const unique = [...new Set(normalized)]
				if (unique.length > 0) {
					setSelectedIngredients(unique)
				}
			})
			.finally(() => {
				setPantryHydrated(true)
				skipNextSave.current = false
			})
	}, [setSelectedIngredients, setPantryHydrated])

	useEffect(() => {
		if (!pantryHydrated || skipNextSave.current) return
		savePantryIngredients(selectedIngredients).catch(console.error)
	}, [pantryHydrated, selectedIngredients])

	return <div className='flex min-h-0 flex-1 flex-col overflow-hidden'>{children}</div>
}
