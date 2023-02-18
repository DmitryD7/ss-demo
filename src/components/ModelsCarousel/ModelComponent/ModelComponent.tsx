import s from './ModelComponent.module.scss'
import React, {useCallback} from "react";

export const ModelComponent = (props: ModelComponentPropsType) => {
    const {id, onModelClick, prewarps} = props;

    const getModelImg = useCallback(() => {
        return <img src={require(`../../../assets/pics/model-chooser-1950/${id}.png`)} alt={`model-${id}`}/>
    }, [id]);

    const onModelClickHandler = () => {
        prewarps && onModelClick(id)
    };
    return (
        <div className={s.ModelComponent} onClick={onModelClickHandler}>
            {getModelImg()}
        </div>
    );
};

type ModelComponentPropsType = {
    id: string
    size: string
    prewarps?: boolean
    onModelClick: (id: string) => void
}