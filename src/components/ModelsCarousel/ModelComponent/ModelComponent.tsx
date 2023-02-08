import s from './ModelComponent.module.scss'
import React, {useCallback} from "react";

export const ModelComponent = (props: ModelComponentPropsType) => {
    const {id, size} = props;

    const getModelImg = useCallback(() => {
        return <img src={require(`../../../assets/sidebar/model-thumbnails/${id}.png`)} alt={size}/>
    }, [id]);

    return (
        <div className={s.ModelComponent}>
            {getModelImg()}
            <span>{size}</span>
        </div>
    );
};

type ModelComponentPropsType = {
    id?: string
    size?: string
}