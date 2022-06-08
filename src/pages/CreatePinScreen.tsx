import React, { useEffect } from 'react';
import PINCode from '@haskkor/react-native-pincode';
import { useAppDispatch, useAppSelector } from '$redux';
import { AccountActions } from '$redux/AccountSlice';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '$types';
import { useTranslation } from 'react-i18next';

const CreatePinScreen = () => {
  const dispatch = useAppDispatch();
  // const pinCode = useAppSelector(state => state.Account.pinCode);
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const { t } = useTranslation();
  return (
    <PINCode
      status={'choose'}
      titleChoose={t('enter-a-pin-code')}
      titleConfirm={t('confirm-your-pin-code')}
      titleConfirmFailed={t('your-entries-did-not-match')}
      titleEnter={t('enter-mpin')}
      titleAttemptFailed={t('incorrect-pin-code')}
      subtitleChoose={t('to-keep-your-information-secure')}
      subtitleError={t('please-try-again')}
      touchIDDisabled={true}
      endProcessFunction={() => {
        console.log('hi');
      }}
      finishProcess={_pinCode => {
        dispatch(AccountActions.createPin(_pinCode));
      }}
    />
  );
};

export default CreatePinScreen;
