export type RootStackParamsList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  CreatePinScreen: undefined;
  LoginPinScreen: undefined;
};

export interface ApiList {
  [apiName: string]: { url: string; method: string };
}
export interface Invoice {
  id: number;
  invoiceNumber: string;
  customerName: string;
  date: string;
  amount: number;
}
