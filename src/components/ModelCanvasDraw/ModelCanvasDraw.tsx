import s from './ModelCanvasDraw.module.scss'
import React, {useEffect, useMemo, useState} from "react";
import {CurrentItemType} from "../../app/appdataReducer/appdataReducer";
import mergeImages from 'merge-images';
import Loader from "../../assets/loader.svg";

export const ModelCanvasDraw = React.memo((props: InventoryItemPropsType) => {
    const {currItems, currModelId, currModelType} = props;

    const getModelImg = (currModelTypes: "nude" | "covered") => {
        return require(`../../assets/pics/model-${currModelTypes}/${currModelId}.png`);
    };

    const [isLoading, setIsLoading] = useState(false);

    const nudeModel = useMemo(() => getModelImg('nude'), [getModelImg, currModelId]);
    const coveredModel = useMemo(() => getModelImg('covered'), [getModelImg, currModelId]);

    const [readyImg, setReadyImg] = useState('');

    const loadImage = async (itemImgs: any[]) => {
        setIsLoading(true);
        try {
            const res = await mergeImages([currModelType === 'nude' ? nudeModel : coveredModel, ...itemImgs], {
                format: 'image/webp',
                quality: 0.5
            });
            setReadyImg(res);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const itemImgs = currItems.map(i => require(`../../assets/pics/prewarps/${i.id}/${currModelId}.png`));
        loadImage(itemImgs);
    }, [currModelId, currItems, currModelType]);

    return (
        <div className={s.ModelCanvasDraw}>
            {!isLoading
                ? <img src={readyImg} alt=""/>
                : <div className={s.loader}>
                    <img src={Loader} alt="loader"/>
                </div>
            }
        </div>
    );
})

type InventoryItemPropsType = {
    currItems: CurrentItemType[]
    currModelId: string
    currModelType: "nude" | "covered"
}