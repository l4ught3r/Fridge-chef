import { type RefObject, useEffect } from 'react'

export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean) {
	useEffect(() => {
		if (!active || !containerRef.current) return

		const container = containerRef.current
		container.focus()

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Tab') return
			event.preventDefault()
		}

		container.addEventListener('keydown', handleKeyDown)
		return () => container.removeEventListener('keydown', handleKeyDown)
	}, [active, containerRef])
}
