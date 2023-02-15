import React, {useEffect} from 'react';
import './App.css';
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


function App() {
    const dispatch = useAppDispatch();

    const {fetchInventoryData, fetchModelsData, fetchItemRules} = appdataActions;
    const {setIsAppInitialized} = appCommonActions;

    const {selectInventoryItems, selectModels, selectRules} = appdataSelectors;
    const {selectIsAppInit} = appSelectors;

    const inventoryItems = useSelector(selectInventoryItems);
    const models = useSelector(selectModels);
    const rules = useSelector(selectRules);
    const isAppInit = useSelector(selectIsAppInit);

    useEffect(() => {
        dispatch(fetchInventoryData());
        dispatch(fetchModelsData());
        dispatch(fetchItemRules());
        dispatch(setIsAppInitialized({isInit: inventoryItems.length > 0 && !!models && !!rules}))
    }, [dispatch, fetchInventoryData, fetchModelsData, fetchItemRules, selectIsAppInit, setIsAppInitialized]);

    useEffect(() => {
        dispatch(setIsAppInitialized({isInit: inventoryItems.length > 0 && !!models && !!rules}))
    }, [rules])

    // const getOrder = () => {
    //     const orderEntries = rules.order?.map((group, i) => [group, i]);
    //     const order = orderEntries && Object.fromEntries(orderEntries);
    //     return order;
    // };

    const getGroupItems = (group: ItemGroupType) => inventoryItems.filter(i => i.group === group);

    return (
        <div className="App">
            {isAppInit
                ? <>
                    <Navbar menuItems={rules.order}/>
                    <SideBar models={models}/>
                    <Routes>
                        <Route path={'/*'} element={<InventoryPage inventory={inventoryItems} rules={rules}/>}/>
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
                    </Routes>
                </>
                : <div>Loading</div>
            }
        </div>
    );
}

export default App;