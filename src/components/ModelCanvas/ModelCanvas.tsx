import s from './ModelCanvas.module.scss'
import React from "react";
import {CurrentItemType} from "../../app/appdataReducer/appdataReducer";

export const ModelCanvas = (props: InventoryItemPropsType) => {
    const {currItems, currModelId, currModelType} = props;

    const getImg = (id: string) => {
        return require('../../assets/pics/prewarps/' + `${id}/${currModelId}.png`);
    };

    const getModelImg = () => {
        return require(`../../assets/pics/model-${currModelType ? currModelType : 'covered'}/${currModelId}.png`);
    };

    const style = {
        backgroundImage: `url(${getModelImg()})`,
    }

    return (
        <div className={s.ModelCanvas}>
            <div className={s.main} style={style}>
                <div style={{visibility: 'hidden'}}><img
                    src={getModelImg()}
                    alt={''}
                    className={s.model_img}
                /></div>
                <div className={s.dressedModel}>
                    {currItems && currItems
                        .map(i => {
                            const img = getImg(i.id!)
                            return <img key={i.id} src={img} alt=""/>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

type InventoryItemPropsType = {
    currItems: CurrentItemType[]
    currModelId: string
    currModelType: "nude" | "covered"
}