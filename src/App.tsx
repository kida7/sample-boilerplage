import React, { useEffect, useMemo } from 'react';
import { NativeBaseProvider, useColorMode } from 'native-base';
import { Provider } from 'react-redux';
import { persistor, store, useAppSelector } from '$redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '$pages/LoginScreen';
import SplashScreen from 'react-native-splash-screen';
import CreatePinScreen from '$pages/CreatePinScreen';
import HomeScreen from '$pages/HomeScreen';
import { RootStackParamsList } from '$types';
import LoginPinScreen from '$pages/LoginPinScreen';
import { PinResultStatus } from '@haskkor/react-native-pincode/dist/src/utils';
import { PersistGate } from 'redux-persist/integration/react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '$locales/en.json';
import vi from '$locales/vi.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
});

const Stack = createNativeStackNavigator<RootStackParamsList>();

const Navigation = () => {
  const pinCode = useAppSelector(state => state.Account.pinCode);
  const isLoggedIn = useAppSelector(state => state.Account.isLoggedIn);
  const pinStatus = useAppSelector(state => state.Pin.pinStatus);
  console.log({ pinCode, isLoggedIn, pinStatus });
  const { colorMode } = useColorMode();
  console.log({ colorMode });
  const screenOptions = useMemo(
    () => ({
      contentStyle: {
        backgroundColor: colorMode === 'light' ? '#fff' : '#000',
      },
      header: () => null,
    }),
    [colorMode],
  );
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            {pinStatus === PinResultStatus.success ? (
              <>
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={screenOptions}
                />
              </>
            ) : (
              <>
                {pinCode ? (
                  <>
                    <Stack.Screen
                      name="LoginPinScreen"
                      component={LoginPinScreen}
                      options={screenOptions}
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen
                      name="CreatePinScreen"
                      component={CreatePinScreen}
                      options={screenOptions}
                    />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={screenOptions}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hide();
      clearTimeout(timeout);
    }, 3000);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
