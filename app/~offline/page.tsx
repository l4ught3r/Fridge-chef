import { ChefHat, Home, WifiOff } from 'lucide-react'
import Link from 'next/link'
import { AppHeader } from '@/components/layout/AppHeader'
import { PageBackground } from '@/components/layout/PageBackground'
import { PageContent } from '@/components/layout/PageContent'
import { PageShell } from '@/components/layout/PageShell'
import { ScrollArea } from '@/components/layout/ScrollArea'

export default function OfflinePage() {
	return (
		<PageBackground>
			<PageShell>
				<PageContent>
					<AppHeader />
				</PageContent>
				<ScrollArea>
					<main className='flex flex-col items-center justify-center gap-6 py-16 text-center'>
						<div className='space-y-2'>
							<p className='font-mono text-xs font-bold tracking-[0.3em] text-[#E95B3C] uppercase'>
								Офлайн
							</p>
							<p className='text-7xl font-extrabold tracking-tight text-[#1A1A1A] md:text-8xl'>
								<WifiOff
									className='mx-auto size-16 md:size-20'
									aria-hidden
								/>
							</p>
						</div>

						<div className='mx-auto max-w-md space-y-2 px-4'>
							<h1 className='text-xl font-extrabold text-[#1A1A1A] md:text-2xl'>Нет сети</h1>
							<p className='text-sm font-semibold text-gray-500'>
								Страница недоступна без интернета. Если вы уже открывали приложение раньше,
								вернитесь на главную — рецепты и избранное сохранены на устройстве.
							</p>
						</div>

						<div className='rounded-3xl border border-dashed border-orange-200 bg-white/80 p-6 shadow-sm'>
							<ChefHat className='mx-auto size-10 text-[#E95B3C]' />
						</div>

						<Link
							href='/'
							className='fc-interactive fc-press inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#E95B3C] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-200/50 hover:bg-[#D14A2E]'
						>
							<Home className='size-5' />
							На главную
						</Link>
					</main>
				</ScrollArea>
			</PageShell>
		</PageBackground>
	)
}
