'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AiOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { HistoryData } from '../history/page'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'

const UsageTrack = () => {
	const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
	const [loading, setLoading] = useState<boolean>(true)
	const { user } = useUser()

	useEffect(() => {
		user && getDatafromDB()
	}, [user])

	const getDatafromDB = async () => {
		setLoading(true)
		const result: HistoryData[] = await db
			.select()
			.from(AiOutput)
			.where(
				eq(
					AiOutput['createdBy'],
					user?.primaryEmailAddress?.emailAddress
				)
			)
		getTotalUsage(result)
	}

	const getTotalUsage = async (result: HistoryData[]) => {
		let total: number = 0
		result.forEach((item) => {
			total = total + Number(item.aiResponse?.length)
		})
		setTotalUsage(total)
		setLoading(false)
	}

	return (
		<div className='m-5'>
			<div className='bg-primary text-white p-3 rounded-lg'>
				{loading ? (
					<p className='font-medium'>Loading...</p>
				) : (
					<>
						<h2 className='font-medium'>Credit</h2>
						<div className='h-2 bg-slate-400 w-full rounded-full mt-3'>
							<div
								className='h-2 bg-white rounded-full'
								style={{
									width: `${(totalUsage / 10000) * 100}%`,
								}}></div>
						</div>
						<h2 className='text-sm pt-1'>
							{totalUsage}/10,000 Credit Used
						</h2>
					</>
				)}
			</div>
			<Button
				variant={'secondary'}
				className='w-full my-3 text-primary border-2'>
				Upgrade
			</Button>
		</div>
	)
}

export default UsageTrack
