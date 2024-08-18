import { configureStore } from "@reduxjs/toolkit";
import tasksSliceReducer from "./tasksSlice";
import AuthSliceReducer from "./AuthSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
    reducer:  {tasks: tasksSliceReducer, Auth:AuthSliceReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;
