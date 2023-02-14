import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Navbar} from "./components/Navbar/Navbar";
import {SideBar} from "./components/Tab/Tab";
import {appdataActions, appdataSelectors} from "./app/appdataReducer";
import {useAppDispatch} from "./utils/utils";
import {useSelector} from "react-redux";
import {InventoryPage} from "./pages/InventoryPage/InventoryPage";


function App() {
    const {fetchInventoryData, fetchModelsData, fetchItemRules} = appdataActions;
    const dispatch = useAppDispatch();
    const {selectInventoryItems, selectModels, selectRules} = appdataSelectors;

    const inventoryItems = useSelector(selectInventoryItems);
    const models = useSelector(selectModels);
    const rules = useSelector(selectRules);

    useEffect(() => {
        dispatch(fetchInventoryData());
        dispatch(fetchModelsData());
        dispatch(fetchItemRules());
    }, []);

    const groupItems_ = () => {
        const groups = {};
        for (let [id, item] of Object.entries(inventoryItems)) {
            const newItem = {
                ...item,
                id: id
            }
            // @ts-ignore
            let items = groups[newItem.group];
            if (!items) { // @ts-ignore
                groups[newItem.group] = items = [];
            }
            items.push(newItem);
        }
        return groups;
    };

    const orderEntries = rules.order?.map((group, i) => [group, i]);
    const order = orderEntries && Object.fromEntries(orderEntries);
    const groups = groupItems_();

    return (
        <div className="App">
            <Navbar/>
            <SideBar models={models}/>

            <Routes>
                <Route path={'/*'} element={<InventoryPage
                    inventory={inventoryItems}
                    group={'start'}
                    rules={rules}
                />}/>
            </Routes>
        </div>
    );
}

export default App;
