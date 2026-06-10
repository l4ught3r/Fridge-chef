'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Search, Sparkles } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MASTER_INGREDIENTS, resolveIngredient, searchMasterIngredients } from '@/lib/ingredients'
import { useAppStore } from '@/lib/store'
import { toast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import { type IngredientInputValues, ingredientInputSchema } from '@/lib/validations'

interface IngredientAddFormProps {
	id?: string
}

export function IngredientAddForm({ id = 'ingredient_bar_input' }: IngredientAddFormProps) {
	const listboxId = useId()
	const containerRef = useRef<HTMLFormElement>(null)
	const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
	const addIngredient = useAppStore(state => state.addIngredient)
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const setInputValue = useAppStore(state => state.setInputValue)
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [highlightedIndex, setHighlightedIndex] = useState(0)

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		setError,
		clearErrors,
		formState: { errors }
	} = useForm<IngredientInputValues>({
		resolver: zodResolver(ingredientInputSchema),
		defaultValues: { value: '' },
		mode: 'onChange'
	})

	const inputValue = watch('value')
	const hasQuery = inputValue.trim().length > 0

	const suggestions = hasQuery
		? searchMasterIngredients(inputValue, 10)
		: MASTER_INGREDIENTS.slice(0, 10)

	const resolved = resolveIngredient(inputValue)
	const canAdd = resolved !== null
	const showDropdown = dropdownOpen && suggestions.length > 0

	useEffect(() => {
		if (!showDropdown) return
		optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
	}, [highlightedIndex, showDropdown])

	useEffect(() => {
		if (!dropdownOpen) return

		const handlePointerDown = (event: MouseEvent) => {
			if (containerRef.current?.contains(event.target as Node)) return
			setDropdownOpen(false)
		}

		document.addEventListener('mousedown', handlePointerDown)
		return () => document.removeEventListener('mousedown', handlePointerDown)
	}, [dropdownOpen])

	const pickSuggestion = (name: string) => {
		const match = resolveIngredient(name)
		if (match && selectedIngredients.includes(match)) {
			toast.info(`${match} уже в холодильнике`)
			return
		}
		addIngredient(name)
		setValue('value', '')
		setInputValue('')
		clearErrors()
		setDropdownOpen(false)
	}

	const onSubmit = (data: IngredientInputValues) => {
		const match = resolveIngredient(data.value)
		if (!match) {
			setError('value', { message: 'Выберите продукт из списка' })
			return
		}
		pickSuggestion(match)
	}

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (!showDropdown) {
			if (event.key === 'ArrowDown' && suggestions.length > 0) {
				event.preventDefault()
				setDropdownOpen(true)
			}
			return
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault()
			setHighlightedIndex(index => (index + 1) % suggestions.length)
			return
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault()
			setHighlightedIndex(index => (index - 1 + suggestions.length) % suggestions.length)
			return
		}

		if (event.key === 'Escape') {
			event.preventDefault()
			setDropdownOpen(false)
			return
		}

		if (event.key === 'Enter' && showDropdown) {
			const picked = suggestions[highlightedIndex]
			if (picked) {
				event.preventDefault()
				pickSuggestion(picked)
			}
		}
	}

	const { onChange, onBlur, ref, name } = register('value', {
		onChange: e => {
			setInputValue(e.target.value)
			setHighlightedIndex(0)
			setDropdownOpen(true)
		}
	})

	return (
		<form
			ref={containerRef}
			onSubmit={handleSubmit(onSubmit)}
			className='relative flex flex-col gap-2'
		>
			<div className='fc-interactive flex flex-col gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-1.5 shadow-inner focus-within:ring-4 focus-within:ring-orange-100/50 sm:flex-row'>
				<div className='relative min-w-0 flex-1'>
					<Search className='pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-gray-400' />
					<input
						id={id}
						ref={ref}
						name={name}
						type='text'
						role='combobox'
						aria-expanded={showDropdown}
						aria-controls={listboxId}
						aria-autocomplete='list'
						aria-activedescendant={
							showDropdown ? `${listboxId}-option-${highlightedIndex}` : undefined
						}
						placeholder='Выберите из списка: курица, рис, сыр…'
						autoComplete='off'
						className='w-full bg-transparent py-3 pr-4 pl-8 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none'
						onChange={onChange}
						onBlur={onBlur}
						onFocus={() => setDropdownOpen(true)}
						onKeyDown={handleInputKeyDown}
					/>
				</div>

				<button
					type='submit'
					id='add_ingredient_btn'
					disabled={!canAdd}
					className='fc-interactive fc-press flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#E95B3C] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#D14A2E] disabled:cursor-not-allowed disabled:opacity-45'
				>
					<Plus className='size-4' />
					Добавить
				</button>
			</div>

			{showDropdown && (
				<div
					id={listboxId}
					role='listbox'
					aria-label='Список продуктов'
					className='fc-popover relative z-10 mt-2 rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/5'
				>
					<div className='mb-3 flex items-center gap-2'>
						<Sparkles className='size-3.5 text-[#E95B3C]' />
						<p className='font-mono text-[10px] font-bold tracking-wider text-[#E95B3C] uppercase'>
							{hasQuery ? 'Подходящие продукты' : 'Популярные продукты'}
						</p>
					</div>

					<div className='max-h-56 overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50/60 p-1'>
						{suggestions.map((name, index) => {
							const active = highlightedIndex === index
							return (
								<button
									key={name}
									id={`${listboxId}-option-${index}`}
									ref={element => {
										optionRefs.current[index] = element
									}}
									type='button'
									role='option'
									aria-selected={active}
									onMouseDown={event => event.preventDefault()}
									onClick={() => pickSuggestion(name)}
									className={cn(
										'flex w-full cursor-pointer items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors',
										active
											? 'bg-white text-[#E95B3C] shadow-xs'
											: 'text-gray-700 hover:bg-white/90 hover:text-[#E95B3C]'
									)}
								>
									{name}
								</button>
							)
						})}
					</div>
				</div>
			)}

			{errors.value?.message && (
				<p className='px-1 text-xs font-semibold text-red-600'>{errors.value.message}</p>
			)}
		</form>
	)
}
