'use client'

import { useRef, useState } from 'react'

export function useCookingSteps(totalSteps: number) {
	const totalRef = useRef(totalSteps)
	totalRef.current = totalSteps

	const [currentStep, setCurrentStep] = useState(0)

	const nextStep = useRef(() => {
		setCurrentStep(prev => (prev < totalRef.current - 1 ? prev + 1 : prev))
	}).current

	const prevStep = useRef(() => {
		setCurrentStep(prev => (prev > 0 ? prev - 1 : prev))
	}).current

	const reset = useRef(() => setCurrentStep(0)).current

	return {
		currentStep,
		nextStep,
		prevStep,
		reset,
		isFirst: currentStep === 0,
		isLast: currentStep === totalSteps - 1
	}
}
