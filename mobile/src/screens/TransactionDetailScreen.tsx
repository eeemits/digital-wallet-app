import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { useTheme } from '@/providers/ThemeProvider';
import { Card } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useTransactions } from '@/hooks/useWalletData';
import { formatCurrency } from '@/lib/currency';
import { isIncomingTransaction, formatRelativeDate } from '@/lib/utils';
import { TRANSACTION_TYPE_LABELS } from '@/constants/app';
import { Ionicons } from '@/lib/icons';

export function TransactionDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'TransactionDetail'>>();
  const id = route.params.id;
  const { palette } = useTheme();
  const { data: transactions } = useTransactions();
  const tx = transactions?.find((t) => t.id === id);

  if (!tx) {
    return (
      <View style={{ flex: 1, backgroundColor: palette.background }}>
        <ScreenHeader title="Transaction" />
        <Text style={{ textAlign: 'center', marginTop: 40, color: palette.mutedForeground }}>Not found</Text>
      </View>
    );
  }

  const incoming = isIncomingTransaction(tx.type);

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Transaction details" />
      <View style={{ padding: 20, alignItems: 'center' }}>
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: incoming ? `${palette.success}18` : `${palette.destructive}15`,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <Ionicons
            name={incoming ? 'arrow-down' : 'arrow-up'}
            size={32}
            color={incoming ? palette.success : palette.destructive}
          />
        </View>
        <Text style={{ fontSize: 32, fontWeight: '700', color: palette.foreground }}>
          {incoming ? '+' : '-'}
          {formatCurrency(tx.amount)}
        </Text>
        <Text style={{ fontSize: 16, color: palette.mutedForeground, marginTop: 8 }}>
          {tx.description ?? tx.merchant_name ?? TRANSACTION_TYPE_LABELS[tx.type]}
        </Text>
        <View
          style={{
            marginTop: 12,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            backgroundColor:
              tx.status === 'completed' ? `${palette.success}18` : `${palette.warning}18`,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: tx.status === 'completed' ? palette.success : palette.warning,
              textTransform: 'capitalize',
            }}
          >
            {tx.status}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, gap: 12 }}>
        {[
          { label: 'Type', value: TRANSACTION_TYPE_LABELS[tx.type] },
          { label: 'Date', value: formatRelativeDate(tx.created_at) },
          { label: 'Reference', value: tx.reference_id ?? '—' },
          { label: 'Balance after', value: formatCurrency(tx.balance_after) },
          { label: 'Category', value: tx.category ?? '—' },
        ].map((row) => (
          <Card key={row.label} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: palette.mutedForeground }}>{row.label}</Text>
            <Text style={{ fontWeight: '600', color: palette.foreground }}>{row.value}</Text>
          </Card>
        ))}
      </View>
    </View>
  );
}
