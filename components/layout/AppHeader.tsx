'use client'

import { ChefHat, Smartphone } from 'lucide-react'
import Link from 'next/link'
import { PantryBadge } from '@/components/layout/PantryBadge'
import { usePwaInstall } from '@/hooks/usePwaInstall'
import { cn } from '@/lib/utils'

interface AppHeaderProps {
	className?: string
}

export function AppHeader({ className }: AppHeaderProps) {
	const { showInstallBadge, installApp } = usePwaInstall()

	return (
		<header
			className={cn(
				'mb-4 flex w-full shrink-0 items-center justify-between border-b border-gray-200/60 pb-4 sm:mb-8',
				className
			)}
		>
			<Link
				href='/'
				aria-label='На главную'
				className='flex items-center gap-3'
			>
				<div className='fc-press fc-hover-scale rotate-3 rounded-2xl bg-[#E95B3C] p-2.5 text-white shadow-xl shadow-orange-200/45 transition-transform duration-150 ease-[var(--ease-out)]'>
					<ChefHat className='size-5 shrink-0 sm:size-6' />
				</div>
				<div>
					<p className='text-lg font-extrabold tracking-tight text-[#1A1A1A] sm:text-xl'>
						Fridge Chef
					</p>
					<p className='hidden font-mono text-[10px] font-bold tracking-wider text-[#E95B3C] uppercase sm:block'>
						Шеф-Повар у Холодильника
					</p>
				</div>
			</Link>

			<div className='flex min-w-0 flex-nowrap items-center gap-1.5 sm:gap-2.5'>
				{showInstallBadge && (
					<button
						type='button'
						onClick={installApp}
						className='fc-interactive fc-press flex cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E95B3C] to-amber-500 px-3 py-1.5 font-sans text-xs font-bold text-white shadow-md hover:from-[#D14A2E] hover:to-orange-500 sm:px-3.5'
						title='Установить Fridge Chef на телефон или компьютер'
					>
						<Smartphone className='size-3.5 shrink-0' />
						<span className='sm:hidden'>Установить</span>
						<span className='hidden sm:inline'>Установить приложение</span>
					</button>
				)}

				<PantryBadge />
			</div>
		</header>
	)
}
