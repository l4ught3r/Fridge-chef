import { db } from '@/lib/db'

const PANTRY_ID = 'default'

export async function loadPantryIngredients(): Promise<string[]> {
	const record = await db.pantry.get(PANTRY_ID)
	return record?.ingredients ?? []
}

export async function savePantryIngredients(ingredients: string[]): Promise<void> {
	await db.pantry.put({ id: PANTRY_ID, ingredients })
}
