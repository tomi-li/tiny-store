export const loading = {
  state: {},
  reducers: {
    update(state, payload) {
      return {
        ...state,
        ...payload,
      };
    }
  },
};
