import { configureStore } from '@reduxjs/toolkit'
import personalProfileReducer from '../infrastructure/components/Profile/slices/personalProfileSlice'
import nuweProfileReducer from '../infrastructure/components/Profile/slices/nuweProfileSlice'
import specialityReducer from '../infrastructure/components/Profile/slices/specialitySlice'
import specialityLevelReducer from '../infrastructure/components/Profile/slices/specialityLevelSlice'
import companyTypeReducer from '../infrastructure/components/Profile/slices/companyTypeSlice'

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