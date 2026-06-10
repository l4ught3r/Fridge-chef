'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { getIngredientTagStyles } from '@/lib/design/ingredient-tags'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export function PantryBadge() {
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const count = selectedIngredients.length
	const [open, setOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const listId = useId()

	useEffect(() => {
		if (!open) return

		const handlePointerDown = (event: MouseEvent) => {
			if (containerRef.current?.contains(event.target as Node)) return
			setOpen(false)
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false)
		}

		document.addEventListener('mousedown', handlePointerDown)
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('mousedown', handlePointerDown)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [open])

	return (
		<div
			ref={containerRef}
			className='relative'
		>
			<button
				type='button'
				onClick={() => setOpen(prev => !prev)}
				aria-expanded={open}
				aria-controls={listId}
				aria-haspopup='listbox'
				className={cn(
					'fc-interactive fc-press flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 font-mono text-xs font-extrabold text-[#E95B3C] shadow-sm hover:border-[#E95B3C]/40 hover:shadow-md',
					open && 'border-[#E95B3C]/50 shadow-md ring-2 ring-orange-100'
				)}
			>
				<span className='relative flex size-2'>
					<span
						className={cn(
							'absolute inline-flex size-full rounded-full opacity-75',
							count > 0 ? 'animate-ping bg-[#E95B3C]' : 'bg-slate-400'
						)}
					/>
					<span
						className={cn(
							'relative inline-flex size-2 rounded-full',
							count > 0 ? 'bg-[#E95B3C]' : 'bg-slate-400'
						)}
					/>
				</span>
				<span className='sm:hidden'>{count}</span>
				<span className='hidden sm:inline'>В холодильнике: {count}</span>
				<ChevronDown
					className={cn(
						'size-3.5 shrink-0 transition-transform duration-150 ease-[var(--ease-out)]',
						open && 'rotate-180'
					)}
					aria-hidden
				/>
			</button>

			{open && (
				<div
					id={listId}
					role='listbox'
					aria-label='Продукты в холодильнике'
					className='fc-popover absolute top-[calc(100%+0.5rem)] right-0 left-0 z-50 w-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-xl shadow-gray-300/50 ring-1 ring-black/5 sm:left-auto sm:w-[min(calc(100vw-2rem),18rem)]'
				>
					<p className='mb-3 font-mono text-[10px] font-bold tracking-wider text-[#E95B3C] uppercase'>
						Ваш холодильник
					</p>

					{count === 0 ? (
						<p className='text-xs font-semibold leading-relaxed text-gray-600'>
							Пока пусто. Добавьте продукты на главной странице.
						</p>
					) : (
						<ul className='flex max-h-52 flex-wrap gap-2 overflow-y-auto'>
							{selectedIngredients.map((item, idx) => {
								const tagStyles = getIngredientTagStyles(idx)
								return (
									<li key={item}>
										<span
											className={cn(
												'inline-flex rounded-full border px-3 py-1.5 text-xs font-bold shadow-sm',
												tagStyles.bg,
												tagStyles.text,
												tagStyles.border
											)}
										>
											{item}
										</span>
									</li>
								)
							})}
						</ul>
					)}
				</div>
			)}
		</div>
	)
}
