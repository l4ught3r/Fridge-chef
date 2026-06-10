'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorite } from '@/hooks/useFavorite'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
	recipeId: string
	variant?: 'card' | 'header' | 'detail'
	className?: string
	onToggle?: (favorited: boolean) => void
}

export function FavoriteButton({
	recipeId,
	variant = 'header',
	className,
	onToggle
}: FavoriteButtonProps) {
	const { favorited, loading, toggle } = useFavorite(recipeId)

	const handleClick = async (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		const next = await toggle()
		onToggle?.(next)
		window.dispatchEvent(new CustomEvent('fridge-chef-favorites-changed'))
	}

	if (variant === 'detail') {
		return (
			<button
				type='button'
				disabled={loading}
				onClick={handleClick}
				id='favorite_heart_toggle'
				className={cn(
					'fc-interactive fc-press flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold shadow-sm',
					favorited
						? 'border-rose-200 bg-rose-50 text-rose-700'
						: 'border-gray-200 bg-white text-gray-600 hover:border-rose-100 hover:text-[#E95B3C]',
					className
				)}
			>
				<Heart className={cn('size-3.5', favorited && 'fill-rose-500 text-rose-500')} />
				{favorited ? 'В избранном' : 'В избранное'}
			</button>
		)
	}

	return (
		<Button
			type='button'
			variant='ghost'
			size='icon'
			disabled={loading}
			onClick={handleClick}
			aria-label={favorited ? 'Убрать из избранного' : 'В избранное'}
			className={cn(
				variant === 'card'
					? 'size-8 rounded-full border border-gray-200 bg-white/95 text-gray-600 shadow-sm hover:bg-white hover:text-[#E95B3C]'
					: 'text-gray-600 hover:bg-gray-50',
				favorited && 'text-rose-600 hover:text-rose-700',
				className
			)}
		>
			<Heart className={cn('size-4', favorited && 'fill-current')} />
		</Button>
	)
}
