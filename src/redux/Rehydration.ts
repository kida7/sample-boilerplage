import AsyncStorage from '@react-native-community/async-storage';
import { persistStore } from 'redux-persist';
import { Store, AnyAction } from 'redux';

const updateReducers = (store: Store<any, AnyAction>) => {
  const reducerVersion = '1.0';
  let persistor = persistStore(store);
  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion')
    .then(localVersion => {
      console.log('__updateReducers', localVersion, reducerVersion);
      if (localVersion !== reducerVersion) {
        // Purge store
        AsyncStorage.setItem('reducerVersion', reducerVersion);
        console.log('__updateReducers', '======Purge store======');
        persistor.purge();
      } else {
        console.log('__updateReducers', '======Match verion======');
      }
    })
    .catch(ex => {
      console.log('__updateReducers', ex);
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    });
  return persistor;
};

export default { updateReducers };
