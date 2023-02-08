import s from './Tab.module.scss'
import React, {useState} from "react";
import {ModelsCarousel} from "../ModelsCarousel/ModelsCarousel";
import {FetchModelsResponseDataType} from "../../api/inventoryAPI";

export const SideBar = (props: SideBarPropsType) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const {models} = props;

    const openSidebarHandler = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const closeSideBArHandler = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className={`${s.Main} ${isSidebarOpen && s.SideBar_Opened}`}>
            <div className={`${s.SideBar} ${isSidebarOpen && s.show}`}>
                <div className={s.SideBar_Tab} onClick={openSidebarHandler}></div>
                <div className={s.SideBar_Source_Tab}>
                    <button className={s.ExitBtn} onClick={closeSideBArHandler}></button>
                    <h2>Select a model</h2>
                    <div className={s.ModelsList}>
                        <ModelsCarousel models={models}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

type SideBarPropsType = {
    models: FetchModelsResponseDataType
}