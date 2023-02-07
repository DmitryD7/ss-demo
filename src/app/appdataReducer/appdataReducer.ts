import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleAsyncServerAppError, handleAsyncServerNetworkError, ThunkError} from "../../utils/errorUtils";
import {appCommonActions} from "../applicationCommonActions";
import {FetchItemsResponseDataType, inventoryAPI} from "../../api/inventoryAPI";
import {FetchModelsResponseDataType, modelsAPI} from "../../api/toolAPI";

const {setAppStatus, setAppError} = appCommonActions;

const fetchInventoryData = createAsyncThunk<FetchItemsResponseDataType, undefined, ThunkError>('appdata/fetchInventory', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await inventoryAPI.fetchItems();
        if (res.data) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const fetchModelsData = createAsyncThunk<FetchModelsResponseDataType, undefined, ThunkError>('appdata/fetchModels', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await modelsAPI.fetchModels();
        if (res.data) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(setAppError({error: null}));
            return res.data;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

export const appDataSlice = createSlice({
    name: 'appdata',
    initialState: {
        models: [] as FetchModelsResponseDataType,
        inventory: [] as FetchItemsResponseDataType,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchInventoryData.fulfilled, (state, action) => {
            state.inventory = action.payload
        });
        builder.addCase(fetchModelsData.fulfilled, (state, action) => {
            state.models = action.payload
        });
    },
});

export const accountAsync = {fetchInventoryData, fetchModelsData};