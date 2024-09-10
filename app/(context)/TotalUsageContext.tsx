import { createContext, Dispatch, SetStateAction } from 'react'

interface TotalUsageContextType {
	totalUsage: number
	setTotalUsage: Dispatch<SetStateAction<number>>
	isAllowedToGenerate: boolean
	setIsAllowedToGenerate: Dispatch<SetStateAction<boolean>>
}

const defaultContextValue: TotalUsageContextType = {
	totalUsage: 0,
	setTotalUsage: () => {},
	isAllowedToGenerate: true,
	setIsAllowedToGenerate: () => {},
}

export const TotalUsageContext =
	createContext<TotalUsageContextType>(defaultContextValue)
