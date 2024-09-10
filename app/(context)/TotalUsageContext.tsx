import { createContext, Dispatch, SetStateAction } from 'react'

interface TotalUsageContextType {
	totalUsage: number
	setTotalUsage: Dispatch<SetStateAction<number>>
}

const defaultContextValue: TotalUsageContextType = {
	totalUsage: 0,
	setTotalUsage: () => {},
}

export const TotalUsageContext =
	createContext<TotalUsageContextType>(defaultContextValue)
