import {useDispatch} from "react-redux";
import {AppDispatchType} from "../app/types";

export const useAppDispatch = () => useDispatch<AppDispatchType>();

export const goToURL = (url: any) => window.location.replace(url);