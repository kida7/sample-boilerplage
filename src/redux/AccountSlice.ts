import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setState } from '$utils/globals';
import { delay, put, select } from 'redux-saga/effects';
import { ErrorActions } from './ErrorSlice';
import { PinActions } from './PinSlice';
import { formatISO } from 'date-fns';

const INIT_STATE: {
  isLoggedIn?: boolean;
  pinCode?: string;
  username?: string;
  lastLoginTime?: string;
} = {};
const AccountSlice = createSlice({
  name: 'Account',
  initialState: INIT_STATE,
  reducers: {
    setState,
    login: (
      _state,
      _action: PayloadAction<{ username: string; password: string }>,
    ) => {},
    createPin: (state, action: PayloadAction<string | undefined>) => {
      state.pinCode = action.payload;
    },
    loginPin: (_state, _action: PayloadAction<string | undefined>) => {},
  },
});
export const AccountActions = AccountSlice.actions;
export const AccountReducer = AccountSlice.reducer;

export function* loginPin(action: PayloadAction<string | undefined>) {
  console.log('loginPin', action.payload);
  yield put(PinActions.resetStatus());
  yield delay(200);
  const pinCode: string = yield select(state => state.Account.pinCode);
  if (pinCode === action.payload) {
    yield put(PinActions.loginSuccess());
  } else {
    yield put(PinActions.loginFailed());
  }
}

export function* login({
  payload,
}: PayloadAction<{ username: string; password: string }>) {
  const { username, password } = payload;
  // This code used to fake API response
  yield put(
    ErrorActions.setState({
      login: { code: 'loading' },
    }),
  );
  yield delay(1000);
  if (username === 'Admin' && password === 'admin') {
    yield put(
      AccountActions.setState({
        isLoggedIn: true,
        username,
        lastLoginTime: formatISO(new Date()),
      }),
    );
    yield put(
      ErrorActions.setState({
        login: { code: 200 },
      }),
    );
  } else {
    yield put(
      ErrorActions.setState({
        login: {
          code: 401,
          message: 'Username or password is incorect. Please check again',
        },
      }),
    );
  }
}
