//@ts-ignore
export const setState = (state, action: PayloadAction<Object>) => {
  Object.keys(action.payload).forEach(key => {
    //@ts-ignore
    state[key] = action.payload[key];
  });
};
