import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editOccasion, removeOccasion } from '../features/occasionSlice';

function DisplayOccasion() {
    const occasions = useSelector(state => state.occasions);
    const dispatch = useDispatch();

    const [sort, setSort] = useState('latestAdded');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [editId, setEditId] = useState('')
    const [editedName, setEditedName] = useState('')
    const [editedOccasion, setEditedOccasion] = useState('');
    const [editedDate, setEditedDate] = useState('');

    const extractDateComponents = (dob) => {
        const date = new Date(dob);
        return {
            month: date.getMonth(),
            day: date.getDate(),
            year: date.getFullYear()
        };
    }

    const sortedOccasions = () => {

        let sorted = [...occasions];

        const current = new Date();
        const currentYear = current.getFullYear();

        switch(sort){
            case 'oldestAdded' : 
                return sorted;
            
            case 'latestAdded' :
                return sorted.reverse();
            
            case 'upcoming' :
                return sorted.sort((a, b) => {
                    const aDate = extractDateComponents(a.dob);
                    const bDate = extractDateComponents(b.dob);

                    const aDateFull = new Date(currentYear, aDate.month, aDate.day);
                    const bDateFull = new Date(currentYear, bDate.month, bDate.day);

                    // Handle cases where events might be in the next year
                    if (aDateFull < current) aDateFull.setFullYear(currentYear + 1);
                    if (bDateFull < current) bDateFull.setFullYear(currentYear + 1);

                    return aDateFull - bDateFull;
                });

            case 'past' : 
            return sorted.sort((a, b) => {
                const aDate = extractDateComponents(a.dob);
                const bDate = extractDateComponents(b.dob);

                let aDateFull = new Date(currentYear, aDate.month, aDate.day);
                let bDateFull = new Date(currentYear, bDate.month, bDate.day);

                if (aDateFull > current) aDateFull.setFullYear(currentYear - 1);
                if (bDateFull > current) bDateFull.setFullYear(currentYear - 1);

                return bDateFull - aDateFull;  
            });

            default : 
                return sorted;
        }      
    }

    const occasionToDisplay = sortedOccasions();

    const editClick = (id, name, occasion_description, date) => {
        if (isTransitioning) return;  
        setIsTransitioning(true);

        setEditId(id);
        setEditedName(name);
        setEditedOccasion(occasion_description);
        setEditedDate(date);

        setTimeout(() => setIsTransitioning(false), 1000);
    }

    const editComplete = (id) => {
        if (isTransitioning) return;  
        setIsTransitioning(true);

        dispatch(editOccasion({id, editedName, editedOccasion, editedDate}));

        setEditedName('')
        setEditId('')
        setEditedOccasion('')
        setEditedDate('')

        setTimeout(() => setIsTransitioning(false), 1000);
    }
    
    return (
        <div id="display-occasion" className='font-cursive grid grid-cols-1 '>
            <div id='title' className='text-4xl text-yellow-400 text-center leading-loose fixed backdrop-blur-sm w-1/2'>
                Your List of Cherished Occasions
            
            <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className='m-3 w-1/2 p-3 mx-auto outline-none rounded-md text-xl text-center text-green-800 font-bold bg-gray-200 bg-opacity-30'>
                
                <option value='oldestAdded'>Sort By Oldest Added</option>
                <option value='latestAdded'>Sort By Latest Added</option>
                <option value='upcoming'>Sort By Upcoming Occasion</option>
                <option value='past'>Sort By Past Occasion</option>
            </select>

            </div>

            <div id="occasion-container" className='overflow-auto mx-5 my-[150px]'>
                {occasionToDisplay.map((occasion) => 

                    <div key={occasion.id} className='text-xl m-5 px-4 py-3 leading-loose bg-gradient-to-r from-teal-600 via-green-600 to-yellow-600 rounded-md'>
                        <div className='flex justify-between items-center'>
                            <div className='flex'>
                                <div>Name : &nbsp;</div>
                                
                                {occasion.id === editId ?

                                (<input 
                                    className='text-blue-200 mb-2 bg-slate-200 bg-opacity-30 caret-black outline-none' 
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                />) : 
                                    
                                (<input 
                                    className='text-blue-200 mb-2 bg-transparent outline-none cursor-default caret-transparent' 
                                    readOnly
                                    value={occasion.person_name}/>)}
                            </div>
                            <span 
                                className="material-symbols-outlined text-red-100 text-2xl pr-4 select-none cursor-pointer" 
                                onClick={() => dispatch(removeOccasion(occasion.id))}>delete
                            </span>
                        </div>

                        <div className='flex'>
                            <div>Occasion : &nbsp;</div> 
                            
                            {occasion.id === editId ? 
                            
                            (<input
                                className='text-blue-200 mb-2 bg-slate-200 bg-opacity-30 caret-black outline-none'
                                value={editedOccasion}
                                onChange={(e) => setEditedOccasion(e.target.value)}/>) 
                            :
                            (<input 
                                className='text-blue-200 mb-2 bg-transparent outline-none cursor-default caret-transparent' 
                                readOnly
                                value={occasion.occasion_description}/>)}
                        </div>
                
                        <div className='flex justify-between items-center'>
                            <div className='flex'>
                                <div>Date Of Importance : &nbsp;</div> 

                                {occasion.id === editId ? 
                                
                                (<input 
                                    className='text-blue-200 mb-2 bg-slate-200 bg-opacity-30 caret-black outline-none'
                                    type='date'
                                    min={"1851-01-01"}
                                    value={editedDate}
                                    onChange={(e) => setEditedDate(e.target.value)}/>) 
                                : 
                                (<input 
                                    className='text-blue-200 mb-2 bg-transparent outline-none cursor-default caret-transparent'
                                    readOnly
                                    value={(occasion.dob)}/>)}                                    
                            </div>

                            {occasion.id === editId ?
                            
                            (<span 
                                className="material-symbols-outlined text-blue-300 text-3xl pr-4 select-none cursor-pointer" 
                                onClick={() => editComplete(occasion.id)}>task_alt
                            </span>)
                            :
                            (<span 
                                className="material-symbols-outlined text-slate-300 text-2xl pr-4 select-none cursor-pointer" 
                                onClick={() => editClick(occasion.id, occasion.person_name, occasion.occasion_description)}>edit
                            </span> )
                            }
                        </div>
                    </div>    
                )} 
            </div>
        </div>
    );
}

export default DisplayOccasion;
