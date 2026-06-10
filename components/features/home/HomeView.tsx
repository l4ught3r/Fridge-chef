'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { FavoritesBoard } from '@/components/features/home/FavoritesBoard'
import { HomeHero } from '@/components/features/home/HomeHero'
import { RecentsBoard } from '@/components/features/home/RecentsBoard'
import { IngredientInput } from '@/components/features/ingredients/IngredientInput'

export function HomeView() {
	const reduceMotion = useReducedMotion()

	return (
		<motion.div
			initial={reduceMotion ? false : { opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
			className='space-y-6 sm:space-y-8'
			id='home_view'
		>
			<HomeHero />
			<IngredientInput />

			<div className='grid grid-cols-1 gap-6 pt-2 md:grid-cols-2'>
				<FavoritesBoard />
				<RecentsBoard />
			</div>
		</motion.div>
	)
}
