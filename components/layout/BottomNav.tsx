'use client'

import { Heart, Home, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
	{ href: '/', label: 'Главная', icon: Home, match: (path: string) => path === '/' },
	{
		href: '/search',
		label: 'Поиск',
		icon: Search,
		match: (path: string) => path.startsWith('/search')
	},
	{
		href: '/favorites',
		label: 'Избранное',
		icon: Heart,
		match: (path: string) => path.startsWith('/favorites')
	}
] as const

export function BottomNav() {
	const pathname = usePathname()

	return (
		<nav
			aria-label='Основная навигация'
			className='fixed inset-x-0 bottom-0 z-40 border-t border-gray-200/80 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:hidden'
		>
			<div className='mx-auto flex max-w-4xl items-stretch justify-around px-2'>
				{NAV_ITEMS.map(({ href, label, icon: Icon, match }) => {
					const active = match(pathname)
					return (
						<Link
							key={href}
							href={href}
							className={cn(
								'fc-press flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-2 py-3 text-[11px] font-bold transition-colors duration-150 ease-[var(--ease-out)]',
								active ? 'text-[#E95B3C]' : 'text-gray-500'
							)}
						>
							<Icon className={cn('size-5', active && 'fill-[#E95B3C]/15')} />
							<span>{label}</span>
						</Link>
					)
				})}
			</div>
		</nav>
	)
}
