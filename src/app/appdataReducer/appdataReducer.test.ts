import {appdataActions, appdataReducer} from "./index";
import {InventoryItemsResponseType, ItemType, ModelsType, RulesType} from "../../api/inventoryAPI";
import {CurrentItemType, CurrentModelType} from "./appdataReducer";


const {fetchInventoryData, fetchModelsData, setCurrModelId, setCurrModelType, setCurrItem} = appdataActions;

export const inventoryData: InventoryItemsResponseType = {
    "1": {
        "name": "ALICE",
        group: 'top',
    },
    "2": {
        "name": "Pants",
        group: 'bot',
    },
    "3": {
        "name": "T-Shirt",
        group: 'top',
    },
}
export const modelsData: ModelsType = {
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
    models: ModelsType,
    inventory:  Array<ItemType>,
    currItems:  Array<CurrentItemType>,
    currModel: CurrentModelType,
    rules: RulesType,
}

beforeEach(() => {
    startState = {
        models: {},
        inventory: [],
        currItems: [],
        currModel: {
            id: '',
            type: 'covered',
        },
        rules: {
            exclusion: {
                bot: [],
                top: [],
            },
            nude: [['bot']],
            order: [],
        },
    };
});

test("correct current item must be set", () => {
    const endState = appdataReducer(startState, setCurrItem(
        [{
            "1": {
                name: "ALICE",
                group: 'dress',
                id: '1',
            },
        }]
    ));

    expect(endState.currItems.length).toBe(1);
});

test("correct models data must be set", () => {
    const action = fetchModelsData.fulfilled(modelsData, '', undefined);

    const endState = appdataReducer(startState, action);

    expect(endState.models['1'].size).toBe('US 0');
});

test("correct inventory data must be set", () => {
    const action = fetchInventoryData.fulfilled(inventoryData, '', undefined);

    const endState = appdataReducer(startState, action);

    expect(endState.inventory[1].name).toBe('Pants');
    expect(endState.inventory.length).toBe(3);
});
test("correct model id data must be set", () => {
    const endState = appdataReducer(startState, setCurrModelId({id: 'model123'}));

    expect(endState.currModel.id).toBe('model123');
});

test("correct model type data must be set", () => {
    const endState = appdataReducer(startState, setCurrModelType({type: 'nude'}));

    expect(endState.currModel.type).toBe('nude');
});

