import React from 'react';
import KitchenMode from "./KitchenMode";
import {Flex} from 'rebass';
import {connect} from "./react-statex";
import {MODE} from "./constants";
import {getForm, hasSufficientInventory} from "./selectors";

const KitchenContainer = ({
                         pantryRequests,
                         fulfilledRequests,
                         receivedPantryRequests,
                         inventoryItems,
                         actions,
                         manageForm,
                         mode,
                         disableQtyChange,
                         fulfillDisabled,
                         clearDisabled,
                         ...props
}) => {
    return (
        <Flex width={1} {...props} justifyContent="center">
            {mode === MODE.CHEF ?  (
                <KitchenMode
                    disableQtyChange={disableQtyChange}
                    onChangeMode={() => {
                        actions.switchMode(MODE.STORE_KEEPER);
                    }}
                    interactiveListConfirmDisabled={clearDisabled}
                    onInteractiveListSelect={actions.toggleToClear}
                    onInteractiveListConfirm={actions.clearSatisfiedRequests}
                    onFormChange={actions.manageFormChange}
                    formData={manageForm}
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
                        interactiveListConfirmDisabled={fulfillDisabled}
                        disableQtyChange={disableQtyChange}
                        onChangeMode={() => {
                            actions.switchMode(MODE.CHEF);
                        }}
                        onFormChange={actions.manageFormChange}
                        formData={manageForm}
                        interactiveItems={receivedPantryRequests}
                        onInteractiveListConfirm={actions.fulfillRequests}
                        onInteractiveListSelect={actions.toggleToFulfil}
                        items={inventoryItems}
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
    stateToProps: (state) => {
        const {kitchen} = state;
        const form = getForm({kitchen});
        const {toFulfilItems, toClearItems} = kitchen;
        const receivedPantryRequests = kitchen.requests.map(request => {
            const insufficient = !hasSufficientInventory(request, kitchen);
            const disabled = request.fulfilled || insufficient;
            const checked = (() => {
                if (disabled) {
                    return request.fulfilled;
                }

                return request.fulfilled != null ? request.fulfilled : !!toFulfilItems[request.name];
            })();
            return {
                ...request,
                checked,
                disabled,
                error: insufficient && !checked && {
                    message: 'Not enough items in inventory'
                }
            };
        });

        const fulfilledRequests = kitchen.requests.filter(item => item.fulfilled).map(item => ({
            ...item,
            checked: !!toClearItems[item.name]
        }));

        const isConfirmDisabled = (items) => !items.length || items.every(item => !item.checked);

        console.log("RECEIVED REQEUSTS", receivedPantryRequests);
        return {
            pantryRequests: kitchen.requests.filter(item => !item.fulfilled),
            fulfilledRequests,
            receivedPantryRequests,
            fulfillDisabled: !receivedPantryRequests.length || receivedPantryRequests.every(item => !item.checked || item.fulfilled),
            clearDisabled: isConfirmDisabled(fulfilledRequests),
            inventoryItems: kitchen.inventoryItems,
            chefForm: kitchen.form[MODE.CHEF],
            storeKeeperForm: kitchen.form[MODE.STORE_KEEPER],
            mode: kitchen.mode,
            disableQtyChange: !form.itemName,
            manageForm: form
        };
    },
    actionsToProps: ({kitchen}) => {
        return {
            manageFormChange: kitchen.manageFormChange,
            switchMode: kitchen.switchMode,
            fulfillRequests: kitchen.fulfillRequests,
            toggleToFulfil: kitchen.toggleToFulfil,
            toggleToClear: kitchen.toggleToClear,
            clearSatisfiedRequests: kitchen.clearSatisfiedRequests
        };
    }
})(KitchenContainer);
