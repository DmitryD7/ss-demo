import {InventoryItem} from "../../components/InventoryItem/InventoryItem";
import {FetchItemsResponseDataType} from "../../api/inventoryAPI";
import {getArr, useAppDispatch} from "../../utils/utils";
import s from "./InventoryPage.module.scss"
import {appdataActions, appdataSelectors} from "../../app/appdataReducer";
import {SideBar} from "../../components/Tab/Tab";
import {useSelector} from "react-redux";
import {useState} from "react";

export const InventoryPage = (props: InventoryPagePropsType) => {
    const {inventory} = props;
    const itemsArr = getArr(inventory);
    const {selectModels} = appdataSelectors;
    const models = useSelector(selectModels);

    const {setCurrItem} = appdataActions;
    const dispatch = useAppDispatch();

    const [isTab, setIsTab] = useState(false)

    const onItemClick = (id: string) => {
        dispatch(setCurrItem({id}));
        setIsTab(!isTab)
    };

    return (
        <>
            <div className={s.InventoryPage}>
                {itemsArr.map(item => {
                    const id = Object.keys(item)[0];
                    // @ts-ignore
                    const name = item[id].name
                    return <InventoryItem key={id} id={id} name={name} onItemClick={onItemClick}/>
                })}
            </div>
            {isTab && <SideBar models={models} isOpen={true}/>}
        </>
    );
}

type InventoryPagePropsType = {
    inventory: FetchItemsResponseDataType;
    collection: string
}