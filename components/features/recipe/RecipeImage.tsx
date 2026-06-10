'use client'

import { ChefHat } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface RecipeImageProps {
	src: string
	alt: string
	priority?: boolean
	className?: string
	sizes?: string
}

export function RecipeImage({
	src,
	alt,
	priority = false,
	className,
	sizes = '(max-width: 896px) 100vw, 896px'
}: RecipeImageProps) {
	const [failed, setFailed] = useState(false)

	if (failed) {
		return (
			<div
				className={cn(
					'flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-50 to-amber-50',
					className
				)}
			>
				<ChefHat className='size-12 text-[#E95B3C]/60' />
				<p className='px-4 text-center text-xs font-semibold text-gray-400'>Фото недоступно</p>
			</div>
		)
	}

	return (
		<Image
			src={src}
			alt={alt}
			fill
			className={cn('object-cover', className)}
			sizes={sizes}
			priority={priority}
			onError={() => setFailed(true)}
		/>
	)
}
