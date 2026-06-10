export { CHIP_INGREDIENTS, MASTER_INGREDIENTS } from '@/lib/ingredients'
export { ALL_RECIPE_CATEGORIES, CATALOG_CATEGORIES } from '@/lib/recipe-categories'

export const QUICK_INGREDIENTS = [
	'Яйца',
	'Молоко',
	'Сыр',
	'Курица',
	'Картофель',
	'Лук',
	'Помидоры',
	'Мука'
] as const

export const QUICK_SUGGESTION_CATEGORIES = [
	{
		category: '🥩 Мясо и белки',
		items: ['Курица', 'Ветчина', 'Говядина', 'Фарш', 'Лосось', 'Яйца']
	},
	{
		category: '🥦 Овощи и зелень',
		items: ['Картофель', 'Помидоры', 'Лук', 'Чеснок', 'Баклажаны', 'Грибы', 'Морковь', 'Зелень']
	},
	{
		category: '🧀 Молочные продукты',
		items: ['Сыр', 'Молоко', 'Сметана', 'Сливочное масло', 'Сливки']
	},
	{
		category: '🥖 Бакалея и соусы',
		items: ['Макароны', 'Рис', 'Мука', 'Томатная паста', 'Хлеб', 'Оливковое масло']
	}
] as const

export const ROULETTE_STAGES = [
	'🤔 Заглядываем на дальние полки...',
	'🥚 Проверяем контейнер для яиц...',
	'🥩 Оцениваем запас мяса...',
	'🥦 Вспомнили про зелень в ящике!',
	'✨ Шеф-повар подбирает соус...',
	'🍳 Зажигаем плиту...'
] as const

export const DIFFICULTY_ORDER: Record<string, number> = {
	Легко: 0,
	Средне: 1,
	Сложно: 2
}

export const RECENT_RECIPES_KEY = 'fridge-chef-recent'
export const MAX_RECENT_RECIPES = 5
export const HOME_SHORTCUT_COUNT = 3
