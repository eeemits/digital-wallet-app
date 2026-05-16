import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@/lib/icons';
import { navigate } from '@/navigation/navigationRef';
import { useTheme } from '@/providers/ThemeProvider';
import { Card } from '@/components/ui';
import { useProfile } from '@/hooks/useWalletData';
import { useLogout } from '@/hooks/useAuth';
import { getInitials } from '@/lib/utils';

import type { RootStackParamList } from '@/navigation/types';

const menuSections: Array<{
  title: string;
  items: Array<{ label: string; icon: string; route: keyof RootStackParamList }>;
}> = [
  {
    title: 'Account',
    items: [
      { label: 'Personal information', icon: 'person-outline', route: 'Settings' },
      { label: 'KYC verification', icon: 'shield-checkmark-outline', route: 'Kyc' },
      { label: 'Linked devices', icon: 'phone-portrait-outline', route: 'Settings' },
    ],
  },
  {
    title: 'Security',
    items: [
      { label: 'PIN & biometrics', icon: 'finger-print-outline', route: 'PinSetup' },
      { label: 'Security settings', icon: 'lock-closed-outline', route: 'Settings' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Help center', icon: 'help-circle-outline', route: 'Help' },
      { label: 'Legal & privacy', icon: 'document-text-outline', route: 'Settings' },
    ],
  },
];

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();
  const { data: profile } = useProfile();
  const logout = useLogout();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }}>
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 40 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: palette.foreground }}>Profile</Text>

        <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, gap: 16 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: palette.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: palette.primaryForeground, fontSize: 22, fontWeight: '700' }}>
              {getInitials(profile?.full_name)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: palette.foreground }}>
              {profile?.full_name ?? 'Athris User'}
            </Text>
            <Text style={{ fontSize: 14, color: palette.mutedForeground, marginTop: 2 }}>
              {profile?.phone ?? '+60 ••• ••••'}
            </Text>
            <View
              style={{
                alignSelf: 'flex-start',
                marginTop: 8,
                backgroundColor:
                  profile?.kyc_status === 'verified' ? `${palette.success}18` : `${palette.warning}18`,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: profile?.kyc_status === 'verified' ? palette.success : palette.warning,
                  textTransform: 'capitalize',
                }}
              >
                KYC {profile?.kyc_status ?? 'pending'}
              </Text>
            </View>
          </View>
        </Card>

        {menuSections.map((section) => (
          <View key={section.title} style={{ marginTop: 28 }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: palette.mutedForeground, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {section.title}
            </Text>
            <Card padded={false}>
              {section.items.map((item, i) => (
                <Pressable
                  key={item.label}
                  onPress={() => navigate(item.route)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    borderBottomWidth: i < section.items.length - 1 ? 1 : 0,
                    borderBottomColor: palette.border,
                  }}
                >
                  <Ionicons name={item.icon} size={22} color={palette.primary} style={{ marginRight: 14 }} />
                  <Text style={{ flex: 1, fontSize: 15, color: palette.foreground }}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color={palette.mutedForeground} />
                </Pressable>
              ))}
            </Card>
          </View>
        ))}

        <Pressable
          onPress={logout}
          style={{
            marginTop: 32,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: 16,
          }}
        >
          <Ionicons name="log-out-outline" size={22} color={palette.destructive} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: palette.destructive }}>Sign out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
