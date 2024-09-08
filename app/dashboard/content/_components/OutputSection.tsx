'use client'

import React, { useEffect, useRef } from 'react'
import { Editor } from '@toast-ui/react-editor'

import '@toast-ui/editor/dist/toastui-editor.css'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

interface PROPS {
	aiOutput: string
}

const OutputSection = ({ aiOutput }: PROPS) => {
	const editorRef = useRef<Editor>(null)

	useEffect(() => {
		const editorInstance = editorRef.current?.getInstance()
		editorInstance.setMarkdown(aiOutput)
	}, [aiOutput])

	return (
		<div className='bg-white shadow-lg border rounded-lg'>
			<div className='flex justify-between items-center p-5'>
				<h2 className='font-medium'>Your Result</h2>
				<Button className='flex gap-2' onClick={() => {}}>
					<Copy className='w-4 h-4' /> Copy{' '}
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
