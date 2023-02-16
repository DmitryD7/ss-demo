import s from './ControlsPanel.module.scss'
import React, {useCallback} from "react";
import {useAppDispatch} from "../../utils/utils";
import {appdataActions, appdataSelectors} from "../../app/appdataReducer";
import {useSelector} from "react-redux";

export const ControlsPanel = () => {
    const dispatch = useAppDispatch();
    const {setCurrItem, setCurrModelId, setCurrModelType} = appdataActions;
    const {selectCurrModel, selectCurrItems} = appdataSelectors;

    const currModelId = useSelector(selectCurrModel);
    const currItems = useSelector(selectCurrItems);

    const onSwitchModelHandler = useCallback(() => {
        dispatch(setCurrModelId({id: ''}))
    }, [dispatch, setCurrModelId]);

    const onRemoveItemsHandler = useCallback(() => {
        dispatch(setCurrItem([]));
        dispatch(setCurrModelType({type: 'covered'}))
    }, [dispatch, setCurrItem, setCurrModelType]);

    return (
        <div className={s.ControlsPanel}>
            <div className={`${s.switch_model_btn} ${!currModelId.id && s.hidden}`} onClick={onSwitchModelHandler}>Switch<br/>Model</div>
            <div className={`${s.add_cart_btn} ${currItems.length <= 0 && s.hidden}`}>Add to Cart</div>
            <div className={`${s.remove_btn} ${!currItems[0]?.name && s.hidden}`} onClick={onRemoveItemsHandler}>Remove</div>
        </div>
    );
}
