import s from './InventoryItem.module.scss'
import React, {useCallback} from "react";

export const InventoryItem = (props: InventoryItemPropsType) => {
    const {id, name, onItemClick} = props;

    const getItemImg = useCallback(() => {
        return <img src={require(`../../assets/pics/item-thumbnails/${id}.png`)} alt={name}/>
    }, [id, name]);

    const onItemClickHandler = () => {
        onItemClick(id);
    };

    return (
        <div className={s.InventoryItem}>
            <button onClick={onItemClickHandler}>
                <div className={s.Overlay}></div>
                {getItemImg()}
            </button>
            <div className={s.InventoryItem_title}>{name}</div>
        </div>
    );
}

type InventoryItemPropsType = {
    id: string
    name: string
    onItemClick: (id: string) => void
}