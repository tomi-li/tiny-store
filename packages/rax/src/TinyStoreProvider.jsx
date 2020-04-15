import { createElement, useReducer, useMemo } from 'rax';
import { combineStores, StoreContext } from './store';
import { loading } from './preset-models/loading';

export default function Index(props) {
  const { children, models } = props;
  const [reducer, initialState] = useMemo(() => combineStores({ loading, ...models }), [models]);
  const [state, dispatch] = useReducer(reducer, initialState);
  global.__vmate_app_dispatch = dispatch;

  return (createElement(StoreContext.Provider, { children, value: { state, dispatch } }));
}
