import axios from 'axios';

const instance = axios.create({
    baseURL: './data/',
});

export const inventoryAPI = {
    fetchItems() {
        return instance.get<InventoryItemsResponseType>('items.json');
    },
    fetchModels() {
        return instance.get<ModelsType>('models.json');
    },
    fetchRules() {
        return instance.get<RulesType>('item-rules.json');
    },
};

export type ItemGroupType = "feet" | "top" | "bot" | "bag"

export type ItemType = {
    name: string
    group: ItemGroupType
    id?: string
}

export interface InventoryItemsResponseType {
    [id: string]: ItemType
}

export type ModelType = {
    size: string
    prewarps?: boolean
}

export interface ModelsType {
    [id: string]: ModelType
}

export interface RulesType {
    exclusion: Exclusion
    nude: Array<Array<'top' | 'bot'>>
    order: string[]
}

export interface Exclusion {
    top: string[]
    bot: string[]
}

