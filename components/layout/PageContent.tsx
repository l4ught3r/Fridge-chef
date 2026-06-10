import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageContentProps {
	children: ReactNode
	className?: string
}

/** Центрированная колонка контента (max-w-4xl). */
export function PageContent({ children, className }: PageContentProps) {
	return <div className={cn('mx-auto w-full max-w-4xl', className)}>{children}</div>
}
