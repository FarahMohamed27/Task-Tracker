import { configureStore } from "@reduxjs/toolkit";
import tasksSliceReducer from "./tasksSlice";

const store = configureStore({
    reducer: tasksSliceReducer
})

export default store;