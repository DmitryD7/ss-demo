import React from "react";


export const CurrItem = React.memo((props: { itemId: string, modelId: string }) => {
    const {itemId, modelId} = props;

    const img = require(`../../../assets/pics/prewarps/${itemId}/${modelId}.png`);

    return <img src={img} alt={`model ${itemId}`}/>
});

