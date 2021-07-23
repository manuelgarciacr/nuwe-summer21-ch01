import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import { IdName } from "domain/model/IdName";
import { SpecialityService } from "domain/services/Speciality.service";

export interface SpecialityState {
    value: IdName[];
    status: "idle" | "loading" | 'succeeded' | "failed";
    error: string;
    currentRequestId: string;
}

const initialState: SpecialityState = {
    value: [],
    status: "idle",
    error: "",
    currentRequestId: ""
};

export const fetchSpecialities = createAsyncThunk('speciality/fetchSpecialities', async () => {
    const response = await SpecialityService.get()
    return response
})

export const specialitySlice = createSlice({
    name: "speciality",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecialities.pending, (state, action) => {
                state.status = "loading";
                state.currentRequestId = action.meta.requestId;
            })
            .addCase(fetchSpecialities.fulfilled, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "succeeded";
                    state.value = action.payload;
                    state.currentRequestId = "";
                }
            })
            .addCase(fetchSpecialities.rejected, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "failed";
                    state.error = action.error.message || "";
                    state.currentRequestId = "";
                }
            });
    },
});

export const selectSpecialities = (state: RootState) => state.speciality.value;
export default specialitySlice.reducer;
