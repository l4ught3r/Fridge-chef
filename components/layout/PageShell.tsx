import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageShellProps {
	children: ReactNode
	className?: string
}

export function PageShell({ children, className }: PageShellProps) {
	return (
		<div className={cn('relative flex min-h-0 w-full flex-1 flex-col', className)}>{children}</div>
	)
}
