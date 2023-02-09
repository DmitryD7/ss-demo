import s from './ControlsPanel.module.scss'
import React from "react";

export const ControlsPanel = () => {

    return (
        <div className={s.ControlsPanel}>
            <div className={s.switch_model_btn}>Switch<br/>Model</div>
            <div className={s.add_cart_btn}>Add to Cart</div>
            <div className={s.remove_btn}>Remove</div>
            <div className={s.cart}></div>
        </div>
    );
}
