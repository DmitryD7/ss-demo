import s from './ModelsCarousel.module.scss';
import {ModelsType} from "../../api/inventoryAPI";
import {getArr, useAppDispatch} from "../../utils/utils";
import {ModelComponent} from "./ModelComponent/ModelComponent";

import {Swiper, SwiperSlide} from "swiper/react";

import {Navigation, EffectCoverflow} from "swiper";

import "swiper/scss";
import "swiper/scss/navigation";
import React, {ChangeEvent, useState} from "react";
import {CoverflowEffectOptions} from "swiper/types/modules/effect-coverflow";
import {appdataActions} from "../../app/appdataReducer";


export const ModelsCarousel = (props: ModelsCarouselPropsType) => {
    const {models} = props;
    const modelsArr = getArr(models);

    const {setCurrModelId} = appdataActions;
    const dispatch = useAppDispatch();

    const onModelClick = (id:string) => {
        dispatch(setCurrModelId({id}))
    };

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const onUploadPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files && setSelectedImage(e.target.files[0])
    };

    const settings: CoverflowEffectOptions = {
        rotate: 1,
        slideShadows: false,
        depth: 550
    };

    return (
        <div className={s.ModelsCarousel}>
            <Swiper
                effect={"coverflow"}
                coverflowEffect={settings}
                slidesPerView={1.3}
                centeredSlides={true}
                spaceBetween={-251}
                navigation={true}
                modules={[Navigation, EffectCoverflow]}

            >
                <SwiperSlide>
                    <div  className={s.UploadImg}>
                        <input
                            type={'file'}
                            id={'myImage'}
                            accept={"image/*"}
                            onChange={onUploadPhotoHandler}
                            style={{display: 'none'}}
                        />
                        <label htmlFor={'myImage'}>
                            <img
                                src={require(`../../assets/pics/model-chooser-2600/0.png`)}
                                alt={'upload your'}
                                style={{maxWidth: '360px', cursor: 'pointer'}}
                            />
                        </label>
                    </div>
                </SwiperSlide>
                {modelsArr.map(model => {
                    const id = Object.keys(model)[0];
                    // @ts-ignore
                    const size = model[id].size;
                    const prewarps = model[id].prewarps;
                    return (
                        <SwiperSlide key={id}>
                            <ModelComponent id={id} size={size} onModelClick={onModelClick} prewarps={prewarps}/>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

type ModelsCarouselPropsType = {
    models: ModelsType;
};