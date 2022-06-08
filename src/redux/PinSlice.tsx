import { createSlice } from '@reduxjs/toolkit';
import { setState } from '$utils/globals';
import { PinResultStatus } from '@haskkor/react-native-pincode/dist/src/utils';

const INIT_STATE: {
  pinStatus: PinResultStatus;
} = {
  pinStatus: PinResultStatus.initial,
};
const PinSlice = createSlice({
  name: 'Pin',
  initialState: INIT_STATE,
  reducers: {
    setState,
    resetStatus: state => {
      state.pinStatus = PinResultStatus.initial;
    },
    loginSuccess: state => {
      state.pinStatus = PinResultStatus.success;
    },
    loginFailed: state => {
      state.pinStatus = PinResultStatus.failure;
    },
    logOut: state => {
      state.pinStatus = PinResultStatus.initial;
    },
  },
});
export const PinActions = PinSlice.actions;
export const PinReducer = PinSlice.reducer;
