import { configureStore } from '@reduxjs/toolkit'
import personalProfileReducer from '../infrastructure/components/Profile/personalProfileSlice'
import nuweProfileReducer from '../infrastructure/components/Profile/nuweProfileSlice'

export const store = configureStore({
    reducer: {
        personalProfile: personalProfileReducer,
        nuweProfile: nuweProfileReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch