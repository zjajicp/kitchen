export const asyncAction = action => (...args) => ({ setState, ...restDeps }) => {
  setState({
    loading: true
  });
  return action(...args)({
    setState, ...restDeps
  })
    .catch(error => {
      setState({
        error
      });
    })
    .finally(() => {
      setState({
        loading: false
      });
    });
};
