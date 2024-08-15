import { configureStore } from "@reduxjs/toolkit";
import tasksSliceReducer from "./tasksSlice";
import AuthSliceReducer from "./AuthSlice";

const store = configureStore({
    reducer:  {tasks: tasksSliceReducer, Auth:AuthSliceReducer}
})

export default store;
