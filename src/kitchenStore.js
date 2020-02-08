import {MODE} from "./constants";
import {differenceWith, eqBy, whereEq} from 'ramda';

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

const updateRequests = (change, {requests}) => {
    if (change.itemName) {
        return requests;
    }

    return requests.find(whereEq({
        name: change.itemName
    })) ? requests.map(item => item.name === change.itemName ? ({
        ...item,
        ...change
    }) : item) : requests.concat(change);
};

const actions = {
    submitChefRequestChange: (change) => ({setState, getState}) => {
        setState(currentState => ({
            requests: updateRequests(change, currentState),
            form: {
                ...currentState.form,
                [MODE.CHEF]: {
                    ...currentState.form[MODE.CHEF],
                    ...change
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