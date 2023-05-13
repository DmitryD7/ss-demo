import React, {useEffect, useRef, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Navbar} from "./components/Navbar/Navbar";
import {SideBar} from "./components/Tab/Tab";
import {appdataActions, appdataSelectors} from "./app/appdataReducer";
import {useAppDispatch} from "./utils/utils";
import {useSelector} from "react-redux";
import {InventoryPage} from "./pages/InventoryPage/InventoryPage";
import {ItemGroupType} from "./api/inventoryAPI";
import {appCommonActions} from "./app/applicationCommonActions";
import {appSelectors} from "./app/appReducer";
import Loader from "./assets/loader.svg";
import s from './App.module.scss';
import {ErrorAlert} from "./components/ErrorAlert/ErrorAlert";


function App() {
    const sidebarBtnRef = useRef<HTMLDivElement | null>(null);
    const [div, setDiv] = useState(sidebarBtnRef)

    const dispatch = useAppDispatch();

    const {fetchInventoryData, fetchModelsData, fetchItemRules} = appdataActions;
    const {setIsAppInitialized} = appCommonActions;

    const {selectInventoryItems, selectModels, selectRules} = appdataSelectors;
    const {selectIsAppInit, selectStatus, selectError} = appSelectors;

    const inventoryItems = useSelector(selectInventoryItems);
    const models = useSelector(selectModels);
    const rules = useSelector(selectRules);
    const isAppInit = useSelector(selectIsAppInit);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchInventoryData());
        dispatch(fetchModelsData());
        dispatch(fetchItemRules());
        dispatch(setIsAppInitialized({isInit: inventoryItems.length > 0 && !!models && !!rules}))
    }, [dispatch, fetchInventoryData, fetchModelsData, fetchItemRules, selectIsAppInit, setIsAppInitialized]);

    useEffect(() => {
        dispatch(setIsAppInitialized({isInit: inventoryItems.length > 0 && !!models && !!rules}))
    }, [rules]);


    const updateSidebarBtnRef = (ref: React.RefObject<HTMLDivElement>) => {
        // @ts-ignore
        setDiv(ref.current)
        sidebarBtnRef.current = ref.current;
    };

    useEffect(() => {
        if (sidebarBtnRef.current) {
            sidebarBtnRef.current.click();
        }
    }, [div]);

    const getGroupItems = (group: ItemGroupType) => inventoryItems.filter(i => i.group === group);

    const mappedGroups: Array<{ group: string, name: string }> = [
        {
            group: '',
            name: 'ALL',
        },
        {
            group: 'top',
            name: 'TOPS',
        },
        {
            group: 'bot',
            name: 'BOTTOMS',
        },
        {
            group: 'bag',
            name: 'BAGS',
        },
        {
            group: 'feet',
            name: 'SHOES',
        },
    ];

    return (
        <div className={s.App}>
            {isAppInit
                ? <>
                    <Navbar menuItems={mappedGroups}/>
                    <SideBar models={models} updateRef={updateSidebarBtnRef}/>
                    {status === 'loading'
                        ? <div className={s.loader}>
                            <img src={Loader} alt="loader"/>
                        </div>
                        : <Routes>
                            <Route path={`/*`}
                                   element={<InventoryPage inventory={inventoryItems} rules={rules}/>}/>
                            {
                                rules.order.map((g: any, i) => (
                                    <Route
                                        key={g + i}
                                        path={`/${g}`}
                                        element={<InventoryPage
                                            inventory={getGroupItems(g)}
                                            rules={rules}
                                        />}
                                    />
                                ))
                            }
                        </Routes>}
                </>
                : <div className={s.loader}>
                    <img src={Loader} alt="loader"/>
                </div>
            }
            {error && <ErrorAlert/>}
        </div>
    );
}

export default App;