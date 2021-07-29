import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState, store } from "../../../../app/store";
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

export const fetchPersonalProfile = createAsyncThunk('personalProfile/fetchProfile', async (params, ThunkAPI) => {
    ThunkAPI.dispatch(personalProfileSlice.actions.resetStatus);
    const response = await PersonalProfileService.get();
    return response
})

export const putPersonalProfile = createAsyncThunk('personalProfile/putPersonalProfile', async (newData: Partial<PersonalProfile>, ThunkAPI) => {
    ThunkAPI.dispatch(personalProfileSlice.actions.resetStatus);
    const state = selectPersonalProfile(store.getState()) as PersonalProfile;
    const response = await PersonalProfileService.put({...state, ...newData});
    return response
})
  
export const personalProfileSlice = createSlice({
    name: "personalProfile",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        resetStatus: (state) => {
            if (state.status !== "loading")
                state.status = "idle";
        },
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

export const { resetStatus } = personalProfileSlice.actions;
export const selectPersonalProfile = (state: RootState) => state.personalProfile.value;
export default personalProfileSlice.reducer;
