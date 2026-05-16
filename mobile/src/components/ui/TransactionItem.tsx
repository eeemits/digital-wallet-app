import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@/lib/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { formatCurrency } from '@/lib/currency';
import { isIncomingTransaction, formatRelativeDate } from '@/lib/utils';
import { TRANSACTION_TYPE_LABELS } from '@/constants/app';
import type { Transaction } from '@/types';

type TransactionItemProps = {
  transaction: Transaction;
  onPress?: () => void;
};

export function TransactionItem({ transaction, onPress }: TransactionItemProps) {
  const { palette } = useTheme();
  const incoming = isIncomingTransaction(transaction.type);
  const label =
    transaction.description ??
    transaction.merchant_name ??
    TRANSACTION_TYPE_LABELS[transaction.type] ??
    'Transaction';

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        gap: 14,
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: incoming ? `${palette.success}18` : `${palette.destructive}15`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons
          name={incoming ? 'arrow-down' : 'arrow-up'}
          size={20}
          color={incoming ? palette.success : palette.destructive}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: palette.foreground }} numberOfLines={1}>
          {label}
        </Text>
        <Text style={{ fontSize: 13, color: palette.mutedForeground, marginTop: 2 }}>
          {formatRelativeDate(transaction.created_at)}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '600',
          color: incoming ? palette.success : palette.foreground,
        }}
      >
        {incoming ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </Text>
    </Pressable>
  );
}
