import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {appdataReducer} from "./appdataReducer";
import {appReducer} from "./appReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    appdata: appdataReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});