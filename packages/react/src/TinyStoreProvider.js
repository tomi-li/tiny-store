import { combineStores, StoreContext } from './store';
import { loading } from './preset-models/loading';
import React, { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

Index.propTypes = {
  models: PropTypes.object.isRequired,
};

export default function Index(props) {
  const { children, models } = props;
  const [reducer, initialState] = useMemo(() => combineStores({ loading, ...models }), [models]);
  const [state, dispatch] = useReducer(reducer, initialState);
  window.__vmate_app_dispatch = dispatch;

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
