import {InventoryItem} from "../../components/InventoryItem/InventoryItem";
import {FetchItemsResponseDataType} from "../../api/inventoryAPI";
import {getArr} from "../../utils/utils";
import s from "./InventoryPage.module.scss"

export const InventoryPage = (props: InventoryPagePropsType) => {
    const {collection, inventory} = props;
    const itemsArr = getArr(inventory);

    return (
        <div className={s.InventoryPage}>
            {itemsArr.map(item => {
                const id = Object.keys(item)[0];
                // @ts-ignore
                const name = item[id].name
                return <InventoryItem key={id} id={id} name={name}/>
            })}
        </div>
    );
}

type InventoryPagePropsType = {
    inventory: FetchItemsResponseDataType;
    collection: string
}