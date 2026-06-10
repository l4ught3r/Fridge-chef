'use client'

import { AnimatePresence } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { CategorizedIngredientSuggestions } from '@/components/features/ingredients/CategorizedIngredientSuggestions'
import { IngredientAddForm } from '@/components/features/ingredients/IngredientAddForm'
import { IngredientEmptyState } from '@/components/features/ingredients/IngredientEmptyState'
import { IngredientTagList } from '@/components/features/ingredients/IngredientTagList'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { useAppStore } from '@/lib/store'
import { toast } from '@/lib/toast'
import { cn } from '@/lib/utils'

interface IngredientPanelProps {
	compact?: boolean
	showActions?: boolean
	children?: ReactNode
}

export function IngredientPanel({
	compact = false,
	showActions = false,
	children
}: IngredientPanelProps) {
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const clearIngredients = useAppStore(state => state.clearIngredients)
	const count = selectedIngredients.length
	const [clearOpen, setClearOpen] = useState(false)

	const handleClear = () => {
		clearIngredients()
		setClearOpen(false)
		toast.success('Холодильник очищен')
	}

	if (compact) {
		return (
			<div className='shrink-0 space-y-3 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-[2rem]'>
				<IngredientAddForm id='ingredient_bar_input_compact' />
				{count > 0 && <IngredientTagList />}
				<CategorizedIngredientSuggestions compact />
			</div>
		)
	}

	return (
		<>
			<div className='space-y-6 rounded-3xl border border-gray-100 bg-white p-4 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] sm:rounded-[2.5rem] sm:p-6 md:p-8'>
				<div className='space-y-3'>
					<div className='flex flex-wrap items-center justify-between gap-2'>
						<p className='font-mono text-sm font-extrabold tracking-wide text-[#1A1A1A]'>
							⚡ Шаг 1: Добавьте ингредиенты
						</p>
						{count > 0 && (
							<button
								type='button'
								onClick={() => setClearOpen(true)}
								className='flex cursor-pointer items-center gap-1 font-mono text-xs font-bold text-[#E95B3C] transition-colors hover:text-[#D14A2E]'
							>
								<Trash2 className='size-3.5' />
								Очистить холодильник
							</button>
						)}
					</div>
					<IngredientAddForm />
				</div>

				<AnimatePresence mode='wait'>
					{count > 0 ? <IngredientTagList key='tags' /> : <IngredientEmptyState key='empty' />}
				</AnimatePresence>

				<CategorizedIngredientSuggestions />

				{showActions && children && (
					<div className={cn('flex flex-col gap-3 pt-4 sm:flex-row')}>{children}</div>
				)}
			</div>

			<Dialog
				open={clearOpen}
				onOpenChange={setClearOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Очистить холодильник?</DialogTitle>
						<DialogDescription>
							Все добавленные продукты будут удалены. Это действие нельзя отменить.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant='outline'
							onClick={() => setClearOpen(false)}
						>
							Отмена
						</Button>
						<Button
							variant='destructive'
							onClick={handleClear}
						>
							Очистить
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
