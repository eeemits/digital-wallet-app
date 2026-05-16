import { useState } from 'react';
import { View, Text } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { resetToMainTabs } from '@/navigation/navigationRef';
import { useTheme } from '@/providers/ThemeProvider';
import { PinKeypad, Button } from '@/components/ui';
import { getSecureItem, secureKeys } from '@/lib/secure-storage';
import { useAuthStore } from '@/store/auth.store';

export function PinVerifyScreen() {
  const { palette } = useTheme();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const { setPinVerified } = useAuthStore();

  const verify = async (value: string) => {
    const stored = await getSecureItem(secureKeys.PIN_HASH);
    if (value === stored) {
      setPinVerified(true);
      resetToMainTabs();
    } else {
      setError('Incorrect PIN');
      setPin(value.slice(0, -1));
    }
  };

  const tryBiometric = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Unlock Athris' });
    if (success) {
      setPinVerified(true);
      resetToMainTabs();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.background, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: palette.foreground, textAlign: 'center' }}>
        Enter PIN
      </Text>
      {error ? (
        <Text style={{ color: palette.destructive, textAlign: 'center', marginTop: 8 }}>{error}</Text>
      ) : null}
      <View style={{ marginTop: 40 }}>
        <PinKeypad
          value={pin}
          onChange={(v) => {
            setPin(v);
            setError('');
            if (v.length === 6) verify(v);
          }}
        />
      </View>
      <View style={{ marginTop: 32 }}>
        <Button title="Use Face ID / Touch ID" variant="outline" onPress={tryBiometric} />
      </View>
    </View>
  );
}
