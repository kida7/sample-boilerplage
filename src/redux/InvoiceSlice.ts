import { createSlice } from '@reduxjs/toolkit';
import { setState } from '$utils/globals';
import { call, put } from 'redux-saga/effects';
import Api from '$services/Api';
import { Invoice } from '$types';

const INIT_STATE: {
  invoices: Invoice[];
} = {
  invoices: [],
};
const InvoiceSlice = createSlice({
  name: 'Invoice',
  initialState: INIT_STATE,
  reducers: {
    setState,
    getInvoices: () => {},
  },
});
export const InvoiceActions = InvoiceSlice.actions;
export const InvoiceReducer = InvoiceSlice.reducer;

export function* getInvoices() {
  const invoices: Invoice[] = yield call(Api.getInvoices);
  yield put(InvoiceActions.setState({ invoices }));
}
