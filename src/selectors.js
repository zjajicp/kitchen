import {find, path, pipe, whereEq} from "ramda";

export const getForm = ({kitchen}) => kitchen.form[kitchen.mode];

export const requestByName = name => find(whereEq({
    name
}));

export const getItemQty = (name) => pipe(
    requestByName(name),
    path(['qty'])
);

export const hasSufficientInventory = (request, state) => {
    return request.qty <= getItemQty(request.name)(state.inventoryItems);
};
