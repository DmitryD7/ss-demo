import s from './ModelsCarousel.module.scss';
import {FetchModelsResponseDataType} from "../../api/inventoryAPI";
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

    const {setCurrModel} = appdataActions;
    const dispatch = useAppDispatch();

    const onModelClick = (id:string) => {
        dispatch(setCurrModel({id}))
    };

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const onUploadPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files && setSelectedImage(e.target.files[0])
    };

    const settings: CoverflowEffectOptions = {
        rotate: 1,
        slideShadows: false,
        depth: 450
    };

    return (
        <div className={s.ModelsCarousel}>
            <Swiper
                effect={"coverflow"}
                coverflowEffect={settings}
                slidesPerView={2}
                centeredSlides={true}
                spaceBetween={-91}
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
                                src={require(`../../assets/sidebar/model-thumbnails/silhouette.png`)}
                                alt={'upload your photo'}
                                style={{maxWidth: '210px', cursor: 'pointer'}}
                            />
                        </label>
                    </div>
                </SwiperSlide>
                {modelsArr.map(model => {
                    const id = Object.keys(model)[0];
                    // @ts-ignore
                    const size = model[id].size;
                    return (
                        <SwiperSlide key={id}>
                            <ModelComponent id={id} size={size} onModelClick={onModelClick}/>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

type ModelsCarouselPropsType = {
    models: FetchModelsResponseDataType;
};