import {useDispatch} from "react-redux";
import {AppDispatchType} from "../app/types";

export const useAppDispatch = () => useDispatch<AppDispatchType>();

export const goToURL = (url: any) => window.location.replace(url);

export const getArr = (obj: any) => {
    const keys = Object.keys(obj)
    const arr = [];
    for (let i = 0; i < keys.length; i++) {
        let currKey = keys[i];
        arr.push({[`${currKey}`]: obj[currKey]})
    }
    return arr;
};