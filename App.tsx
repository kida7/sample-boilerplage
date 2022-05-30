/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, useColorScheme } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button, NativeBaseProvider } from 'native-base';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [isSensorAvailable, setIsSensorAvailable] = useState(false);
  const [keysExist, setKeyExist] = useState(false);
  const [signature, setSignature] = useState();
  useEffect(() => {
    ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
      const { available, biometryType } = resultObject;
      setIsSensorAvailable(available);
      if (available && biometryType === ReactNativeBiometrics.TouchID) {
        console.log('TouchID is supported');
      } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        console.log('FaceID is supported');
      } else if (
        available &&
        biometryType === ReactNativeBiometrics.Biometrics
      ) {
        console.log('Biometrics is supported');
      } else {
        console.log('Biometrics not supported');
      }
    });
  }, []);
  useEffect(() => {
    if (isSensorAvailable) {
      ReactNativeBiometrics.biometricKeysExist().then(checkKeyResult => {
        const _keysExist = checkKeyResult.keysExist;
        setKeyExist(_keysExist);
        if (_keysExist) {
          console.log('Keys exist');
        } else {
          console.log('Keys do not exist or were deleted. Create key');
          ReactNativeBiometrics.createKeys().then(resultObject => {
            const { publicKey } = resultObject;
            console.log('publicKey', publicKey);
          });
        }
      });
    }
  }, [isSensorAvailable]);
  const authenticate = useCallback(() => {
    if (isSensorAvailable && keysExist) {
      ReactNativeBiometrics.createSignature({
        promptMessage: 'Sign in',
        payload: 'payload',
      }).then(resultObject => {
        const { success, signature: _signature } = resultObject;
        setSignature(_signature);
        if (success) {
          console.log('signature', _signature);
        } else {
          console.log('failed');
        }
      });
    }
  }, [isSensorAvailable, keysExist]);
  return (
    <NativeBaseProvider>
      <SafeAreaView style={[backgroundStyle, styles.container]}>
        <Button onPress={authenticate}>Authenticate</Button>
        <Text numberOfLines={3}>{`Signature: ${signature}`}</Text>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
});

export default App;
