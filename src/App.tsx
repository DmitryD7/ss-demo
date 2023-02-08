import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Routes} from 'react-router-dom';
import {Navbar} from "./components/Navbar/Navbar";
import {SideBar} from "./components/Tab/Tab";
import {appdataActions, appdataSelectors} from "./app/appdataReducer";
import {useAppDispatch} from "./utils/utils";
import {useSelector} from "react-redux";
import {FetchItemsResponseDataType, FetchModelsResponseDataType} from "./api/inventoryAPI";
import {InventoryItem} from "./components/InventoryItem/InventoryItem";
import {InventoryPage} from "./pages/InventoryPage/InventoryPage";
import {ModelsCarousel} from "./components/ModelsCarousel/ModelsCarousel";
import {ModelComponent} from "./components/ModelsCarousel/ModelComponent/ModelComponent";


function App() {
    const {fetchInventoryData, fetchModelsData} = appdataActions;
    const dispatch = useAppDispatch();
    const {selectInventoryItems, selectModels} = appdataSelectors;

    const inventoryItems = useSelector(selectInventoryItems);
    const models = useSelector(selectModels);

    useEffect(() => {
        dispatch(fetchInventoryData());
        dispatch(fetchModelsData());
    }, []);

    // const modelsArr = getArr(models);
    // const itemsArr = getArr(inventoryItems);

    return (
        <div className="App">
            <Navbar/>
            <SideBar models={models}/>

            <InventoryPage inventory={inventoryItems} collection={'Home'}/>
            {/*<Routes>*/}
            {/*    /!*<Route path={'/'} element={<InventoryPage inventory={} collection={'tops'}/>}/>*!/*/}
            {/*</Routes>*/}
        </div>
    );
}

export default App;
