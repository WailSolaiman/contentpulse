'use client'

import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { chatSession } from '@/utils/AiModal'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AiOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/router'

interface PROPS {
	params: {
		'template-slug': string
	}
	slug: string
}

const CreateNewContent = (props: PROPS) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [aiOutput, setAiOutput] = useState<string>('')
	const { user } = useUser()
	const router = useRouter()
	const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)

	const selectedTemplate: TEMPLATE | undefined = Templates.find(
		(item) => item.slug == props.params['template-slug']
	)

	const generateAIContent = async (formData: any) => {
		if (totalUsage >= 10000) {
			router.push('/billing')
			return
		}

		setLoading(true)
		const selectedPrompt = selectedTemplate?.aiPrompt
		const finalPrompt = JSON.stringify(formData) + ', ' + selectedPrompt
		const result = await chatSession.sendMessage(finalPrompt)
		setAiOutput(result?.response.text())
		await saveInDB(
			formData,
			selectedTemplate?.name,
			selectedTemplate?.slug,
			result?.response.text()
		)
		setLoading(false)
	}

	const saveInDB = async (
		formData: any,
		name: any,
		slug: any,
		aiOutput: string
	) => {
		const result = await db.insert(AiOutput).values({
			formData: formData,
			templateName: name,
			templateSlug: slug,
			aiResponse: aiOutput,
			createdBy: user?.primaryEmailAddress?.emailAddress,
			createdAt: moment().format('DD/MM/YYYY'),
		})

		console.log(result)
	}

	return (
		<div className='p-5'>
			<Link href={'/dashboard'}>
				<Button>
					<ArrowLeft /> Back
				</Button>
			</Link>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
				{/* FormSection */}
				<FormSection
					selectedTemplate={selectedTemplate}
					userFormInput={(v: any) => generateAIContent(v)}
					loading={loading}
				/>

				{/* OutputSection */}
				<div className='col-span-2'>
					<OutputSection aiOutput={aiOutput} />
				</div>
			</div>
		</div>
	)
}

export default CreateNewContent
