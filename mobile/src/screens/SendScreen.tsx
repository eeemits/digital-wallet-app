import { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { navigate } from '@/navigation/navigationRef';
import { useTheme } from '@/providers/ThemeProvider';
import { Button, Input, Card } from '@/components/ui';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useWallets, useSendMoney } from '@/hooks/useWalletData';
import { useAuthStore } from '@/store/auth.store';
import { formatCurrency, parseAmount } from '@/lib/currency';

const schema = z.object({
  recipient: z.string().min(3, 'Enter recipient ID or phone'),
  amount: z.string().refine((v) => parseAmount(v) > 0, 'Enter a valid amount'),
  note: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function SendScreen() {
  const { palette } = useTheme();
  const { data: wallets } = useWallets();
  const sendMoney = useSendMoney();
  const userId = useAuthStore((s) => s.session?.userId);
  const primaryWallet = wallets?.find((w) => w.is_primary);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { recipient: '', amount: '', note: '' },
  });

  const onSubmit = async (data: FormData) => {
    if (!userId || !primaryWallet) return;
    const amount = parseAmount(data.amount);
    try {
      const tx = await sendMoney.mutateAsync({
        userId,
        walletId: primaryWallet.id,
        amount,
        recipient: data.recipient,
        note: data.note,
      });
      navigate('TransferReceipt', {
        type: 'send',
        amount: String(amount),
        recipient: data.recipient,
        reference: tx.reference_id ?? '',
        status: tx.status,
      });
    } catch (e) {
      // handled by mutation
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: palette.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader title="Send money" subtitle={primaryWallet ? `Balance: ${formatCurrency(primaryWallet.balance)}` : undefined} />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Controller
          control={control}
          name="recipient"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="To" placeholder="Phone, email, or Athris ID" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.recipient?.message} />
          )}
        />
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Amount" prefix="RM" keyboardType="decimal-pad" placeholder="0.00" value={value} onChangeText={onChange} onBlur={onBlur} error={errors.amount?.message} />
          )}
        />
        <Controller
          control={control}
          name="note"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Note (optional)" placeholder="What's this for?" value={value} onChangeText={onChange} onBlur={onBlur} />
          )}
        />
        <Card>
          <Text style={{ fontSize: 13, color: palette.mutedForeground, lineHeight: 20 }}>
            DuitNow and bank transfers coming soon. Transfers between Athris wallets are instant.
          </Text>
        </Card>
        <Button title="Continue" size="lg" onPress={handleSubmit(onSubmit)} loading={sendMoney.isPending} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
