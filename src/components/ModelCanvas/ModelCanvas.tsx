import s from './ModelCanvas.module.scss'
import React from "react";
import {CurrentItemType} from "../../app/appdataReducer/appdataReducer";
import {CurrItem} from './CurrItem/CurrItem';

export const ModelCanvas = React.memo((props: InventoryItemPropsType) => {
    const {currItems, currModelId, currModelType} = props;

    // const getModelImg = () => {
    //     return require(`../../assets/pics/model-${currModelType ? currModelType : 'covered'}/${currModelId}.png`);
    // };
    const getModelImg = (currModelTypes: "nude" | "covered") => {
        return require(`../../assets/pics/model-${currModelTypes}/${currModelId}.png`);
    };

    const nudeModel = getModelImg('nude');
    const coveredModel = getModelImg('covered');

    const style = {
        backgroundImage: `url(${currModelType === 'nude' ? nudeModel : coveredModel})`,
    };

    return (
        <div className={s.ModelCanvas}>
            <div className={s.main} style={style}>
                <div style={{visibility: 'hidden'}}><img
                    src={nudeModel}
                    alt={''}
                    className={s.model_img}
                /></div>
                <div className={s.dressedModel}>
                    {currItems && currItems
                        .map(i => <CurrItem key={i.id} itemId={i.id!} modelId={currModelId}/>)
                    }
                </div>
            </div>
        </div>
    );
})

type InventoryItemPropsType = {
    currItems: CurrentItemType[]
    currModelId: string
    currModelType: "nude" | "covered"
}

// const CurrItem = React.memo((props: {itemId: string, modelId: string}) => {
//     const {itemId, modelId} = props;
//
//     const img = require(`../../assets/pics/prewarps/${itemId}/${modelId}.png`);
//
//     return <img src={img} alt=""/>
// });
