import { View, Text, ScrollView, Pressable, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@/lib/icons';
import { navigate, navigateToTab } from '@/navigation/navigationRef';
import { useTheme } from '@/providers/ThemeProvider';
import {
  BalanceCard,
  QuickActions,
  TransactionItem,
  NovaShortcut,
  PromoCarousel,
  Card,
  TransactionSkeleton,
} from '@/components/ui';
import { useWallets, useTransactions, useProfile, useRewards } from '@/hooks/useWalletData';
import { useAuthStore } from '@/store/auth.store';
import { spendingByCategory } from '@/constants/mock-data';
import { SpendingChart } from '@/components/ui/SpendingChart';
import { formatCurrency } from '@/lib/currency';
import { useState } from 'react';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();
  const session = useAuthStore((s) => s.session);
  const [refreshing, setRefreshing] = useState(false);

  const { data: wallets, isLoading: walletsLoading, refetch: refetchWallets } = useWallets();
  const { data: txList, isLoading: txLoading, refetch: refetchTransactions } = useTransactions(5);
  const { data: profile } = useProfile();
  const { data: rewards } = useRewards();

  const primaryWallet = wallets?.find((w) => w.is_primary) ?? wallets?.[0];
  const firstName = profile?.full_name?.split(' ')[0] ?? session?.fullName?.split(' ')[0] ?? 'there';

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchWallets(), refetchTransactions()]);
    setRefreshing(false);
  };

  const weekSpent = spendingByCategory.reduce((s, c) => s + c.amount, 0);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: palette.background }}
      contentContainerStyle={{ paddingBottom: 24 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={palette.primary} />}
    >
      <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 20, paddingBottom: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 14, color: palette.mutedForeground }}>Good day,</Text>
            <Text style={{ fontSize: 24, fontWeight: '700', color: palette.foreground }}>{firstName}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable
              onPress={() => navigate('Notifications')}
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: palette.secondary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="notifications-outline" size={22} color={palette.foreground} />
            </Pressable>
            <Pressable
              onPress={() => navigate('Nova')}
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: `${palette.primary}18`,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="sparkles" size={22} color={palette.primary} />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, gap: 24, marginTop: 8 }}>
        {walletsLoading ? (
          <View style={{ height: 180, borderRadius: 24, backgroundColor: palette.muted }} />
        ) : (
          <BalanceCard
            balance={primaryWallet?.balance ?? 0}
            currency={primaryWallet?.currency}
            onTopUp={() => navigate('TopUp')}
            onSend={() => navigate('Send')}
          />
        )}

        <QuickActions />

        <NovaShortcut />

        <View>
          <Text style={{ fontSize: 17, fontWeight: '700', color: palette.foreground, marginBottom: 12 }}>
            This week
          </Text>
          <Card>
            <Text style={{ fontSize: 13, color: palette.mutedForeground }}>Total spent</Text>
            <Text style={{ fontSize: 24, fontWeight: '700', color: palette.foreground, marginTop: 4 }}>
              {formatCurrency(weekSpent)}
            </Text>
            <View style={{ marginTop: 16 }}>
              <SpendingChart data={spendingByCategory} />
            </View>
          </Card>
        </View>

        {rewards && (
          <Pressable onPress={() => navigateToTab('Rewards')}>
            <Card style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: 13, color: palette.mutedForeground }}>Rewards</Text>
                <Text style={{ fontSize: 18, fontWeight: '700', color: palette.foreground, marginTop: 4, textTransform: 'capitalize' }}>
                  {rewards.tier} · {rewards.points_balance.toLocaleString()} pts
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={palette.mutedForeground} />
            </Card>
          </Pressable>
        )}

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 17, fontWeight: '700', color: palette.foreground }}>Recent</Text>
            <Pressable onPress={() => navigateToTab('Wallet')}>
              <Text style={{ color: palette.primary, fontWeight: '600', fontSize: 14 }}>See all</Text>
            </Pressable>
          </View>
          <Card padded>
            {txLoading ? (
              <TransactionSkeleton />
            ) : txList && txList.length > 0 ? (
              txList.map((tx, i) => (
                <View key={tx.id}>
                  <TransactionItem
                    transaction={tx}
                    onPress={() => navigate('TransactionDetail', { id: tx.id })}
                  />
                  {i < txList.length - 1 && (
                    <View style={{ height: 1, backgroundColor: palette.border }} />
                  )}
                </View>
              ))
            ) : (
              <Text style={{ color: palette.mutedForeground, textAlign: 'center', padding: 20 }}>
                No transactions yet
              </Text>
            )}
          </Card>
        </View>

        <View>
          <Text style={{ fontSize: 17, fontWeight: '700', color: palette.foreground, marginBottom: 12 }}>
            Offers
          </Text>
          <PromoCarousel />
        </View>
      </View>
    </ScrollView>
  );
}
