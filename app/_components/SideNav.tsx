'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import Link from 'next/link'
import UsageTrack from './UsageTrack'

const SideNav = () => {
	const MenuList = [
		{
			name: 'Home',
			icon: Home,
			path: '/dashboard',
		},
		{
			name: 'History',
			icon: FileClock,
			path: '/history',
		},
		{
			name: 'Billing',
			icon: WalletCards,
			path: '/billing',
		},
		{
			name: 'Settings',
			icon: Settings,
			path: '/settings',
		},
	]

	const path = usePathname()

	useEffect(() => {
		console.log('PATH: ', path)
	}, [])

	return (
		<div className='h-screen relative p-5 shadow-sm border bg-white'>
			<div className='flex justify-center'>
				<Image
					src={'/logo.svg'}
					alt='logo'
					width={120}
					height={100}
					style={{ width: 'auto', height: 'auto' }}
				/>
			</div>
			<hr className='my-6 border' />
			<div className='mt-3'>
				{MenuList.map((menu, index) => (
					<Link href={menu.path} key={index}>
						<div
							className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white 
								rounded-lg cursor-pointer items-center ${
									path === menu.path &&
									'bg-primary text-white'
								}`}>
							<menu.icon />
							<h2>{menu.name}</h2>
						</div>
					</Link>
				))}
			</div>
			<div className='absolute bottom-10 left-0 w-full'>
				<UsageTrack />
			</div>
		</div>
	)
}

export default SideNav
