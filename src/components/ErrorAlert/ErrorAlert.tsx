import s from './ErrorAlert.module.scss'
import React from "react";
import {useAppDispatch} from "../../utils/utils";
import {appSelectors} from "../../app/appReducer";
import {useSelector} from "react-redux";
import {appCommonActions} from "../../app/applicationCommonActions";

export const ErrorAlert = () => {
    const dispatch = useAppDispatch();
    const {setAppError} = appCommonActions;
    const {selectError} = appSelectors;
    const error = useSelector(selectError);

    const onErrorCloseHandler = () => {
        dispatch(setAppError({error: null}))
    };

    return (
        <div className={s.ErrorAlert} onClick={onErrorCloseHandler}>
            {error}
        </div>
    );
}
