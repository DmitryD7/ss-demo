import s from './ModelsCarousel.module.scss';
import {ModelsType} from "../../api/inventoryAPI";
import {getArr, useAppDispatch} from "../../utils/utils";
import {ModelComponent} from "./ModelComponent/ModelComponent";

import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCoverflow, Navigation} from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";

import React, {ChangeEvent, useEffect, useState} from "react";
import {CoverflowEffectOptions} from "swiper/types/modules/effect-coverflow";
import {appdataActions} from "../../app/appdataReducer";
import useWindowDimensions from "../../utils/useWindowDimensions";
import {NavigationOptions} from "swiper/types/modules/navigation";


export const ModelsCarousel = (props: ModelsCarouselPropsType) => {
    const {models} = props;
    const dispatch = useAppDispatch();
    const {setCurrModelId, setCurrModelIsCustom} = appdataActions;

    const modelsArr = getArr(models);

    const onModelClick = (id: string) => {
        dispatch(setCurrModelId({id}))
    };

    const {width} = useWindowDimensions();
    const [isSingleModel, setIsSingleModel] = useState(false);
    useEffect(() => {
        if (width < 601) {
            setIsSingleModel(true);
        }
    }, []);

    const onUploadPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrModelIsCustom({isCustom: true}));
        const container = document.querySelector('#SideBar_Source_Tab');
        // @ts-ignore
        window['fitpic'].setModel(e.target.files[0]);
        // @ts-ignore
        window['fitpic'].setContainer(container);
    };

    const settingsCoverflow: CoverflowEffectOptions = {
        rotate: 1,
        slideShadows: false,
        depth: 550
    };

    return (
        <div className={s.ModelsCarousel}>
            <Swiper
                effect={"coverflow"}
                coverflowEffect={settingsCoverflow}
                slidesPerView={isSingleModel ? 1 : 1.3}
                spaceBetween={isSingleModel ? 0 : -251}
                centeredSlides={true}
                navigation={true}
                modules={[Navigation, EffectCoverflow]}
                // grabCursor={true}
                centeredSlidesBounds={true}
                initialSlide={1}
                slideToClickedSlide={true}
                className={s.mySwiper}
            >
                <SwiperSlide>
                    <div className={s.UploadImg}>
                        <input
                            type={'file'}
                            id={'myImage'}
                            accept={"image/*"}
                            onChange={onUploadPhotoHandler}
                            style={{display: 'none'}}
                        />
                        <label htmlFor={'myImage'}>
                            <img
                                src={require(`../../assets/pics/model-chooser-1950/0.png`)}
                                alt={'upload your'}
                                style={{width: '85%', cursor: 'pointer'}}
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