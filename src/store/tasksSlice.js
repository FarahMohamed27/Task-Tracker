import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name:'tasks',
    initialState:{
        tasks: [],
        isFormOpen: false,
        currentTask: null,
        currentPage: 1,
        view: false
    },
    reducers:{
        setTasks: (state, action) =>{
            state.tasks = action.payload;
        },
        setIsFormOpen: (state,action) =>{
            state.isFormOpen = action.payload;
            console.log(state.isFormOpen)
        },
        setCurrentTask:(state, action) =>{
            state.currentTask = action.payload;
            console.log(state.currentTask)
        },
        setCurrentPage: (state,action)=>{
            state.currentPage = action.payload;
        },
        setView: (state, action) =>{
            state.view = action.payload;
        }
    }
})

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;