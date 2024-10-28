import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState =  {
   occasions : [
    {
        id : 'a',  
        person_name : 'Friend',
        occasion_description : 'Birthday',
        dob : '2000-10-5'
    },
    {
        id : 'b',
        person_name : "Akshay",
        occasion_description : "Birthday",
        dob : "2004-11-03"
    },
    {
        id : 'c',
        person_name : "Random",
        occasion_description : "Random Occasion",
        dob : "1851-12-04"
    },
     {
        id : 'd',  
        person_name : 'Friend',
        occasion_description : 'Birthday',
        dob : '1851-03-05'
    },
    {
        id : 'e',
        person_name : "Akshay",
        occasion_description : "Birthday",
        dob : "2004-04-03"
    },
    {
        id : 'f',
        person_name : "Random",
        occasion_description : "Random Occcasion",
        dob : "1851-06-04"
    },
    
]
};

export const birthdaySlice = createSlice({
    name : 'events',
    initialState,
    reducers : {
        addOccasion : (state, action) => {

            const { person_name, occasion_description, dob } = action.payload

            const occasion = {
                id : nanoid(),
                person_name,
                occasion_description,
                dob
            }
            state.occasions.push(occasion)

            
        },

        removeOccasion : (state, action) => {
            state.occasions = state.occasions.filter((occasion) => occasion.id !== action.payload)
        },

        editOccasion : (state, action) => {

            const {id, person_name, occasion_description, dob} = action.payload;

            const findOccasion = state.occasions.find((occasion) => occasion.id === id);

            if(findOccasion){
                findOccasion.person_name = person_name;
                findOccasion.occasion_description = occasion_description;
                findOccasion.dob = dob;
            }

        },
        
    }
})


export const {addOccasion, removeOccasion, editOccasion} = birthdaySlice.actions;

export default birthdaySlice.reducer;