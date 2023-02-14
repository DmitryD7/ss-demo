import s from './CurrentModelComponent.module.scss'
import React, {useCallback} from "react";

export const CurrentModelComponent = (props: ModelComponentPropsType) => {
    const {id, type} = props;

    const getModelImg = useCallback(() => {
        if (type === 'covered') {
            return <img src={require(`../../assets/pics/model-covered/${id}.png`)} alt={'model'}/>
        } else if (type === 'nude') {
            return <img src={require(`../../assets/pics/model-nude/${id}.png`)} alt={'model'}/>
        }else {
            return <img src={require(`../../assets/pics/model-chooser-2600/${id}.png`)} alt={'model'}/>
        }
    }, [id, type]);

    return (
        <div className={s.CurrentModelComponent}>
            {getModelImg()}
            {/*<span>{size}</span>*/}
        </div>
    );
};

type ModelComponentPropsType = {
    id: string
    type: 'nude' | 'covered'
}