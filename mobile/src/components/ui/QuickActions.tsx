import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { navigate } from '@/navigation/navigationRef';
import type { RootStackParamList } from '@/navigation/types';

const actions: Array<{
  id: string;
  title: string;
  icon: string;
  route: keyof RootStackParamList;
  color: string;
}> = [
  { id: 'send', title: 'Send', icon: 'arrow-up', route: 'Send', color: '#3B82F6' },
  { id: 'receive', title: 'Receive', icon: 'arrow-down', route: 'Receive', color: '#22C55E' },
  { id: 'scan', title: 'Scan QR', icon: 'qr-code', route: 'ScanQr', color: '#A855F7' },
  { id: 'bills', title: 'Bills', icon: 'receipt', route: 'BillPay', color: '#F97316' },
  { id: 'split', title: 'Split', icon: 'people', route: 'SplitBill', color: '#EC4899' },
  { id: 'reload', title: 'Reload', icon: 'phone-portrait', route: 'MobileReload', color: '#14B8A6' },
];

export function QuickActions() {
  const { palette } = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 4 }}>
      {actions.map((action) => (
        <Pressable
          key={action.id}
          onPress={() => navigate(action.route)}
          style={{ alignItems: 'center', width: 72 }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              backgroundColor: `${action.color}18`,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
            }}
          >
            <Ionicons name={action.icon} size={24} color={action.color} />
          </View>
          <Text style={{ fontSize: 12, fontWeight: '500', color: palette.foreground }}>{action.title}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
