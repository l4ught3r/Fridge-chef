import type { RecipeIngredient } from '@/types/recipe'

/** Канонические названия для поиска и recipes.json (без кастомного ввода). */
export const MASTER_INGREDIENTS = [
	'Авокадо',
	'Аджика',
	'Апельсин',
	'Бадьян',
	'Базилик',
	'Баклажаны',
	'Бальзамический уксус',
	'Бананы',
	'Баранина',
	'Барбарис',
	'Бекон',
	'Белое вино',
	'Брокколи',
	'Бульон',
	'Булгур',
	'Булочки',
	'Ванилин',
	'Ваниль',
	'Ветчина',
	'Вода',
	'Вустерский соус',
	'Газированная вода',
	'Галангал',
	'Гвоздика',
	'Говядина',
	'Говяжья вырезка',
	'Горошек зелёный',
	'Горошек консервированный',
	'Горчица',
	'Гречка',
	'Грецкие орехи',
	'Грибы',
	'Дрожжи',
	'Желатин',
	'Зелень',
	'Зира',
	'Изюм',
	'Имбирь',
	'Индейка',
	'Йогурт',
	'Кабачки',
	'Какао',
	'Каперсы',
	'Капуста',
	'Капуста квашеная',
	'Кардамон',
	'Карри',
	'Картофель',
	'Квас',
	'Кетчуп',
	'Кефир',
	'Кинза',
	'Клубника',
	'Клюква',
	'Кленовый сироп',
	'Кокосовое молоко',
	'Колбаса вареная',
	'Корица',
	'Кофе',
	'Креветки',
	'Крахмал',
	'Красное вино',
	'Красный лук',
	'Курица',
	'Куриная грудка',
	'Куриные крылышки',
	'Куркума',
	'Кумин',
	'Кукуруза',
	'Кукуруза консервированная',
	'Кунжут',
	'Лаваш',
	'Лавровый лист',
	'Лед',
	'Лайм',
	'Лемонграсс',
	'Лимон',
	'Лимонный сок',
	'Листья каффир-лайма',
	'Лосось',
	'Лук',
	'Лук-шалот',
	'Майонез',
	'Макароны',
	'Манка',
	'Маскарпоне',
	'Маслины',
	'Мед',
	'Мидии',
	'Миндаль',
	'Моцарелла',
	'Молоко',
	'Морковь',
	'Мускатный орех',
	'Мука',
	'Мюсли',
	'Мясо на кости',
	'Мята',
	'Нут',
	'Овсянка',
	'Овсяные хлопья',
	'Огурцы',
	'Огурцы соленые',
	'Оливки',
	'Оливковое масло',
	'Орегано',
	'Орехи',
	'Паприка',
	'Пармезан',
	'Паста том ям',
	'Пепперони',
	'Перец болгарский',
	'Перец душистый',
	'Перец чёрный',
	'Перловка',
	'Петрушка',
	'Печенье',
	'Помидоры',
	'Пшено',
	'Разрыхлитель',
	'Рассол',
	'Растительное масло',
	'Редис',
	'Рикотта',
	'Рис',
	'Рис арборио',
	'Рис девзира',
	'Розмарин',
	'Рыба',
	'Рыбный соус',
	'Салат',
	'Сахар',
	'Свекла',
	'Свинина',
	'Сельдерей',
	'Сельдь',
	'Семена подсолнечника',
	'Сливки',
	'Сливочное масло',
	'Сливочный сыр',
	'Сметана',
	'Соевый соус',
	'Соль',
	'Соус цезарь',
	'Соус чесночный',
	'Сосиски',
	'Сухари',
	'Сыр',
	'Тахини',
	'Творог',
	'Тимьян',
	'Томатная паста',
	'Томатный соус',
	'Тортильи',
	'Тофу',
	'Треска',
	'Тунец',
	'Тунец консервированный',
	'Тыква',
	'Укроп',
	'Уксус',
	'Фарш',
	'Фасоль',
	'Фасоль консервированная',
	'Форель',
	'Хлеб',
	'Хмели-сунели',
	'Чай',
	'Чеснок',
	'Чечевица',
	'Чиабатта',
	'Чили',
	'Шампиньоны',
	'Шоколад',
	'Шпинат',
	'Яблоки',
	'Ягоды',
	'Яйца'
] as const

export type MasterIngredient = (typeof MASTER_INGREDIENTS)[number]

/** Категории блюд для recipes.json */
/** Чипы UI — подмножество MASTER (дословные строки). */
export const CHIP_INGREDIENTS = [
	'Курица',
	'Ветчина',
	'Говядина',
	'Фарш',
	'Лосось',
	'Яйца',
	'Картофель',
	'Помидоры',
	'Лук',
	'Чеснок',
	'Баклажаны',
	'Грибы',
	'Морковь',
	'Зелень',
	'Сыр',
	'Молоко',
	'Сметана',
	'Сливочное масло',
	'Сливки',
	'Макароны',
	'Рис',
	'Мука',
	'Томатная паста',
	'Хлеб',
	'Оливковое масло'
] as const

/** Синонимы из старого recipes.json и разговорных названий → канон. */
export const INGREDIENT_ALIASES: Record<string, MasterIngredient | string> = {
	'говяжий фарш': 'Фарш',
	'фарш индейки': 'Фарш',
	'куриное филе': 'Курица',
	спагетти: 'Макароны',
	пенне: 'Макароны',
	'листы лазаньи': 'Макароны',
	лапша: 'Макароны',
	'рисовая лапша': 'Макароны',
	'помидоры черри': 'Помидоры',
	'салат айсберг': 'Салат',
	яйцо: 'Яйца',
	желток: 'Яйца',
	желтки: 'Яйца',
	'сыр пармезан': 'Пармезан',
	'сыр моцарелла': 'Моцарелла',
	'сыр сливочный': 'Сливочный сыр',
	'сыр сулугуни': 'Сыр',
	'сыр фета': 'Сыр',
	'масло растительное': 'Растительное масло',
	мёд: 'Мед',
	огурец: 'Огурцы',
	'огурец соленый': 'Огурцы соленые',
	'соленые огурцы': 'Огурцы соленые',
	яблоко: 'Яблоки',
	банан: 'Бананы',
	перец: 'Перец чёрный',
	'черный перец': 'Перец чёрный',
	'зеленый горошек': 'Горошек зелёный',
	томаты: 'Помидоры',
	'слабосоленый лосось': 'Лосось',
	сухарики: 'Сухари',
	'печенье савоярди': 'Печенье',
	'темный шоколад': 'Шоколад',
	'кофе эспрессо': 'Кофе',
	'черный чай': 'Чай',
	'филе рыбы': 'Рыба',
	'белокочанная капуста': 'Капуста',
	шампиньоны: 'Грибы',
	кальмар: 'Креветки',
	клюква: 'Ягоды',
	апельсин: 'Апельсин',
	лимон: 'Лимон',
	лайм: 'Лайм',
	'бульон куриный': 'Бульон',
	ткемали: 'Аджика',
	'соевый соус': 'Соевый соус',
	'оливковое масло extra virgin': 'Оливковое масло',
	мед: 'Мед',
	'сметана 20': 'Сметана',
	кефир: 'Кефир',
	'йогурт греческий': 'Йогурт',
	'куриная грудка': 'Куриная грудка',
	индейка: 'Индейка',
	бекон: 'Бекон',
	ветчина: 'Ветчина'
}

const masterByKey = new Map<string, MasterIngredient>()
for (const name of MASTER_INGREDIENTS) {
	masterByKey.set(ingredientKey(name), name)
}

const aliasByKey = new Map<string, string>()
for (const [alias, target] of Object.entries(INGREDIENT_ALIASES)) {
	aliasByKey.set(ingredientKey(alias), target)
}

export function ingredientKey(value: string): string {
	return value.toLowerCase().trim().replace(/ё/g, 'е').replace(/\s+/g, ' ')
}

/** Приводит ввод или название из JSON к каноническому MASTER или null. */
export function resolveIngredient(value: string): MasterIngredient | null {
	const trimmed = value.trim()
	if (!trimmed) return null

	const key = ingredientKey(trimmed)
	const fromMaster = masterByKey.get(key)
	if (fromMaster) return fromMaster

	const fromAlias = aliasByKey.get(key)
	if (fromAlias && masterByKey.has(ingredientKey(fromAlias))) {
		return masterByKey.get(ingredientKey(fromAlias)) ?? null
	}

	return null
}

export function isAllowedIngredient(value: string): boolean {
	return resolveIngredient(value) !== null
}

/** Нормализует список ингредиентов рецепта: канон + без дублей, сохраняет amount. */
export function normalizeRecipeIngredients(
	ingredients: Array<string | RecipeIngredient>
): RecipeIngredient[] {
	const result: RecipeIngredient[] = []
	const seen = new Set<string>()

	for (const raw of ingredients) {
		const item: RecipeIngredient = typeof raw === 'string' ? { name: raw } : raw
		const resolved = resolveIngredient(item.name)
		if (!resolved) continue
		const key = ingredientKey(resolved)
		if (seen.has(key)) continue
		seen.add(key)
		const entry: RecipeIngredient = { name: resolved }
		if (item.amount) {
			entry.amount = item.amount
		}
		result.push(entry)
	}

	return result
}

/** @deprecated Используйте normalizeRecipeIngredients — возвращает только имена. */
export function normalizeRecipeIngredientNames(ingredients: string[]): MasterIngredient[] {
	return normalizeRecipeIngredients(ingredients).map(item => item.name as MasterIngredient)
}

export function searchMasterIngredients(query: string, limit = 12): MasterIngredient[] {
	const q = ingredientKey(query)
	if (!q) return [...MASTER_INGREDIENTS].slice(0, limit)

	return MASTER_INGREDIENTS.filter(name => ingredientKey(name).includes(q)).slice(0, limit)
}
