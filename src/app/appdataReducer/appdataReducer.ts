import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleAsyncServerAppError, handleAsyncServerNetworkError, ThunkError} from "../../utils/errorUtils";
import {appCommonActions} from "../applicationCommonActions";
import {
    inventoryAPI,
    InventoryItemsResponseType,
    ItemGroupType,
    ItemType,
    ModelsType,
    RulesType
} from "../../api/inventoryAPI";

const {setAppStatus} = appCommonActions;

const getItems = (items: InventoryItemsResponseType) => {
    const overwrittenItems = [];
    for (let [id, item] of Object.entries(items)) {
        const newItem = {
            ...item,
            id: id
        }
        overwrittenItems.push(newItem)
    }
    return overwrittenItems;
};

const fetchInventoryData = createAsyncThunk<InventoryItemsResponseType, undefined, ThunkError>('appdata/fetchInventory', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await inventoryAPI.fetchItems();
        if (res.data) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            // const items = getItems(res.data);
            // return items;
            return res.data
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const fetchModelsData = createAsyncThunk<ModelsType, undefined, ThunkError>('appdata/fetchModels', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await inventoryAPI.fetchModels();
        if (res.data) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return res.data;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error: unknown | any) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
});

const fetchItemRules = createAsyncThunk<RulesType, undefined, ThunkError>('appdata/fetchRules', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await inventoryAPI.fetchRules();
        if (res.data) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
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
        models: {} as ModelsType,
        inventory: [] as Array<ItemType>,
        currItems: [] as Array<CurrentItemType>,
        rules: {} as RulesType,
        currModel: {} as CurrentModelType,
    },
    reducers: {
        setCurrItem: (state, action) => {
            state.currItems = action.payload;
        },
        setCurrModelId: (state, action: PayloadAction<{ id: string }>) => {
            state.currModel.id = action.payload.id;
        },
        setCurrModelType: (state, action: PayloadAction<{ type: 'nude' | 'covered' }>) => {
            state.currModel.type = action.payload.type;
        },
        setCurrModelIsCustom: (state, action: PayloadAction<{ isCustom: boolean }>) => {
            state.currModel.isCustom = action.payload.isCustom;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchInventoryData.fulfilled, (state, action) => {
            state.inventory = getItems(action.payload);
        });
        builder.addCase(fetchModelsData.fulfilled, (state, action) => {
            state.models = action.payload
        });
        builder.addCase(fetchItemRules.fulfilled, (state, action) => {
            state.rules = action.payload
        });
    },
});

export const accountAsync = {fetchInventoryData, fetchModelsData, fetchItemRules};

export type CurrentItemType = {
    name: string
    group: ItemGroupType
    id?: string,
}

export type CurrentModelType = {
    id: string
    type: 'nude' | 'covered'
    isCustom?: boolean
}