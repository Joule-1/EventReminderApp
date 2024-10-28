import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addOccasion } from '../features/occasionSlice'

function AddOccasion() {

	const [person_name, setName] = useState('');
	const [occasion_description, setOccasion] = useState('');
	const [dob, setDOB] = useState('');

	const input_css = 'w-full bg-gradient-to-r leading-loose from-blue-400 via-teal-400 to-blue-600 m-2 font-bold text-2xl text-red-700 p-4 outline-none rounded-md focus:border-blue-500 border-2 transition duration-500 ease-in-out shadow-md shadow-slate-900'
	const container_css = 'flex flex-col items-center w-1/2 m-3'

	const dispatch = useDispatch();

	const occasionHandler = (event) => {
		event.preventDefault()

		dispatch(addOccasion({person_name, occasion_description, dob}))

		setName('');
		setOccasion('');
		setDOB('');
	}

  return (
    <>
    <form onSubmit={occasionHandler} className='h-full p-2 grid grid-cols-1 place-items-center font-cursive'>

	  	<div className='text-4xl text-green-800 m-3 text-center leading-loose'>Furnish your Esteemed Details</div>

		<div id="name-container" className={container_css}>
			<label htmlFor="name" className='text-2xl text-blue-200 m-1'>Enter The Name</label>
			<input 
				type="text"
				id='name' 
				className={input_css}  
				autoComplete='off' 
				required
				value={`${person_name}`} 
				onChange={(e) => (setName(e.target.value))}
				/> 
		</div>
		
		<div id="occasion-description-container" className={container_css}>
			<label htmlFor="event" className='text-2xl text-blue-200 m-1'>Enter The Occasion</label>
			<input 
				type="text"
				id='event' 
				className={input_css}  
				autoComplete='off'
				required
				value={`${occasion_description}`}
				onChange={(e) => setOccasion(e.target.value)}
				/>
		</div>

		
		<div id="date-container" className={container_css}>
			<label htmlFor="date" className='text-2xl text-blue-200 m-1'>Enter The Date</label>
			<input 
				type="date" 
				id='date' 
				className={`${input_css} text-center`} 
				autoComplete='off' 
				required
				value={dob}
				onChange={(e) => setDOB(e.target.value)}
				/>
		</div>

		<button type='submit' className='outline-none rounded-md px-5 py-3 m-4 text-2xl font-bold text-green-800 focus:border-blue-500 border-2 transition duration-500 ease-in-out shadow-md shadow-slate-900 '>Submit</button>
		
	</form>
	
    </>
  )
}


export default AddOccasion