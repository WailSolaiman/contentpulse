import { Search } from 'lucide-react'
import React from 'react'

const SearchSection = ({ onSearchInput }: any) => {
	return (
		<div
			className='p-10 bg-gradient-to-br from-purple-500 
		via-purple-700 to-blue-600 flex flex-col justify-center items-center'>
			<h2 className='text-3xl font-bold text-white'>Browse All Tools</h2>
			<p className='text-white'>What would you like to create today?</p>
			<div className='w-full flex justify-center'>
				<div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]'>
					<Search className='text-primary' />
					<input
						name='search'
						type='text'
						placeholder='Search'
						className='bg-transparent w-full outline-none'
						onChange={(event) => onSearchInput(event.target.value)}
					/>
				</div>
			</div>
		</div>
	)
}

export default SearchSection
