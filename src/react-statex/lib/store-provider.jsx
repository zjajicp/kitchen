
import React from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext({});


class StoreProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.createStore();
  }


  getState() {
    return this.state.state;
  }

  getStore() {
    return this.state;
  }

  setStateFactory(storeName) {
    return newStateUpdate => {
      this.setState(upToDateState => {
        const currentState = upToDateState.state[storeName];
        // eslint-disable-next-line no-param-reassign
        newStateUpdate = typeof newStateUpdate === 'function'
          ? newStateUpdate(currentState)
          : newStateUpdate;

        return {
          state: {
            ...upToDateState.state,
            [storeName]: {
              ...currentState,
              ...newStateUpdate
            }
          }
        };
      });
    };
  }

  getActionDeps(storeName) {
    return {
      setState: this.setStateFactory(storeName),
      getState: this.getState.bind(this),
      actions: this.state.actions
    };
  }

  createStore() {
    return Object.keys(this.props.store).reduce(
      (acc, storeName) => {
        const store = this.props.store[storeName];
        return {
          state: {
            ...acc.state,
            [storeName]: store.state
          },
          actions: {
            ...acc.actions,
            [storeName]: this.createActions(store.actions, storeName)
          }
        };
      },
      {
        state: {},
        actions: {}
      }
    );
  }


  createActions(actions, storeName) {
    return Object.keys(actions).reduce((acc, actionName) => ({
      ...acc,
      [actionName]: (...args) => actions[actionName](...args)(this.getActionDeps(storeName))
    }), {});
  }


  render() {
    console.log(this.state.state);
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.objectOf(PropTypes.exact({
    actions: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired
  })).isRequired
};

export { StoreProvider };

export const StoreConsumer = Context.Consumer;
