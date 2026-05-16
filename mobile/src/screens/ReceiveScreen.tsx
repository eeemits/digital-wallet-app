import { View, Text, Share } from 'react-native';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { Button, Card } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useAuthStore } from '@/store/auth.store';
import { PAYMENT_LINK_BASE } from '@/constants/app';

export function ReceiveScreen() {
  const { palette } = useTheme();
  const userId = useAuthStore((s) => s.session?.userId);
  const paymentId = userId ? `ATHRIS-${userId.slice(0, 8).toUpperCase()}` : 'ATHRIS-DEMO';
  const paymentLink = `${PAYMENT_LINK_BASE}/${userId ?? 'demo'}`;

  const shareLink = async () => {
    await Share.share({ message: `Pay me on Athris: ${paymentLink}`, url: paymentLink });
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Receive money" />
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Card style={{ width: '100%', alignItems: 'center', paddingVertical: 32 }}>
          <View
            style={{
              width: 200,
              height: 200,
              borderRadius: 20,
              backgroundColor: palette.muted,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <Ionicons name="qr-code" size={120} color={palette.mutedForeground} />
          </View>
          <Text style={{ fontSize: 13, color: palette.mutedForeground }}>QR scanner available in mobile app</Text>
          <Text style={{ fontSize: 22, fontWeight: '700', color: palette.foreground, marginTop: 24 }}>{paymentId}</Text>
          <Text style={{ fontSize: 14, color: palette.mutedForeground, marginTop: 8, textAlign: 'center' }}>{paymentLink}</Text>
        </Card>
        <View style={{ width: '100%', marginTop: 24, gap: 12 }}>
          <Button title="Share payment link" onPress={shareLink} />
          <Button title="Request money" variant="outline" onPress={shareLink} />
        </View>
      </View>
    </View>
  );
}
