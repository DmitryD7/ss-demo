import {appdataActions, appdataReducer} from "./index";
import {FetchItemsResponseDataType, FetchModelsResponseDataType} from "../../api/inventoryAPI";


const {fetchInventoryData, fetchModelsData, setCurrModel, setCurrItem} = appdataActions;

export const inventoryData: FetchItemsResponseDataType = {
    "1": {
        "name": "ALICE"
    },
    "2": {
        "name": "Blouse"
    },
    "3": {
        "name": "T-Shirt"
    },
}
export const modelsData: FetchModelsResponseDataType = {
    "1": {
        "size": "US 0"
    },
    "2": {
        "size": "US 2"
    },
    "3": {
        "size": "US 4"
    },
}

let startState: {
    models: FetchModelsResponseDataType,
    inventory: FetchItemsResponseDataType,
    currItem: string,
    currModel: string,
}

beforeEach(() => {
    startState = {
        models: {},
        inventory: {},
        currItem: '',
        currModel: '',
    };
});

test("correct current item id must be set", () => {
    const endState = appdataReducer(startState, setCurrItem({id: 'item123'}));

    expect(endState.currItem).toBe('item123');
});
test("correct current model id must be set", () => {
    const endState = appdataReducer(startState, setCurrModel({id: 'model123'}));

    expect(endState.currModel).toBe('model123');
});

test("correct models data must be set", () => {
    const action = fetchModelsData.fulfilled(modelsData, '', undefined);

    const endState = appdataReducer(startState, action);

    expect(endState.models['1'].size).toBe('US 0');
});

test("correct inventory data must be set", () => {
    const action = fetchInventoryData.fulfilled(inventoryData, '', undefined);

    const endState = appdataReducer(startState, action);

    expect(endState.inventory['2'].name).toBe('Blouse');
});
