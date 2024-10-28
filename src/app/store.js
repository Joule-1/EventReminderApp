import { configureStore } from "@reduxjs/toolkit";
import birthdayReducer from  "../features/occasionSlice";

export const store = configureStore({
    reducer : birthdayReducer
})