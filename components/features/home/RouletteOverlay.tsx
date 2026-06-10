'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChefHat } from 'lucide-react'
import { useRef } from 'react'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface RouletteOverlayProps {
	active: boolean
	text: string
}

export function RouletteOverlay({ active, text }: RouletteOverlayProps) {
	const reduceMotion = useReducedMotion()
	const dialogRef = useRef<HTMLDivElement>(null)

	useFocusTrap(dialogRef, active)

	return (
		<AnimatePresence>
			{active && (
				<motion.div
					ref={dialogRef}
					role='dialog'
					aria-modal='true'
					aria-labelledby='roulette_overlay_title'
					aria-describedby='roulette_overlay_desc'
					tabIndex={-1}
					initial={reduceMotion ? false : { opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
					className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2D2D2D]/60 p-4 backdrop-blur-md'
					id='roulette_shaker_overlay'
				>
					<motion.div
						initial={reduceMotion ? false : { scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={reduceMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
						transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
						className='max-w-xs space-y-6 rounded-[2.5rem] border border-gray-150 bg-white p-8 text-center shadow-2xl'
					>
						<div className='relative mx-auto flex size-24 items-center justify-center'>
							<div className='absolute inset-0 animate-spin rounded-full border-4 border-dashed border-[#E95B3C]/35' />
							<div
								className='absolute inset-2 animate-spin rounded-full border-2 border-amber-500/50'
								style={{ animationDirection: 'reverse', animationDuration: '6s' }}
							/>
							<div className='relative z-10 animate-bounce rounded-full border border-orange-100 bg-orange-50 p-4 shadow-lg'>
								<ChefHat className='size-8 text-[#E95B3C]' />
							</div>
						</div>

						<div className='space-y-1'>
							<p
								id='roulette_overlay_title'
								className='font-mono text-xs font-bold tracking-wider text-[#E95B3C] uppercase'
							>
								Шуршим в холодильнике
							</p>
							<p
								id='roulette_overlay_desc'
								className='flex min-h-12 items-center justify-center px-2 font-mono text-base font-extrabold text-gray-800'
							>
								{text}
							</p>
						</div>

						<p className='text-[10px] font-semibold text-gray-400 italic'>
							Ищем лучшие комбинации... Пожалуйста подождите.
						</p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
