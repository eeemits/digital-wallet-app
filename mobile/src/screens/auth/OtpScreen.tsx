import { useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { useTheme } from '@/providers/ThemeProvider';
import { Button, OtpInput } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useDemoLogin } from '@/hooks/useAuth';

export function OtpScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Otp'>>();
  const email = route.params?.email;
  const { palette } = useTheme();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const demoLogin = useDemoLogin();

  const verify = () => {
    if (otp.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      demoLogin();
    }, 800);
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Verify email" subtitle={`Code sent to ${email ?? 'your email'}`} />
      <View style={{ padding: 24, flex: 1 }}>
        <Text style={{ fontSize: 15, color: palette.mutedForeground, textAlign: 'center', marginBottom: 32 }}>
          Enter the 6-digit verification code
        </Text>
        <OtpInput value={otp} onChange={setOtp} />
        <View style={{ marginTop: 32 }}>
          <Button title="Verify" onPress={verify} loading={loading} disabled={otp.length < 6} />
        </View>
        <Text style={{ textAlign: 'center', marginTop: 24, color: palette.mutedForeground, fontSize: 14 }}>
          Didn't receive a code?{' '}
          <Text style={{ color: palette.primary, fontWeight: '600' }}>Resend</Text>
        </Text>
      </View>
    </View>
  );
}
