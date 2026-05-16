import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@/lib/icons';
import { navigate } from '@/navigation/navigationRef';
import { useTheme } from '@/providers/ThemeProvider';
import { Card } from '@/components/ui';

import type { RootStackParamList } from '@/navigation/types';

const payOptions: Array<{
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  route: keyof RootStackParamList | null;
  color: string;
  badge?: string;
}> = [
  { id: 'send', title: 'Send Money', subtitle: 'Transfer to anyone', icon: 'arrow-up', route: 'Send', color: '#3B82F6' },
  { id: 'receive', title: 'Receive', subtitle: 'Share your payment link', icon: 'arrow-down', route: 'Receive', color: '#22C55E' },
  { id: 'scan', title: 'Scan QR', subtitle: 'Pay merchants instantly', icon: 'qr-code', route: 'ScanQr', color: '#A855F7' },
  { id: 'duitnow', title: 'DuitNow', subtitle: 'Bank transfer', icon: 'business', route: null, color: '#EC4899', badge: 'Soon' },
  { id: 'bills', title: 'Pay Bills', subtitle: 'Utilities & subscriptions', icon: 'receipt', route: 'BillPay', color: '#F97316' },
  { id: 'reload', title: 'Mobile Reload', subtitle: 'Prepaid top-up', icon: 'phone-portrait', route: 'MobileReload', color: '#14B8A6' },
  { id: 'split', title: 'Split Bill', subtitle: 'Share expenses', icon: 'people', route: 'SplitBill', color: '#6366F1' },
  { id: 'request', title: 'Request Money', subtitle: 'Ask for payment', icon: 'hand-left', route: 'Receive', color: '#0D9488' },
];

export function PayScreen() {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }}>
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 32 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: palette.foreground }}>Pay</Text>
        <Text style={{ fontSize: 14, color: palette.mutedForeground, marginTop: 4 }}>
          Send, receive, and pay in seconds
        </Text>

        <Pressable
          onPress={() => navigate('ScanQr')}
          style={{ marginTop: 24 }}
        >
          <Card style={{ alignItems: 'center', paddingVertical: 32 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: `${palette.primary}18`,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <Ionicons name="qr-code" size={40} color={palette.primary} />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '700', color: palette.foreground }}>Scan to Pay</Text>
            <Text style={{ fontSize: 14, color: palette.mutedForeground, marginTop: 4 }}>
              Point camera at merchant QR
            </Text>
          </Card>
        </Pressable>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
          {payOptions.map((option) => (
            <Pressable
              key={option.id}
              onPress={() => option.route && navigate(option.route)}
              style={{ width: '47%' }}
            >
              <Card style={{ minHeight: 120 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    backgroundColor: `${option.color}18`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Ionicons name={option.icon} size={22} color={option.color} />
                </View>
                <Text style={{ fontSize: 15, fontWeight: '600', color: palette.foreground }}>{option.title}</Text>
                <Text style={{ fontSize: 12, color: palette.mutedForeground, marginTop: 4 }}>{option.subtitle}</Text>
                {'badge' in option && option.badge && (
                  <View style={{ position: 'absolute', top: 12, right: 12, backgroundColor: palette.muted, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }}>
                    <Text style={{ fontSize: 10, fontWeight: '600', color: palette.mutedForeground }}>{option.badge}</Text>
                  </View>
                )}
              </Card>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
