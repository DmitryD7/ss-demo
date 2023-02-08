import s from './InventoryItem.module.scss'
import React, {useCallback} from "react";

export const InventoryItem = (props: InventoryItemPropsType) => {
    const {id, name} = props;

    const getItemImg = useCallback(() => {
        return <img src={require(`../../assets/pics/item-thumbnails/${id}.png`)} alt={name}/>
    }, [id]);

    return (
        <div className={s.InventoryItem}>
            <a href={'#'}>
                <div className={s.Overlay}></div>
                {getItemImg()}
            </a>
            <div className={s.InventoryItem_title}>{name}</div>
        </div>
    );
}

type InventoryItemPropsType = {
    id: string
    name: string
}