import React from 'react';
import KitchenMode from "./KitchenMode";

const KitchenWork = () => {
    return (
        <div>
            <KitchenMode
                title="Chef's pantry Requests"
                changeModeText="Storekeeper"
                interactiveListConfirmText="Clear Selected Requests"
                interactiveListTitle="Satisfied Requests"
                manageText="Pantry Requests"
                listTitle="Pantry Requests"/>
        </div>
    );
};

export default KitchenWork;
