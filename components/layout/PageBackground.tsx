import type { ReactNode } from 'react'

interface PageBackgroundProps {
	children: ReactNode
}

export function PageBackground({ children }: PageBackgroundProps) {
	return (
		<div className='fc-safe-top relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-[#FEFAF2] p-4 text-[#2D2D2D] antialiased selection:bg-[#E95B3C] selection:text-white md:p-6'>
			<div className='pointer-events-none absolute top-[-100px] right-[-100px] size-80 rounded-full bg-[#FFD966] opacity-40 mix-blend-multiply blur-[120px]' />
			<div className='pointer-events-none absolute bottom-[-100px] left-[-100px] size-96 rounded-full bg-[#86B97D] opacity-35 mix-blend-multiply blur-[150px]' />
			<div className='relative z-10 flex min-h-0 w-full flex-1 flex-col'>{children}</div>
		</div>
	)
}
