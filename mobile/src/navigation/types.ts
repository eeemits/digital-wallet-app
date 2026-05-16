export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Otp: { email: string };
  ForgotPassword: undefined;
  MainTabs: undefined;
  PinVerify: undefined;
  PinSetup: undefined;
  Send: undefined;
  Receive: undefined;
  Nova: undefined;
  TransactionDetail: { id: string };
  CardDetail: { id: string };
  Notifications: undefined;
  Settings: undefined;
  TopUp: undefined;
  Withdraw: undefined;
  Kyc: undefined;
  Help: undefined;
  ScanQr: undefined;
  BillPay: undefined;
  SplitBill: undefined;
  MobileReload: undefined;
  TransferReceipt: {
    type: string;
    amount: string;
    recipient: string;
    reference: string;
    status: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Wallet: undefined;
  Pay: undefined;
  Rewards: undefined;
  Profile: undefined;
};
