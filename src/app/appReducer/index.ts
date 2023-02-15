import {appSlice} from "./appReducer";
import {AppRootStateType} from "../types";

const selectStatus = (state: AppRootStateType) => state.app.status;
const selectError = (state: AppRootStateType) => state.app.error;
const selectIsAppInit = (state: AppRootStateType) => state.app.isInitialized;

const appReducer = appSlice.reducer;

const appSelectors = {
    selectStatus,
    selectError,
    selectIsAppInit,
}

const appActions = {
    ...appSlice.actions,
};

export {
    appReducer,
    appActions,
    appSelectors,
};