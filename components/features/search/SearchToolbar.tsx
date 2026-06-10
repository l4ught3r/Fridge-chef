'use client'

import { useRef } from 'react'
import { orderedCategoriesWithCounts } from '@/lib/recipe-categories'
import type { SearchSortMode } from '@/lib/recipe-sort'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const SORT_OPTIONS: { id: SearchSortMode; label: string }[] = [
	{ id: 'match', label: 'Совпадение' },
	{ id: 'time', label: 'Быстрее' },
	{ id: 'easy', label: 'Проще' }
]

interface SearchToolbarProps {
	categoryCounts: Record<string, number>
}

function categoryChipClass(active: boolean) {
	return cn(
		'fc-interactive fc-press inline-flex shrink-0 cursor-pointer snap-start items-center gap-1.5 rounded-full border px-3 py-2 text-[11px] font-bold sm:py-1.5',
		active
			? 'border-[#E95B3C] bg-[#E95B3C] text-white shadow-sm'
			: 'border-gray-200 bg-white text-gray-600 shadow-xs hover:border-orange-100 hover:bg-orange-50/5 hover:text-[#E95B3C]'
	)
}

function categoryCountClass(active: boolean) {
	return cn(
		'rounded-full px-1.5 py-0.5 text-[9px] font-extrabold tabular-nums',
		active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
	)
}

function handleTabKeyDown(
	event: React.KeyboardEvent<HTMLButtonElement>,
	index: number,
	count: number,
	focusTab: (nextIndex: number) => void
) {
	if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
		event.preventDefault()
		focusTab((index + 1) % count)
		return
	}
	if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
		event.preventDefault()
		focusTab((index - 1 + count) % count)
	}
}

export function SearchToolbar({ categoryCounts }: SearchToolbarProps) {
	const searchSort = useAppStore(state => state.searchSort)
	const setSearchSort = useAppStore(state => state.setSearchSort)
	const searchCategory = useAppStore(state => state.searchCategory)
	const setSearchCategory = useAppStore(state => state.setSearchCategory)
	const sortTabRefs = useRef<(HTMLButtonElement | null)[]>([])
	const categoryTabRefs = useRef<(HTMLButtonElement | null)[]>([])

	const categories = orderedCategoriesWithCounts(categoryCounts)
	const showCategories = categories.length > 0
	const categoryTabs = [{ name: null as string | null, count: 0 }, ...categories.map(c => c)]

	const focusSortTab = (index: number) => {
		sortTabRefs.current[index]?.focus()
	}

	const focusCategoryTab = (index: number) => {
		categoryTabRefs.current[index]?.focus()
	}

	return (
		<div className='mb-3 w-full min-w-0 shrink-0 space-y-3'>
			<div
				className='flex rounded-2xl border border-gray-200 bg-gray-50 p-0.5'
				role='tablist'
				aria-label='Сортировка рецептов'
			>
				{SORT_OPTIONS.map((option, index) => (
					<button
						key={option.id}
						ref={element => {
							sortTabRefs.current[index] = element
						}}
						type='button'
						role='tab'
						tabIndex={searchSort === option.id ? 0 : -1}
						aria-selected={searchSort === option.id}
						aria-controls='recipes_results_list'
						onClick={() => setSearchSort(option.id)}
						onKeyDown={event => handleTabKeyDown(event, index, SORT_OPTIONS.length, focusSortTab)}
						className={cn(
							'min-h-10 flex-1 cursor-pointer rounded-[14px] px-2 py-2.5 font-mono text-[11px] font-bold transition-colors',
							searchSort === option.id
								? 'bg-white text-[#E95B3C] shadow-sm'
								: 'text-gray-500 hover:text-gray-800'
						)}
					>
						{option.label}
					</button>
				))}
			</div>

			{showCategories && (
				<div className='space-y-2'>
					<p className='font-mono text-[10px] font-bold tracking-wider text-gray-400 uppercase'>
						Категория
					</p>
					<div className='fc-scroll-fade-x -mx-1 sm:mx-0'>
						<div
							className='flex gap-1.5 overflow-x-auto px-1 pb-1 snap-x sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0'
							role='tablist'
							aria-label='Категории рецептов'
						>
							{categoryTabs.map(({ name, count }, index) => {
								const active = searchCategory === name
								const label = name ?? 'Все'
								return (
									<button
										key={label}
										ref={element => {
											categoryTabRefs.current[index] = element
										}}
										type='button'
										role='tab'
										tabIndex={active ? 0 : -1}
										aria-selected={active}
										aria-controls='recipes_results_list'
										onClick={() => setSearchCategory(name)}
										onKeyDown={event =>
											handleTabKeyDown(event, index, categoryTabs.length, focusCategoryTab)
										}
										className={categoryChipClass(active)}
									>
										<span>{label}</span>
										{name && <span className={categoryCountClass(active)}>{count}</span>}
									</button>
								)
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
