import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import Saga from './Saga';
import Rehydration from './Rehydration';
import {
  configureStore,
  combineReducers,
  MiddlewareArray,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { ErrorReducer } from './ErrorSlice';
import { AccountReducer } from './AccountSlice';
import { PinReducer } from './PinSlice';
import { InvoiceReducer } from './InvoiceSlice';
//@ts-ignore
import createSensitiveStorage from 'redux-persist-sensitive-storage';

const storage = createSensitiveStorage({
  keychainService: 'myKeychain',
  sharedPreferencesName: 'mySharedPrefs',
});

const sagaMiddleware = createSagaMiddleware();

export const reducers = combineReducers({
  Error: ErrorReducer,
  Account: persistReducer({ key: 'account', storage }, AccountReducer),
  // Account: AccountReducer,
  Pin: PinReducer,
  Invoice: InvoiceReducer,
});

const finalReducers = persistReducer(
  {
    key: 'primary',
    // whitelist: [],
    whitelist: ['Account'],
    storage: AsyncStorage,
  },
  reducers,
);

const store = configureStore({
  reducer: finalReducers,
  middleware: new MiddlewareArray().concat(sagaMiddleware),
});

sagaMiddleware.run(Saga);

let persistor = Rehydration.updateReducers(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
