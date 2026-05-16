import { View, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Button, Input } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';

export function ForgotPasswordScreen() {
  const { palette } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Reset password" subtitle="We'll send a reset link to your email" />
      <View style={{ padding: 20, gap: 20 }}>
        <Input label="Email" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
        <Button title="Send reset link" />
        <Text style={{ fontSize: 13, color: palette.mutedForeground, textAlign: 'center', lineHeight: 20 }}>
          Phone authentication and biometric recovery will be available in a future update.
        </Text>
      </View>
    </View>
  );
}
