import { MovieDetail } from "@/services/global/global.type"
import { Theater } from "@/services/theaters/theaters.type"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Ticket = {
    theater?: Theater
    time?:string
    seat?:string[]
}

export interface TicketState {
   step?: "DETAIL" | "THEATER"| "TIME" | "SEAT" 
   detail?:Ticket | null
   movie?: MovieDetail | null
}

const initialState: TicketState = {
    step:"DETAIL",
    detail:null,
    movie:null
}

export const ticketSlice = createSlice({
    name:"ticket",
    initialState,
    reducers:{
        setStep:(state,action: PayloadAction<TicketState>)=>{
            state.step = action.payload.step
        },
        setTicketDetail:(state,action: PayloadAction<Ticket>)=>{
            state.detail = {
                ...state.detail,
                ...action.payload
            }
            
        },
        setMovieDetail:(state,action: PayloadAction<MovieDetail>)=>{
            state.movie = action.payload
        }
    }
})

export const {setStep,setTicketDetail,setMovieDetail} = ticketSlice.actions

export default ticketSlice.reducer