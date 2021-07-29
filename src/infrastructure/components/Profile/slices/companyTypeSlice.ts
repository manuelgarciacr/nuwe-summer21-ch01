import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../../../app/store";
import { IdName } from "domain/model/IdName";
import { CompanyTypeService } from "domain/services/CompanyType.service";

export interface CompanyTypeState {
    value: IdName[];
    status: "idle" | "loading" | 'succeeded' | "failed";
    error: string;
    currentRequestId: string;
}

const initialState: CompanyTypeState = {
    value: [],
    status: "idle",
    error: "",
    currentRequestId: ""
};

export const fetchCompanyTypes = createAsyncThunk<
    IdName[], void, {dispatch: AppDispatch}
>('companyType/fetchCompanyTypes', async (parms, ThunkAPI) => {
    ThunkAPI.dispatch(companyTypeSlice.actions.resetStatus);
    const response = await CompanyTypeService.get();
    return response
});

export const companyTypeSlice = createSlice({
    name: "companyType",
    initialState,
    reducers: {
        resetStatus: (state) => {
            if (state.status !== "loading")
                state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanyTypes.pending, (state, action) => {
                state.status = "loading";
                state.currentRequestId = action.meta.requestId;
            })
            .addCase(fetchCompanyTypes.fulfilled, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "succeeded";
                    state.value = action.payload;
                    state.currentRequestId = "";
                }
            })
            .addCase(fetchCompanyTypes.rejected, (state, action) => {
                if (action.meta.requestId === state.currentRequestId) {
                    state.status = "failed";
                    state.error = action.error.message || "";
                    state.currentRequestId = "";
                }
            });
    },
});

export const { resetStatus } = companyTypeSlice.actions;
export const selectCompanyTypes = (state: RootState) => state.companyType.value;
export default companyTypeSlice.reducer;
