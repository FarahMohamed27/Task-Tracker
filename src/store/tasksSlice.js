import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mutate } from 'swr';


export const deleteTask = createAsyncThunk('data/deleteData',
    async({id}, {rejectWithValue}) => {
        try{
            const response = await axios.delete(`http://localhost:3001/tasks/${id}`);
            console.log('Delete response:', response);
            return id;
        }
        catch(error){
            return rejectWithValue(error.response.data)
        }
    } 
);

function generateId() {
    const now = new Date();
    return now.toISOString().replace(/[-:.]/g, ''); 
}

export const submitForm = createAsyncThunk('tasks/submitTask', 
    async({task}, {getState, rejectWithValue}) => {
        try{
            const {tasks, currentTask} = getState().tasks;
            let updatedTasks;
            if(currentTask){
                await axios.put(`http://localhost:3001/tasks/${currentTask.id}`, task);
                updatedTasks = tasks.map(t => t.id === currentTask.id ? task : t);
            }
            else{
                task.id = generateId();
                const response = await axios.post("http://localhost:3001/tasks", task);
                const newTask = response.data; 
                updatedTasks = [...tasks, newTask]; 
            }            
            return updatedTasks;
        }
        catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)

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
        },
        addTask: (state) => {
            state.isFormOpen = true;
            state.currentTask = null;
            state.view = false;
        },
        editTask: (state,action) =>{
            state.isFormOpen = true;
            state.currentTask = action.payload;
            state.view = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(deleteTask.fulfilled , (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            mutate('http://localhost:3001/tasks', state.tasks, false);
            console.log("Deleted Successfully");
        })
        .addCase(deleteTask.rejected, (state,action) =>{
            console.log("Error in delete:", action.payload);
        })
        .addCase(submitForm.fulfilled, (state,action) => {
            state.tasks = action.payload;
            mutate('http://localhost:3001/tasks', state.tasks, false);
            state.isFormOpen = false;
            console.log("submitted Successfully");
        })
        .addCase(submitForm.rejected, (state,action) =>{
            console.log("Error in submit:", action.payload);
        } )
    }
})

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;