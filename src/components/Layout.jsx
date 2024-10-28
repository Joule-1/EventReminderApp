import React from 'react'
import AddOccasion from './AddOccasion'
import DisplayOccasion from './DisplayOccasion'

function Layout() {
	return (
		<>
			<div className='flex'>
				<div className='overflow-auto h-screen w-1/2'>
					<AddOccasion />
				</div>
				<div className='overflow-auto h-screen w-1/2'>	
					<DisplayOccasion />
				</div>
			</div>
		</>
	)
}

export default Layout
