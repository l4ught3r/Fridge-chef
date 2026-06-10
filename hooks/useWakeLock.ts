'use client'

import { useRef, useState } from 'react'

interface WakeLockApi {
	isLocked: boolean
	requestWakeLock: () => Promise<void>
	releaseWakeLock: () => Promise<void>
}

export function useWakeLock(): WakeLockApi {
	const [isLocked, setIsLocked] = useState(false)
	const wakeLockRef = useRef<WakeLockSentinel | null>(null)

	const releaseWakeLock = useRef(async () => {
		if (!wakeLockRef.current) return

		try {
			await wakeLockRef.current.release()
		} catch {
			// Wake lock may already be released by the browser
		} finally {
			wakeLockRef.current = null
			setIsLocked(false)
		}
	}).current

	const requestWakeLock = useRef(async () => {
		if (!('wakeLock' in navigator)) return

		try {
			wakeLockRef.current = await navigator.wakeLock.request('screen')
			setIsLocked(true)

			wakeLockRef.current.addEventListener('release', () => {
				wakeLockRef.current = null
				setIsLocked(false)
			})
		} catch {
			setIsLocked(false)
		}
	}).current

	return { isLocked, requestWakeLock, releaseWakeLock }
}
