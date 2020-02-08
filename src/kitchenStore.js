import {MODE} from "./constants";
import {differenceWith, whereEq, reject, find, pipe, path} from 'ramda';
import {getForm} from "./selectors";

const DEFAULT_STATE = {
    mode: MODE.CHEF,
    requests: [],
    inventory: [],
    form: {
        [MODE.CHEF]: {
            itemName: '',
            qty: 0
        },
        [MODE.STORE_KEEPER]: {
            itemName: '',
            qty: 0
        }
    }
};


const updateRequests = (change, kitchen) => {
    const {requests} = kitchen;
    const form = getForm({kitchen});
    const name = form.itemName;

    if (change.qty == null || !form.itemName) {
        return requests;
    }

    if (change.qty === 0) {
        return reject(whereEq({
            name: form.itemName
        }))(requests)
    }

    const updateFragment = {
        qty: change.qty,
        name: change.itemName == null ? form.itemName : change.itemName
    };


    return requests.find(whereEq({
        name
    })) ? requests.map(item => item.name === name ? ({
        ...item,
        ...updateFragment
    }) : item) : requests.concat(updateFragment);
};

const requestByName = name => find(whereEq({
    name
}));

const requestQty = (name) => pipe(
    requestByName(name),
    path(['qty'])
);

const actions = {
    submitChefRequestChange: (change) => ({setState, getState}) => {
        setState(currentState => ({
            requests: updateRequests(change, currentState),
            form: {
                ...currentState.form,
                [MODE.CHEF]: {
                    ...currentState.form[MODE.CHEF],
                    ...change,
                    qty: change.itemName != null  ? requestQty(change.itemName)(currentState.requests) :  change.qty
                }
            }
        }));
    },
    submitStorekeeperInventoryChange: (change) => ({setState, getState}) => {

    },
    clearSatisfiedRequests: (requestsToRemove) => ({setState}) => {
        setState(currentState => ({
            requests: differenceWith((item1, item2) => item1.name === item2.name, currentState.requests, requestsToRemove)
        }));
    },
    fulfillRequests: (requests) => ({setState}) => {

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
    }
};


export default {
    state: DEFAULT_STATE,
    actions
};