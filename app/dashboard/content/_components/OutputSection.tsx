'use client'

import React, { useEffect, useRef } from 'react'
import { Editor } from '@toast-ui/react-editor'

import '@toast-ui/editor/dist/toastui-editor.css'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PROPS {
	aiOutput: string
}

const OutputSection = ({ aiOutput }: PROPS) => {
	const editorRef = useRef<Editor>(null)
	const { toast } = useToast()

	useEffect(() => {
		const editorInstance = editorRef.current?.getInstance()
		editorInstance.setMarkdown(aiOutput)
	}, [aiOutput])

	return (
		<div className='bg-white shadow-lg border rounded-lg'>
			<div className='flex justify-between items-center p-5'>
				<h2 className='font-medium'>Your Result</h2>
				<Button
					variant={'default'}
					type='button'
					onClick={() => {
						toast({
							title: 'AI response copied to clipboard.',
							className: 'bg-primary text-white',
						})
						navigator.clipboard.writeText(
							editorRef.current?.getInstance().getMarkdown() || ''
						)
					}}>
					<Copy className='w-4 h-4 mr-2' /> Copy{' '}
				</Button>
			</div>
			<Editor
				name={'editor'}
				ref={editorRef}
				initialValue='Your result will appear here.'
				height='600px'
				initialEditType='wysiwyg'
				useCommandShortcut={true}
				onChange={() => editorRef.current?.getInstance().getMarkdown()}
			/>
		</div>
	)
}

export default OutputSection
