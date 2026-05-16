import { View, Text, ScrollView, Pressable, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigate } from '@/navigation/navigationRef';
import { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { Card, TransactionItem, TransactionSkeleton, EmptyState, SpendingChart } from '@/components/ui';
import { useWallets, useTransactions, useCards } from '@/hooks/useWalletData';
import { VirtualCard } from '@/components/ui';
import { formatCurrency } from '@/lib/currency';
import { spendingByCategory } from '@/constants/mock-data';
import { Ionicons } from '@/lib/icons';

export function WalletScreen() {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data: wallets, refetch: refetchWallets } = useWallets();
  const { data: transactions, isLoading, refetch: refetchTx } = useTransactions();
  const { data: cards } = useCards();

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchWallets(), refetchTx()]);
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: palette.background }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={palette.primary} />}
    >
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: palette.foreground }}>Wallet</Text>
        <Text style={{ fontSize: 14, color: palette.mutedForeground, marginTop: 4 }}>
          Manage balances and activity
        </Text>

        <View style={{ gap: 12, marginTop: 24 }}>
          {wallets?.map((wallet) => (
            <Pressable key={wallet.id}>
              <Card>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={{ fontSize: 14, color: palette.mutedForeground }}>{wallet.name}</Text>
                    <Text style={{ fontSize: 26, fontWeight: '700', color: palette.foreground, marginTop: 4 }}>
                      {formatCurrency(wallet.balance)}
                    </Text>
                  </View>
                  {wallet.is_primary && (
                    <View style={{ backgroundColor: `${palette.primary}18`, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }}>
                      <Text style={{ fontSize: 12, fontWeight: '600', color: palette.primary }}>Primary</Text>
                    </View>
                  )}
                </View>
              </Card>
            </Pressable>
          ))}
        </View>

        {cards && cards[0] && (
          <Pressable onPress={() => navigate('CardDetail', { id: cards[0].id })} style={{ marginTop: 20 }}>
            <VirtualCard card={cards[0]} compact />
          </Pressable>
        )}

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          {[
            { label: 'Add funds', icon: 'add-circle' as const, route: '/topup' },
            { label: 'Withdraw', icon: 'arrow-down' as const, route: '/withdraw' },
            { label: 'Analytics', icon: 'stats-chart' as const, route: null },
          ].map((action) => (
            <Pressable
              key={action.label}
              onPress={() => action.route && navigate(action.route === '/topup' ? 'TopUp' : 'Withdraw')}
              style={{
                flex: 1,
                backgroundColor: palette.card,
                borderRadius: 16,
                padding: 16,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: palette.border,
              }}
            >
              <Ionicons name={action.icon} size={24} color={palette.primary} />
              <Text style={{ fontSize: 12, fontWeight: '600', color: palette.foreground, marginTop: 8 }}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={{ fontSize: 17, fontWeight: '700', color: palette.foreground, marginTop: 28, marginBottom: 12 }}>
          Spending analytics
        </Text>
        <Card>
          <SpendingChart data={spendingByCategory} />
        </Card>

        <Text style={{ fontSize: 17, fontWeight: '700', color: palette.foreground, marginTop: 28, marginBottom: 12 }}>
          All transactions
        </Text>
        <Card padded>
          {isLoading ? (
            <TransactionSkeleton />
          ) : transactions && transactions.length > 0 ? (
            transactions.map((tx, i) => (
              <View key={tx.id}>
                <TransactionItem transaction={tx} onPress={() => navigate('TransactionDetail', { id: tx.id })} />
                {i < transactions.length - 1 && <View style={{ height: 1, backgroundColor: palette.border }} />}
              </View>
            ))
          ) : (
            <EmptyState title="No transactions" description="Your activity will appear here" />
          )}
        </Card>
      </View>
    </ScrollView>
  );
}
