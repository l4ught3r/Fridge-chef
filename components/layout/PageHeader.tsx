import type { ReactNode } from 'react'
import { PageBackLink } from '@/components/layout/PageBackLink'

interface PageHeaderProps {
	title: string
	subtitle?: string
	backHref?: string
	backLabel?: string
	actions?: ReactNode
}

export function PageHeader({
	title,
	subtitle,
	backHref = '/',
	backLabel = 'Назад',
	actions
}: PageHeaderProps) {
	return (
		<div className='mb-4 flex flex-col gap-3 border-b border-gray-200 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
			<PageBackLink
				href={backHref}
				label={backLabel}
			/>

			<div className='min-w-0 flex-1 text-left sm:text-right'>
				<h1 className='flex items-center gap-2 text-base font-extrabold text-[#1A1A1A] sm:justify-end sm:text-lg'>
					{title}
				</h1>
				{subtitle && <p className='text-xs font-semibold text-gray-500'>{subtitle}</p>}
			</div>

			{actions}
		</div>
	)
}
