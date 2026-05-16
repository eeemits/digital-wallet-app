import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { navigationRef } from './navigationRef';
import { MainTabNavigator } from './MainTabNavigator';
import { SplashScreen } from '@/screens/SplashScreen';
import { OnboardingScreen } from '@/screens/auth/OnboardingScreen';
import { LoginScreen } from '@/screens/auth/LoginScreen';
import { RegisterScreen } from '@/screens/auth/RegisterScreen';
import { OtpScreen } from '@/screens/auth/OtpScreen';
import { ForgotPasswordScreen } from '@/screens/auth/ForgotPasswordScreen';
import { PinVerifyScreen } from '@/screens/PinVerifyScreen';
import { PinSetupScreen } from '@/screens/PinSetupScreen';
import { SendScreen } from '@/screens/SendScreen';
import { ReceiveScreen } from '@/screens/ReceiveScreen';
import { NovaScreen } from '@/screens/NovaScreen';
import { TransactionDetailScreen } from '@/screens/TransactionDetailScreen';
import { CardDetailScreen } from '@/screens/CardDetailScreen';
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { TopUpScreen } from '@/screens/TopUpScreen';
import { WithdrawScreen } from '@/screens/WithdrawScreen';
import { KycScreen } from '@/screens/KycScreen';
import { HelpScreen } from '@/screens/HelpScreen';
import { ScanQrScreen } from '@/screens/ScanQrScreen';
import { BillPayScreen } from '@/screens/BillPayScreen';
import { SplitBillScreen } from '@/screens/SplitBillScreen';
import { MobileReloadScreen } from '@/screens/MobileReloadScreen';
import { TransferReceiptScreen } from '@/screens/TransferReceiptScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="PinVerify" component={PinVerifyScreen} />
        <Stack.Screen name="PinSetup" component={PinSetupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Send" component={SendScreen} />
        <Stack.Screen name="Receive" component={ReceiveScreen} />
        <Stack.Screen
          name="Nova"
          component={NovaScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
        <Stack.Screen name="CardDetail" component={CardDetailScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="TopUp" component={TopUpScreen} />
        <Stack.Screen name="Withdraw" component={WithdrawScreen} />
        <Stack.Screen name="Kyc" component={KycScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen
          name="ScanQr"
          component={ScanQrScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="BillPay" component={BillPayScreen} />
        <Stack.Screen name="SplitBill" component={SplitBillScreen} />
        <Stack.Screen name="MobileReload" component={MobileReloadScreen} />
        <Stack.Screen name="TransferReceipt" component={TransferReceiptScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
