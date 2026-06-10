'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { getIngredientTagStyles } from '@/lib/design/ingredient-tags'
import { useAppStore } from '@/lib/store'

export function IngredientTagList() {
	const reduceMotion = useReducedMotion()
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const removeIngredient = useAppStore(state => state.removeIngredient)

	if (selectedIngredients.length === 0) return null

	return (
		<div className='space-y-3'>
			<p className='font-mono text-[11px] font-bold tracking-wider text-gray-400 uppercase'>
				Ваш холодильник сейчас:
			</p>
			<div className='flex min-h-12 flex-wrap gap-2 rounded-2xl border border-gray-150 bg-gray-50/50 p-4'>
				<AnimatePresence>
					{selectedIngredients.map((item, idx) => {
						const tagStyles = getIngredientTagStyles(idx)
						return (
							<motion.span
								key={item}
								initial={reduceMotion ? false : { scale: 0.95, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={reduceMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
								transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
								className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold shadow-sm ${tagStyles.bg} ${tagStyles.text} ${tagStyles.border}`}
							>
								{item}
								<button
									type='button'
									onClick={() => removeIngredient(item)}
									className='fc-press fc-hover-scale rounded-full bg-white/20 p-0.5 transition-transform duration-150 ease-[var(--ease-out)] hover:text-black active:scale-95'
									aria-label={`Убрать ${item}`}
								>
									<X className='size-3' />
								</button>
							</motion.span>
						)
					})}
				</AnimatePresence>
			</div>
		</div>
	)
}
