import Dexie, { type Table } from 'dexie'
import type { StoredRecipe } from '@/types/recipe'

export interface Favorite {
	id?: number
	recipeId: string
	addedAt: number
}

export interface PantryRecord {
	id: string
	ingredients: string[]
}

export class FridgeChefDB extends Dexie {
	recipes!: Table<StoredRecipe, string>
	favorites!: Table<Favorite, number>
	pantry!: Table<PantryRecord, string>

	constructor() {
		super('FridgeChefDB')
		this.version(1).stores({
			recipes: 'id, name, category, *categories',
			favorites: '++id, recipeId, addedAt'
		})
		this.version(2).stores({
			recipes: 'id, name, category, *categories',
			favorites: '++id, recipeId, addedAt',
			pantry: 'id'
		})
	}
}

export const db = new FridgeChefDB()
