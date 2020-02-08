import React from 'react';
import KitchenMode from "./KitchenMode";
import {Flex, Box} from 'rebass';

const KitchenWork = (props) => {
    return (
        <Flex width={1} {...props} justifyContent="center">
            <KitchenMode
                width={{
                    xs: 1,
                    md: 0.5
                }}
                title="Chef's pantry Requests"
                changeModeText="Storekeeper"
                interactiveListConfirmText="Clear Selected Requests"
                interactiveListTitle="Satisfied Requests"
                manageText="Pantry Requests"
                listTitle="Pantry Requests"/>
        </Flex>
    );
};

export default KitchenWork;
