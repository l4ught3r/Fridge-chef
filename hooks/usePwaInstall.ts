'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function usePwaInstall() {
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
	const [showInstallBadge, setShowInstallBadge] = useState(false)

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault()
			setDeferredPrompt(e as BeforeInstallPromptEvent)
			setShowInstallBadge(true)
		}

		const handleAppInstalled = () => {
			setDeferredPrompt(null)
			setShowInstallBadge(false)
		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
		window.addEventListener('appinstalled', handleAppInstalled)

		if (window.matchMedia('(display-mode: standalone)').matches) {
			setShowInstallBadge(false)
		}

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
			window.removeEventListener('appinstalled', handleAppInstalled)
		}
	}, [])

	const installApp = async () => {
		if (!deferredPrompt) return
		await deferredPrompt.prompt()
		await deferredPrompt.userChoice
		setDeferredPrompt(null)
		setShowInstallBadge(false)
	}

	return { showInstallBadge, installApp }
}
