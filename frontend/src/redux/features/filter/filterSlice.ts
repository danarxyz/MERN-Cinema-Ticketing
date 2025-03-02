import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface FilterState {
    availablity? : boolean
    city? : string
    theaters? : string[]
}

interface DataState{
    data:FilterState
}

const initialState:DataState = {
    data:{
        availablity:undefined,
        // genres:undefined,
        city:undefined,
        theaters:undefined
    }
}

export const filterSlice = createSlice({
    name:"filter",
    initialState,
    reducers:{
        setFilter:(state,action: PayloadAction<DataState>)=>{
            state.data = {
                ...state.data,
                ...action.payload.data
            }
        }
    }
})

export const {setFilter} = filterSlice.actions

export default filterSlice.reducer
