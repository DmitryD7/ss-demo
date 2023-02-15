import {createSlice} from "@reduxjs/toolkit";
import {RequestStatusType} from "../types";
import {appCommonActions} from "../applicationCommonActions";

const {setAppStatus, setAppError, setIsAppInitialized} = appCommonActions;

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false as boolean,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(setAppStatus, (state, action) => {
            state.status = action.payload.status;
        });
        builder.addCase(setAppError, (state, action) => {
            state.error = action.payload.error;
        });
        builder.addCase(setIsAppInitialized, (state, action) => {
            state.isInitialized = action.payload.isInit;
        });
    },
});