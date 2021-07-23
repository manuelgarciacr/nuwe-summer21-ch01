import { configureStore } from '@reduxjs/toolkit'
import personalProfileReducer from '../infrastructure/components/Profile/personalProfileSlice'
import nuweProfileReducer from '../infrastructure/components/Profile/nuweProfileSlice'
import specialityReducer from '../infrastructure/components/Profile/specialitySlice'
import specialityLevelReducer from '../infrastructure/components/Profile/specialityLevelSlice'
import companyTypeReducer from '../infrastructure/components/Profile/companyTypeSlice'

export const store = configureStore({
    reducer: {
        personalProfile: personalProfileReducer,
        nuweProfile: nuweProfileReducer,
        speciality: specialityReducer,
        specialityLevel: specialityLevelReducer,
        companyType: companyTypeReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch