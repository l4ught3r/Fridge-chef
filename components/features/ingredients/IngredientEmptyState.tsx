'use client'

import { BookOpen } from 'lucide-react'

export function IngredientEmptyState() {
	return (
		<div className='flex flex-col items-center justify-center space-y-2 rounded-2xl border border-dashed border-gray-200 p-6 text-center'>
			<div className='rounded-2xl bg-gray-50 p-3 text-gray-400'>
				<BookOpen className='size-6' />
			</div>
			<p className='font-mono text-xs font-extrabold text-gray-600'>
				Ваш виртуальный холодильник пуст.
			</p>
			<p className='max-w-sm text-[11px] font-medium text-gray-400'>
				Введите продукты выше вручную или воспользуйтесь быстрой доской предложений ниже, чтобы
				моментально наполнить холодильник!
			</p>
		</div>
	)
}
