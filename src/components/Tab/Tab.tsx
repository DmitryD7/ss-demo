import s from './Tab.module.scss'
import React, {useCallback, useEffect, useRef, useState} from "react";
import {ModelsCarousel} from "../ModelsCarousel/ModelsCarousel";
import {ModelsType} from "../../api/inventoryAPI";
import {ControlsPanel} from "../ControlsPanel/ControlsPanel";
import {useSelector} from "react-redux";
import {appdataActions, appdataSelectors} from "../../app/appdataReducer";
import {useAppDispatch, useOutsideAlerter} from "../../utils/utils";
import {ModelCanvasDraw} from '../ModelCanvasDraw/ModelCanvasDraw';

export const SideBar = (props: SideBarPropsType) => {
    const {models, updateRef} = props;
    const tabBtnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (updateRef) {
            updateRef(tabBtnRef);
        }
    }, [updateRef]);

    const dispatch = useAppDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {setCurrModelId, setCurrModelIsCustom} = appdataActions;
    const {selectCurrModel, selectCurrItems} = appdataSelectors;

    const sidebar = useRef(null);

    const currItems = useSelector(selectCurrItems);
    const {id, type, isCustom} = useSelector(selectCurrModel);

    const openSidebarHandler = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const closeSideBarHandler = () => {
        setIsSidebarOpen(false);
    };

    useOutsideAlerter(sidebar, () => setIsSidebarOpen(false));

    const onSwitchModelHandler = useCallback(() => {
        dispatch(setCurrModelId({id: ''}));
        dispatch(setCurrModelIsCustom({isCustom: false}));
        // @ts-ignore
        window['fitpic'].unmount();
    }, [dispatch, setCurrModelId, setCurrModelIsCustom]);

    return (
        <div className={`${s.Main} ${isSidebarOpen && s.SideBar_Opened}`}>
            <div className={`${s.SideBar} ${isSidebarOpen && s.show}`}>
                <div className={s.SideBar_Tab} onClick={openSidebarHandler} id={'SideBar_Tab'} ref={tabBtnRef}></div>
                <div
                    className={s.SideBar_Source_Tab}
                    id={'SideBar_Source_Tab'}
                    ref={sidebar}
                >
                    <button className={s.ExitBtn} onClick={closeSideBarHandler}></button>
                    {id && <button className={s.New_style_btn} onClick={closeSideBarHandler}>+ New Style</button>}
                    {!isCustom && <>
                        {!id && <h2>Select a model</h2>}
                        {id
                            ? <ModelCanvasDraw currItems={currItems} currModelId={id} currModelType={type}/>
                            : <div className={s.ModelsList}>
                                <ModelsCarousel models={models}/>
                            </div>}
                        {id && <ControlsPanel/>}
                    </>}
                    <div className={`${s.switch_model_btn} ${!isCustom && s.hidden}`}
                         onClick={onSwitchModelHandler}>Switch<br/>Model
                    </div>
                </div>
            </div>
        </div>
    );
}

type SideBarPropsType = {
    models: ModelsType
    updateRef?: (ref: React.RefObject<HTMLDivElement>) => void;
}