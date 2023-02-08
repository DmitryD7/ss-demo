import axios from 'axios';

const instance = axios.create({
    baseURL: './data/',
});

export const inventoryAPI = {
    fetchItems() {
        return instance.get<FetchItemsResponseDataType>('items.json');
    },
    fetchModels() {
        return instance.get<FetchModelsResponseDataType>('models.json');
    },
};

type ItemType = {
    name: string
}

export interface FetchItemsResponseDataType {
    [id: string]: ItemType
}

type ModelType = {
    size: string
}

export interface FetchModelsResponseDataType {
    [id: string]: ModelType
}

