import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollAreaProps {
	children: ReactNode
	className?: string
}

const hiddenScrollbarStyle = {
	scrollbarWidth: 'none',
	msOverflowStyle: 'none'
} as const

/** Прокручиваемая область на всю ширину страницы; контент центрируется внутри. */
export function ScrollArea({ children, className }: ScrollAreaProps) {
	return (
		<div
			className={cn('fc-scroll-area min-h-0 w-full flex-1', className)}
			style={hiddenScrollbarStyle}
		>
			<div className='mx-auto w-full max-w-4xl'>{children}</div>
		</div>
	)
}
