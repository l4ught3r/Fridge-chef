'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChefHat, ChevronLeft, ChevronRight, Sun } from 'lucide-react'
import { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useCookingSteps } from '@/hooks/useCookingSteps'
import { useWakeLock } from '@/hooks/useWakeLock'
import { cn } from '@/lib/utils'
import type { Recipe } from '@/types/recipe'

interface CookingModeProps {
	recipe: Recipe
	isOpen: boolean
	onClose: () => void
}

export function CookingMode({ recipe, isOpen, onClose }: CookingModeProps) {
	const reduceMotion = useReducedMotion()
	const { isLocked, requestWakeLock, releaseWakeLock } = useWakeLock()
	const { currentStep, nextStep, prevStep, reset, isFirst, isLast } = useCookingSteps(
		recipe.steps.length
	)

	useEffect(() => {
		if (!isOpen) {
			releaseWakeLock()
			reset()
			return
		}

		requestWakeLock()

		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				requestWakeLock()
			}
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
			releaseWakeLock()
		}
	}, [isOpen, requestWakeLock, releaseWakeLock, reset])

	const handleClose = () => {
		reset()
		onClose()
	}

	const progress = ((currentStep + 1) / recipe.steps.length) * 100

	return (
		<Dialog
			open={isOpen}
			onOpenChange={open => {
				if (!open) handleClose()
			}}
		>
			<DialogContent className='max-w-md overflow-hidden border-gray-100 bg-[#FEFAF2] p-0 max-sm:max-w-none sm:max-w-md'>
				<div className='pointer-events-none absolute top-0 right-0 size-32 rounded-full bg-[#FFD966] opacity-30 blur-3xl' />
				<div className='pointer-events-none absolute bottom-0 left-0 size-40 rounded-full bg-[#E95B3C] opacity-10 blur-3xl' />

				<div className='relative p-6'>
					<DialogHeader className='mb-4 space-y-3'>
						<div className='flex items-start justify-between gap-3 pr-8'>
							<div className='flex items-center gap-2.5'>
								<div className='rounded-xl bg-[#E95B3C] p-2 text-white shadow-md shadow-orange-200/50'>
									<ChefHat className='size-5' />
								</div>
								<div className='min-w-0 text-left'>
									<DialogTitle className='line-clamp-2 text-base font-extrabold text-[#1A1A1A]'>
										{recipe.name}
									</DialogTitle>
									<p className='font-mono text-[10px] font-bold tracking-wider text-[#E95B3C] uppercase'>
										Режим готовки
									</p>
								</div>
							</div>
						</div>

						{isLocked && (
							<span className='inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 font-mono text-[10px] font-bold text-[#E95B3C]'>
								<Sun className='size-3' />
								Экран активен
							</span>
						)}
					</DialogHeader>

					<div className='mb-4 space-y-2'>
						<div className='flex items-center justify-between font-mono text-[10px] font-bold text-gray-400'>
							<span>
								Шаг {currentStep + 1} из {recipe.steps.length}
							</span>
							<span>{Math.round(progress)}%</span>
						</div>
						<div className='h-1.5 overflow-hidden rounded-full bg-gray-200/80'>
							<div
								className='h-full w-full origin-left rounded-full bg-[#E95B3C] transition-transform duration-300 ease-[var(--ease-out)]'
								style={{ transform: `scaleX(${progress / 100})` }}
							/>
						</div>
						<div className='flex justify-center gap-1 pt-1'>
							{recipe.steps.map((step, stepIndex) => (
								<span
									key={step}
									className={cn(
										'size-1.5 rounded-full transition-colors duration-150 ease-[var(--ease-out)]',
										stepIndex <= currentStep ? 'bg-[#E95B3C]' : 'bg-gray-200'
									)}
								/>
							))}
						</div>
					</div>

					<AnimatePresence
						mode='wait'
						initial={false}
					>
						<motion.div
							key={currentStep}
							initial={reduceMotion ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
							className='mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'
						>
							<div className='mb-3 flex size-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 font-mono text-sm font-extrabold text-[#E95B3C]'>
								{currentStep + 1}
							</div>
							<p className='text-lg leading-relaxed font-semibold text-[#1A1A1A] sm:text-xl'>
								{recipe.steps[currentStep]}
							</p>
						</motion.div>
					</AnimatePresence>

					<div className='flex gap-3'>
						<button
							type='button'
							onClick={prevStep}
							disabled={isFirst}
							className='fc-interactive fc-press flex h-12 flex-1 cursor-pointer items-center justify-center gap-1 rounded-2xl border border-gray-200 bg-white font-bold text-gray-600 shadow-sm hover:border-orange-200 hover:text-[#E95B3C] disabled:pointer-events-none disabled:opacity-40'
						>
							<ChevronLeft className='size-5' />
							Назад
						</button>
						<button
							type='button'
							onClick={nextStep}
							disabled={isLast}
							className='fc-interactive fc-press flex h-12 flex-1 cursor-pointer items-center justify-center gap-1 rounded-2xl bg-[#E95B3C] font-bold text-white shadow-lg shadow-orange-200/50 hover:bg-[#D14A2E] disabled:pointer-events-none disabled:opacity-40'
						>
							Вперёд
							<ChevronRight className='size-5' />
						</button>
					</div>

					{isLast && (
						<motion.button
							type='button'
							initial={reduceMotion ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
							onClick={handleClose}
							className='fc-interactive fc-press mt-3 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#bbf7d0] bg-[#DCFCE7] font-extrabold text-[#166534] hover:bg-[#bbf7d0]'
						>
							<ChefHat className='size-5' />
							Готово! Приятного аппетита
						</motion.button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
