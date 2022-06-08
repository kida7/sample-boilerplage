import React from 'react';
import PINCode from '@haskkor/react-native-pincode';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '$types';
import { useAppDispatch, useAppSelector } from '$redux';
import { AccountActions } from '$redux/AccountSlice';
import { useTranslation } from 'react-i18next';

const LoginPinScreen = () => {
  const dispatch = useAppDispatch();
  const pinStatus = useAppSelector(state => state.Pin.pinStatus);
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  console.log('pinStatus', pinStatus);
  const { t } = useTranslation();
  return (
    // <View style={{ backgroundColor: '#fff' }}>
    <PINCode
      status={'enter'}
      titleChoose={t('enter-a-pin-code')}
      titleConfirm={t('confirm-your-pin-code')}
      titleConfirmFailed={t('your-entries-did-not-match')}
      titleEnter={t('enter-mpin')}
      titleAttemptFailed={t('incorrect-pin-code')}
      subtitleChoose={t('to-keep-your-information-secure')}
      subtitleError={t('please-try-again')}
      touchIDDisabled={true}
      pinStatus={pinStatus}
      endProcessFunction={pin => {
        dispatch(AccountActions.loginPin(pin));
      }}
    />
    // </View>
  );
};

export default LoginPinScreen;
