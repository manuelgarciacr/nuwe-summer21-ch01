import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../../../app/store";
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

export const fetchSpecialities = createAsyncThunk<
    IdName[], void, {dispatch: AppDispatch}
>('speciality/fetchSpecialities', async (parms, ThunkAPI) => {
    ThunkAPI.dispatch(specialitySlice.actions.resetStatus);
    const response = await SpecialityService.get();
    return response
});

export const specialitySlice = createSlice({
    name: "speciality",
    initialState,
    reducers: {
        resetStatus: (state) => {
            if (state.status !== "loading")
                state.status = "idle";
        },
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

export const { resetStatus } = specialitySlice.actions;
export const selectSpecialities = (state: RootState) => state.speciality.value;
export default specialitySlice.reducer;
