import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { resetToMainTabs } from '@/navigation/navigationRef';
import type { RootStackParamList } from '@/navigation/types';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { Button, Card } from '@/components/ui';
import { formatCurrency } from '@/lib/currency';

export function TransferReceiptScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'TransferReceipt'>>();
  const params = route.params;
  const { palette } = useTheme();
  const amount = parseFloat(params.amount ?? '0');
  const success = params.status !== 'failed';

  return (
    <View style={{ flex: 1, backgroundColor: palette.background, padding: 24, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: success ? `${palette.success}18` : `${palette.destructive}15`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons
            name={success ? 'checkmark-circle' : 'close-circle'}
            size={48}
            color={success ? palette.success : palette.destructive}
          />
        </View>
        <Text style={{ fontSize: 24, fontWeight: '700', color: palette.foreground, marginTop: 20 }}>
          {success ? 'Transfer successful' : 'Transfer failed'}
        </Text>
        <Text style={{ fontSize: 36, fontWeight: '700', color: palette.foreground, marginTop: 12 }}>
          {formatCurrency(amount)}
        </Text>
        <Text style={{ fontSize: 15, color: palette.mutedForeground, marginTop: 8 }}>
          To {params.recipient}
        </Text>
      </View>

      <Card>
        <Text style={{ fontSize: 13, color: palette.mutedForeground }}>Reference</Text>
        <Text style={{ fontSize: 15, fontWeight: '600', color: palette.foreground, marginTop: 4 }}>
          {params.reference || '—'}
        </Text>
      </Card>

      <View style={{ marginTop: 32, gap: 12 }}>
        <Button title="Done" onPress={() => resetToMainTabs()} />
        <Button title="Share receipt" variant="outline" onPress={() => {}} />
      </View>
    </View>
  );
}
