import s from './ModelComponent.module.scss'
import React, {useCallback} from "react";

export const ModelComponent = (props: ModelComponentPropsType) => {
    const {id, size, onModelClick} = props;

    const getModelImg = useCallback(() => {
        return <img src={require(`../../../assets/pics/model-chooser-2600/${id}.png`)} alt={size}/>
    }, [id, size]);

    const onModelClickHandler = () => {
        onModelClick(id)
    };
    return (
        <div className={s.ModelComponent} onClick={onModelClickHandler}>
            {getModelImg()}
            {/*<span>{size}</span>*/}
        </div>
    );
};

type ModelComponentPropsType = {
    id: string
    size: string
    onModelClick: (id: string) => void
}