import React from 'react';

export const makeConnect = (Consumer) => ({ stateToProps, actionsToProps }) => Component => class extends React.Component {
  constructor(props) {
    super(props);
    this.store = {
      state: {},
      actions: {}
    };

    const that = this;

    this.CheckedComponent = class extends React.Component {
      shouldComponentUpdate() {
        if (!that.mappedState) {
          return true;
        }
        return Object.entries(that.mappedState).some(
          ([propName, newPropValue]) => newPropValue !== this.props[propName]
        );
      }

      render() {
        return (<Component {...this.props} />);
      }
    };
  }

  render() {
    return (
      <Consumer>
        {({ state, actions }) => {
          this.store = {
            state,
            actions
          };
          const { CheckedComponent } = this;
          this.mappedState = stateToProps(state);
          return (
            <CheckedComponent
              {...this.props}
              {...this.mappedState}
              actions={actionsToProps(actions)}
            />
          );
        }}
      </Consumer>
    );
  }
};
