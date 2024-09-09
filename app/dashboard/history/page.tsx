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

interface HistoryData {
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
							<TableHead>Template</TableHead>
							<TableHead>AI RESP</TableHead>
							<TableHead>DATE</TableHead>
							<TableHead>Words</TableHead>
							<TableHead className='text-right'>Copy</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{history.map((item) => (
							<TableRow key={item.id}>
								<TableCell className='font-medium'>
									{item.templateName}
								</TableCell>
								<TableCell>
									{item.aiResponse?.substring(0, 50)}
								</TableCell>
								<TableCell>{item.createdAt}</TableCell>
								<TableCell>0</TableCell>
								<TableCell className='text-right'>
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
