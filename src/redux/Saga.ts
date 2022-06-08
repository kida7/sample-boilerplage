/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { AccountActions, login, loginPin } from './AccountSlice';
import { getInvoices, InvoiceActions } from './InvoiceSlice';

export default function* Saga() {
  yield all([
    takeLatest(AccountActions.login.type, login),
    takeLatest(AccountActions.loginPin.type, loginPin),
    takeLatest(InvoiceActions.getInvoices.type, getInvoices),
  ]);
}
