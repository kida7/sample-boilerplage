import { createSlice } from '@reduxjs/toolkit';
import { setState } from '$utils/globals';

const INIT_STATE: {
  [key: string]: {
    code: number | string;
    message: string;
  };
} = {};
const ErrorSlice = createSlice({
  name: 'Error',
  initialState: INIT_STATE,
  reducers: {
    setState,
  },
});
export const ErrorActions = ErrorSlice.actions;
export const ErrorReducer = ErrorSlice.reducer;
