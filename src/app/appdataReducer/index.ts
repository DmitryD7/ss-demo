import {AppRootStateType} from "../types";
import {accountAsync, appDataSlice} from "./appdataReducer";

const appdataReducer = appDataSlice.reducer;

const selectInventoryItems = (state: AppRootStateType) => state.appdata.inventory;
const selectModels = (state: AppRootStateType) => state.appdata.models;
const selectRules = (state: AppRootStateType) => state.appdata.rules;
const selectCurrItems = (state: AppRootStateType) => state.appdata.currItems;
const selectCurrModel = (state: AppRootStateType) => state.appdata.currModel;

const appdataSelectors = {
    selectInventoryItems,
    selectModels,
    selectRules,
    selectCurrItems,
    selectCurrModel,
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