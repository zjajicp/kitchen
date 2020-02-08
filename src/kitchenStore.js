import {MODE} from "./constants";
import {differenceWith, whereEq, reject} from 'ramda';
import {getForm, getItemQty, hasSufficientInventory} from "./selectors";

const DEFAULT_STATE = {
    mode: MODE.CHEF,
    requests: [],
    inventoryItems: [],
    form: {
        [MODE.CHEF]: {
            itemName: '',
            qty: 0
        },
        [MODE.STORE_KEEPER]: {
            itemName: '',
            qty: 0
        }
    },
    toFulfilItems: {},
    toClearItems: {}
};


const updateItems = (change, form, items) => {
    const name = form.itemName;

    if (change.qty == null || !form.itemName) {
        return items;
    }

    const existing = item => item.name === form.itemName && !item.fulfilled;

    if (change.qty === 0) {
        return reject(existing)(items)
    }

    const updateFragment = {
        qty: change.qty,
        name: change.itemName == null ? form.itemName : change.itemName
    };


    return items.find(existing) ? items.map(item => existing(item) ? ({
        ...item,
        ...updateFragment
    }) : item) : items.concat(updateFragment);
};


const updateRequests = (change, kitchen) => {
    const {requests} = kitchen;
    const form = getForm({kitchen});
    return updateItems(change, form, requests);
};

const updateInventory = (change, kitchen) => {
    const {inventoryItems} = kitchen;
    const form = getForm({ kitchen});
    return updateItems(change, form, inventoryItems)
};


const updateForm = ({ change, form, mode, items }) => {
    return {
        ...form,
        [mode]: {
            ...form[mode],
            ...change,
            qty: change.itemName != null  ? getItemQty(change.itemName)(items) : change.qty
        }
    };
};

const isFulfilled = (request, state) => {
    return state.toFulfilItems[request.name] && hasSufficientInventory(request, state);
};

const updateInventoryQty = (inventoryItems, diffItems, type) => {
    return inventoryItems
        .map(item => diffItems[item.name] ?  ({
            ...item,
            qty: type === 'increase' ? item.qty + diffItems[item.name].qty : item.qty - diffItems[item.name].qty
        }) : item);
};

const actions = {
    submitChefRequestChange: (change) => ({setState, getState}) => {
        setState(currentState => ({
            requests: updateRequests(change, currentState),
            form: updateForm({
                change,
                form:currentState.form,
                items:currentState.requests,
                mode: currentState.mode
            })
        }));
    },
    submitStorekeeperInventoryChange: (change) => ({setState, getState}) => {
        setState(currentState => ({
            inventoryItems: updateInventory(change, currentState),
            form: updateForm({
                change,
                form:currentState.form,
                items:currentState.inventoryItems,
                mode: currentState.mode
            })
        }))
    },
    clearSatisfiedRequests: () => ({setState}) => {
        setState(currentState => ({
            requests: differenceWith(
                (request, name) => request.name === name,
                currentState.requests,
                Object.keys(currentState.toClearItems).filter(name => !!currentState.toClearItems[name])
            ),
            inventoryItems: updateInventoryQty(currentState.inventoryItems, currentState.toClearItems, 'increase'),
            toClearItems: {}
        }));
    },
    fulfillRequests: () => ({setState}) => {
        setState(currentState => {
            const requests = currentState.requests.map(request => ({
                ...request,
                fulfilled: request.fulfilled || isFulfilled(request, currentState),
            }));
            const currentlyFulfilledRequests = Object
                .values(currentState.toFulfilItems)
                .filter(item => item && isFulfilled(item, currentState))
                .reduce((acc, item) => ({
                    ...acc,
                    [item.name]: item
                }), {});

            return {
                requests,
                inventoryItems: updateInventoryQty(currentState.inventoryItems, currentlyFulfilledRequests, 'decrease'),
                toFulfilItems: {}
            };
        })
    },
    switchMode: (mode) => ({setState}) => {
        setState({
            mode
        });
    },
    manageFormChange: (change) => ({setState, getState, actions}) => {
        const {kitchen} = getState();
        const {submitChefRequestChange, submitStorekeeperInventoryChange} = actions.kitchen;
        const handler = kitchen.mode === MODE.CHEF ? submitChefRequestChange : submitStorekeeperInventoryChange;
        handler(change);
    },
    toggleToFulfil: (request) => ({setState}) => {
        setState(currentState => ({
            toFulfilItems: {
                ...currentState.toFulfilItems,
                [request.name]: currentState.toFulfilItems[request.name] ? undefined : request
            }
        }))
    },
    toggleToClear: (request) => ({setState}) => {
        setState(currentState => ({
            toClearItems: {
                ...currentState.toClearItems,
                [request.name]: currentState.toClearItems[request.name] ? undefined : request
            }
        }));
    }
};


export default {
    state: DEFAULT_STATE,
    actions
};