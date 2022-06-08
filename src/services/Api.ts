/* eslint-disable @typescript-eslint/no-unused-vars */
import { store } from '$redux';
import { ErrorActions } from '$redux/ErrorSlice';
import { ApiList, Invoice } from '$types';
import apisauce, { ApisauceInstance, ApiResponse } from 'apisauce';

let baseURL = '';

const _apiList: ApiList = {
  getInvoices: {
    method: 'get',
    url: 'https://demo2153888.mockable.io/invoices',
  },
};
interface ApiInterface extends ApisauceInstance {
  getInvoices: () => Promise<Invoice[]>;
}
export function setErrorState(key: string, error: object) {
  store.dispatch(ErrorActions.setState({ [key]: error }));
}
//@ts-ignore
const Api: ApiInterface = apisauce.create({
  baseURL,
  headers: {
    'Cache-Control': 'no-cache',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0',
  },

  timeout: 10000,
});

function getValueByPropPath(obj: any, path: string) {
  if (!path) {
    return obj;
  }
  let props = path.split('.');
  let value = obj;
  props.map(prop => {
    if (value) {
      value = value[prop];
    }
  });
  return value;
}

// Init Apis by the configs in _apiList
for (let apiName in _apiList) {
  // @ts-ignore
  Api[apiName] = _data => {
    let _api = _apiList[apiName];
    let { errorMess, errorKey, pathParams, ...data } = _data || {};
    //@ts-ignore
    data = { ...data, platform: Platform.OS };
    errorKey = errorKey || apiName;
    console.log('REQUEST', _api.url, data);
    pathParams = pathParams || [];
    return new Promise(resolve => {
      setErrorState(errorKey, { code: 'loading' });
      //@ts-ignore
      Api[_api.method](_api.url?.format(...pathParams), { ...data }).then(
        (response: ApiResponse<any>) => {
          if (response.ok) {
            setErrorState(errorKey, {
              code: '{0}'.format(response.status),
            });
            let resData = response.data;
            console.info('RESPONSE', resData);
            resolve(resData);
          } else {
            console.error('RESPONSE ERROR', response);
            if (response.data?.code) {
              setErrorState(errorKey, {
                code: response.data.code,
                message: response.data.message,
              });
              // return;
            }
            setErrorState(errorKey, {
              code: response.originalError.code || response.problem,
              message: errorMess || response.originalError.message,
            });
          }
        },
      );
    });
  };
}

export default Api;
