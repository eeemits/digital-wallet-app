import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { navigate } from '@/navigation/navigationRef';
import { useTheme } from '@/providers/ThemeProvider';
import { Button, Input, Card } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useWallets, useTopUp } from '@/hooks/useWalletData';
import { parseAmount, formatCurrency } from '@/lib/currency';

const quickAmounts = [50, 100, 200, 500];

export function TopUpScreen() {
  const { palette } = useTheme();
  const [amount, setAmount] = useState('');
  const { data: wallets } = useWallets();
  const topUp = useTopUp();
  const primaryWallet = wallets?.find((w) => w.is_primary);

  const handleTopUp = async () => {
    if (!primaryWallet) return;
    const value = parseAmount(amount);
    if (value <= 0) return;
    await topUp.mutateAsync({ walletId: primaryWallet.id, amount: value });
    navigate('TransferReceipt', {
      type: 'topup',
      amount: String(value),
      recipient: 'Your wallet',
      reference: `TOP-${Date.now()}`,
      status: 'completed',
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScreenHeader title="Add funds" subtitle={primaryWallet ? `Balance: ${formatCurrency(primaryWallet.balance)}` : undefined} />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Input label="Amount" prefix="RM" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} placeholder="0.00" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {quickAmounts.map((a) => (
            <Button key={a} title={`RM ${a}`} variant="outline" size="sm" onPress={() => setAmount(String(a))} />
          ))}
        </View>
        <Card>
          <Button title="Simulate FPX payment" onPress={handleTopUp} loading={topUp.isPending} size="lg" />
        </Card>
      </ScrollView>
    </View>
  );
}
