import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  FlatList,
  Heading,
  Text,
  useColorMode,
} from 'native-base';
import Space from '$components/Space';
import { useAppSelector } from '$redux';
import { format, parse, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import { InvoiceActions } from '$redux/InvoiceSlice';
import HorizontalView from '$components/HorizontalView';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { PinActions } from '$redux/PinSlice';

const HomeScreen = () => {
  const username = useAppSelector(state => state.Account.username);
  const lastLoginTime = useAppSelector(state => state.Account.lastLoginTime);
  const invoices = useAppSelector(state => state.Invoice.invoices);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(InvoiceActions.getInvoices());
  }, [dispatch]);
  console.log({ lastLoginTime });
  const { t } = useTranslation();
  const { toggleColorMode } = useColorMode();
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Space size={36} />
      <FlatList
        data={invoices}
        keyExtractor={item => String(item.id)}
        ListFooterComponent={<Space size={80} />}
        ListHeaderComponent={
          <>
            <Space size={30} />
            <Center>
              <Heading>{t('welcome-back-0').format(username)}</Heading>
              {lastLoginTime ? (
                <Text>
                  {t('last-login-time-0').format(
                    format(parseISO(lastLoginTime), 'HH:MM dd/MM/yyyy'),
                  )}
                </Text>
              ) : null}
              <Space size={12} />
              <HorizontalView>
                <Button
                  variant={'outline'}
                  size="sm"
                  onPress={() => {
                    i18next.changeLanguage('en');
                  }}>
                  EN
                </Button>
                <Space horizontal size={12} />
                <Button
                  variant={'outline'}
                  size="sm"
                  onPress={() => {
                    i18next.changeLanguage('vi');
                  }}>
                  VI
                </Button>
                <Space horizontal size={12} />
                <Button
                  variant={'outline'}
                  size="sm"
                  onPress={() => {
                    toggleColorMode();
                  }}>
                  Color
                </Button>
              </HorizontalView>
              <Space size={12} />
              <Button
                width={200}
                onPress={() => {
                  dispatch(PinActions.logOut());
                }}>
                {t('logout')}
              </Button>
              <Space size={12} />
            </Center>
            <HorizontalView>
              <HorizontalView
                style={[
                  styles.header,
                  colorMode === 'light'
                    ? styles.headerLight
                    : styles.headerDark,
                ]}>
                <Text style={[styles.col1, styles.headerText]}>
                  {t('invoice-number')}
                </Text>
                <Text style={[styles.col2, styles.headerText]}>
                  {t('customer-name')}
                </Text>
                <Text style={[styles.col3, styles.headerText]}>
                  {t('date')}
                </Text>
                <Text style={[styles.col4, styles.headerText]}>
                  {t('amount')}
                </Text>
              </HorizontalView>
            </HorizontalView>
          </>
        }
        renderItem={({ item, index }) => (
          <HorizontalView
            style={[
              styles.row,

              index % 2 === 0
                ? colorMode === 'light'
                  ? styles.rowBgLight
                  : styles.rowbgDark
                : styles.rowBg,
            ]}>
            <Text style={styles.col1}>{item.invoiceNumber}</Text>
            <Text style={styles.col2}>{item.customerName}</Text>
            <Text style={styles.col3}>
              {format(parseISO(item.date), 'dd/MM/yyyy')}
            </Text>
            <Text style={styles.col4}>{item.amount}</Text>
          </HorizontalView>
        )}
      />
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rowBgLight: { backgroundColor: '#f0f9ff' },
  rowbgDark: { backgroundColor: '#0c4a6e' },
  rowBg: { backgroundColor: 'fff' },
  headerDark: { backgroundColor: '#164e63' },
  headerLight: { backgroundColor: '#cffafe' },
  headerText: { fontWeight: 'bold' },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  col4: { width: 60 },
  col3: { width: 100 },
  col2: { flex: 1 },
  col1: { width: 70 },
});
