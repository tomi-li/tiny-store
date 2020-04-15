const delay = async (duration = 1000) => {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
};

export const counter = {
  state: {
    count: 0
  },
  effects: {
    async plus(state, payload, dispatch) {
      await delay(2000);
      console.log('!!!!');
      dispatch({
        type: 'counter/save',
        payload: {
          count: state.count + 1,
        }
      });
    },
  },
  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  }
};


