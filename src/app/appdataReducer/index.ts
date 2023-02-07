import {AppRootStateType} from "../types";
import {accountAsync, appDataSlice} from "./appdataReducer";

const appdataReducer = appDataSlice.reducer;

const selectInventoryItems = (state: AppRootStateType) => state.appdata.inventory;
const selectModels = (state: AppRootStateType) => state.appdata.models;

const appdataSelectors = {
    selectInventoryItems,
    selectModels,
};

const appdataActions = {
    ...appDataSlice.actions,
    ...accountAsync,
};

export {
    appdataReducer,
    appdataActions,
    appdataSelectors,
};