export function HomeHero() {
	return (
		<div className='mx-auto max-w-2xl space-y-3 py-2 text-center sm:py-4'>
			<span className='inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-white px-3 py-1 font-mono text-xs font-bold text-[#E95B3C] shadow-sm'>
				<span className='size-1.5 animate-pulse rounded-full bg-[#E95B3C]' />
				Ваш кулинарный помощник
			</span>
			<h1 className='text-balance text-2xl leading-tight font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl md:text-5xl'>
				Готовьте из того, <span className='text-[#E95B3C]'>что уже есть</span> дома
			</h1>
			<p className='mx-auto max-w-lg text-sm font-semibold text-gray-500 md:text-base'>
				Отметьте, что уже лежит в холодильнике — подберём рецепты из каталога с лучшим совпадением
				по ингредиентам.
			</p>
		</div>
	)
}
