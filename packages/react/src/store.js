import React, { useContext } from 'react';
import * as _ from './lodash';

export const StoreContext = React.createContext();

export const connect = (mapState, mapDispatch) => {
  return function (Component) {
    return (props) => {
      const { state, dispatch } = useContext(StoreContext);

      let mergedProps = { ...props };

      if (_.isFunction(mapState)) {
        mergedProps = { ...mergedProps, ...mapState(state) };
      }

      if (_.isFunction(mapDispatch)) {
        mergedProps = { ...mergedProps, ...mapDispatch(dispatch) };
      }

      return <Component {...mergedProps} />;
    };
  };
};

export const combineStores = (object) => {
  let gstate = {}, geffects = {}, greducers = {};

  // 合并数据处理
  for (const [key, value] of Object.entries(object)) {
    const { state, reducers, effects } = value;
    gstate = { ...gstate, [key]: state };
    geffects = { ...geffects, [key]: effects };
    greducers = { ...greducers, [key]: reducers };
  }

  // 处理 reducer
  function reducer(state, action) {
    const { type, payload } = action;
    const [namespace, actionType] = type.split('/');
    const globalDispatch = window.__vmate_app_dispatch;

    const targetEffect = geffects[namespace] && geffects[namespace][actionType];
    const targetReducer = greducers[namespace] && greducers[namespace][actionType];

    if (_.isFunction(targetEffect)) {
      globalDispatch({
        type: 'loading/update',
        payload: { [type]: true }
      });
      const promise = targetEffect(state[namespace], payload, globalDispatch);
      if (_.isNil(promise)) throw new Error('invalid effect. return without promise');
      promise.then(() => {
        globalDispatch({
          type: 'loading/update',
          payload: { [type]: false }
        });
      });
      return state;
    } else if (_.isFunction(targetReducer)) {
      const targetResult = targetReducer(state[namespace], payload);
      return { ...state, [namespace]: targetResult };
    }

    // 默认处理, 如果什么都没触发
    console.warn(`nothing find with action ${type}`);
    return state;
  }

  return [reducer, gstate];
};
