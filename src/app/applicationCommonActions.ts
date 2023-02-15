import {createAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "./types";

const setAppStatus = createAction<{ status: RequestStatusType }>('app/setAppStatus')

const setAppError = createAction<{ error: string | null }>('app/setAppError')

const setIsAppInitialized = createAction<{ isInit: boolean }>('app/setIsAppInitialized')

export const appCommonActions = {
    setAppStatus,
    setAppError,
    setIsAppInitialized,
}