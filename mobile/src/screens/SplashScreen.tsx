import { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@/lib/icons';
import { useAuthStore } from '@/store/auth.store';
import { getSecureItem, secureKeys } from '@/lib/secure-storage';
import { APP_NAME } from '@/constants/app';
import { navigate } from '@/navigation/navigationRef';

export function SplashScreen() {
  const { isLoading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    async function navigateFromSplash() {
      const onboardingDone = await getSecureItem(secureKeys.ONBOARDING_COMPLETE);

      if (!onboardingDone) {
        navigate('Onboarding');
        return;
      }

      if (!isAuthenticated) {
        navigate('Login');
        return;
      }

      const hasPin = await getSecureItem(secureKeys.PIN_HASH);
      if (hasPin) {
        navigate('PinVerify');
      } else {
        navigate('MainTabs');
      }
    }

    const timer = setTimeout(navigateFromSplash, 1200);
    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated]);

  return (
    <LinearGradient colors={['#0D9488', '#06B6D4']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: 88,
          height: 88,
          borderRadius: 24,
          backgroundColor: 'rgba(255,255,255,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        <Ionicons name="wallet" size={44} color="#fff" />
      </View>
      <Text style={{ color: '#fff', fontSize: 32, fontWeight: '700', letterSpacing: -0.5 }}>{APP_NAME}</Text>
      <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, marginTop: 8 }}>
        Your digital wallet
      </Text>
      <ActivityIndicator color="#fff" style={{ marginTop: 48 }} />
    </LinearGradient>
  );
}
