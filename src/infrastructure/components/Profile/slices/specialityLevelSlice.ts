import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../../../app/store";
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

export const fetchSpecialityLevels = createAsyncThunk<
    IdName[], void, {dispatch: AppDispatch}
>('specialityLevel/fetchSpecialityLevels', async (parms, ThunkAPI) => {
    ThunkAPI.dispatch(specialityLevelSlice.actions.resetStatus);
    const response = await SpecialityLevelService.get();
    return response
});

export const specialityLevelSlice = createSlice({
    name: "specialityLevel",
    initialState,
    reducers: {
        resetStatus: (state) => {
            if (state.status !== "loading")
                state.status = "idle";
        },
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

export const { resetStatus } = specialityLevelSlice.actions;
export const selectSpecialityLevels = (state: RootState) => state.specialityLevel.value;
export default specialityLevelSlice.reducer;
