import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../../../app/store";
import { NuweProfile } from "domain/model/NuweProfile";
import { NuweProfileService } from "domain/services/NuweProfile.service";

export interface NuweProfileState {
    value: NuweProfile | {};
    status: "idle" | "loading" | 'succeeded' | "failed";
    error: string;
    currentRequestId: string;
}

const initialState: NuweProfileState = {
    value: {},
    status: "idle",
    error: "",
    currentRequestId: ""
};

export const fetchNuweProfile = createAsyncThunk<
    NuweProfile, void, {dispatch: AppDispatch}
>('nuweProfile/fetchNuweProfile', async (parms, ThunkAPI) => {
    ThunkAPI.dispatch(nuweProfileSlice.actions.resetStatus);
    const response = await NuweProfileService.get();
    return response
});

export const nuweProfileSlice = createSlice({
    name: "nuweProfile",
    initialState,
    reducers: {
        resetStatus: (state) => {
            if (state.status !== "loading")
                state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNuweProfile.pending, (state, action) => {
                state.status = "loading";
                state.currentRequestId = action.meta.requestId;
            })
            .addCase(fetchNuweProfile.fulfilled, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "succeeded";
                    state.value = action.payload;
                    state.currentRequestId = "";
                }
            })
            .addCase(fetchNuweProfile.rejected, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "failed";
                    state.error = action.error.message || "";
                    state.currentRequestId = "";
                }
            });
    },
});

export const { resetStatus } = nuweProfileSlice.actions;
export const selectNuweProfile = (state: RootState) => state.nuweProfile.value;
export default nuweProfileSlice.reducer;
