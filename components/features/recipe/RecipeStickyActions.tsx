'use client'

import { ChefHat } from 'lucide-react'
import { FavoriteButton } from '@/components/features/recipe/FavoriteButton'
import { cn } from '@/lib/utils'

interface RecipeStickyActionsProps {
	recipeId: string
	onCookingMode: () => void
	className?: string
}

export function RecipeStickyActions({
	recipeId,
	onCookingMode,
	className
}: RecipeStickyActionsProps) {
	return (
		<div
			className={cn(
				'fixed inset-x-0 bottom-0 z-30 border-t border-gray-200/80 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:hidden',
				className
			)}
		>
			<div className='mx-auto flex max-w-4xl items-stretch gap-2 px-4 py-2.5'>
				<FavoriteButton
					recipeId={recipeId}
					variant='detail'
					className='min-h-11 flex-1 justify-center'
				/>
				<button
					type='button'
					onClick={onCookingMode}
					className='fc-interactive fc-press flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#E95B3C] px-3 text-xs font-extrabold text-white shadow-lg shadow-orange-200/50 hover:bg-[#D14A2E]'
				>
					<ChefHat className='size-4 shrink-0' />
					<span>Режим готовки</span>
				</button>
			</div>
		</div>
	)
}
