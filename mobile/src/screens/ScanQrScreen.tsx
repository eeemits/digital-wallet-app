import { View, Text } from 'react-native';
import { Ionicons } from '@/lib/icons';
import { goBack } from '@/navigation/navigationRef';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';

export function ScanQrScreen() {
  const { palette } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenHeader title="Scan QR" showBack />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <View
          style={{
            width: 280,
            height: 280,
            borderWidth: 2,
            borderColor: palette.primary,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderStyle: 'dashed',
          }}
        >
          <Ionicons name="scan" size={80} color="rgba(255,255,255,0.5)" />
        </View>
        <Text style={{ color: '#fff', fontSize: 16, marginTop: 24, textAlign: 'center' }}>
          Camera QR scanner integrates with a native camera module in production
        </Text>
        <View style={{ marginTop: 32, width: '100%' }}>
          <Button title="Simulate payment" onPress={() => goBack()} />
        </View>
      </View>
    </View>
  );
}
