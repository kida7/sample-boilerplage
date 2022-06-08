import React, { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Spinner,
  Stack,
  WarningOutlineIcon,
} from 'native-base';
import { useAppDispatch } from '$redux';
import { AccountActions } from '$redux/AccountSlice';
import useError from '$hooks/useError';
import { Image, StyleSheet } from 'react-native';
import Space from '$components/Space';
import Images from '$themes/images';

const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const error = useError('login');

  const onSubmit = useCallback(() => {
    dispatch(AccountActions.login({ username, password }));
  }, [dispatch, username, password]);
  const isInvalid = useMemo(
    () => error && !/200|loading/.test(error.code + ''),
    [error],
  );
  return (
    <Box padding={4} backgroundColor="#fff" flex={1}>
      <Space size={100} />
      <Center>
        <Image source={Images._9gag} style={styles.logo} />
      </Center>
      <Space size={50} />
      <Stack space={4}>
        {error?.code === 'loading' ? <Spinner /> : <Space size={20} />}

        <FormControl isInvalid={isInvalid}>
          <FormControl.Label>Username</FormControl.Label>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </FormControl>
        <FormControl isInvalid={isInvalid}>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChangeText={setPassword}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {error?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <Space size={30} />
        <FormControl>
          <Button onPress={onSubmit}>Submit</Button>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: { width: 100, height: 100 },
});
