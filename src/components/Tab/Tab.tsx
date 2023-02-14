import s from './Tab.module.scss'
import React, {useState} from "react";
import {ModelsCarousel} from "../ModelsCarousel/ModelsCarousel";
import {ModelsType} from "../../api/inventoryAPI";
import {ControlsPanel} from "../ControlsPanel/ControlsPanel";
import {useSelector} from "react-redux";
import {appdataSelectors} from "../../app/appdataReducer";
import {CurrentModelComponent} from "../CurrentModelComponent/CurrentModelComponent";

export const SideBar = (props: SideBarPropsType) => {
    const {models} = props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {selectCurrModel} = appdataSelectors;

    const {id, type} = useSelector(selectCurrModel);

    const openSidebarHandler = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const closeSideBarHandler = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className={`${s.Main} ${isSidebarOpen && s.SideBar_Opened}`}>
            <div className={`${s.SideBar} ${isSidebarOpen && s.show}`}>
                <div className={s.SideBar_Tab} onClick={openSidebarHandler} id={'SideBar_Tab'}></div>
                <div className={s.SideBar_Source_Tab} onBlur={closeSideBarHandler}>
                    <button className={s.ExitBtn} onClick={closeSideBarHandler}></button>
                    {!id && <h2>Select a model</h2>}
                    {id
                        ? <CurrentModelComponent id={id} type={type}/>
                        : <div className={s.ModelsList}>
                            <ModelsCarousel models={models}/>
                        </div>}
                    <ControlsPanel/>
                </div>
            </div>
        </div>
    );
}

type SideBarPropsType = {
    models: ModelsType
}