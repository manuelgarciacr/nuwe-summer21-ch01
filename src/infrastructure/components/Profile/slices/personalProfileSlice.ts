import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "../../../../app/store";
import { PersonalProfile } from "domain/model/PersonalProfile";
import { PersonalProfileService } from "domain/services/PersonalProfile.service";

export interface PersonalProfileState {
    value: PersonalProfile | {};
    status: "idle" | "loading" | 'succeeded' | "failed";
    error: string;
    currentRequestId: string;
}

const initialState: PersonalProfileState = {
    value: {},
    status: "idle",
    error: "",
    currentRequestId: ""
};

export const fetchPersonalProfile = createAsyncThunk('personalProfile/fetchProfile', async () => {
    const response = await PersonalProfileService.get()
    return response
})

export const putPersonalProfile = createAsyncThunk('personalProfile/putPersonalProfile', async (newData: Partial<PersonalProfile>) => {
    const state = selectPersonalProfile(store.getState()) as PersonalProfile;
    const response = await PersonalProfileService.put({...state, ...newData})
    return response
})
  
export const personalProfileSlice = createSlice({
    name: "personalProfile",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPersonalProfile.pending, (state, action) => {
                state.status = "loading";
                state.currentRequestId = action.meta.requestId;
            })
            .addCase(fetchPersonalProfile.fulfilled, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "succeeded";
                    state.value = action.payload;
                    state.currentRequestId = "";
                }
            })
            .addCase(fetchPersonalProfile.rejected, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "failed";
                    state.error = action.error.message || "";
                    state.currentRequestId = "";
                }
            })
            .addCase(putPersonalProfile.pending, (state, action) => {
                state.status = "loading";
                state.currentRequestId = action.meta.requestId;
            })
            .addCase(putPersonalProfile.fulfilled, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "succeeded";
                    state.value = action.payload;
                    state.currentRequestId = "";
                }
            })
            .addCase(putPersonalProfile.rejected, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "failed";
                    state.error = action.error.message || "";
                    state.currentRequestId = "";
                }
            });
    },
});

export const selectPersonalProfile = (state: RootState) => state.personalProfile.value;
export default personalProfileSlice.reducer;
