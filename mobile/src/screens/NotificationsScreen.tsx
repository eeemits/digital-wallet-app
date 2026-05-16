import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { Card, EmptyState } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useNotifications } from '@/hooks/useWalletData';
import { formatRelativeDate } from '@/lib/utils';

const typeIcons: Record<string, string> = {
  transaction: 'swap-horizontal',
  security: 'shield',
  npc: 'sparkles',
  reward: 'gift',
  promotion: 'megaphone',
};

export function NotificationsScreen() {
  const { palette } = useTheme();
  const { data: notifications, isLoading } = useNotifications();

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Notifications" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {!isLoading && notifications?.length === 0 ? (
          <EmptyState icon="notifications-off-outline" title="All caught up" description="No new notifications" />
        ) : (
          notifications?.map((notif) => (
            <Pressable key={notif.id}>
              <Card
                style={{
                  flexDirection: 'row',
                  gap: 14,
                  marginBottom: 12,
                  opacity: notif.read ? 0.7 : 1,
                  borderLeftWidth: notif.read ? 0 : 3,
                  borderLeftColor: palette.primary,
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    backgroundColor: `${palette.primary}15`,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons
                    name={typeIcons[notif.type] ?? 'notifications'}
                    size={22}
                    color={palette.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: palette.foreground }}>{notif.title}</Text>
                  <Text style={{ fontSize: 13, color: palette.mutedForeground, marginTop: 4, lineHeight: 18 }}>
                    {notif.message}
                  </Text>
                  <Text style={{ fontSize: 12, color: palette.mutedForeground, marginTop: 8 }}>
                    {formatRelativeDate(notif.created_at)}
                  </Text>
                </View>
              </Card>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}
