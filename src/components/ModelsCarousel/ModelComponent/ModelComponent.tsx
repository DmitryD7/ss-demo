import s from './ModelComponent.module.scss'
import React from "react";

export const ModelComponent = React.memo((props: ModelComponentPropsType) => {
    const {id, onModelClick, prewarps} = props;

    const getModelImg = () => {
        return <img src={require(`../../../assets/pics/model-chooser-1300/${id}.png`)} alt={`model-${id}`}/>
    };

    const onModelClickHandler = () => {
        prewarps && onModelClick(id)
    };

    return (
        <div className={s.ModelComponent} onClick={onModelClickHandler}>
            {getModelImg()}
        </div>
    );
});

type ModelComponentPropsType = {
    id: string
    size: string
    prewarps?: boolean
    onModelClick: (id: string) => void
}