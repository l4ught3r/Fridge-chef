'use client'

import { Toaster as Sonner, type ToasterProps } from 'sonner'

export function Toaster({ ...props }: ToasterProps) {
	return (
		<Sonner
			theme='light'
			duration={3000}
			className='toaster group'
			toastOptions={{
				classNames: {
					toast:
						'group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg group-[.toaster]:duration-300',
					description: 'group-[.toast]:text-gray-500',
					actionButton: 'group-[.toast]:bg-[#E95B3C] group-[.toast]:text-white',
					cancelButton: 'group-[.toast]:bg-gray-100 group-[.toast]:text-gray-600'
				}
			}}
			{...props}
		/>
	)
}
