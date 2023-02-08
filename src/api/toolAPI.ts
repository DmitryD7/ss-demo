// import axios from 'axios';
//
// const instance = axios.create({
//     baseURL: 'https://api.stylescan.net/v1/tool/',
//     withCredentials: true,
// });

// export const modelsAPI = {
//     fetchModels() {
//         return instance.get<FetchModelsResponseDataType>('models.json');
//     },
// };

export type ModelType = {
    "id": number,
    "src": string,
    "thumb": string,
    "size": string,
    "gender": string,
    "height": string,
}

export type _FetchModelsResponseDataType = Array<ModelType>

export type InventoryItemType = {
    name: string
    id: string,
    url: string,
    tags: string[]
}

export type _FetchItemsResponseDataType = Array<InventoryItemType>