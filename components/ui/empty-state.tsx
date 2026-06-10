import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
	icon: LucideIcon
	title: string
	description?: string
	children?: ReactNode
	className?: string
}

export function EmptyState({
	icon: Icon,
	title,
	description,
	children,
	className
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				'space-y-3 rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center',
				className
			)}
		>
			<Icon className='mx-auto size-10 text-gray-400' />
			<p className='text-sm font-bold text-gray-700'>{title}</p>
			{description && (
				<p className='mx-auto max-w-sm text-xs font-medium text-gray-400'>{description}</p>
			)}
			{children}
		</div>
	)
}
