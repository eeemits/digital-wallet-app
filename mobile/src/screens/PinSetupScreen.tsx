import { useState } from 'react';
import { View, Text } from 'react-native';
import { resetToMainTabs } from '@/navigation/navigationRef';
import { useTheme } from '@/providers/ThemeProvider';
import { PinKeypad, Button } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { setSecureItem, secureKeys } from '@/lib/secure-storage';
import { useAuthStore } from '@/store/auth.store';

export function PinSetupScreen() {
  const { palette } = useTheme();
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  const { setHasPin } = useAuthStore();

  const handlePinChange = (value: string) => {
    if (step === 'create') {
      setPin(value);
      if (value.length === 6) setStep('confirm');
    } else {
      setConfirm(value);
    }
  };

  const savePin = async () => {
    if (pin !== confirm) {
      setConfirm('');
      setStep('confirm');
      return;
    }
    await setSecureItem(secureKeys.PIN_HASH, pin);
    setHasPin(true);
    resetToMainTabs();
  };

  const currentPin = step === 'create' ? pin : confirm;

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Set up PIN" subtitle={step === 'create' ? 'Create a 6-digit PIN' : 'Confirm your PIN'} showBack={false} />
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <Text style={{ textAlign: 'center', fontSize: 15, color: palette.mutedForeground, marginBottom: 40 }}>
          Secure your account with a PIN for quick access
        </Text>
        <PinKeypad value={currentPin} onChange={handlePinChange} />
        {confirm.length === 6 && (
          <View style={{ marginTop: 32 }}>
            <Button title="Save PIN" onPress={savePin} />
          </View>
        )}
        <Text style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: palette.mutedForeground }}>
          Biometric authentication can be enabled in Security settings
        </Text>
      </View>
    </View>
  );
}
