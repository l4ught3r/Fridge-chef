import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function normalizeIngredient(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}\s-]/gu, ' ')
		.replace(/\s+/g, ' ')
}

/** Русское склонение: 1 продукт, 2 продукта, 5 продуктов */
export function pluralize(count: number, one: string, few: string, many: string): string {
	const n = Math.abs(count) % 100
	const n1 = n % 10
	if (n > 10 && n < 20) return many
	if (n1 > 1 && n1 < 5) return few
	if (n1 === 1) return one
	return many
}

export function formatRecipeTime(minutes: number): string {
	if (minutes < 60) return `${minutes} мин`
	const hours = Math.floor(minutes / 60)
	const rest = minutes % 60
	return rest > 0 ? `${hours} ч ${rest} мин` : `${hours} ч`
}
