import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'

const TemplateCard = (item: TEMPLATE) => {
	return (
		<Link href={`/dashboard/content/${item?.slug}`}>
			<div
				className='p-5 shadow-md rounded-md border bg-white 
        flex flex-col justify-center items-center gap-3 cursor-pointer hover:scale-105 transition-all'>
				<Image
					src={item.icon}
					alt={item.name}
					width={50}
					height={50}
					style={{ width: '50px', height: 'auto' }}
				/>
				<h2 className='font-medium text-lg text-center'>{item.name}</h2>
				<p className='text-gray-500 line-clamp-3 text-center'>
					{item.desc}
				</p>
			</div>
		</Link>
	)
}

export default TemplateCard
