function connect(ComponentToConnect, mapState, actionsToDispatch) {
  class ConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);
      // the store comes as a prop to our component
      const { store } = context;
      // get the initial state from the store
      this.state = store.getState();
      // subscribe to changes and set the component's state when anything changes
      this.cancelSubscription = store.subscribe(() => {
        this.setState(store.getState());
      });
      // map the actions that the view wants to dispatch to the store
      this.actions = {};
      Object.keys(actionsToDispatch).forEach(action => {
        this.actions[action] = (...args) => {
          store.dispatch(
            actionsToDispatch[action](...args)
          );
        };
      });
    }
    componentWillUnmount() {
      // clean up our subscription to the store
      this.cancelSubscription();
    }
    render() {
      // our component should be invisible so we should proxy the props that we get from above
      // and the sliced state that we captured from our store and filtered as the view wanted
      return <ComponentToConnect {...this.props} {...this.state} />;
    }
  }
  // tell React that we're expecting a redux store like prop called store
  ConnectedComponent.contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
    }).isRequired,
  };
  return ConnectedComponent;
}

export default ConnectedComponent;
