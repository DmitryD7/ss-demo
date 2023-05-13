import {useDispatch} from "react-redux";
import {AppDispatchType} from "../app/types";
import {useEffect} from "react";
import {ItemType} from "../api/inventoryAPI";

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

export const useImportScript = (resourceUrl: string) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = resourceUrl;
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, [resourceUrl]);
};

export const useOutsideAlerter = (ref: any, onCloseFunc: any) => {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                onCloseFunc()
                // document.body.style.overflow = 'auto';
                // window.document.body.style.paddingRight = '0';

            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onCloseFunc]);
};

export function sortInventoryByOrder(
    inventory: ItemType[],
    order: string[]
) {
    const newArr = [...inventory];
    return newArr.sort((a, b) => {
        const aIndex = order.indexOf(a.group);
        const bIndex = order.indexOf(b.group);
        return aIndex - bIndex;
    });
}
