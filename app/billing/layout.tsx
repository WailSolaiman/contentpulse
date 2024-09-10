'use client'

import React, { useState } from 'react'
import SideNav from '../_components/SideNav'
import Header from '../_components/Header'
import { Toaster } from '@/components/ui/toaster'
import { TotalUsageContext } from '../(context)/TotalUsageContext'

const BillingLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	const [totalUsage, setTotalUsage] = useState<number>(0)
	const [isAllowedToGenerate, setIsAllowedToGenerate] =
		useState<boolean>(true)
	return (
		<TotalUsageContext.Provider
			value={{
				totalUsage,
				setTotalUsage,
				isAllowedToGenerate,
				setIsAllowedToGenerate,
			}}>
			<div className='bg-slate-100 h-screen'>
				<div className='md:w-64 hidden md:block fixed'>
					<SideNav />
				</div>
				<div className='md:ml-64'>
					<Header />
					{children}
					<Toaster />
				</div>
			</div>
		</TotalUsageContext.Provider>
	)
}

export default BillingLayout
