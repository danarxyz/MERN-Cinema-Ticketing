import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './features/filter/filterSlice'
import ticketReducer from './features/tickets/ticketSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    ticket:ticketReducer,
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store