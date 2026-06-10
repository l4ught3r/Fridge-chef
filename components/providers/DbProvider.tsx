'use client'

import { ChefHat, Loader2 } from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'
import { PantryProvider } from '@/components/providers/PantryProvider'
import { initializeDatabase } from '@/lib/seed'

interface DbProviderProps {
	children: ReactNode
}

export function DbProvider({ children }: DbProviderProps) {
	const [ready, setReady] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		initializeDatabase()
			.then(() => setReady(true))
			.catch(err => {
				console.error(err)
				setError('Не удалось загрузить базу рецептов')
			})
	}, [])

	if (error) {
		return (
			<div className='flex h-dvh flex-col items-center justify-center gap-3 bg-[#FEFAF2] px-6 text-center'>
				<p className='text-sm font-bold text-gray-800'>{error}</p>
				<p className='text-xs text-gray-500'>Попробуйте обновить страницу</p>
			</div>
		)
	}

	if (!ready) {
		return (
			<div className='relative flex h-dvh flex-col items-center justify-center gap-3 overflow-hidden bg-[#FEFAF2] text-[#2D2D2D]'>
				<div className='pointer-events-none absolute top-[-100px] right-[-100px] size-80 rounded-full bg-[#FFD966] opacity-40 mix-blend-multiply blur-[120px]' />
				<div className='pointer-events-none absolute bottom-[-100px] left-[-100px] size-96 rounded-full bg-[#86B97D] opacity-35 mix-blend-multiply blur-[150px]' />
				<div className='relative z-10 flex flex-col items-center gap-3'>
					<div className='rounded-2xl bg-[#E95B3C] p-3 text-white shadow-lg shadow-orange-200/50'>
						<ChefHat className='size-7' />
					</div>
					<Loader2 className='size-6 animate-spin text-[#E95B3C]' />
					<p className='font-mono text-xs font-bold tracking-wider text-gray-500 uppercase'>
						Загружаем рецепты…
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className='flex h-dvh min-h-0 flex-col overflow-hidden'>
			<PantryProvider>{children}</PantryProvider>
		</div>
	)
}
