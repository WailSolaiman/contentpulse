'use client'

import React, { useState } from 'react'
import { Loader2Icon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image'

interface PROPS {
	selectedTemplate?: TEMPLATE
	userFormInput: any
	loading: boolean
}

const FormSection = ({ selectedTemplate, userFormInput, loading }: PROPS) => {
	const [formData, setFormData] = useState<any>()

	const handleInputChange = (e: any) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const onSubmit = (e: any) => {
		e.preventDefault()
		userFormInput(formData)
	}

	return (
		<div className='p-5 shadow-md border rounded-lg bg-white'>
			<Image
				src={selectedTemplate?.icon || 'Logo'}
				alt={selectedTemplate?.name || 'Logo'}
				width={70}
				height={70}
				style={{ width: '70px', height: 'auto' }}
			/>
			<h2 className='font-bold text-2xl mb-2 text-primary'>
				{selectedTemplate?.name}
			</h2>
			<p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>
			<form className='mt-6' onSubmit={onSubmit}>
				{selectedTemplate?.form?.map((item, index) => (
					<div className='my-2 flex flex-col gap-2 mb-7' key={index}>
						<label
							htmlFor={item.name || 'input'}
							className='font-bold'>
							{item.label}
							{item.field == 'input' ? (
								<Input
									id={item.name || 'input'}
									name={item.name || 'input'}
									required={item?.required}
									onChange={handleInputChange}
								/>
							) : item.field == 'textarea' ? (
								<Textarea
									rows={8}
									id={item.name || 'textaria'}
									name={item.name || 'textaria'}
									required={item?.required}
									onChange={handleInputChange}
								/>
							) : null}
						</label>
					</div>
				))}
				<Button
					type='submit'
					className='w-full py-6'
					disabled={loading}>
					{loading ? (
						<Loader2Icon className='animate-spin' />
					) : (
						'Generate Content'
					)}
				</Button>
			</form>
		</div>
	)
}

export default FormSection
