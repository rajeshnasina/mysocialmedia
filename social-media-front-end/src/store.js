import { configureStore } from "@reduxjs/toolkit";

import  MySlice  from "./Reducers/MyReducer";
export const Store= configureStore({
    reducer: {
        Rajesh : MySlice
    }
})

