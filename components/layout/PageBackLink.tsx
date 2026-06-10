import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface PageBackLinkProps {
	href: string
	label: string
	className?: string
	onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

export function PageBackLink({ href, label, className, onClick }: PageBackLinkProps) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className={cn(
				'inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-600 shadow-sm transition-colors hover:text-black',
				className
			)}
		>
			<ChevronLeft className='size-4 shrink-0' />
			{label}
		</Link>
	)
}
