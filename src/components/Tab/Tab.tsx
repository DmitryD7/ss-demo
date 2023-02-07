import s from './Tab.module.scss'
import {useState} from "react";

export const SideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebarHandler = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className={`${s.Main} ${isSidebarOpen && s.SideBar_Opened}`}>
            <div className={`${s.SideBar} ${isSidebarOpen && s.show}`}>
                <div className={s.SideBar_Tab} onClick={openSidebarHandler}></div>
                <div className={s.SideBar_Source_Tab}>
                    <h2>Select a model</h2>
                </div>
            </div>
        </div>
    );
}