import React from 'react';
import KitchenMode from "./KitchenMode";
import {Flex} from 'rebass';
import {connect} from "react-statex";
import {MODE} from "./constants";

const KitchenWork = ({pantryRequests, fulfilledRequests, chefForm, manageFormChange, switchMode, mode, ...props}) => {
    return (
        <Flex width={1} {...props} justifyContent="center">
            {mode === MODE.CHEF ?  (
                <KitchenMode
                    onChangeMode={switchMode}
                    onFormChange={manageFormChange}
                    formData={chefForm}
                    interactiveItems={fulfilledRequests}
                    items={pantryRequests}
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
                ) : (
                    <KitchenMode
                        onChangeMode={switchMode}
                        onFormChange={manageFormChange}
                        formData={chefForm}
                        interactiveItems={fulfilledRequests}
                        items={pantryRequests}
                        width={{
                            xs: 1,
                            md: 0.5
                        }}
                        title="Storekeeper's inventory management system"
                        changeModeText="Chef"
                        interactiveListConfirmText="Fulfill Selected Requests"
                        interactiveListTitle="Received Pantry Requests"
                        manageText="Items Inventory"
                        listTitle="Inventory"/>
                )}
        </Flex>
    );
};

export default connect({
    stateToProps: ({kitchen}) => ({
        pantryRequests: kitchen.requests.filter(item => !item.fulfilled),
        fulfilledRequests: kitchen.requests.filter(item => item.fullfilled),
        receivedPantryRequests: kitchen.requests,
        inventoryItems: kitchen.inventoryItems,
        chefForm: kitchen.form[MODE.CHEF],
        storeKeeperForm: kitchen.form[MODE.STORE_KEEPER],
        mode: kitchen.mode
    }),
    actionsToProps: ({kitchen}) => ({
        manageFormChange: kitchen.manageFormChange,
        switchMode: kitchen.switchMode
    })
})(KitchenWork);
