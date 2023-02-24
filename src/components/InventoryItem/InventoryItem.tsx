import s from './InventoryItem.module.scss'
import React, {useCallback} from "react";
import {ItemType} from "../../api/inventoryAPI";

export const InventoryItem = React.memo((props: InventoryItemPropsType) => {
    const {onItemClick, item} = props;
    const {id, name} = item;

    const getItemImg = useCallback(() => {
        return <img src={require(`../../assets/pics/item-thumbnails/${id}.png`)} alt={name}/>
    }, [id, name]);

    const onItemClickHandler = () => {
        onItemClick(item);
    };

    return (
        <div className={s.InventoryItem}>
            <button onClick={onItemClickHandler}>
                <div className={s.Overlay}></div>
                {getItemImg()}
            </button>
            <div className={s.InventoryItem_title}>{name.toUpperCase()}</div>
        </div>
    );
});

type InventoryItemPropsType = {
    item: ItemType
    onItemClick: (item: ItemType) => void
}