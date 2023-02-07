import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://stylescan.com/fitpic/',
    withCredentials: true,
});

export const inventoryAPI = {
    fetchItems() {
        return instance.get<FetchItemsResponseDataType>('items.json');
    },
};

export type InventoryItemType = {
    name: string
    id: string,
    url: string,
    tags: string[]
}

export type FetchItemsResponseDataType = Array<InventoryItemType>