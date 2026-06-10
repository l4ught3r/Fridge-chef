'use client'

import { ChefHat, Heart, Home, Search, Smartphone } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PantryBadge } from '@/components/layout/PantryBadge'
import { usePwaInstall } from '@/hooks/usePwaInstall'
import { cn } from '@/lib/utils'

interface AppHeaderProps {
	className?: string
}

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

export function AppHeader({ className }: AppHeaderProps) {
	const pathname = usePathname()
	const { showInstallBadge, installApp } = usePwaInstall()

	return (
		<header
			className={cn(
				'mb-4 flex w-full shrink-0 items-center justify-between gap-2 border-b border-gray-200/60 pb-4 sm:mb-8',
				className
			)}
		>
			<Link
				href='/'
				aria-label='На главную'
				className='flex min-w-0 shrink items-center gap-2 sm:gap-3'
			>
				<div className='fc-press fc-hover-scale shrink-0 rotate-3 rounded-2xl bg-[#E95B3C] p-2.5 text-white shadow-xl shadow-orange-200/45 transition-transform duration-150 ease-[var(--ease-out)]'>
					<ChefHat className='size-5 shrink-0 sm:size-6' />
				</div>
				<div className='min-w-0'>
					<p className='truncate text-base font-extrabold tracking-tight text-[#1A1A1A] sm:text-lg md:text-xl'>
						Fridge Chef
					</p>
					<p className='hidden font-mono text-[10px] font-bold tracking-wider text-[#E95B3C] uppercase sm:block'>
						Шеф-Повар у Холодильника
					</p>
				</div>
			</Link>

			<nav
				aria-label='Основная навигация'
				className='hidden shrink-0 items-center gap-0.5 sm:flex md:gap-1'
			>
				{NAV_ITEMS.map(({ href, label, icon: Icon, match }) => {
					const active = match(pathname)
					return (
						<Link
							key={href}
							href={href}
							className={cn(
								'fc-interactive fc-press flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-xs font-bold transition-colors duration-150 ease-[var(--ease-out)] md:px-3',
								active
									? 'bg-orange-50 text-[#E95B3C]'
									: 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
							)}
						>
							<Icon className={cn('size-4 shrink-0', active && 'fill-[#E95B3C]/15')} />
							<span className='hidden md:inline'>{label}</span>
						</Link>
					)
				})}
			</nav>

			<div className='flex min-w-0 shrink-0 flex-wrap items-center justify-end gap-1 sm:gap-2'>
				{showInstallBadge && (
					<button
						type='button'
						onClick={installApp}
						className='fc-interactive fc-press flex cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E95B3C] to-amber-500 p-2 font-sans text-xs font-bold text-white shadow-md hover:from-[#D14A2E] hover:to-orange-500 sm:px-3.5 sm:py-1.5'
						title='Установить Fridge Chef на телефон или компьютер'
					>
						<Smartphone className='size-3.5 shrink-0' />
						<span className='hidden sm:inline'>Установить</span>
						<span className='hidden md:inline'>&nbsp;приложение</span>
					</button>
				)}

				<PantryBadge />
			</div>
		</header>
	)
}
