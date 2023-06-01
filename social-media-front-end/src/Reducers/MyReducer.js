import { createSlice } from "@reduxjs/toolkit";

 const MySlice = createSlice({
    name : 'BookMark',
    initialState:{
        
        feedsCount : 0,
        bookMarkCount : 0

    },
    reducers:{
       
        getPostCount:(state,action) => {
            state.feedsCount = action.payload
        },

        getBookMarkCount:(state,action) => {
            state.bookMarkCount = action.payload
        }
    }
})

export const {getBookMarkCount, getPostCount} = MySlice.actions ;
export default MySlice.reducer 