import {appdataActions, appdataReducer} from "./index";
import {FetchItemsResponseDataType} from "../../api/inventoryAPI";
import {FetchModelsResponseDataType} from "../../api/toolAPI";


const {fetchInventoryData, fetchModelsData} = appdataActions;

export const inventoryData: FetchItemsResponseDataType = [
    {
        "name": "DECO RUCHED DRESS LEMUR MATISSE",
        "id": "Display1",
        "url": "/fitpic/images/Masked1.png",
        "tags": [
            "Dresses"
        ]
    },
    {
        "name": "90S SLIP DRESS HAZELNUT LOST FLOWERS",
        "id": "Display5",
        "url": "/fitpic/images/Masked5.png",
        "tags": [
            "Dresses"
        ]
    },
    {
        "name": "90S SLIP DRESS PEACOCK",
        "id": "Display6",
        "url": "/fitpic/images/Masked6.png",
        "tags": [
            "Dresses"
        ]
    },
];
export const modelsData: FetchModelsResponseDataType = [
    {
        "id": 1,
        "src": "https://api.stylescan.net/v1/tool/models3/cropped/1.png",
        "thumb": "https://api.stylescan.net/v1/tool/models3/thumb/1.png",
        "size": "US 0 / UK 4",
        "gender": "F",
        "height": "5'10\""
    },
    {
        "id": 2,
        "src": "https://api.stylescan.net/v1/tool/models3/cropped/2.png",
        "thumb": "https://api.stylescan.net/v1/tool/models3/thumb/2.png",
        "size": "US 2 / UK 6",
        "gender": "F",
        "height": "5'9\""
    },
    {
        "id": 3,
        "src": "https://api.stylescan.net/v1/tool/models3/cropped/3.png",
        "thumb": "https://api.stylescan.net/v1/tool/models3/thumb/3.png",
        "size": "US 4 / UK 8",
        "gender": "F",
        "height": "5'9\""
    },
];

let startState: {
    models: FetchModelsResponseDataType,
    inventory: FetchItemsResponseDataType,
}

beforeEach(() => {
    startState = {
        models: [],
        inventory: [],
    };
});

test("correct models data must be set", () => {
    const action = fetchModelsData.fulfilled(modelsData, '', undefined);

    const endState = appdataReducer(startState, action);

    expect(endState.models.length).toBe(3);
    expect(endState.models[0].id).toBe(1);
    expect(endState.models[2].gender).toBe("F");
});

test("correct inventory data must be set", () => {
    const action = fetchInventoryData.fulfilled(inventoryData, '', undefined);

    const endState = appdataReducer(startState, action);

    expect(endState.inventory.length).toBe(3);
    expect(endState.inventory[0].id).toBe('Display1');
    expect(endState.inventory[2].name).toBe("90S SLIP DRESS PEACOCK");
});



