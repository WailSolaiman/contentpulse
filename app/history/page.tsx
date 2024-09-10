'use client'

import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { AiOutput } from '@/utils/schema'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'

export interface HistoryData {
	id: number
	templateSlug: string
	templateName: string
	formData: string | null
	aiResponse: string | null
	createdAt: string | null
	createdBy: string | null
}

const History = () => {
	const [history, setHistory] = useState<HistoryData[]>([])
	const { toast } = useToast()

	useEffect(() => {
		getDataFromDB()
	}, [])

	const getDataFromDB = async () => {
		const allData = await db.select().from(AiOutput)
		setHistory(allData)
	}

	/* 	const countWords = (text: string): number => {
		if (text.length === 0) {
			return 0
		} else {
			text = text.replace(/(^\s*)|(\s*$)/gi, '')
			text = text.replace(/[ ]{2,}/gi, ' ')
			text = text.replace(/\n /, '\n')
			text = text.replace(/[#!*`_~>\-\+\[\]\(\)\\]/g, '')
			return text.split(/\s+/).filter((word) => word.length > 0).length
		}
	} */

	return (
		<div className='m-10 p-10 bg-white border rounded-lg shadow-sm'>
			<h2 className='text-3xl font-bold mb-2'>History</h2>
			<p className='text-sm'>
				Search your previously generated AI content
			</p>
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='text-center'>
								Template/Tool
							</TableHead>
							<TableHead className='text-center'>
								AI Response
							</TableHead>
							<TableHead className='text-center'>
								Created
							</TableHead>
							<TableHead className='text-center'>Copy</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{history.map((item) => (
							<TableRow key={item.id}>
								<TableCell className='font-medium text-center'>
									{item.templateName}
								</TableCell>
								<TableCell className='text-center'>
									{item.aiResponse?.substring(0, 50)}
								</TableCell>
								<TableCell className='text-center'>
									{item.createdAt}
								</TableCell>
								<TableCell className='text-center'>
									<button
										className='text-primary font-bold'
										type='button'
										onClick={() => {
											toast({
												title: 'AI response copied to clipboard.',
												className:
													'bg-primary text-white',
											})
											navigator.clipboard.writeText(
												item.aiResponse || ''
											)
										}}>
										Copy
									</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

export default History
