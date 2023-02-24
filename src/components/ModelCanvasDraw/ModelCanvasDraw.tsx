import s from './ModelCanvasDraw.module.scss'
import React, {useEffect, useMemo, useState} from "react";
import {CurrentItemType} from "../../app/appdataReducer/appdataReducer";
import mergeImages from 'merge-images';

export const ModelCanvasDraw = React.memo((props: InventoryItemPropsType) => {
    const {currItems, currModelId, currModelType} = props;

    const getModelImg = (currModelTypes: "nude" | "covered") => {
        return require(`../../assets/pics/model-${currModelTypes}/${currModelId}.png`);
    };

    const nudeModel = useMemo(() => getModelImg('nude'), [getModelImg, currModelId]);
    const coveredModel = useMemo(() => getModelImg('covered'), [getModelImg, currModelId]);

    const [readyImg, setReadyImg] = useState('');

    useEffect(() => {
        const itemImgs = currItems.map(i => require(`../../assets/pics/prewarps/${i.id}/${currModelId}.png`))
        mergeImages([currModelType === 'nude' ? nudeModel : coveredModel, ...itemImgs]).then(r => setReadyImg(r));
    }, [currModelId, currItems, currModelType]);

    return (
        <div className={s.ModelCanvasDraw}>
            <img src={readyImg} alt=""/>
        </div>
    );
})

type InventoryItemPropsType = {
    currItems: CurrentItemType[]
    currModelId: string
    currModelType: "nude" | "covered"
}