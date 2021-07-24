import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../../app/store";
import { IdName } from "domain/model/IdName";
import { SpecialityLevelService } from "domain/services/SpecialityLevel.service";

export interface SpecialityLevelState {
    value: IdName[];
    status: "idle" | "loading" | 'succeeded' | "failed";
    error: string;
    currentRequestId: string;
}

const initialState: SpecialityLevelState = {
    value: [],
    status: "idle",
    error: "",
    currentRequestId: ""
};

export const fetchSpecialityLevels = createAsyncThunk('specialityLevel/fetchSpecialityLevels', async () => {
    const response = await SpecialityLevelService.get()
    return response
})

export const specialityLevelSlice = createSlice({
    name: "specialityLevel",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecialityLevels.pending, (state, action) => {
                state.status = "loading";
                state.currentRequestId = action.meta.requestId;
            })
            .addCase(fetchSpecialityLevels.fulfilled, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "succeeded";
                    state.value = action.payload;
                    state.currentRequestId = "";
                }
            })
            .addCase(fetchSpecialityLevels.rejected, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "failed";
                    state.error = action.error.message || "";
                    state.currentRequestId = "";
                }
            });
    },
});

export const selectSpecialityLevels = (state: RootState) => state.specialityLevel.value;
export default specialityLevelSlice.reducer;
